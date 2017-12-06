const express = require('express');
// bodyParser可把json轉為js object
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
// 如果node process中的env是存在的那就用
const port = process.env.Port || 3000;

// tell express how to use middleware
// 在此是將json轉為js object
app.use(bodyParser.json());

// create endpoint 用post，要求兩參數
// 第一個為url也就是route，第二個為callback function
// 一樣要求兩參數req為儲存header、body、status...的參數
// res則是有我們所需要的method
app.post('/todos', (req, res) => {
    // 繼承todo的類
    // 因為是post的關係所以我們可以輸入參數
    // 例如在postman輸入之類的
    const todo = new Todo({ text: req.body.text });
    // 儲存這邊的變數todo
    todo.save().then(
        // 儲存成功就send我們所輸入的text回來
        doc => res.status(200).send(doc), 
        e => res.status(400).send(e)
    );
});

// GET 查詢route
app.get('/todos', (req, res) => {
    Todo.find().then(todos => {
        // 這邊使用send method回傳從DB找來的Todo資料
        // 之所以要用object是因為之後如果我們要定義像是status之類的
        // 比較方便
        res.send({ todos });
    }, e => res.status(400).send(e));
});

// GET /todos/123456
// 在path上後面用/:id會創建一個id 變數並儲存在request object
// 且我們可以直接訪往那個id 變數
app.get('/todos/:id', (req, res) => {
    // req.params中儲存了一些key parameter像是id 變數
    // 其值為我們真實輸入網址的id
    // 如果我們輸入的網址為 localhost:3000/todos/123
    // 那req.parms就會為 { "id": "123" }
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        // 若id不valid返回404錯誤
        return res.status(404).send(`${id} is not valid`);
    }
    Todo.findById(id).then(todo => {
        // 沒有這個id的todo
        if(!todo) return res.status(404).send('No this Todo');
        // 成功找到todo
        res.status(200).send(todo);
    }, e => res.status(400).send('Some error'));
});

app.listen(prot, () => console.log(`Started on port ${port}`) );

module.exports = { app };