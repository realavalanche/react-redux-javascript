export const fetchData = (studentDetails) => {
    return dispatch => {
        // setTimeout(() => {
        //     dispatch({ type: 'ADD_STUDENT', studentDetails })
        // }, 3000);
        return fetch('http://jsonplaceholder.typicode.com/users').then(response => response.json()).then((data) => {
            // console.log(data)
            dispatch({ type: 'ADD_STUDENT', studentDetails })
        })
    }
}