/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useReducer } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { fetchData } from './actions/actions';

import Student from './components/Student';
// import WordAdder from './components/WordAdder'
import styles from './App.module.css';
import Axios from 'axios';
import reducer, { selectStudents } from './reducers/reducer';

const WordAdder = React.lazy(() => import('./components/WordAdder'))

function App({ students, count, addStudent, incrementCount, decrementCount, fetch }) {
  const [name, setName] = useState('mukesh')
  const [classmates, dispatch] = useReducer(reducer, [{
    id: 1,
    name: 'dummy',
    username: 'abc',
    email: 'abc@gmail.com',
    address: '234 FoxWord Dr OH 20133'
  }])
  // useReducer used mostly when you need to add data to array e.g. students. Initial state will also be array because it just one field of store

  // const fetchUsers = async () => {
  //   console.log('check u')
  //   await Axios.get('http://jsonplaceholder.typicode.com/users')
  // }

  useEffect(() => {
    // Axios.get('http://jsonplaceholder.typicode.com/users').then(({ data }) => {
    //   // console.log('LC', data)
    //   // debugger
    //   dispatch({
    //     type: 'ADD_CLASSMATE',
    //     classmate: {
    //       id: 100,
    //       name: 'new mate',
    //       username: 'mate name',
    //       email: 'mate@gmail.com',
    //       address: '534 Noida 34133'
    //     }
    //   })
    // })
    fetchUsers()
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
    <div id="container" className={styles.container}>
      <div className={styles["student-container"]}>
        <div className={styles.name}>
          <span>{`Student Name`}</span>
        </div>
        <div className={styles.age}>
          <span>{`Student Age`}</span>
        </div>
        {
          students.map(student => {
            return <Student data-test="student" key={student.name} student={student} />
          })
        }
      </div>
      <div id="simulate">{name}</div>
      <div style={{ margin: "20px 0" }}>
        <input style={{ marginRight: "20px" }} type="text" onChange={studentName} />
        <a className={styles.btn} onClick={callService}>Add Student</a>
      </div>
      <div style={{ margin: "20px 0" }}>
        <span>useReducer Implementation</span>
        {classmates.map(({ id, name }) => {
          return <div data-test="classmate" key={id}>{name}</div>
        })}
      </div>
      <div style={{ margin: "15px 0" }}>
        <span id="count" style={{ margin: "10px 0" }}>
          {count}
        </span>
        <span style={{ margin: "0 10px" }}>
          <a style={{ background: "linear-gradient(45deg, transparent, grey)", cursor: 'pointer', border: '#282c34 solid 1px' }} onClick={increment}>Increment</a>
        </span>
        <span style={{ margin: "0 10px" }}>
          <a style={{ boxShadow: '1px 1px 5px blue' }} className={styles.btn} onClick={decrement}>Decrement</a>
        </span>
      </div>
      <React.Suspense fallback={<div>loading......</div>}>
        <WordAdder data-test="adder" propsForTestCase={[1, 2]} />
      </React.Suspense>
      {/* <BrowserRouter>
        <Link to="/test">Test Page</Link>
        <Link to="/add">Adder Page</Link>
        <Switch>
          <Route path="/test" render={() => <div>Test Page</div>} />
          <Route path="/add" render={() => (
            <React.Suspense fallback={<div>loading......</div>}>
              <WordAdder data-test="adder" propsForTestCase={[1, 2]} />
            </React.Suspense>
          )} />
        </Switch>
      </BrowserRouter> */}
    </div>
  );
}

// App.propTypes = {
//   student: PropTypes.shape({})
// }

const mapStateToProps = (state) => {
  return {
    students: selectStudents(state),
    name: state.name,
    count: state.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // addStudent: studentDetails => dispatch({ type: 'ADD_STUDENT', studentDetails }),
    incrementCount: () => dispatch({ type: 'INCREMENT_COUNT' }),
    decrementCount: () => dispatch({ type: 'DECREMENT_COUNT' }),
    fetch: studentDetails => dispatch(fetchData(studentDetails))
      .then((data) => {
        // console.log(studentDetails)
        dispatch({ type: 'ADD_STUDENT', studentDetails })
      })
  }
}

export const fetchUsers = async () => {
  // console.log('original method')
  return Axios.get('http://jsonplaceholder.typicode.com/users')
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
