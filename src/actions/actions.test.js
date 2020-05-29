import { fetchData } from "./actions"
// import sinon from 'sinon'

// const fetchStub = sinon.stub(window, 'fetch').returns(Promise.resolve([{ id: 45 }]))

describe('actions', () => {
    it('fetchData action should return function with a promise', async () => {
        const result = fetchData()
        const data = await result()
        expect(data[0].id).to.equal(1)
    })
})