
function Database()
{
  var temp;
  $.ajaxSetup({
      async: false
  });

  $.getJSON("www/index_files/plants.json", function(data){
    temp = data;
  });

  $.ajaxSetup({
      async: true
  });

  var temp;
  this.elements = temp;
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
