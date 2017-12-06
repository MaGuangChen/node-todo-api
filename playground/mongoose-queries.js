const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');
const id = '5a27c5f2cecd2210055e5a3b';

ObjectID.isValid(id) // 可幫忙驗證這個id是否有效
if(!ObjectID.isValid(id)) {
    console.log('ID not valid')
}

// 雖說mongo裡面的_id屬性值的資料型別為object ID
// 但我們傳字串進去mongo也會幫我們轉為object ID
Todo.find({ _id: id }).then((todos) => {
    console.log('Todos', todos);
});

// 只回找符合輸入參數的一個，也就是第一個府和的
Todo.findOne({ _id: id }).then(todo => console.log('Todo', todo));

// 利用id找todo
Todo.findById(id).then(todo => {
    if(!todo) return console.log('Id not found');
    console.log('find todo by id', todo)
}).catch(e => console.log(e));

// find user by id 挑戰
const userId = "5a264d9309950388134be482";
const idValid = ObjectID.isValid(userId);
if(!idValid) console.log('User ID not valid');

User.findById(userId)
.then(
    user => {
        if(!user) return console.log('User not found');
        console.log(`Find User by ID ${JSON.stringify(user, undefined, 2)}`)
    },(err) => console.log(err)
);
