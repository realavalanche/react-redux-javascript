
const initialState = {
    students: [
        { name: 'sid', age: 34 },
        { name: 'shubham', age: 32 },
        { name: 'hevendra', age: 30 },
    ],
    count: 0
}

//reducer
const reducer = (state = initialState, action) => {
    const {
        type,
        studentDetails,
        classmate
    } = action

    switch (type) {
        case 'ADD_STUDENT':
            return {
                ...state,
                students: [
                    ...state.students,
                    studentDetails
                ]
            }

        case 'INCREMENT_COUNT':
            return {
                ...state,
                count: state.count + 1
            }

        case 'DECREMENT_COUNT':
            return {
                ...state,
                count: state.count - 1
            }

        case 'ADD_CLASSMATE':
            return [...state, classmate]

        default:
            return state
    }
}


// Selectors - give selector as suffix or select as prefix
export function selectStudents(state) {
    return state.students.filter(student => student.age > 30)
}

export default reducer