import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import Header from './Header';

configure({ adapter: new Adapter() });

describe('<Header/>', function() {
  it('renders Home link', function() {
    const wrapper = shallow(
        <Header>
        <a className="navbar-brand" href="/dashboard">Home</a>
        </Header>
    ); 
    const content = <a className="navbar-brand" href="/dashboard">Home</a>;
    expect(wrapper.contains(content)).to.equal(true);
  });
});

describe('<Header/>', function() {
    it('renders Register link', function() {
      const wrapper = shallow(
          <Header>
          <a className="nav-link" href="/register">Register</a>
          </Header>
      ); 
      const content = <a className="nav-link" href="/register">Register</a>;
      expect(wrapper.contains(content)).to.equal(true);
    });
});

describe('<Header/>', function() {
    it('renders Sign in link', function() {
      const wrapper = shallow(
          <Header>
          <a className="nav-link" href="/login">Sign in</a>
          </Header>
      ); 
      const content = <a className="nav-link" href="/login">Sign in</a>;
      expect(wrapper.contains(content)).to.equal(true);
    });
});

describe('<Header/>', function() {
    it('renders About link', function() {
      const wrapper = shallow(
        <a className="nav-link" href="/About/">About</a>
      ); 
      const content = <a className="nav-link" href="/About/">About</a>;
      expect(wrapper.contains(content)).to.equal(true);
    });
});