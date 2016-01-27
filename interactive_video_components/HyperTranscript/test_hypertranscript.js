
module.exports = {
    setUp: function (callback) {
    	var HP = require('./hypertranscript');
        this.hp = new HP.HyperTranscript("Title Hp",  "a desc",  []);
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    title: function (test) {
    	// this.hp.title='Title Hp';
        test.equals('Title Hp', this.hp.title);
        test.done();
    },
     description: function (test) {
        // this.hp.title='Title Hp';
        test.equals('a desc', this.hp.description);
        // test.ok(true, "this assertion should pass");
        test.done();
    },
     words: function (test) {
        // this.hp.title='Title Hp';
        test.equals(0, this.hp.words.length);
        test.done();
    
    },
    convertFromSrt: function(test){
        var HP = require('./hypertranscript.js')
        var s = HP.fromSrtString('1\n00:00:02,000 --> 00:00:06,000\nSubtitle 1.1\nSubtitle 1.2\n\n2\n00:00:28,967 --> 01:30:30,958\nSubtitle 2.1\nSubtitle 2.2\n')
        // var s = '1\n00:00:02,000 --> 00:00:06,000\nSubtitle 1.1\nSubtitle 1.2\n\n2\n00:00:28,967 --> 01:30:30,958\nSubtitle 2.1\nSubtitle 2.2\n'
        var h1 = new HP.HyperTranscript('jell', 'desk', s)
        var expectedRes =  {title: 'jell',description: 'desk',words: [ { startTime: '2.00', endTime: '12.67', text: 'Subtitle', id: 0 },{ startTime: '3.33', endTime: '19.33', text: '1.1\nSubtitle', id: 1 }, { startTime: '4.67', endTime: '8.67', text: '1.2', id: 2 }, { startTime: '28.97', endTime: '14434.28', text: 'Subtitle', id: 3 }, { startTime: '1829.63',   endTime: '23437.59',   text: '2.1\nSubtitle',   id: 4 }, { startTime: '3630.29', endTime: '9032.29', text: '2.2', id: 5 } ] }    
        test.equals(JSON.stringify(h1), JSON.stringify(expectedRes));
        test.done();
    }//,
    // convertFromSrtFile: function(test){
    //     var HP = require('./hypertranscript.js')
    //     var s = HP.fromSrtFile('sample.srt')
    //     // var s = '1\n00:00:02,000 --> 00:00:06,000\nSubtitle 1.1\nSubtitle 1.2\n\n2\n00:00:28,967 --> 01:30:30,958\nSubtitle 2.1\nSubtitle 2.2\n'
    //     var h1 = new HP.HyperTranscript('jell', 'desk', s)
    //     var expectedRes =  {title: 'jell',description: 'desk',words: [ { startTime: '2.00', endTime: '12.67', text: 'Subtitle', id: 0 },{ startTime: '3.33', endTime: '19.33', text: '1.1\nSubtitle', id: 1 }, { startTime: '4.67', endTime: '8.67', text: '1.2', id: 2 }, { startTime: '28.97', endTime: '14434.28', text: 'Subtitle', id: 3 }, { startTime: '1829.63',   endTime: '23437.59',   text: '2.1\nSubtitle',   id: 4 }, { startTime: '3630.29', endTime: '9032.29', text: '2.2', id: 5 } ] }    
    //     test.equals(JSON.stringify(h1), JSON.stringify(expectedRes));
    //     test.done();
    // }
};