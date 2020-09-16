import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import ProfileButton from './ProfileButton';

configure({ adapter: new Adapter() });

describe('ProfileButton render test', function() {
  it('renders button text', function() {
    const wrapper = shallow(<ProfileButton/>); 
    const content = "View/edit profile";
    expect(wrapper.contains(content)).to.equal(true);
  });
});