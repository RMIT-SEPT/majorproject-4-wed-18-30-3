import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import AddBookingButton from './AddBookingButton';

configure({ adapter: new Adapter() });

describe('AddBookingButton render test', function() {
  it('renders button text', function() {
    const wrapper = shallow(<AddBookingButton/>); 
    const content = "Create new booking";
    expect(wrapper.contains(content)).to.equal(true);
  });
});