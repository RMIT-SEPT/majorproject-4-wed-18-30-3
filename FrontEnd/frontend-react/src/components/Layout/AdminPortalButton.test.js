import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import AdminPortalButton from './AdminPortalButton';

configure({ adapter: new Adapter() });

describe('AdminPortalButton render test', function() {
  it('renders button text', function() {
    const wrapper = shallow(<AdminPortalButton/>); 
    const content = "Admin Portal";
    expect(wrapper.contains(content)).to.equal(true);
  });
});
