import { expect } from 'chai';
import { mount, render, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const chai = require('chai')
const sinonChai = require('sinon-chai')

// if using native fetch API (can also use fetch-mock)
require('isomorphic-fetch')

chai.should()
chai.use(sinonChai)

global.expect = expect;

global.mount = mount;
global.render = render;
global.shallow = shallow;