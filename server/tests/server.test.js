const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/todo');

const todos = [
    { 
        _id: new ObjectID(),
        text: 'First test todo' 
    },
    { 
        _id: new ObjectID(),
        text: 'Second test todo' 
    }
];

// testing lifecycle method
// beforeEach可以在我們跑每個test case前先跑一段code
// 我們這邊要使用是因為在我們的database表單內已經有一些資料了
// 可是我們要測試，並不想把事情搞複雜因此就先假設database的collections
// 是空的
beforeEach((done) => {
    // .remove() method會把我們的資料庫清空
    // 要求一個參數object，也可以在object帶參數去remove符合屬性的data
    // 接著chain .then 呼叫done告訴這項async操作已經結束
    Todo.remove({})
    // .inserMany是可以插入多筆data到DB collection的方法
    .then(() => Todo.insertMany(todos))
    .then(() => done());
});

describe('Post /todos', () => {
    // async測試，因此加done argument
    it('Should create a new todo', (done) => {
        const text = 'Test todo text';
        // supertest用來做async的request測試很適合
        // .send method是帶入參數給post並傳輸
        request(app).post('/todos').send({text})
        // 這兩個expect method是指向request
        .expect(200).expect((res) => {
            // 這邊的expect 變數(也是object或類)指向global
            expect(res.body.text).toBe(text);
        })
        // 以往我們都直接在end method帶入done參數表示結束
        // 這次帶入既有的error, response兩參數來進行如果發生錯誤的handle
        .end((err, res) => {
            // 這邊用return只是為了在發生錯誤時能夠直接讓code停在這
            if(err) return done(err);

            // .find menthod可找在這張表單的所有資料
            // 在noSQL是找這collection的所有資料
            // todos是.find後所在Todo的所有todo data
            // 也就是我們之前假設的doc data，因為在.then內第一個
            // callback func 是成功function自帶的參數為response回來的東西
            Todo.find({ text }).then((todos) => {
                // 因為在這個假測試中我們符合text的資料只有一筆
                expect(todos.length).toBe(1);
                // 期望假資料text跟回傳的資料一樣
                expect(todos[0].text).toBe(text);
                // 結束這段測試
                done();
            })
            // 因為那些測試failed的話test依然會過，算是mocha的小毛病
            // 在async的測試時一旦是async就會直接pass掉
            // 因此我們自己要加.catch() method
            .catch(e => done(e));
        });
    });
    // -- start 測試輸入invalid data要返回錯誤訊息
    // 且不能新建立todo到database
    it('Should not create todo with invalid data', (done) => {
        const text = '';
        request(app).post('/todos').send(text)
        .expect(400).end((err, res) => { 
            if(err) return done(err);
            
            Todo.find().then((resTodos) => {
                // 因為前面有插入兩筆資料所以要等於2
                expect(resTodos.length).toBe(2);
                done();
            }).catch(e => done(e));
        })
    });
});

describe('GET /todos', (done) => {
    it('Should get all todos', () => {
        request(app).get('/todos')
        .expect(200).expect(res => {
            expect(res.req.body.todos.length).toBe(2);
        }).end(done);
    });
});

describe('GET /todos/:id', () => {
    // it('Should return todo doc', (done) => {
    //     // 針對第一個todos array中的元素的id
    //     // .toHexString() method 是把ObjectID的檔案類型轉為String
    //     request(app).get(`/todos/${todos[0]._id.toHexString()}`)
    //     .expect(200).expect(res => {
    //         expect(res.body.todo.text).toBe(todos[0].text);
    //     }).end(done);
    // });
    // it('should return todo doc', (done) => {
    //     request(app)
    //       .get(`/todos/${todos[0]._id.toHexString()}`)
    //       .expect(200)
    //       .expect((res) => {
    //         expect(res.body.todo.text).toBe(todos[0].text);
    //       })
    //       .end(done);
    //   });
});


// const expect = require('expect');
// const request = require('supertest');
// const {ObjectID} = require('mongodb');

// const {app} = require('./../server');
// const {Todo} = require('./../models/todo');

// const todos = [{
//   _id: new ObjectID(),
//   text: 'First test todo'
// }, {
//   _id: new ObjectID(),
//   text: 'Second test todo'
// }];

// beforeEach((done) => {
//   Todo.remove({}).then(() => {
//     return Todo.insertMany(todos);
//   }).then(() => done());
// });

// describe('POST /todos', () => {
//   it('should create a new todo', (done) => {
//     var text = 'Test todo text';

//     request(app)
//       .post('/todos')
//       .send({text})
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.text).toBe(text);
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }

//         Todo.find({text}).then((todos) => {
//           expect(todos.length).toBe(1);
//           expect(todos[0].text).toBe(text);
//           done();
//         }).catch((e) => done(e));
//       });
//   });

//   it('should not create todo with invalid body data', (done) => {
//     request(app)
//       .post('/todos')
//       .send({})
//       .expect(400)
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }

//         Todo.find().then((todos) => {
//           expect(todos.length).toBe(2);
//           done();
//         }).catch((e) => done(e));
//       });
//   });
// });

// describe('GET /todos', () => {
//   it('should get all todos', (done) => {
//     request(app)
//       .get('/todos')
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todos.length).toBe(2);
//       })
//       .end(done);
//   });
// });

// describe('GET /todos/:id', () => {
//   it('should return todo doc', (done) => {
//     request(app)
//       .get(`/todos/${todos[0]._id.toHexString()}`)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo.text).toBe(todos[0].text);
//       })
//       .end(done);
//   });

//   it('should return 404 if todo not found', (done) => {
//     var hexId = new ObjectID().toHexString();

//     request(app)
//       .get(`/todos/${hexId}`)
//       .expect(404)
//       .end(done);
//   });

//   it('should return 404 for non-object ids', (done) => {
//     request(app)
//       .get('/todos/123abc')
//       .expect(404)
//       .end(done);
//   });
// });
