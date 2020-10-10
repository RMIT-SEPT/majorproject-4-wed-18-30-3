import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'

import AdminScreen from './AdminScreen';
import AdminBookingSummary from './AdminBookingSummary';
import AdminSetAvailabilities from './AdminSetAvailabilities';

configure({ adapter: new Adapter() });


const testDayData =

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
    it('', function() {
      const wrapper = shallow(<AdminSetAvailabilities/>);
      
    });

    it('', function() {
        const wrapper = shallow(<AdminSetAvailabilities/>);
        
    });

    it('', function() {
    const wrapper = shallow(<AdminSetAvailabilities/>);
    
    });
});
  