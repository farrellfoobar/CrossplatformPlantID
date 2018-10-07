var minResults = 5;

function Database()
{
  var temp;
  $.ajaxSetup({
      async: false
  });

  $.getJSON("index_files/plants.json", function(data){
    temp = data;
  });

  $.ajaxSetup({
      async: true
  });

  this.elements = temp;
}

Database.prototype.search = function search(attributesAsString)
{
  var targetAttributes = attributesAsString.split(",")
  var givenAttributes = [];
  var results = [];

  for(i = 0; i < this.elements.length; i++)
  {
      var score = 0;
      givenAttributes = this.elements[i].slice(2);
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
  console.log(temp);

  for(i = 0; i < results.length; i++)
    results[i] = [results[i][0], this.elements[results[i][1]][0]]
  return results;
}

Database.prototype.get = function get(name)
{
  for(i = 0; i < this.elements.length; i++)
  {
    if(this.elements[i][0] == name)
    {
      return this.elements[i];
    }
  }
}

module.exports = Database;
