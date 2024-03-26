const model = require('../models/model.js');

//get categories
// post: http://localhost:8080/api/categories
async function create_Categories(req,res){
    const Create = new model.Categories({
        type: "Investment",
        color:'#FCBE44'             //'#C43095'  //'#1F3B5C'dark color
    })

    try {
        await Create.save();
        return res.json(Create);
    } catch (err) {
        console.log(err);
        return res.status(400).json({message: `Error while creating categories: ${err}`});
    }
    

    /*await Create.save(function(err){
        if(!err) return res.json(Create);
        console.log(err); //added on co's suggestion
        return res.status(400).json({message: `Error while creating categories: ${err}`});
    });*/
}

// get: http://localhost:8080/api/categories
async function get_Categories(req,res){
    let data = await model.Categories.find({});

    let filter = await data.map(v => Object.assign({},{type:v.type, color:v.color}));
    return res.json(filter);
}

// post: http://localhost:8080/api/transaction
async function create_Transaction(req,res){
    if(!req.body) return res.status(400).json({message: "Post HTTP Data not provided"});
    let {name, type, amount} = req.body;

    const create = await new model.Transaction(
        {
            name,
            type,
            amount,
            date: new Date()
        }
    );


    try {
        await create.save();
        return res.json(create);
    } catch (err) {
        console.log(err);
        return res.status(400).json({message: `Error while creating transaction: ${err}`});
    }

    /*create.save(function(err){
        if(!err) return res.json(create);
        return res.status(400).json({message: `Error while creating transaction: ${err}`});
    });*/

}

// get: http://localhost:8080/api/transaction

async function get_Transaction(req,res){
    let data = await model.Transaction.find({});
    return res.json(data);
}

// delete: http://localhost:8080/api/transaction

async function delete_Transaction(req,res){
    if (!req.body) return res.status(400).json({message: "Request body not found"});
    try {
        await model.Transaction.deleteOne(req.body);
        return res.json({message: "Transaction deleted successfully"});
    } catch (err) {
        console.log(err);
        return res.status(400).json({message: `Error while deleting transaction: ${err}`});
    }
}

// get: http://localhost:8080/api/transaction - using Mongoose Aggregate function below
async function get_Labels(req,res){
    model.Transaction.aggregate([
        {
            $lookup : {
                from: "categories",
                localField: "type",
                foreignField: "type",
                as: "categories_info"
            }
        },
        {
            $unwind: "$categories_info"
        }

    ]).then(result => {
        let data = result.map(v => Object.assign({}, {_id: v._id, name:v.name, type:v.type, amount:v.amount, color:v.categories_info['color']})); //we dont say v.color because color is in categories_info
        res.json(data);
    
    }).catch(error => {
        res.status(400).json("Lookup Collection Error");
    })
}

/*async function delete_Transaction(req,res){
    if (!req.body) return res.status(400).json({message: "Request body not found"});
    await model.Transaction.deleteOne(req.body, function(err){
        if (!err) return res.json({message: "Transaction deleted successfully"});
    }).clone().catch(function(err){res.json("Error while deleting Transaction Record")})
}*/


module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels
}