#Pocket Sphinx

On OSX

## JS 6 
video grep is written using js6, so you need to update node to be able to run it

```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```


## Linux 
### ffmpeg binary
on linux, you might need to change the ffpmeg version of node

you can use npm to install this[https://www.npmjs.com/package/ffmpeg-binary-linux-64bit]

when it finishes instlaling it prints the path where the linux ffmpeg binary is being installed.

you can take that and put it in line 11 of `videogrepTranscriber.js`

### Pocket Sphinx binary
also pocket sphinx needs to be changed 



debian
https://github.com/jasperproject/jasper-client/issues/436 


http://keithv.com/software/sphinx/uk/


<!-- # CMU Sphinx

## CMU SPhinx Aligner
cmusphinx-alignment-example
https://github.com/JoshData/cmusphinx-alignment-example

https://github.com/cmusphinx/sphinx4/blob/master/sphinx4-samples/src/main/java/edu/cmu/sphinx/demo/aligner/AlignerDemo.java


## Speaker Diarization

https://github.com/cmusphinx/sphinx4/blob/master/sphinx4-samples/src/main/java/edu/cmu/sphinx/demo/speakerid/SpeakerIdentificationDemo.java 


## Transcriber

https://github.com/cmusphinx/sphinx4/blob/master/sphinx4-samples/src/main/java/edu/cmu/sphinx/demo/transcriber/TranscriberDemo.java -->