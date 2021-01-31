// CRUD: create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

// const {MongoClient, ObjectID} = require('mongodb')
// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())
// console.log(id.id)

const connectionURL = 'mongodb+srv://denpro87:cHJJuKEexnZH26dL@cluster0.ax5xo.mongodb.net/task-manager?retryWrites=true&w=majority'

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) =>{
    if(error){
        return console.log('Unable to connect to database!', error)
    } 

    const db = client.db('task-manager')
    
    // db.collection('users').updateOne({
    //     _id: new ObjectID("6010174bd74d35061095d53b")
    //     }, {
    //         $inc: {
    //             age: -30
    //         }
    //     }).then((res)=> {
    //         console.log(res)
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // db.collection('tasks').updateMany({
    //        completed: true
    //     }, {
    //        $set: {
    //            completed: false
    //         }
    //     }).then((res)=> {
    //        console.log(res.modifiedCount)
    //     }).catch((err)=>{
    //        console.log(err)
    //     })  
    // db.collection('users').deleteMany({
    //        age: 34
    //     }).then((res) => {
    //         console.log(res)
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    db.collection('tasks').deleteOne({
        task: "clean the toilet"
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })

    // db.collection('users').findOne({_id: new ObjectID("6010174bd74d35061095d53b")}, (err, res) =>{
    //     if(err) {
    //         return console.log("Unable to fetch")
    //     }
    //     if(res === null) {
    //         return console.log("No match")
    //     }
    //     console.log(res)
    // })
    // db.collection('users').find({age: {$gte:35}}).toArray((err, res) => {
    //     console.log(res)
    // })
    // db.collection('users').find({ age: 34}).count((err, res) => {
    //     console.log(res)
    // })

    // db.collection('users').insertOne({
    //     name: "Denis",
    //     age: 33
    // }, (err, res)=> {
    //     if(err){
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(res.ops)
    // })
    // db.collection('users').insertMany([
    //     {
    //         name: "Dina",
    //         age:34
    //     },
    //     {
    //         Name:"Luba",
    //         age: 62
    //     }
    // ], (err, res) => {
    //     if(err){
    //         return console.log('Unable to insert documents')
    //     }
    //     console.log(res.ops)
    // })
    // db.collection('tasks').insertMany([
    //     {
    //         task: "clean the toilet",
    //         completed: false
    //     },{
    //         task: "fetch something to eat",
    //         completed: true
    //     },{
    //         task: "brew some tea",
    //         completed: true
    //     }
    // ], (err, res) => {
    //     if(err){
    //         return console.log("Unable to to insert documents")
    //     }
    //     console.log(res.ops)
    // })
})