import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import BookingScreen from './BookingScreen';
import NavPane from '../Layout/NavPane';
import BookingPane from './BookingPane';


configure({ adapter: new Adapter() });

describe('<BookingScreen/>', function() {
    it('renders h1 text', function() {
      const wrapper = shallow(<BookingScreen/>); 
      const content = <h1>Make a booking</h1>;
      expect(wrapper.contains(content)).to.equal(true);
    });
  });

describe('<BookingScreen/>', function() {
    it('renders one <NavPane/> component', function() {
      const wrapper = shallow(<BookingScreen/>);
      expect(wrapper.find(NavPane)).to.have.lengthOf(1);
    });
  });

describe('<BookingScreen/>', function() {
    it('renders one <BookingPane/> component', function() {
      const wrapper = shallow(<BookingScreen/>);
      expect(wrapper.find(BookingPane)).to.have.lengthOf(1);
    });
  });
