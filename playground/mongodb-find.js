const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){ 
        return console.log('Unable to connect to mongoDB server');
    }
    console.log('Connected to MongoDB server');
    // .find只會返回MongoDB的一個cursor
    // 而不是整個資料，不然當資料量太大會造成麻煩
    // 不過這個cursor會是一個method讓我們可以取得資料
    // 因此在.find()後面可以在加入method
    // 此例中我們希望return回的資料為array
    // 並使用toArray method，.toArray會返回promise
    // 因此我們可以用.then來chain
    // .find() method在不輸入argument的情況下
    // 會返回collection中的所有資料
    // 但也可以輸入參數
    // 這邊_id之所有要使用ObjectID的類
    // 是因為在mongodb裡面_id這項屬性的類別為 object id
    // db.collection('Todos').find({ 
    //     _id: new ObjectID('5a244cf555df237c091e4a85')  
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // },(err) => {
    //     console.log('Unable to fetch todos!', err);
    // });
    
    // .count看api doc吧
    // 主要可以算出有多少個docs在指定的collections內
    // db.collection('Todos')
    // .find()
    // .count().then((count) => {
    //     console.log(`Todos count: ${count}`)
    // },(err) => console.log('Unable to fetch todos!', err));
    
    db.collection('User').find({ name: 'Paul Ma' })
    .count().then(
        count => console.log(`We have ${count} user named Paul Ma`),
        err => console.log('Unable to fetch User Paul Ma')
    )
    db.collection('User').find({ name: 'Paul Ma' })
    .toArray().then(
        docs => console.log(JSON.stringify(docs, undefined, 2)),
        err => console.log('Unable to fetch User Paul Ma')
    )
    // db.close();
});