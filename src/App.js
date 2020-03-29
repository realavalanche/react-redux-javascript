/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { fetchData } from './actions/actions';

import Student from './components/Student';
import './App.css';

function App({ students, count, addStudent, incrementCount, decrementCount, fetch }) {
  const [name, setName] = useState('mukesh')

  const studentName = (e) => {
    setName(e.target.value)
  }

  const addStudentDetails = () => addStudent({ name, age: 10 })

  const callService = () => fetch({ name, age: 20 })

  const increment = () => incrementCount()
  const decrement = () => {
    if (count > 0) {
      decrementCount()
    }
  }

  return (
    <React.Fragment>
      <div>
        {
          students.map(student => {
            return <Student key={student.name} student={student} />
          })
        }
      </div>
      <div>
        <input type="text" onChange={studentName} />
      </div>
      <div>
        <a className='btn add-btn' onClick={callService}>Add Student</a>
      </div>
      <div>
        {count}
      </div>
      <div>
        <a className='btn' onClick={increment}>Increment</a>
      </div>
      <div>
        <a className='btn' onClick={decrement}>Decrement</a>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
    name: state.name,
    count: state.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addStudent: (studentDetails) => dispatch({ type: 'ADD_STUDENT', studentDetails }),
    incrementCount: () => dispatch({ type: 'INCREMENT_COUNT' }),
    decrementCount: () => dispatch({ type: 'DECREMENT_COUNT' }),
    fetch: studentDetails => dispatch(fetchData(studentDetails)).then((data) => {
      console.log(data)
      // dispatch({ type: 'ADD_STUDENT', studentDetails })
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
