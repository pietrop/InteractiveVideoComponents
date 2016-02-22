# Draw on video
a module to write text on video.

**input** an array of words objects in the following format (where the time is in milliseconds)

```json
var words = [{
		start: 0,
	    end: 200, 
	    text: "Call"
	},
	{
		 start: 200,
	     end: 300,
	     text: "me"
	},
	{
		 start: 300,
	     end: 500,
	     text: "Ishmael"
	},
	...
]
```

**output**, a video with burned on some text.

## How to use
see `./tests/burn_words_json_to_video_test.js` for example on how to use.


## Implementation

Makes use of the following modules 

- `text_json_to_srt.js` 
- `burn_srt_on_video.js`
- `burn_words_json_to_video.js`


### `text_json_to_srt.js` 
converts array of word objects(as defined above) to an srt file written to disk.

### `burn_srt_on_video.js`
burns content of srt file onto a new video.
<!-- TODO: add callback to delete temp srt file delete -->

### `burn_words_json_to_video.js`
Brings together previous two modules allowing, to input array of words, and get as output new video with burned text on it. 
Words are grouped to be shown on screen by arbitrary that is set as a variable.
