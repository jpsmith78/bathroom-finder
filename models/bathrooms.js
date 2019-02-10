const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bathroomSchema = Schema({
  name: String,
  location: String,
  haveToPurchase: Boolean,
  isAwkward: Boolean,
  isClean: Boolean
})

const Bathroom = mongoose.model('Bathroom',bathroomSchema);


module.exports = Bathroom;
