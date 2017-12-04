const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) return console.log('Unable to connected to mongodb server');

    console.log('Connected to MongoDB server');

    // .findOneAndUpdate要求四個參數
    // filter, update, options, callback並且會返回一個promise
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a24df7e9d27581aecbddebe')
    // }, {
    //     // 這是mongodb的update operator內的method
    //     // 可看api
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     // 不印原本的，看api
    //     returnOriginal: false
    // }).then(res => console.log(res));    

    db.collection('User').findOneAndUpdate({
        _id: new ObjectID('5a24df1400288d061cb52536')
    }, { $set: { name: 'Andrew' }, $inc: { age: 1 } },
    { returnOriginal: false }).then(res => console.log(res));

    // db.close();
});