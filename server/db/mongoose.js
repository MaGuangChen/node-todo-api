const mongoose = require('mongoose');

// 告訴mongoose他的promise為什麼樣的promise
mongoose.Promise = global.Promise;
// 連接到要連的DB
mongoose.connect('mongodb://localhost:27017/TodoApp');

// 直接匯出mongoose因為object是by reference
module.exports = { mongoose };