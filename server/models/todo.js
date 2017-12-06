const mongoose = require('mongoose');

// create mongoose modal來讓mongoose知道怎麼儲存我們的data
// 等於一個類定義了Todo應該長怎樣
// 當trim為true時，多餘的空白字元將被刪除
// 例如 '   Edit text   '將變成 'Edit text'
// default為預設值
const Todo = mongoose.model('Todo', {
    text: { type: String, required: true, minlength: 1, trim: true },
    completed: { type: Boolean, default: false },
    completedAt: { type: Number, default: null }
});

// 接著直接讓新變數繼承Todo
// const newTodo = new Todo({ text: 'Cook dinner' });

// 如我們希望存進db內可這樣使用，用.save() method來使用
// save() method返回一個promise，因此我們可以chain起來
// newTodo.save().then(
//     doc => console.log('Save todo', doc), 
//     e => console.log('Unable to save todo!', e)
// );

// const eatLaunch = new Todo({
//     text: 'Eat dinner',
//     completed: false,
//     completedAt: 123
// });

// eatLaunch.save().then(
//     doc => console.log(`Save todo:`, doc),
//     err => console.log('Unable to save todo', e)
// );

module.exports = { Todo };
