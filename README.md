# CrossplatformPlantID
# How do I contribute?
Get apache cordova here:

https://cordova.apache.org/#getstarted

`
git clone https://github.com/farrellfoobar/CrossplatformPlantID
cd CrossplatformPlantID
cordova platform add browser 
`
if you have android studio installed:

`cordova platform add android`

# How does this work?
Only make edits to the WWW directory, all the other directories are populated from the www directory.
## Why not use React?
React is just a javascript library that wraps both Android and IOS native UI elements. We could technically still use React, but cordova gives us the option of using HTML and CSS Directly as well.

# Testing:
`cordova run browser`

Right click > Inspect element for error messages

With android studio:

Tools > AVD Manager > Start any emulator

`cordova run android`

