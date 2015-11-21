// concat_sequence.js
// takes in a paperedit sequence, 
//sees where the word objects are contiguos, by looking at the id number 
//ie if currentId +1 = nextid  && belong to same paper edit
//NOTE papercut should contain transcriptId to faclitate with that.
//and for contiguos once, merges text and unifies timecode keeping start
// of first element and end of last element
//this is used both when exporting EDL
// and is also used when exporting to text
//it changes the granularity of the objects making up the seuqence in a paper edit