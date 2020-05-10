import reducer, { initialState } from "./reducer"

describe('reducer', () => {
    it('should increment count by one', () => {
        const result = reducer(initialState, { type: 'INCREMENT_COUNT' })
        expect(result.count).to.eql(1)
    })

    it('should decrement count by one', () => {
        const result = reducer(initialState, { type: 'DECREMENT_COUNT' })
        expect(result.count).to.eql(-1)
    })

    it('should add student to the list', () => {
        const result = reducer(initialState, { type: 'ADD_STUDENT', studentDetails: { name: 'reduce', age: 34 } })
        expect(result.students.pop()).to.eql({ name: 'reduce', age: 34 })
    })

    it('should add classmate to the list', () => {
        const result = reducer([], { type: 'ADD_CLASSMATE', classmate: { name: 'test' } })
        expect(result).to.eql([{ name: 'test' }])
    })

    it('should return state as is if no match', () => {
        const result = reducer([], { type: 'DEFAULT' })
        expect(result).to.eql([])
    })
})