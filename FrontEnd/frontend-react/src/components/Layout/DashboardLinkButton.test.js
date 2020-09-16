import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import DashboardLinkButton from './DashboardLinkButton';

configure({ adapter: new Adapter() });

describe('DashboardLinkButton render test', function() {
  it('renders button text', function() {
    const wrapper = shallow(<DashboardLinkButton/>); 
    const content = "Return to Dashboard";
    expect(wrapper.contains(content)).to.equal(true);
  });
});