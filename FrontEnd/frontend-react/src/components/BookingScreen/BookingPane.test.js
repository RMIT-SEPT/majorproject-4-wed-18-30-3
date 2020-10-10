import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import BookingPane from './BookingPane';
import Select from 'react-select';

configure({ adapter: new Adapter() });

// FUNCTIONAL TESTS
describe('<BookingPane/>', function() {
  it('enables the service textbox once company is selected', function() {
    const wrapper = shallow(<BookingPane/>);
    const instance = wrapper.instance()
    instance.setState({companyName: "testCompanyName"})
    expect(instance.state.disableCompany).to.equal(false);
  });
});


describe('<BookingPane/>', function() {
  it('disable worker selection once service is selected', function() {
    const wrapper = shallow(<BookingPane/>);
    const instance = wrapper.instance()
    instance.setState({companyName: "testCompanyName"})
    instance.setState({service: "testServiceName"})
    expect(instance.state.disableWorker).to.equal(true);
  });
});

describe('<BookingPane/>', function() {
  it('disable timeslot selection once a worker is selected', function() {
    const wrapper = shallow(<BookingPane/>);
    const instance = wrapper.instance()
    instance.onWorkerChange("TestWorker")
    instance.setState({worker: "TestWorker"})
    expect(instance.state.disableAvailability).to.equal(true);
  });
});



// RENDER TESTS
describe('<BookingPane/>', function() {
  it('renders three <Select/> components', function() {
    const wrapper = shallow(<BookingPane/>);
    expect(wrapper.find(Select)).to.have.lengthOf(4);
  });
});

describe('<BookingPane/>', function() {
  it('renders worker select label', function() {
    const wrapper = shallow(
      <BookingPane>
      <label htmlFor="worker">Select a worker:</label>
      </BookingPane>
    ); 
    expect(wrapper.contains(<label htmlFor="worker">Select a worker:</label>)).to.equal(true);
  });
});

describe('<BookingPane/>', function() {
  it('renders service select label', function() {
    const wrapper = shallow(
      <BookingPane>
        <label htmlFor="service">Select a service:</label>
      </BookingPane>
    ); 
    expect(wrapper.contains(<label htmlFor="service">Select a service:</label>)).to.equal(true);
  });
});

describe('<BookingPane/>', function() {
  it('renders service select label', function() {
    const wrapper = shallow(
      <BookingPane>
        <label htmlFor="availability">Select an available timeslot:</label>
      </BookingPane>
    ); 
    expect(wrapper.contains(<label htmlFor="service">Select a service:</label>)).to.equal(true);
  });
});
