const Notification = ({message}) => {
    if (message === null)
        return null 
    if (message.indexOf("Added") !== -1)
    return (
        <div className="success">
            {message}
        </div>
    )
    else 
    return (
        <div className="error">
            {message}
        </div>
    )
}

export default Notification