// import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import AdminViewUser from './AdminViewUser';
import Select from "react-select";
import {Link} from "react-router-dom";
import React from "react";


configure({ adapter: new Adapter() });
//RENDER TESTS
describe('<AdminViewUser/>', function() {
    it('renders not logged in', function() {
        const wrapper = shallow(
            <AdminViewUser>
                <b>Please <a href="/login">log in </a> to use the app.</b>
            </AdminViewUser>
        );
        expect(wrapper.contains(<b>Please <a href="/login">log in </a> to use the app.</b>)).to.equal(true);
    });
});
describe('<AdminViewUser/>', function() {
    it('renders one <Select/> component', function() {
        const wrapper = shallow(<AdminViewUser/>);
        wrapper.setProps({ userName: 'Admin' });
        wrapper.setProps({ userType: 'ADMIN' });
        expect(wrapper.find(Select)).to.have.lengthOf(1);
    })
});
describe('<AdminViewUser/>', function() {
    it('renders button search', function() {
        const wrapper = shallow(<AdminViewUser/>);
        wrapper.setProps({ userName: 'Admin' });
        wrapper.setProps({ userType: 'ADMIN' });
        expect(wrapper.find(<input type="submit" className="btn btn-outline-dark" placeholder="Search" id="navButton"/>));
    });
});

describe('<AdminViewUser/>', function() {
    it('renders home link', function () {
        const wrapper = shallow(<AdminViewUser/>);
        wrapper.setProps({ userName: 'Admin' });
        wrapper.setProps({ userType: 'ADMIN' });
        wrapper.setState({ viewApp: false});
        wrapper.setState({ hasSuccess: true});
        expect(wrapper.contains(<Link to="/dashboard">Home</Link>)).to.equal(true);
    });
});
describe('<AdminViewUser/>', function() {
    it('renders bookings heading', function () {
        const wrapper = shallow(<AdminViewUser/>);
        wrapper.setProps({ userName: 'Admin' });
        wrapper.setProps({ userType: 'ADMIN' });
        wrapper.setState({ viewApp: false});
        wrapper.setState({ hasSuccess: true});
        expect(wrapper.contains(<p>Bookings:</p>)).to.equal(true);
    })
});