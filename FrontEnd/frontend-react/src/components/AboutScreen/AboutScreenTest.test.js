import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import AboutScreen from './AboutScreen';

configure({ adapter: new Adapter() });

describe('<AboutScreen/>', function() {
    it('renders header text', function() {
        const wrapper = shallow(<AboutScreen/>); 
        const content = (
            <div className="col-sm">
            <p>Enquiries inbox - hello@agme.com</p>    
            <p>123 High St, Fort Lauderdale</p>
            <p>33301 FL, United States</p>
            <br/>
            <p>Thank you for choosing AGME booking software.</p>
        </div>
        )
      expect(wrapper.contains(content)).to.equal(true);
    });
});