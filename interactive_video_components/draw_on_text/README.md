# Draw on text

Variation on the write on text module, where rather then using a subtitle file,
uses a `drawtext` filter, in order to define font etc..

```bash
ffmpeg -y -i debate_test_trimmed.mp4 -vf drawtext="enable='between(t,2,6)':fontfile=Vera.ttf: \
text='Stack Overflow': fontcolor=white: fontsize=92: box=1: boxcolor=black: \
x=(w-text_w)/2: y=(h-text_h-line_h)" -codec:a copy output.mp4
```
