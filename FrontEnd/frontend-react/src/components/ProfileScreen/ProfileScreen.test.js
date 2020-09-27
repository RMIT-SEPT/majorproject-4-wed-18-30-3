import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import ProfileScreen from './ProfileScreen';
import NavPane from '../Layout/NavPane';
import EditProfile from './EditProfile';


configure({ adapter: new Adapter() });

// describe('<ProfileScreen/>', function() {
//     it('renders h1 text', function() {
//       const wrapper = shallow(<ProfileScreen/>); 
//       const content = <h1>View/edit profile screen</h1>;
//       expect(wrapper.contains(content)).to.equal(true);
//     });
//   });

describe('<ProfileScreen/>', function() {
    it('renders one <NavPane/> component', function() {
      const wrapper = shallow(<ProfileScreen/>);
      expect(wrapper.find(NavPane)).to.have.lengthOf(1);
    });
  });

describe('<ProfileScreen/>', function() {
    it('renders one <EditProfile/> component', function() {
      const wrapper = shallow(<ProfileScreen/>);
      expect(wrapper.find(EditProfile)).to.have.lengthOf(1);
    });
  });