## part4

先探讨一下后端的单元测试和整体测试，然后再关注用户验证系统。

### a.Struture of backend application, introduction to testing 

1.重新架构了项目的结构

![1681529254620](./../../../%E6%96%87%E6%A1%A3/WeChat%20Files/WeChat%20Files/wxid_erk7dgv493wp12/FileStorage/Temp/1681529254620.png)

2.`express.Router()`

首先再`controllers`目录下定义了路由访问的方法

```js
const notesRouter = require('express').Router()
const Note = require('../modules/note')
//...
module.exports = notesRouter
```

然后在`app.js`钟定义了相对路由

```js
const notesRouter = require('./controllers/notes')
app.use('/api/notes', notesRouter)
```

3.Array.reduce(function, initialvalue)

例子：

```js
const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.reduce(reducer, 0) / array.length
}
```



4.单元测试

创建了一个新的`test`文件夹，并且下载了`jest`工具

```js
npm install --save-dev jest
```



### b.testing the backend 

1. 写单元测试

```js
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async() => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two notes', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(7)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  expect(response.body[0].content).toBe('CSS is hard')
})

afterAll(async() => [
  await mongoose.connection.close()
])
```

`supertest`部件可以创建一个app，它可以调用`get`等接口，就不用`index.js`的listen方法。

2.`await` and `async`

是另一种用来实现程序并行化的方式，任意使用await的地方必须有async在函数的第一行。

```js
const main = async () => {
  const notes = await Note.find({})
  console.log('operation returned the following notes', notes)

  const response = await notes[0].deleteOne()
  console.log('the first note is removed')
}

main()
```

使用`await`和`async`来实现后端功能：

```js
notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  const savedNote = await note.save()
  response.status(201).json(savedNote)
})
```

用`try`和`catch`来实现错误处理。

```js
notesRouter.post('/', async (req, res, next) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  try {
    const savedNote = await note.save()
    res.status(201).json(savedNote)
  } catch(exception) {
    next(exception)
  }
})
```

先通过测试然后再修改代码。

3.用`express-async-errors`组件来简化`try catch`代码

```shell
npm install express-async-errors
```



4.beforeEach函数

该函数用来初始化测试的数据库。

```js
beforeEach(async () => {
  await Note.deleteMany({})
  console.log('cleared')

  helper.initialNotes.forEach(async (note) => {
    let noteObject = new Note(note)
    await noteObject.save()
    console.log('saved')
  })
  console.log('done')
}, 100000)
```

但是这样不能保证beforeEach()运行完了之后再运行测试。



5.只测试单个test

```shell
npm test -- tests/node_api.test.js
npm test -- -t 'notes'
npm test -- -t "a specific note is within the returned notes"
```



6.toEqual

 the material uses the [toContain](https://jestjs.io/docs/expect#tocontainitem) matcher in several places to verify that an array contains a specific element. It's worth noting that the method uses the === operator for comparing and matching elements, which means that it is often not well-suited for matching objects. In most cases, the appropriate method for verifying objects in arrays is the [toContainEqual](https://jestjs.io/docs/expect#tocontainequalitem) matcher. However, the model solutions don't check for objects in arrays with matchers, so using the method is not required for solving the exercises.

7.toBeDefined属性

确保一个对象的一个属性被定义了

8.mongoose模板设置默认值

```js
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
})
```

