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



