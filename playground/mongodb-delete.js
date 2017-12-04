const {  MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) { console.log('Unable to connect to mongoDB server') };
    console.log('Connect to MongoDB server');
    
    // deleteMany只要求一個參數為object
    // 符合參數object的property的data將被刪除
    // db.collection('Todos').deleteMany({ text: 'Eat launch' })
    // .then(res => console.log(res));
    
    // deletOne 只會刪除一個(first one)
    // db.collection('Todos').deleteOne({ text: 'Eat launch' })
    // .then(res => console.log(res));

    // findOneAndDelete 可delete並返回被delete的object
    // db.collection('Todos').findOneAndDelete({ completed: false })
    // .then(res => console.log(res));
    
    // test area
    // db.collection('User').deleteMany({ name: 'Paul Ma' })

    // db.collection('User').findOneAndDelete({
    //     _id: new ObjectID("5a24495c94979323a8af7ca6")
    // })
    // .then(res => console.log(JSON.stringify(res, undefined, 2));
    // db.close();
})