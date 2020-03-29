import React from 'react'

const Student = ({ student }) => {
    return (
        <React.Fragment>
            <div>
                <span>{`Student Name: ${student.name}`}</span>
                <span>{`Student Age: ${student.age}`}</span>
            </div>
        </React.Fragment>
    )

}

export default Student