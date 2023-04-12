const Header = ( {course} ) => (
    <h2> {course.name} </h2>
)

const Header2 = ( {text} ) => (
    <h1> {text} </h1>
)  

const Part = ( {part, exercises} ) => (
    <p> {part} {exercises} </p>
)

const Content = ( {parts} ) => (
    parts.map( part => <Part part={part.name} exercises={part.exercises} key={part.id} /> )
)

const Total = ( {parts} ) => {
const total = parts
    .reduce((sum, cur) => sum + cur.exercises, 0)
return (<p>
    <strong>
    Number of exercises {total}
    </strong>
</p>)
}

const Course = ( {course} ) => (
<>
    
    <Header course={course} />
    <Content  parts={course.parts} />
    <Total parts={course.parts} />
</>
)

const Courses = ( {courses} ) => (
<>
    <Header2  text="Web development curriculum"/>
    {courses.map(course => 
    <Course course={course} key={course.id} />) } 
</>
)
export default Courses