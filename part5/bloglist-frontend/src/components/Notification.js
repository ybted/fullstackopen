const Notification = ( {message} ) => {
  if (message === null)
    return null
  if (message.indexOf('Cannot') !== -1)
    return (
      <div className='error'>
        {message}
      </div>
    )
  else 
      return (
        <div className='success'>
          {message}
        </div>
      )
}
export default Notification