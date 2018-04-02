var mongoose = require('mongoose');
var moment = require('moment');

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
authorSchema.virtual('url').get(function() {
  return '/catalog/author/' + this._id;
});


// Virtual for formatted author date_of_birth
authorSchema.virtual('date_of_birth_formatted')
.get(function() {
  return moment(this.date_of_birth).format('MMMM Do, YYYY');
});


// Virtual for formatted author date_of_death
authorSchema.virtual('date_of_death_formatted')
.get(function() {
  return moment(this.date_of_death).format('MMMM Do, YYYY');
});


// Virtual for author's lifespan
authorSchema.virtual('lifespan')
.get(function() {
  var lifetime_string='';
  if (this.date_of_birth) {
      lifetime_string=moment(this.date_of_birth).format('MMMM Do, YYYY');
      }
  lifetime_string+=' - ';
  if (this.date_of_death) {
      lifetime_string+=moment(this.date_of_death).format('MMMM Do, YYYY');
      }
  return lifetime_string;
});

//Export model
module.exports = mongoose.model('Author', authorSchema);
