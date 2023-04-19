import React from 'react'

function Error({ message }) {
    return (
        <div className='error'>
            {!message ? "404 NOT FOUND ERROR !":message}
        </div>
    )
}

export default Error
