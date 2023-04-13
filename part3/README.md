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

