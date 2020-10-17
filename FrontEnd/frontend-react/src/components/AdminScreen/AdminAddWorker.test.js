import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import AdminAddWorker from './AdminAddWorker';

configure({ adapter: new Adapter() });
describe('<AdminAddWorker/>', function() {
    it('renders heading text', function() {
        const wrapper = shallow(
            <AdminAddWorker>
                <p>Phone no. must be 10 digits and start with 0</p>
            </AdminAddWorker>
        );
        expect(wrapper.contains(<h1>Register</h1>)).to.equal(true);
    });
});
describe('<AdminAddWorker/>', function() {
    it('renders username', function() {
        const wrapper = shallow(<AdminAddWorker/>);
        expect(wrapper.find(<input type="text" id="userName"/>));
    });
});
describe('<AdminAddWorker/>', function() {
    it('renders password', function() {
        const wrapper = shallow(<AdminAddWorker/>);
        expect(wrapper.find(<input type="text" id="password"/>));
    });
});
describe('<AdminAddWorker/>', function() {
    it('renders phone', function() {
        const wrapper = shallow(<AdminAddWorker/>);
        expect(wrapper.find(<input type="text" id="phone"/>));
    });
});
describe('<AdminAddWorker/>', function() {
    it('renders address', function() {
        const wrapper = shallow(<AdminAddWorker/>);
        expect(wrapper.find(<input type="text" id="address"/>));
    });
});
describe('<AdminAddWorker/>', function() {
    it('renders first name', function() {
        const wrapper = shallow(<AdminAddWorker/>);
        expect(wrapper.find(<input type="text" id="firstName"/>));
    });
});
describe('<AdminAddWorker/>', function() {
    it('renders last name', function() {
        const wrapper = shallow(<AdminAddWorker/>);
        expect(wrapper.find(<input type="text" id="lastName"/>));
    });
});
describe('<AdminAddWorker/>', function() {
    it('renders service', function() {
        const wrapper = shallow(<AdminAddWorker/>);
        expect(wrapper.find(<input type="text" id="service"/>));
    });
});
describe('<AdminAddWorker/>', function() {
    it('renders button submit', function() {
        const wrapper = shallow(
            <AdminAddWorker>
                <input type="submit" className="btn btn-outline-dark" id="navButton"/>
            </AdminAddWorker>
        );
        expect(wrapper.contains(<input type="submit" className="btn btn-outline-dark" id="navButton"/>)).to.equal(true);
    })});