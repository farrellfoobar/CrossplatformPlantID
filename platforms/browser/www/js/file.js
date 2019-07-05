function errorCallback(error)
{
  console.log("Error:")
  console.log(error)
}

function readJSON(fileName)
{
  var ret;
  $.ajaxSetup({
      async: false
  });

  $.getJSON( cordova.file.dataDirectory + fileName, function(data){
    ret = data;
  });

  return ret;
}

function readFile(fileName)
{
  document.addEventListener("deviceready", function() {
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
      dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
        fileEntry.file(function (file)
        {
            var reader = new FileReader();

            reader.onloadend = function(e) {
                console.log("Successful file read: " + this.result);
            };
            reader.readAsText(file);
        }, errorCallback);
      }, errorCallback);
    }, errorCallback);
  }, false);
}

// this function writes the object dataObj to a file named fileName in the
// cordova.file.dataDirectory directory
function writeFile(fileName, dataObj)
{
  console.log("trying to write: " + fileName);
  /*
  var dir = "";
  if(fileName.indexOf("/") != -1)
  {
    dir = fileName.substring(0, fileName.lastIndexOf("/"));
    fileName = fileName.substring(fileName.lastIndexOf("/")+1);
    // Directory creation requires nested callbacks which is a lot messier than
    // simply using a "flat" directory system with .'s instead of /'s
    dir = cordova.file.dataDirectory + dir.split("/").join(".");
  }
  */

  console.log("filename: " + fileName);
  console.log("dir: " + dir);

    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (fileEntry) {
      fileEntry.createWriter(function (fileWriter) {

          fileWriter.onwriteend = function() {
              console.log("Successful wrote file: " + fileName);
          };

          fileWriter.onerror = function (e) {
              console.log("Failed file write: " + e.toString());
          };

          fileWriter.write(dataObj);
      });
    }, errorCallback);
}

function debugListDataDir()
{
  window.resolveLocalFileSystemURL(cordova.file.dataDirectory,
    function URLsuccess(entry)
    {
        var directoryReader = entry.createReader();
        directoryReader.readEntries(
          function readerSuccess(entries)
          {
            for (var i=0; i<entries.length; i++)
            {
              console.log( "data dir contains: " + entries[i].name);
            }
          }
          ,function fail(error) {console.log(error);});
    }
  , function fail(error) {console.log(error);});
}

//TODO: actually get the plants
function getPlants(plants)
{
  console.log(plants)
  console.log(httpGet("http://s3.amazonaws.com/plantid-dev"));
}

function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
