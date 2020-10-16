import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import RegisterScreen from './RegisterScreen';
import Select from 'react-select';

configure({ adapter: new Adapter() });

describe('<RegisterScreen/>', function() {
    it('renders heading text', function() {
        const wrapper = shallow(
            <RegisterScreen>
                <p>Phone no. must be 10 digits and start with 0</p>
            </RegisterScreen>
        );
        expect(wrapper.contains(<p>Phone no. must be 10 digits and start with 0</p>)).to.equal(true);
    });
});
// describe('<RegisterScreen/>', function() {
//     it('renders username label', function() {
//         const wrapper = shallow(
//             <RegisterScreen>
//                 <label htmlFor={"username"}>Username:</label>
//             </RegisterScreen>
//         );
//         expect(wrapper.contains(<label htmlFor={"username"}>Username:</label>)).to.equal(true);
//     });
// });
// describe('<RegisterScreen/>', function() {
//     it('renders username input', function() {
//         const wrapper = shallow(
//             <RegisterScreen>
//                 <input type="text" id="username" name="uname" required></input>
//             </RegisterScreen>
//         );
//         expect(wrapper.contains(<input type="text" id="username" name="uname" required></input>)).to.equal(true);
//     });
// });
// describe('<RegisterScreen/>', function() {
//     it('renders password label', function() {
//         const wrapper = shallow(
//             <RegisterScreen>
//                 <label htmlFor={"password"}>Password:</label>
//             </RegisterScreen>
//         );
//         expect(wrapper.contains(<label htmlFor={"password"}>Password:</label>)).to.equal(true);
//     });
// });
// describe('<RegisterScreen/>', function() {
//     it('renders password input', function() {
//         const wrapper = shallow(
//             <RegisterScreen>
//                 <input type="password" id="password" name="pass" required></input>
//             </RegisterScreen>
//         );
//         expect(wrapper.contains(<input type="password" id="password" name="pass" required></input>)).to.equal(true);
//     });
// });
// describe('<RegisterScreen/>', function() {
//     it('renders phone label', function() {
//         const wrapper = shallow(
//             <RegisterScreen>
//                 <label htmlFor={"phone"}>Phone:</label>
//             </RegisterScreen>
//         );
//         expect(wrapper.contains(<label htmlFor={"phone"}>Phone:</label>)).to.equal(true);
//     });
// });
// describe('<RegisterScreen/>', function() {
//     it('renders phone input', function() {
//         const wrapper = shallow(
//             <RegisterScreen>
//                 <input type="number" id="phone" name="phone" required></input>
//             </RegisterScreen>
//         );
//         expect(wrapper.contains(<input type="number" id="phone" name="phone" required></input>)).to.equal(true);
//     });
// });
// describe('<RegisterScreen/>', function() {
//     it('renders address label', function() {
//         const wrapper = shallow(
//             <RegisterScreen>
//                 <label htmlFor={"address"}>Phone:</label>
//             </RegisterScreen>
//         );
//         expect(wrapper.contains(<label htmlFor={"address"}>Address:</label>)).to.equal(true);
//     });
// });
// describe('<RegisterScreen/>', function() {
//     it('renders address input', function() {
//         const wrapper = shallow(
//             <RegisterScreen>
//                 <input type="text" id="address" name="address" required></input>
//             </RegisterScreen>
//         );
//         expect(wrapper.contains(<input type="text" id="address" name="address" required></input>)).to.equal(true);
//     });
// });
// describe('<RegisterScreen/>', function() {
//     it('renders first name label', function() {
//         const wrapper = shallow(
//             <RegisterScreen>
//                 <label htmlFor={"firstName"}>Phone:</label>
//             </RegisterScreen>
//         );
//         expect(wrapper.contains(<label htmlFor={"firstName"}>First Name:</label>)).to.equal(true);
//     });
// });
// describe('<RegisterScreen/>', function() {
//     it('renders first name input', function() {
//         const wrapper = shallow(
//             <RegisterScreen>
//                 <input type="text" id="firstName" name="fName" required></input>
//             </RegisterScreen>
//         );
//         expect(wrapper.contains(<input type="text" id="firstName" name="fName" required></input>)).to.equal(true);
//     });
// });
// describe('<RegisterScreen/>', function() {
//     it('renders last name label', function() {
//         const wrapper = shallow(
//             <RegisterScreen>
//                 <label htmlFor={"lastName"}>Phone:</label>
//             </RegisterScreen>
//         );
//         expect(wrapper.contains(<label htmlFor={"lastName"}>Last Name:</label>)).to.equal(true);
//     });
// });
// describe('<RegisterScreen/>', function() {
//     it('renders last name input', function() {
//         const wrapper = shallow(
//             <RegisterScreen>
//                 <input type="text" id="lastName" name="lName" required></input>
//             </RegisterScreen>
//         );
//         expect(wrapper.contains(<input type="text" id="lastName" name="lName" required></input>)).to.equal(true);
//     });
// });
// describe('<RegisterScreen/>', function() {
//     it('renders one <Select/> component', function() {
//         const wrapper = shallow(<RegisterScreen/>);
//         expect(wrapper.find(Select)).to.have.lengthOf(1);
//     });
// });
// describe('<RegisterScreen/>', function() {
//     it('renders user type label', function() {
//         const wrapper = shallow(
//             <RegisterScreen>
//                 <label htmlFor={"user"}>Select Type of user:</label>
//             </RegisterScreen>
//         );
//         expect(wrapper.contains(<label htmlFor={"user"}>Select Type of user:</label>)).to.equal(true);
//     });
// });

// describe('<RegisterScreen/>', function() {
//     it('renders button submit', function() {
//         const wrapper = shallow(
//             <RegisterScreen>
//                 <input type="submit" className="register_Submit" id="navButton"/>
//             </RegisterScreen>
//         );
//         expect(wrapper.contains(<input type="submit" className="register_Submit" id="navButton"/>)).to.equal(true);
//     });
// });