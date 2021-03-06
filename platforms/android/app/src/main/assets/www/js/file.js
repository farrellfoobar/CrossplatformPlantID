var awsURL = "http://s3.amazonaws.com/plantid-dev";

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

    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry)
    {
      dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry)
      {
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
  console.log(httpGet(awsURL));
}

function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function syncRootAWSdir()
{
  xmlDoc = (new DOMParser()).parseFromString(httpGet(awsURL), "text/xml")
  keys = xmlDoc.getElementsByTagName("Key");
  filesToDownload = [];

  for(i = 0; i < keys.length; i++)
  {
    filesToDownload.push(keys[i].childNodes[0].nodeValue);
  }

  downloadFiles(filesToDownload);
}

function downloadFiles(files)
{
  for(i = 0; i < files.length; i++)
  {
    var url = awsURL + '/' + files[i];
    var filePath = cordova.file.dataDirectory + files[i].split("/").join(".");
    var fileTransfer = new FileTransfer();
    var uri = encodeURI(url);

    fileTransfer.download(
      uri,
      filePath,
      function(entry) {
          console.log("download complete: " + entry.fullPath);
      },
      function(error) {
          console.log("download error source " + error.source);
          console.log("download error target " + error.target);
          console.log("upload error code" + error.code);
      },
      false,
      {
        headers: {}
      }
    );
  }
}
