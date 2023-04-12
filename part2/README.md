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

