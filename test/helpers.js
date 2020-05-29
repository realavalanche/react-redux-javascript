import { expect } from 'chai';
import sinon from 'sinon';

import { mount, render, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const chai = require('chai')
const sinonChai = require('sinon-chai')

// if using native fetch API (test cases will use this instead of native fetch and make real fetch service call; no solution found to mock fetch using sinon)
require('isomorphic-fetch')


chai.should()
chai.use(sinonChai)

global.expect = expect;
global.sinon = sinon;

global.mount = mount;
global.render = render;
global.shallow = shallow;