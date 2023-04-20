## part6

这章的主题是状态管理`Redux`

### a.Flux-architecture and Redux

1.`Redux`库的三个部分

`createStore`:

```js
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}
```

`store`:

```js
const store = createStore(counterReducer)
```

和`store.subscribe(renderApp):`

```js
const renderApp = () => {
  root.render(<App />)
}
renderApp()
store.subscribe(renderApp)
```

2.`Provider`组件

该组件使得组件内的组件可以使用`store`里的变量。

3.`useDispatch`和`useSelector`

`useDispatch`：该函数让所有的React组件有访问`Redux store`的dispatch函数。

`useSelector`: 该函数可以有选择的获得状态变量。

```js
const dispatch = useDispatch()
const notes = useSelector(state => state)
```

4.现在状态变量被分到一个单独的空间中，以至于所有组件都可以获取需要的状态变量。

