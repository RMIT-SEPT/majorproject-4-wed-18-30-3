import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import NavPane from '../Layout/NavPane';
import Dashboard from './Dashboard';

configure({ adapter: new Adapter() });

describe('<Dashboard/>', function() {
    it('renders one <NavPane/> component', function() {
      const wrapper = shallow(
            <Dashboard>
                <div className="col-sm-3"></div>
            </Dashboard>
        );
      expect(wrapper.find(NavPane)).to.have.lengthOf(1);
    });
  });