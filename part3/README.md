## part3

用express和nodejs实现后端，连接mongodb数据库，然后将部署应用。

### a. Node.js and express

1.`ES6 modules`在浏览器上使用，使用`export`和`import`输入输出模组

`CommonJS modules`在`Node.js`也就是服务器端使用，使用`require`

2.`JSON`和`javascript object`的区别

`JSON`是一个字符串，而`javascript object`是一个值

```js
console.log(JSON.stringify({ x: 5, y: 6 }));
// Expected output: "{"x":5,"y":6}"
```

3.`res.send()`

可以直接响应一个文本，文件头被设置为`text/html`,状态码默认为`200`。

4.`res.json()`

可以直接传递一个`javascipt object`，会被自动转换为`JSON`格式，文件头被设置为`application/json`，状态码为`200`.

5.REST

REST is an architectural style meant for building scalable web applications。

6.访问单个资源

`:id`可以是任何东西，只是用来提取`request.params.id`

```js
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  response.json(note)
})
```

这里的`request.params.id`是字符串，需要用`Number()`转换成数字。

7.返回错误码

```js
response.status(404).end()
```

8.`app.use(express.json())`

用了这个方法后，`request`可以被自动转化为`javascipt object`值，就可以使用`request.body`的值。

9.找出一个数组的最大值

```js
Math.max(...notes.map(n => n.id))
```

10.结尾加上

```js
const PORT = 3001
app.listen(PORT)
```

让服务器持续运行

11.删除资源

```js
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})
```

12.添加资源

```js
app.post('/api/notes', (request, response) => {
  const note = request.body
  console.log(note)
  response.json(note)
})
```

13.条件返回

```js
app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.number) {
        return res.status(404).json({
            error: "number missing"
        }) 
    } else if(!body.name) {
        return res.status(404).json({
            error: "name missing"
        })
    }  else if (persons.find(person => person.name === body.name) !== undefined) {
        return res.status(404).json({
            error: "name must be unique"
        })
}   
    const newPerson = {
        ...body,
        id: generateId()
    }
    persons = persons.concat(newPerson)
    res.send(persons)

})
```

注意返回错误码需要一句内实现

`res.status(404).json({})`

14.`idempotent`幂等

指如果HTTP请求有副作用，那么每次一样的请求的返回值应该一样。

15.`middleware`

中间件会按照`use`的先后顺序执行



### b. Deploying app to internet 

1.CORS

2.npm run

npm在windows下运行脚本时，默认环境是使用cmd.exe

需要设置为bash

```shell
npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"
```



### c. Saving data to `MongoDB`

1.连接数据库

![1681438777722](./../../../%E6%96%87%E6%A1%A3/WeChat%20Files/WeChat%20Files/wxid_erk7dgv493wp12/FileStorage/Temp/1681438777722.png)

记下url，替换密码，使用`mongoose`连接。

```js
const url = `mongodb+srv://ybluckyted:${password}@cluster0.veyiruy.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)
```

2.schema

定义数据库的`schema`:

```js
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
```

3.创建和存储对象

```js
const note = new Note({
  content: 'HTML is Easy',
  important: false,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
```

4.查找对象

```js
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
```

`find`函数接收的参数是查找数据的条件，`{}`代表空，也就是没有条件。

可以设置为：

```js
Note.find({ important: true }).then(result => {
  // ...
})
```

5.`Schema的set`

Schemas通过`set`方法有一些配置选项可以传递给`constructor`。

```js
new Schema({ /* ... */ }, options);

// or

const schema = new Schema({ /* ... */ });
schema.set(option, value);
```

其中的`[options.transform=null]`，如果设置了，就会在返回值时调用这个函数来转换返回的对象。

例子：
```js
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
```

以上代码把`noteSchema`的`toJSON`属性设置为 `{transform: //...}`，所以后面再调用`toJSON`方法时就会调用transform函数来处理返回值。

当运行

```js
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})
```

`response.json(notes)`会自动调用`notes.toJSON()`方法，这是因为`toJSON`会在一个js object 被转化为字符串的任何时候被调用。

6.使用`dotenv`

在根目录下创建`.env`文件，里面存放环境变量。

在`index.js`文件顶端加入

`require('dotenv').config()`



7.将数据库的模板单独分出去，形成一个`modules`文件夹

`note.js`:

```js
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})


noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
```



8.其他路由处理也使用数据库

`app.post`:

```js
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})
```

`app.get`:

```js
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})
```



9.error handler 

错误处理器以中间件的形式出现，并放在文件最后

```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)
```



10.删除数据

```js
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
```

