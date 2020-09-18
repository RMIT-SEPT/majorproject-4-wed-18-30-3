import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import CancelBookingScreen from './CancelBookingScreen';
import NavPane from '../Layout/NavPane';
import CancelBookingPane from './CancelBookingPane';


configure({ adapter: new Adapter() });

describe('<CancelBookingScreen/>', function() {
    it('renders h1 text', function() {
      const wrapper = shallow(<CancelBookingScreen/>); 
      const content = <h1>CancelBooking</h1>;
      expect(wrapper.contains(content)).to.equal(true);
    });
  });

describe('<CancelBookingScreen/>', function() {
    it('renders one <NavPane/> component', function() {
      const wrapper = shallow(<CancelBookingScreen/>);
      expect(wrapper.find(NavPane)).to.have.lengthOf(1);
    });
  });

describe('<CancelBookingPane exist/>', function() {
    it('renders one <EditProfile/> component', function() {
      const wrapper = shallow(<CancelBookingScreen/>);
      expect(wrapper.find(CancelBookingPane)).to.have.lengthOf(1);
    });
  });