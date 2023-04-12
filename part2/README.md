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