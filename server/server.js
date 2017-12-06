const express = require('express');
// bodyParser可把json轉為js object
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

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

app.listen(3000, () => console.log('Started on port 3000') );

module.exports = { app };