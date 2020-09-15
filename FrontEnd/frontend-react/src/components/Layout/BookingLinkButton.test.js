import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import BookingLinkButton from './BookingLinkButton';

configure({ adapter: new Adapter() });

describe('BookingLinkButton render test', function() {
  it('renders button text', function() {
    const wrapper = shallow(<BookingLinkButton/>); 
    const content = "Make a booking";
    expect(wrapper.contains(content)).to.equal(true);
  });
});