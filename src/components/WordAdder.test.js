import React from 'react'
import { shallow, render } from 'enzyme'
import WordAdder from './WordAdder'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


const wrapper = shallow(<WordAdder />)

// run npm run test:unit:watch
describe('WordAdder', () => {
    it('should render link with text Add Word', () => {
        expect(wrapper.find('a').text()).to.equal('Add Word')
    })
    it('should render list of words component', () => {
        expect(wrapper.find('[data-test="list-of-words"]').exists()).to.equal(true)
    })
    it('should set expected props in list of words component', () => {
        expect(wrapper.find('[data-test="list-of-words"]').props().words).to.eql(['marklar'])
    })
    it('should update the state when anchor is clicked', () => {
        wrapper.find('a').props().onClick()
        expect(wrapper.find('[data-test="list-of-words"]').props().words).to.eql(['marklar', 'markar'])
    })
})

// run npm run test
// describe('WordAdder', () => {
//     const component = render(<WordAdder />)
//     it('should match the snapshot', () => {
//         expect(component).toMatchSnapshot()
//     })
// })