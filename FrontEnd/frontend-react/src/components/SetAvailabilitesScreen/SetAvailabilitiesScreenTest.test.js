import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import SetAvailabilitiesScreen from './SetAvailabilitiesScreen';

configure({ adapter: new Adapter() });

describe('<SetAvailabilities/>', function() {
    it('service select enables when user selects a worker', function() {
        const wrapper = shallow(<SetAvailabilitiesScreen/>)
        const instance = wrapper.instance()
        instance.setState({disableWorker: true})
        instance.setState({disableService: false})
        expect(instance.state.disableService).to.equal(false)
    });

    it('timeslot select enables when user selects a service', function() {
        const wrapper = shallow(<SetAvailabilitiesScreen/>);
        const instance = wrapper.instance()  
        expect(instance.state.disableTimeslot).to.equal(true)
        instance.setState({disableWorker: true})
        instance.setState({disableService: true})
        instance.setState({disableTimeslot: false})
        expect(instance.state.disableTimeslot).to.equal(false)
    });

    it('selection confirmation div is show when user selects a timeslot', function() {
    const wrapper = shallow(<SetAvailabilitiesScreen/>);
        const instance = wrapper.instance()
        expect(instance.state.showSubmitPanel).to.equal(false)
        instance.setState({disableTimeslot: false})
        instance.setState({showSubmitPanel: true})
        expect(instance.state.showSubmitPanel).to.equal(true)

    });
});