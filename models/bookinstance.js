var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var bookinstanceSchema = new Schema(
  {
    book: { type: Schema.ObjectId, ref: 'Book', required: true }, //reference to the associated book
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
  }
);

// Virtual for bookinstance's URL
bookinstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/bookinstance/' + this._id;
});

// Virtual for formatted bookinstance's due_back
bookinstanceSchema
.virtual('due_back_formatted')
.get(function () {
  return moment(this.due_date).format('MMMM Do, YYYY');
});

//Export model
module.exports = mongoose.model('BookInstance', bookinstanceSchema);
