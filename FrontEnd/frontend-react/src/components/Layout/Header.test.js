import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import Header from './Header';

configure({ adapter: new Adapter() });

describe('<Header/>', function() {
    it('renders About link', function() {
      const wrapper = shallow(
        <a className="nav-link" href="/About/">About</a>
      ); 
      const content = <a className="nav-link" href="/About/">About</a>;
      expect(wrapper.contains(content)).to.equal(true);
    });
});