import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'

import ProfileScreen from './ProfileScreen';



configure({ adapter: new Adapter() });


describe('<ProfileScreen/>', function() {
    it('renders login text', function() {
        const wrapper = shallow(
            <ProfileScreen>
               <b>Please <a href="/login">log in </a> to use the app.</b>
            </ProfileScreen>
        );
        expect(wrapper.contains(<b>Please <a href="/login">log in </a> to use the app.</b>)).to.equal(true);
    });
});


describe('<ProfileScreen/>', function() {
    it('renders profile if not login', function() {
      const wrapper = shallow(
        <ProfileScreen>
        <h2>View/edit profile</h2>
        </ProfileScreen>
      ); 
      expect(wrapper.contains(<h2>View/edit profile</h2>)).to.equal(false);
    });
  });



