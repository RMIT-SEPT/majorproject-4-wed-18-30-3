import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import AdminViewUser from './AdminViewUser';
import Select from "react-select";
import Link from "react-router-dom/modules/Link";


configure({ adapter: new Adapter() });
//FUNCTIONAL TESTS
describe('<AdminViewUser/>', function() {
    it('tests if creating user has succeeded', function() {
        const wrapper = shallow(<AdminViewUser/>);
        const instance = wrapper.instance();
        instance.setState(instance.props.userType = "CUSTOMER")
        expect(instance.state.hasSuccess).to.equal(false);
    });
});

//RENDER TESTS
describe('<AdminViewUser/>', function() {
    it('renders heading text', function() {
        const wrapper = shallow(
            <AdminViewUser>
                <h2>Booking details by customer</h2>
            </AdminViewUser>
        );
        expect(wrapper.contains(<h2>Booking details by customer</h2>)).to.equal(true);
    });
});
describe('<AdminViewUser/>', function() {
    it('renders one <Select/> component', function() {
        const wrapper = shallow(<AdminViewUser/>);
        expect(wrapper.find(Select)).to.have.lengthOf(1);
    })
});
describe('<AdminViewUser/>', function() {
    it('renders button search', function() {
        const wrapper = shallow(<AdminViewUser/>);
        expect(wrapper.find(<input type="submit" className="btn btn-outline-dark" placeholder="Search" id="navButton"/>));
    });
});
describe('<AdminViewUser/>', function() {
    it('renders heading text', function () {
        const wrapper = shallow(
            <AdminViewUser>
                <p>Bookings:</p>
            </AdminViewUser>
        );
        expect(wrapper.contains(<p>Bookings:</p>)).to.equal(true);
    })
});
describe('<AdminViewUser/>', function() {
    it('renders heading text', function () {
        const wrapper = shallow(
            <AdminViewUser>
                <Link to="/dashboard">Home</Link>
            </AdminViewUser>
        );
        expect(wrapper.contains(<Link to="/dashboard">Home</Link>)).to.equal(true);
    })
});