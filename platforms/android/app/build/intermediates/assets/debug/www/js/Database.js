var minResults = 6;

function Database()
{
  var temp;
  $.ajaxSetup({
      async: false
  });

  $.getJSON(cordova.file.dataDirectory + "plants.json", function(data){
    temp = data;
  })
  this.plants = temp;

  $.getJSON(cordova.file.dataDirectory + "manifest.json", function(data){
    temp = data;
  })
  this.manifest = temp;

  $.getJSON(cordova.file.dataDirectory + "packs.json", function(data){
    temp = data;
  })
  this.packs = temp;

  var plantCodesInPacks = new Set();
  for(i = 0; i < this.packs.length; i++)
    for(j = 0; j < this.manifest.length; j++)
      if(this.manifest[j][0] == this.packs[i] )
        this.manifest[j].slice(1).forEach(item => plantCodesInPacks.add(item))

  for(i = 0; i < this.plants.length; i++)
  {
    if( !plantCodesInPacks.has(getPlantCode(this.plants[i])) )
    {
      this.plants.splice(i);
      i--;
    }
  }

}

function getPlantCode(plantAsString)
{
  name = plantAsString.substring(0, plantAsString.indexOf(","))
  return name.split(" ")[0].substring(0,3).toUpperCase() + name.split(" ")[1].substring(0,3).toUpperCase()
}

Database.prototype.search = function search(attributesAsString)
{
  var results = [];
  var givenAttributes = [];
  var targetAttributes = attributesAsString.split(",");
  for(i = 0; i < this.plants.length; i++)
  {
      var score = 0;
      givenAttributes = this.plants[i].split(", ").slice(2);

      for(n = 0; n < targetAttributes.length; n++)
        if(givenAttributes.includes(targetAttributes[n]))
          score++;

      if(results.length < minResults)
        results[results.length] = [score, i];
      else
      {
        results.sort()
        if(results[0][0] < score)
          results[0] = [score, i];
      }
  }

  temp = results.slice(0);

  for(i = 0; i < results.length; i++)
    results[i] = [results[i][0], this.plants[results[i][1]].split(", ")[0]]


  return results.reverse();
}

Database.prototype.get = function get(name)
{
  for(i = 0; i < this.plants.length; i++)
  {
    if(this.plants[i][0] == name)
    {
      return this.plants[i];
    }
  }
}

module.exports = Database;
