import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'

import AdminScreen from './AdminScreen';
import AdminBookingSummary from './AdminBookingSummary';
import AdminSetAvailabilities from './AdminSetAvailabilities';

configure({ adapter: new Adapter() });

describe('<AdminScreen>', function() {
    it('renders header text', function() {
      const wrapper = shallow(<AdminScreen/>); 
      const content = <h1>Admin portal</h1>
      expect(wrapper.contains(content)).to.equal(true);
    });
});


describe('<AdminBookingSummary/>', function() {
    it('container div 1 collapses when toggled', function() {
        const wrapper = shallow(<AdminBookingSummary/>);
        const instance = wrapper.instance()
        expect(instance.state.collapse1).to.equal("");
        instance.setState({collapse1: true})
        instance.toggleCollapse1("basicCollapse1")  
        expect(instance.state.collapse1).to.equal(true);
    });
});

describe('<AdminSetAvailabilities/>', function() {
    it('service select enables when user selects a worker', function() {
        const wrapper = shallow(<AdminSetAvailabilities/>);
        const instance = wrapper.instance()

    });

    it('timeslot select enables when user selects a service', function() {
        const wrapper = shallow(<AdminSetAvailabilities/>);
        const instance = wrapper.instance()  
        
    });

    it('selection confirmation div is show when user selects a timeslot', function() {
    const wrapper = shallow(<AdminSetAvailabilities/>);
        const instance = wrapper.instance()

    });
});
  