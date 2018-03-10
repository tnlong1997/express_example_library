var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var authorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author full name
authorSchema.virtual('name').get(function() {
  return this.first_name + ', ' + this.family_name;
});


// Virtual for author url
authorSchema.virtual('name').get(function() {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', authorSchema);
