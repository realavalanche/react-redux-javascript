/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchData } from './actions/actions';

import Student from './components/Student';
import WordAdder from './components/WordAdder'
import './App.css';
import Axios from 'axios';
import reducer from './reducers/reducer';

function App({ students, count, addStudent, incrementCount, decrementCount, fetch }) {
  const [name, setName] = useState('mukesh')
  const [classmates, dispatch] = useReducer(reducer, [{
    id: 1,
    name: 'dummy',
    username: 'abc',
    email: 'abc@gmail.com',
    address: '234 FoxWord Dr OH 20133'
  }])

  useEffect(() => {
    Axios.get('http://jsonplaceholder.typicode.com/users').then(({ data }) => {
      console.log(data)
      // debugger
      dispatch({
        type: 'ADD_CLASSMATE',
        classmate: {
          id: 100,
          name: 'new mate',
          username: 'mate name',
          email: 'mate@gmail.com',
          address: '534 Noida 34133'
        }
      })
    })
  }, [])

  const studentName = e => setName(e.target.value)

  // const addStudentDetails = () => addStudent({ name, age: 10 })

  const callService = () => fetch({ name, age: 20 })

  const increment = () => incrementCount()
  const decrement = () => {
    if (count > 0) {
      decrementCount()
    }
  }

  return (
    <>
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
      <br /><br />
      <WordAdder />
      <br />
      <ul>
        {classmates.map(({ id, name }) => {
          return <li key={id}>{name}</li>
        })}
      </ul>

    </>
  );
}

App.propTypes = {
  student: PropTypes.shape({})
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
    addStudent: studentDetails => dispatch({ type: 'ADD_STUDENT', studentDetails }),
    incrementCount: () => dispatch({ type: 'INCREMENT_COUNT' }),
    decrementCount: () => dispatch({ type: 'DECREMENT_COUNT' }),
    fetch: studentDetails => dispatch(fetchData(studentDetails)).then((data) => {
      console.log(data)
      // dispatch({ type: 'ADD_STUDENT', studentDetails })
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
