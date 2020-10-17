import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import LoginScreen from './LoginScreen';
import logo from "./agme.png";

configure({ adapter: new Adapter() });
//RENDER TESTS
describe('<LoginScreen/>', function() {
    it('', function() {
        const wrapper = shallow(
            <LoginScreen>
                <img src={logo} alt="AGME" id="login_image" className="border-right border-dark"/>
            </LoginScreen>
            )
        expect(wrapper.find(<img src={logo} alt="AGME" id="login_image" className="border-right border-dark"/>))

    });
});
describe('<LoginScreen/>', function() {
    it('renders username', function() {
        const wrapper = shallow(<LoginScreen/>);
        expect(wrapper.find(<input type="text" id="userName"/>));
    });
});
describe('<LoginScreen/>', function() {
    it('renders password', function() {
        const wrapper = shallow(<LoginScreen/>);
        expect(wrapper.find(<input type="text" id="password"/>));
    });
});
describe('<LoginScreen/>', function() {
    it('renders button submit', function() {
        const wrapper = shallow(
            <LoginScreen>
                <input type="submit" value="Sign in" className="btn btn-outline-dark" id="navButton"/>
            </LoginScreen>
        );
        expect(wrapper.contains(<input type="submit" value="Sign in" className="btn btn-outline-dark" id="navButton"/>)).to.equal(true);
    })});
describe('<LoginScreen/>', function() {
    it('renders button register', function() {
        const wrapper = shallow(<LoginScreen/>);
        expect(wrapper.find(<a href="/register" className="btn btn-outline-dark" id="navButton"/>));
    });
});