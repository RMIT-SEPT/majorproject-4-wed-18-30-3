import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import RegisterScreen from './RegisterScreen';
import Select from 'react-select';

configure({ adapter: new Adapter() });
//FUNCTIONAL TESTS

// describe('<RegisterScreen/>', function() {
//     it('tests if creating user has succeeded', function() {
//         const wrapper = shallow(<RegisterScreen/>);
//         const instance = wrapper.instance();
//         instance.setState({userName:"abcd"})
//         instance.setState({password:"pass"})
//         instance.setState({phone:"0000000000"})
//         instance.setState({address:"123"})
//         instance.setState({firstName:"abcd"})
//         instance.setState({lastName:"efgh"})
//         instance.setState({userType:{value:'CUSTOMER', label: 'Customer'}})
//         expect(wrapper.state.response).to.equal("200");
//     });
// });


// RENDER TESTS
describe('<RegisterScreen/>', function() {
    it('renders heading text', function() {
        const wrapper = shallow(
            <RegisterScreen>
                <h1>Register</h1>
            </RegisterScreen>
        );
        expect(wrapper.contains(<h1>Register</h1>)).to.equal(true);
    });
});
describe('<RegisterScreen/>', function() {
    it('renders username', function() {
        const wrapper = shallow(<RegisterScreen/>);
        expect(wrapper.find(<input type="text" id="userName"/>));
    });
});
describe('<RegisterScreen/>', function() {
    it('renders password', function() {
        const wrapper = shallow(<RegisterScreen/>);
        expect(wrapper.find(<input type="text" id="password"/>));
    });
});
describe('<RegisterScreen/>', function() {
    it('renders phone', function() {
        const wrapper = shallow(<RegisterScreen/>);
        expect(wrapper.find(<input type="text" id="phone"/>));
    });
});
describe('<RegisterScreen/>', function() {
    it('renders address', function() {
        const wrapper = shallow(<RegisterScreen/>);
        expect(wrapper.find(<input type="text" id="address"/>));
    });
});
describe('<RegisterScreen/>', function() {
    it('renders first name', function() {
        const wrapper = shallow(<RegisterScreen/>);
        expect(wrapper.find(<input type="text" id="firstName"/>));
    });
});
describe('<RegisterScreen/>', function() {
    it('renders last name', function() {
        const wrapper = shallow(<RegisterScreen/>);
        expect(wrapper.find(<input type="text" id="lastName"/>));
    });
});
describe('<RegisterScreen/>', function() {
    it('renders one <Select/> component', function() {
        const wrapper = shallow(<RegisterScreen/>);
        expect(wrapper.find(Select)).to.have.lengthOf(1);
})});
describe('<RegisterScreen/>', function() {
    it('renders button submit', function() {
        const wrapper = shallow(
            <RegisterScreen>
                <input type="submit" className="btn btn-outline-dark" id="navButton"/>
            </RegisterScreen>
        );
        expect(wrapper.contains(<input type="submit" className="btn btn-outline-dark" id="navButton"/>)).to.equal(true);
})});
describe('<RegisterScreen/>', function() {
    it('renders button log in', function() {
        const wrapper = shallow(<RegisterScreen/>);
        expect(wrapper.find(<a href="/login" className="btn btn-outline-dark" id="navButton"/>));
    });
});