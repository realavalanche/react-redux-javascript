export const fetchData = (studentDetails) => { // action is returning a function (thunk) instead of a plain JS object
    return dispatch => { // thunk takes in parameters dispatch function & getState function; returns a promise
        // setTimeout(() => {
        //     dispatch({ type: 'ADD_STUDENT', studentDetails })
        // }, 3000);
        return fetch('http://jsonplaceholder.typicode.com/users').then(response => response.json()).then((data) => { //.then always returns a promise
            return data
            // dispatch({ type: 'ADD_STUDENT', studentDetails })
        })
    }
}