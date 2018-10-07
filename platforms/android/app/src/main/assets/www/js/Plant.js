
function Plant(tags) {
  this.tags = tags.split(",");
}

Plant.prototype.tags = function tags() {
  console.log(this.tags);
}

module.exports = Plant;
