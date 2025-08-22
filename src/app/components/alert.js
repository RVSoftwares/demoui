import React from 'react'

const alert = ({ props }) => {
    return (
        <div className='container'>
            <p className='message'>{`${props.message}`}</p>
        </div>
    )
}

export default alert
