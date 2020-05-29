import React from 'react';
// import { expect } from 'chai'
import sinon from 'sinon'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import App, { __RewireAPI__ as RewireAPI, fetchUsers } from './App';
import { shallow, mount } from 'enzyme'
import moxios from 'moxios'

const configure = state => {
  const mockStore = configureStore([thunk])(state)
  return mockStore
}

const initialState = {
  students: [
    { name: 'sid', age: 34 },
    { name: 'frank', age: 39 }
  ],
  count: 3
}

const setup = props => {
  const store = configure(initialState)

  const wrapper = shallow(<App store={store} {...props} />).dive().dive()

  return {
    wrapper,
    actions: store.getActions(),
    store
  }
}

const fetchUsersStub = sinon.stub()
const fetchDataStub = sinon.stub().returns(() => Promise.resolve([])) // returns thunk function which inturn returns promise

describe('App', () => {
  const { wrapper } = setup()
  beforeEach(() => {
    RewireAPI.__Rewire__('fetchUsers', fetchUsersStub)
    RewireAPI.__Rewire__('fetchData', fetchDataStub)
  })

  afterEach(() => {
    fetchUsersStub.resetHistory()
    fetchDataStub.resetHistory()
    RewireAPI.__ResetDependency__('fetchUsers')
    RewireAPI.__ResetDependency__('fetchData')

  })

  it('should render container', () => {
    expect(wrapper.exists()).to.equal(true)
    expect(wrapper.find('#container').exists()).to.equal(true)
  })

  it('should render Student Component <student> times', () => {
    expect(wrapper.find('[data-test="student"]').length).to.equal(2)
  })

  it('should render classmates equal to default times', () => {
    expect(wrapper.find('[data-test="classmate"]').length).to.equal(1)
  })

  it('should render an add btn to add students', () => {
    expect(wrapper.find('a').first().text()).to.equal('Add Student')
  })

  it('should render WordAdder component', () => {
    expect(wrapper.find('[data-test="adder"]').exists()).to.equal(true)
  })

  it('should send an array in props to WordAdder', () => {
    expect(wrapper.find('[data-test="adder"]').props().propsForTestCase).to.eql([1, 2])
  })

  // Events - test 3 things
  /*
    1. stub call (if passed from parent to child as props, pass stub in setup)
    2. match dispatched actions (if redux dispatch)
    3. match final value
  */

  // event with no props value (hook setState being used)
  it('should update student name on simulate div on entering name in input textbox', () => {
    // wrapper.find('input').simulate('change', { target: { value: '44' } }) // Type 1 - use simulate
    wrapper.find('input').props().onChange({ target: { value: '44' } }) // Type 2 - can also call props directly
    // expect(setNameStub).to.be.calledOnce // won't work because setName is not and external function
    expect(wrapper.find('#simulate').text()).to.equal('44');
  })

  // Handler - test 2 things
  /*
    1. stub calls (for actions dispatched)
    2. match dispatched actions (if redux dispatch)
  */

  // handler function - no need in functional comp as instance is null (this is repeat of simulate)
  it('should update student name when handler setName is executed', () => {
    // console.log(wrapper.instance()) // null for func component so test case covered by calling direct onChange call which would call handler
    wrapper.find('input').props().onChange({ target: { value: '44' } })
    expect(wrapper.find('#simulate').text()).to.equal('44');
  })

  // event with redux dispatch
  it('should dispatch incrementCount action on increment btn click', () => {
    const { wrapper, actions } = setup()
    wrapper.find('a').at(1).props().onClick()
    expect(actions).to.eql([{ type: 'INCREMENT_COUNT' }])
  })
  // event with redux dispatch
  it('should dispatch decrementCount action on decrement btn click', () => {
    const { wrapper, actions } = setup()
    wrapper.find('a').at(2).props().onClick()
    expect(actions).to.eql([{ type: 'DECREMENT_COUNT' }])
  })
  // event with redux dispatch
  it('should not dispatch decrementCount action on decrement btn click if count already zero', () => {
    const { wrapper, actions } = setup()
    wrapper.setProps({ count: 0 })
    wrapper.find('a').at(2).props().onClick()
    expect(actions).to.eql([])
  })

  // useEffect handler - this is not redux dispatch so just test if stub is called and final state is updated
  it('useEffect LC handler', () => {
    const wrapper = mount(<App store={configure(initialState)} />)
    // const useEffectSpy = sinon.spy(App.prototype, 'useEffect') // could do this if class component
    // expect(useEffectSpy.calledOnce).to.equal(true)  // could do this if class component
    expect(fetchUsersStub.calledOnce).to.equal(true) // check stub call
    // expect(fetchUsersStub).to.have.been.calledOnce // throws lint error
    expect(wrapper.find('[data-test="classmate"]').at(1).text()).to.equal('new mate') // final result
    expect(wrapper.find('[data-test="classmate"]').length).to.equal(2) // final result
  })

  it('mock fetchUsers axios call', async () => {
    // const sandbox = sinon.createSandbox()
    // sandbox.restore()
    // sinon.stub(Axios, 'get');
    // const resolved = new Promise((r) => r({ data: [] }));
    // sandbox.stub(Axios, 'get').returns(resolved);
    // console.log(response)
    // expect(response.data[0].id).to.equal(1)

    // Match against an exact URL value or partial value
    moxios.install() // moxios.uninstall in afterEach
    moxios.stubRequest(/users.*/, { // can use full url as well
      status: 200,
      responseText: 'hello'
    })

    let onFulfilled = sinon.spy()
    fetchUsers().then(onFulfilled)

    moxios.wait(function () {
      expect(onFulfilled.getCall(0).args[0].data).to.equal('hello')
    })
  })

  it('should call service fetchData on btn click', async () => {
    const { wrapper, store } = setup()
    store.clearActions()
    const promise = wrapper.find('a').first().props().onClick()
    await promise
    expect(store.getActions()).to.eql([{ type: 'ADD_STUDENT', studentDetails: { name: 'mukesh', age: 20 } }])
  })
});
