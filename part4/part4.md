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

