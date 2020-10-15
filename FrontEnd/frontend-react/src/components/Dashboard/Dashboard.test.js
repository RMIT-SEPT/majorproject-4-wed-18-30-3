import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import Dashboard from './Dashboard';

configure({ adapter: new Adapter() });

describe('<Dashboard/>', function() {
    it('Shows admin-contextual header when admin logs in', function() {
        const wrapper = shallow(<Dashboard userType={"ADMIN"}/>)
        expect(wrapper.contains(<h2>Admin portal</h2>)).to.equal(true);
    });

    it('Shows customer-contextual header when customer logs in', function() {
        const wrapper = shallow(<Dashboard userType={"CUSTOMER"}/>)
        expect(wrapper.contains(<h2>Customer portal</h2>)).to.equal(true);
    });

    it('Shows worker-contextual header when worker logs in', function() {
        const wrapper = shallow(<Dashboard userType={"WORKER"}/>)
        expect(wrapper.contains(<h2>Worker portal</h2>)).to.equal(true);
    });
});

