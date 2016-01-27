/**
* Original code from videogrep https://github.com/antiboredom/videogrep
*/
var fs = require('fs');
var Path = require('path');
var spawn = require('child_process').spawn;
// var ipc = require('ipc');

var supported_extensions = ['mp4', 'avi', 'mov'];

function open(path, callback) {
  if (typeof path === 'undefined') callback(false);

  var vid = {};

  var _path = path.split('.');
  var ext = _path[_path.length - 1];
  _path[_path.length - 1] = 'srt';

  vid.path = path;
  vid.ext = ext;
  vid.srt_path = _path.join('.');
  vid.transcript_path = path + '.transcription.txt';

  vid.valid = supported_extensions.some(function(ext2) {
    return ext2.toLowerCase() === ext.toLowerCase();
  });

  if (vid.valid === false) {
    alert('Sorry, VideoGrep can read mp4, mov, and avi files.');
    callback(vid);
    return false;
  }

  var pending = 2;

  convert_srts(vid.srt_path, function(data) {
    vid.srt_transcript = data;
    pending--;
    if (pending === 0) callback(vid);
  });

  convert_transcription(vid.transcript_path, function(data) {
    vid.word_transcript = data;
    pending--;
    if (pending === 0) callback(vid);
  });
}


function convert_srts(file, cb) {
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) {
      cb(null);
    } else {
      var lines = parse_srt(data);
      cb(lines);
    }
  });
}


function parse_srt(text) {
  text = text.replace(/^\d+[\n\r]/gm, '');

  var lines = text.split('\n');
  var output = [];
  var item = {};

  lines.forEach(function(line) {
    line = line.trim();
    if (line.indexOf('-->') > -1) {
      if (item.text) {
        item.text = item.text.trim();
        output.push(item);
        item = {};
      }
      var timespan = convert_timespan(line);
      item.start = timespan[0];
      item.end = timespan[1];
      item.srt_time = line;
      item.text = '';
    } else {
      if (line !== '') {
        item.text += line + ' ';
      }
    }
  });

  return output;
}


function convert_timespan(timespan) {
  timespan = timespan.split('-->');
  var start = convert_timestamp(timespan[0]);
  var end = convert_timestamp(timespan[1]);
  return [start, end];
}


function convert_timestamp(timestamp) {
  timestamp = timestamp.trim();
  timestamp = timestamp.split(',');

  var chunk = timestamp[0].split(':');
  var millis = timestamp[1];
  var hours = parseInt(chunk[0]);
  var minutes = parseInt(chunk[1]);
  var seconds = parseInt(chunk[2]);

  seconds = seconds + (hours * 60 * 60) + (minutes * 60) + (millis / 1000);

  return seconds;
}

function search(timestamps, q, duration, options) {
  if (!timestamps) return false;

  var re = new RegExp(q);

  timestamps = timestamps.filter(function(t) {
    return t.text.search(re) > -1;
  });

  var padding = options.padding || 0;
  var sync = options.sync || 0;

  for (var i = 0; i < timestamps.length; i++) {
    timestamps[i].start = timestamps[i].start - padding + sync;
    if (timestamps[i].start < 0) timestamps[i].start = 0;

    timestamps[i].end = timestamps[i].end + sync + padding;

    if (i > 0 && timestamps[i - 1].end > timestamps[i].start) {
      timestamps[i - 1].end = timestamps[i].start;
    }

    if (timestamps[i].end > duration) {
      timestamps[i].end = duration;
    }
  }
  return timestamps;
}

function search_srts(timestamps, search) {
  var re = new RegExp(search);
  return timestamps.filter(function(t) {
    return t.text.search(re) > -1;
  });
}


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


// function watsonTranscribe(path, cb) {
//   var new_name = path + '.temp.wav';
//   var ffmpeg = spawn(Path.join(__dirname, 'videogrep_standalone/ffmpeg'), ['-y', '-i', path, '-acodec', 'pcm_s16le', '-ac', '1', '-ar', '16000', new_name]);
//
//   ffmpeg.stdout.on('data', function(data) {
//     console.log('' + data);
//   });
//
//   ffmpeg.on('close', function(code) {
//     console.log('finished converting');
//     watson(new_name, cb);
//   });
// }
//
//
// function watson(path, cb) {
//   request.post('https://stream.watsonplatform.net/speech-to-text/api/v1/recognize?continuous=true&timestamps=true', {
//     'auth': {
//       'user': '',
//       'pass': ''
//
//     }
//               
//   })
// }


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


function exportVid(args, callback) {

  var timestamps = args.timestamps;
  timestamps = timestamps.map(t => {
    t.file = args.infile;
    t.line = t.text;
    return t;
  });

  timestamps = JSON.stringify(timestamps);

  var jsonPath = args.infile + '.json';
  fs.writeFileSync(jsonPath, timestamps);

  var vg_path = Path.join(__dirname, 'videogrep_standalone/videogrep');

  var vg_args = [
    '-i', jsonPath,
    '-s', args.q,
    '-o', args.outfile,
    '-p', args.padding,
    '--resyncsubs', args.sync
  ];

  if (args.transcript_type === 'word' || args.transcript_type === 'sentence') {
    vg_args.push('-t');
    if (args.transcript_type === 'word')
      vg_args.push('-st', 'fragment');
  }

  if (args.export_type === 'multiple') {
    vg_args.push('-x');
  }

  var currentEnv = process.env;
  if (!currentEnv.PATH) currentEnv.PATH = '';
  currentEnv.PATH = Path.join(__dirname, 'videogrep_standalone') + ':' + currentEnv.PATH;
  // currentEnv.IMAGEIO_FFMPEG_EXE = Path.join(__dirname, 'videogrep_standalone');

  console.log(vg_args.join(' '));

  var vgProc = spawn(vg_path, vg_args, {
    env: currentEnv,
    cwd: Path.dirname(args.infile)
  });

  var export_progress = '';
  var export_start = false;
  vgProc.stdout.on('data', function(data) {
    export_progress += '' + data;
    if (!export_start && export_progress.indexOf('Writing video into') > -1) export_start = true;
    if (export_start) {
      var matches = export_progress.match(/\d+%/gm);
      if (matches.length > 0) {
        var percent = parseInt(matches[matches.length-1]);
        // ipc.send('progress', {export: percent});
      }
    }
  });

  vgProc.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
  });

  vgProc.on('close', function(code) {
    console.log('child process exited with code ' + code);
    fs.unlink(jsonPath);
    callback(code);
  });
}


module.exports.convert_transcription = convert_transcription;
module.exports.convert_srts = convert_srts;
module.exports.convert_timestamp = convert_timestamp;
module.exports.convert_timespan = convert_timespan;
module.exports.convert_srts = convert_srts;
module.exports.parse_srt = parse_srt;
module.exports.search_srts = search_srts;
module.exports.search = search;
module.exports.transcribe = transcribe;
module.exports.exportVid = exportVid;
module.exports.open = open;
