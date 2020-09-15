import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import BookingPane from './BookingPane';
import Select from 'react-select';
import CancelButton from './CancelButton';

configure({ adapter: new Adapter() });

describe('<BookingPane/>', function() {
  it('renders heading text', function() {
    const wrapper = shallow(
      <BookingPane>
        <b>Get started by choosing a worker.</b>
      </BookingPane>
    ); 
    expect(wrapper.contains(<b>Get started by choosing a worker.</b>)).to.equal(true);
  });
});

describe('<BookingPane/>', function() {
  it('renders three <Select/> components', function() {
    const wrapper = shallow(<BookingPane/>);
    expect(wrapper.find(Select)).to.have.lengthOf(3);
  });
});

describe('<BookingPane/>', function() {
  it('renders worker select label', function() {
    const wrapper = shallow(
      <BookingPane>
      <label htmlFor="worker">Select a worker:</label>
      </BookingPane>
    ); 
    expect(wrapper.contains(<label htmlFor="worker">Select a worker:</label>)).to.equal(true);
  });
});

describe('<BookingPane/>', function() {
  it('renders service select label', function() {
    const wrapper = shallow(
      <BookingPane>
        <label htmlFor="service">Select a service:</label>
      </BookingPane>
    ); 
    expect(wrapper.contains(<label htmlFor="service">Select a service:</label>)).to.equal(true);
  });
});

describe('<BookingPane/>', function() {
  it('renders service select label', function() {
    const wrapper = shallow(
      <BookingPane>
        <label htmlFor="availability">Select an available timeslot:</label>
      </BookingPane>
    ); 
    expect(wrapper.contains(<label htmlFor="service">Select a service:</label>)).to.equal(true);
  });
});

describe('<BookingPane/>', function() {
  it('renders one <CancelButton/> component', function() {
    const wrapper = shallow(<BookingPane/>);
    expect(wrapper.find(CancelButton)).to.have.lengthOf(1);
  });
});