// Mongo package裡面的其中一個類吧
// const MongoClient = require('mongodb').MongoClient;
// import是 pull out一個object裡面的東西
// 也可以這樣用
// ObjectID可以產生獨特的id
const { MongoClient, ObjectID } = require('mongodb');

// 要求兩參數，第一個是要連入的DB Server
// 第二個是一個call back funtion
// 第一個參數是固定語法localhost:後面要接我們一開始設定的port
// 接下來雖然mongodb預設給我們test的table
// 但我們這次要用TodoApp所以我們可以直接打TodoApp
// 他會自己創建新表單
// 第二個參數call back function可以帶入兩參數
// 第一個為err，第二個為db可以操作data
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    // 加上return表示在err為true時，
    // 下面的code就不會執行了，因為已經return過
    if(err){ 
        return console.log('Unable to connect to mongoDB server');
    }
    console.log('Connected to MongoDB server');

    // 這個.collection() method可以讓我們
    // 創建或輸入data到指定的collections內
    // 要求的參數為collection名稱
    // .inserOne則是要輸入的資料
    // 要求兩參數第一個參數是輸入內容
    // 第二個為call back function
    // db.collection('Todos').insertOne({
    //     text: 'Eat launch',
    //     completed: false
    // }, (err, res) => {
    //     if(err){
    //         return console.log('Unable to insert todo!');
    //     }
    //     // .ops sttribute儲存了在.insertOne內
    //     // 的所有data(document)
    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // });

    // insert new doc into user collection(name, age, location)
    // db.collection('User').insertOne({
    //     name: 'Kobe', 
    //     age: 40, 
    //     location: 'America'
    // }, (err, res) => {
    //     if(err) return console.log('Unable to create user!');
    //     // 因為mongodb的_id attribute有包含timestamp
    //     // 因此我們可以拉出來的利用res.ops[0]._id.getTimestamp
    //     else console.log(res.ops[0]._id.getTimestamp());
    // });

    db.close();
});