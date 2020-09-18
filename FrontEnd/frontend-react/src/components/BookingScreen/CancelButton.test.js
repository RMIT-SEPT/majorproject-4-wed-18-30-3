import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import CancelButton from './CancelButton';

configure({ adapter: new Adapter() });

describe('CancelButton render test', function() {
  it('renders button text', function() {
    const wrapper = shallow(<CancelButton/>); 
    const content = "Cancel";
    expect(wrapper.contains(content)).to.equal(true);
  });
}); 