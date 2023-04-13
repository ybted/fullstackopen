## part2

### a. rendering a collection, modules 

1.key-attribute 

数组的`map`方法，每一个必须有一个独特的键值——用一个叫做`key`的元素。

```react
const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <li key={note.id}>
            {note.content}
          </li>
        )}
      </ul>
    </div>
  )
}
```

2.components

我们可以在`src`目录下建立一个`components`目录，里面用来存放分离出去的模组。

3.`reduce `的使用

算数组的和：

```js
array.reduce((sum, cur) => sum + cur, 0)
// 整数数组
array.reduce((sum, cur) => sum + cur.value, 0)
// 对象数组
```

### b.forms

1.controlled component

用一个状态变量来控制输入框中的变量参数的变化

```js
  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 
  
  //...
   const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
   
   
   //....
   <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form> 
```

添加变量：

```js
const addNote = (event) => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
    id: notes.length + 1,
  }

  setNotes(notes.concat(noteObject))
  setNewNote('')
}
```

2.filter

```js
notes.filter(note => note.important === true)
```

3.str.indexOf()

子字符串匹配

```shell

  let personsToShow = persons
    .filter(person => person.name.toLowerCase().indexOf(newFilter) !== -1)
  console.log('persons:', personsToShow)
```

4.现在的组件写了很多状态变量的接口

```react

const Filter = ( {handleFilterChange}) => {
  return (
    <form>
        <div>
          filter shown with <input 
              onChange={handleFilterChange}
            />
        </div>
      </form>
  )
}

const PersonForm = ( {addPerson, handleNameChange, handleNumberChange} ) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input 
            onChange={handleNameChange}
            />
        </div>
        <div>
          number: <input 
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
```

### c.getting_data_from_server

1.event loop

弄清楚这几个概念：

`callstack`,`web apis`,`render queue`,`task queue`

`callstack`是执行函数的地方。

`web apis`是执行一些web 接口函数的地方，比如：`setTimeout`

`task queue`是执行好的`web apis`的函数会到这个地方排队，直到`callstack`空了进入`callstack`执行。

`render queue `在串行执行时不render，而在从`task queue`中回推完成的任务时进行人的人。

这就是一个**`event loop`**

![1681275148998](./../../../%E6%96%87%E6%A1%A3/WeChat%20Files/WeChat%20Files/wxid_erk7dgv493wp12/FileStorage/Temp/1681275148998.png)

2.axios and promises

使用`axios`库来与服务器进行连接：
```js
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App'

axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
})
```

3.useEffect

```js
useEffect(() => {
  console.log('effect')

  const eventHandler = response => {
    console.log('promise fulfilled')
    setNotes(response.data)
  }

  const promise = axios.get('http://localhost:3001/notes')
  promise.then(eventHandler)
}, [])
```

第一个参数代表运行的函数，第二个参数代表多久运行一次。如果为空则是只在第一次render后运行一次。



### d. altering data in server 

1.object spread

```js
const changedNote = { ...note, important: !note.important }
```

2.`services`组件

用来实现与服务器连接

```js
import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
            
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(res => res.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(res => res.data)
}

const noteServices = { 
    getAll: getAll, 
    create: create, 
    update: update 
  }

export default noteServices
```

`export`需要输出一个对象。

3.promise的catch方法用来处理错误

catch方法可以被用来放在`promise`链的结尾作为一个处理函数，代表着这条链上的任意一个promise出了问题都执行这个函数。



### e. adding styles to react app 

1.添加错误信息

```js
noteServices
      .update(id, changedNote)
      .then(response => {
      setNotes(notes.map(n => n.id !== id ? n : response))
    })
      .catch(error => {
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
```

`index.css`:

```css
.error {
    color: red;
    background: lightgrey;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }
```

2.couple of important remarks
