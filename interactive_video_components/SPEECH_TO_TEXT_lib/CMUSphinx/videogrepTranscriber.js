var fs = require('fs');
var Path = require('path');
var spawn = require('child_process').spawn;

/**
*
*/

function transcribe(path, cb) {
  var new_name = path + '.temp.wav';
  var ffmpeg = spawn(Path.join(__dirname, './standalone/ffmpeg'), ['-y', '-i', path, '-acodec', 'pcm_s16le', '-ac', '1', '-ar', '16000', new_name]);

  ffmpeg.stdout.on('data', function(data) {
    console.log('' + data);
  });

  ffmpeg.on('close', function(code) {
    console.log('finished converting');
    pocketSphinx(new_name, cb);
  });
}


/**
* PocketSphinx Binary
*/

function pocketSphinx(path, cb) {
  var filename = path.replace('.temp.wav', '') + '.transcription.txt';
  var args = [
    '-infile', path,
    '-time', 'yes',
    '-logfn', '/dev/null',
    '-vad_prespeech', '10',
    '-vad_postspeech', '50',
    '-feat', '1s_c_d_dd	1s_c_d_dd',
    '-dict', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/cmudict-en-us.dict'),
    '-fdict', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/noisedict'),
    '-featparams', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/feat.params'),
    '-hmm', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us'),
    '-lm', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us.lm.bin'),
    '-mdef', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/mdef'),
    '-mean', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/means'),
    '-sendump', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/sendump'),
    '-tmat', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/transition_matrices'),
    '-var', Path.join(__dirname, 'pocketsphinx/share/pocketsphinx/model/en-us/en-us/variances')
  ];

  var options = {
    env: {
      'DYLD_LIBRARY_PATH': Path.join(__dirname, 'sphinxbase/lib') + ':' + Path.join(__dirname, 'pocketsphinx/lib/')
    }
  };

  var ps = spawn(Path.join(__dirname, 'pocketsphinx/bin/pocketsphinx_continuous'), args, options);

  var transcript = '';
  ps.stdout.on('data', function(data) {
    transcript += '' + data;
    var _lines = transcript.split('\n').filter(l => l.search(/\d/) > -1);
    _lines = _lines.map(l => l.trim().split(' ')).filter(l => l.length === 4);
    if (_lines.length > 0) {
      var _time = parseFloat(_lines[_lines.length-1][2]);
      // ipc.send('progress', {transcription: _time});
    }
  });

  ps.on('close', function(code) {
    fs.writeFile(filename, transcript, {
      encoding: 'utf8'
    }, function(err) {
      if (err) console.log(err);
      console.log('finished writing');
      cb(transcript);
    });

  });
  // os.remove(f)
}


/**
* from pocket sphinx generated report

how do you destroy i said i needed
<s> 0.160 0.180 0.998501
how 0.190 0.340 0.070404
do 0.350 0.510 0.740274
you 0.520 0.890 0.979021
destroy 0.900 1.260 0.768872
i 1.270 1.490 0.201456
said 1.500 1.700 0.611245
<sil> 1.710 2.050 0.992924
i 2.060 2.240 0.329978
needed(2) 2.250 2.640 0.435223
</s> 2.650 3.040 1.000000

converts it into this

[ [ { start: 0.18, end: 1.71, text: 'how do you destroy i said' },
    { start: 2.05, end: 2.65, text: 'i needed' } ],
  [ { start: 0.19, end: 0.34, text: 'how' },
    { start: 0.35, end: 0.51, text: 'do' },
    { start: 0.52, end: 0.89, text: 'you' },
    { start: 0.9, end: 1.26, text: 'destroy' },
    { start: 1.27, end: 1.49, text: 'i' },
    { start: 1.5, end: 1.7, text: 'said' },
    { start: 2.06, end: 2.24, text: 'i' },
    { start: 2.25, end: 2.64, text: 'needed' } ] ]
*/
function convert_transcription(path, cb) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      cb(null);
    } else {
      var sentences = parse_transcription_sentences(data);
      var words = parse_transcription_words(data);
      cb([sentences, words]);
    }
  });
}


/**
*
*/

function parse_transcription_sentences(data) {
  var output = [];
  var lines = data.split('\n');

  var wordlines = lines.filter(l => l.search(/\d$/) > -1);

  var item = {
    start: null,
    end: null
  };

  var startIndex = null;
  var endIndex = null;

  for (var i = 0, len = wordlines.length; i < len; i++) {
    var line = wordlines[i].trim();

    if (line[0] === '<') {
      line = line.split(' ');
      if (!item.start && !item.end) {
        item.start = parseFloat(line[2]);
        startIndex = i + 1;
        continue;
      }
      if (!item.end) {
        if (startIndex != i) {
          item.end = parseFloat(line[1]);
          endIndex = i;
          var text = wordlines.slice(startIndex, endIndex).map(w => w.trim().split(' ')[0]).filter(w => w.search(/NOISE|SPEECH/) === -1);
          text = text.join(' ').replace(/\(\d\)/g,'');
          item.text = text;
          output.push(item);
        }

        startIndex = i + 1;
        item = {
          start: parseFloat(line[2]),
          end: null
        };
      }
    }
  }

  if (output.length === 0 && item.start) {
    output.push(item);
  }

  if (!output[output.length-1].end) {
    output[output.length-1].end = parseFloat(wordlines[wordlines.length-1].split(' ')[1]);
  }

  return output;
}

function parse_transcription_words(data) {
  var output = [];
  var lines = data.split('\n');

  lines = lines.filter(l => l.search(/\d$/) > -1 && l.search(/NOISE|SPEECH/) === -1 && l[0] != '<');
  lines.forEach(l => {
    l = l.trim();
    l = l.split(' ');
    var item = {
      start: parseFloat(l[1]),
      end: parseFloat(l[2]),
      text: l[0].replace(/\(\d\)/, '')
    };
    output.push(item);
  });

  return output;

}



module.exports.convert_transcription = convert_transcription;
module.exports.transcribe = transcribe;

