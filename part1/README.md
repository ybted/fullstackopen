## PART1
### a. Introduction to React 

### (1)	components

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

### (2) 	JSX

`JSX ` is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. 

The Rules of `JSX`

1. Return a single root element 
2. close all the tags 
3. camelCase all most of the things 

### (3) multiple components 

`App` is at the top of the component tree of the application.

### (4) Do not render objects 

The core of the problem is *Objects are not valid as a React child*

 small additional note to the previous one. 

React also allows arrays to be rendered *if* the array contains values that are eligible for rendering (such as numbers or strings).
