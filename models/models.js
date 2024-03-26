/*const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// categories (document 1) => field => ['type','color']
// transactions (document 2) => field => ['name', 'type', 'amount', 'date(optional)']
//using type to link both the documents


// categories (document 1) => field => ['type','color']
const categories_model = new Schema({
    type: {type: String, default: "Investment"},
    color: {type: String, default: "#FCBE44"}
})


// transactions (document 2) => field => ['name', 'type', 'amount', 'date(optional)']
const transactions_model = new Schema({
    name: {type: String, default:"Anonymous"},
    type: {type: String, default:"Investment"},
    amount: {type: Number},
    date: {type: Date, default: Date.now}
})

const Categories = mongoose.model('categories', categories_model )
const Transaction = mongoose.model('transaction', transactions_model );

exports.default = Transaction;
module.exports = {Categories, Transaction} //exporting both the models*/