import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import Footer from './Footer';

configure({ adapter: new Adapter() });

describe('Footer render test', function() {
  it('renders button text', function() {
    const wrapper = shallow(<Footer/>); 
    const content = <a href="/dashboard">Group 4-wed-18-30-3</a>;
    expect(wrapper.contains(content)).to.equal(true);
  });
});