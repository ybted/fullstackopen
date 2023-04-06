## PART1
### a. Introduction to React 

#### (1)	components

the first letter of the function name  should be uppercase. 

```react
const App = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}

export default App
```

#### (2) 	JSX

`JSX ` is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. 

The Rules of `JSX`

1. Return a single root element 
2. close all the tags 
3. camelCase all most of the things 

#### (3) multiple components 

`App` is at the top of the component tree of the application.

#### (4) Do not render objects 

The core of the problem is *Objects are not valid as a React child*

 small additional note to the previous one. 

React also allows arrays to be rendered *if* the array contains values that are eligible for rendering (such as numbers or strings).

### b.JavaScript

`JS` now uses to `Babel` to compile itself.

### c. Component state, event handlers

(1) component helper functions

 In` JavaScript`,  defining functions within functions is a commonly-used technique.

(2) 	destruting

```react
const Hello = (props) => {
  const { name, age } = props
# or  
const Hello = ({ name, age }) => {
```

(3)	stateful component

In `App.js` :

```js
import { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>{counter}</div>
  )
}

export default App
```

When the state modifying function `setCounter` is called, *React re-renders the component* which means that the function body of the component function gets re-executed.



### d.A more complex state, debugging React apps 

(1) complex state

`object spread`:

```js 
function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers));
// Expected output: 6

console.log(sum.apply(null, numbers));
// Expected output: 6

```

don't change state directly:

1.When you scale, you'll be writing unmanageable code.

2.You'll lose control of `state` across components.

3.Instead of using React, you'll be writing custom codes over React.

(2) 	update of the state is asynchronous

a state update in React happens asynchronously, i.e. not immediately but "at some point" before the component is rendered again.

(3) 	rules of hook 

The *useState* function (as well as the *useEffect* function introduced later on in the course) *must not be called* from inside of a loop, a conditional expression, or any place that is not a function defining a component. 

```react
const App = () => {
  // these are ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // this does not work!
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // also this is not good
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // and this is also illegal
    const [x, setX] = useState(-1000)
  }

  return (
    //...
  )
}
```

