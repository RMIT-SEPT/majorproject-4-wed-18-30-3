import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import AvailabilitiesPane from './AvailabilitiesPane';

configure({ adapter: new Adapter() });

// FUNCTIONAL TESTS
describe('<BookingPane/>', function() {
  it('loads the view select screen on initial page navigation', function() {
    const wrapper = shallow(<AvailabilitiesPane/>);
    const instance = wrapper.instance()
    expect(instance.state.view).to.equal("select");
  });
});

describe('<BookingPane/>', function() {
    it('loads view by timeslot view once view state is changed', function() {
      const wrapper = shallow(<AvailabilitiesPane/>);
      const instance = wrapper.instance()
      instance.timeslotView()
      expect(instance.state.view).to.equal("timeslot");
    });
  });

  
describe('<BookingPane/>', function() {
    it('loads view by timeslot view once view state is changed', function() {
      const wrapper = shallow(<AvailabilitiesPane/>);
      const instance = wrapper.instance()
      instance.workerView()
      expect(instance.state.view).to.equal("worker");
    });
  });