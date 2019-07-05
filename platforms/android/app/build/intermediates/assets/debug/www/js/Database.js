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
  //this.plants = readFile("plants.json");//temp;
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
