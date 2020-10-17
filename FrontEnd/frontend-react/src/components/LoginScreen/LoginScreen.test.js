import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import LoginScreen from './LoginScreen';

configure({ adapter: new Adapter() });
//RENDER TESTS
describe('<LoginScreen/>', function() {
    it('', function() {
        
    });
});
describe('<LoginScreen/>', function() {
    it('renders username', function() {
        const wrapper = shallow(<LoginScreen/>);
        expect(wrapper.find(<input type="text" id="userName"/>));
    });
});
describe('<LoginScreen/>', function() {
    it('renders password', function() {
        const wrapper = shallow(<LoginScreen/>);
        expect(wrapper.find(<input type="text" id="password"/>));
    });
});
describe('<LoginScreen/>', function() {
    it('renders button submit', function() {
        const wrapper = shallow(
            <LoginScreen>
                <input type="submit" value="Sign in" className="btn btn-outline-dark" id="navButton"/>
            </LoginScreen>
        );
        expect(wrapper.contains(<input type="submit" value="Sign in" className="btn btn-outline-dark" id="navButton"/>)).to.equal(true);
    })});
describe('<LoginScreen/>', function() {
    it('renders button register', function() {
        const wrapper = shallow(<LoginScreen/>);
        expect(wrapper.find(<a href="/register" className="btn btn-outline-dark" id="navButton"/>));
    });
});
// describe('<LoginScreen/>', function() {
//     it('renders username label', function() {
//         const wrapper = shallow(
//             <LoginScreen>
//                 <label htmlFor={"username"}>Username:</label>
//             </LoginScreen>
//         );
//         expect(wrapper.contains(<label htmlFor={"username"}>Username:</label>)).to.equal(true);
//     });
// });
// describe('<LoginScreen/>', function() {
//     it('renders username input', function() {
//         const wrapper = shallow(
//             <LoginScreen>
//                 <input type="text" id="username" name="uname" required></input>
//             </LoginScreen>
//         );
//         expect(wrapper.contains(<input type="text" id="username" name="uname" required></input>)).to.equal(true);
//     });
// });
// describe('<LoginScreen/>', function() {
//     it('renders password label', function() {
//         const wrapper = shallow(
//             <LoginScreen>
//                 <label htmlFor={"password"}>Password:</label>
//             </LoginScreen>
//         );
//         expect(wrapper.contains(<label htmlFor={"password"}>Password:</label>)).to.equal(true);
//     });
// });
// describe('<LoginScreen/>', function() {
//     it('renders password input', function() {
//         const wrapper = shallow(
//             <LoginScreen>
//                 <input type="password" id="password" name="pass" required></input>
//             </LoginScreen>
//         );
//         expect(wrapper.contains(<input type="password" id="password" name="pass" required></input>)).to.equal(true);
//     });
// });
// describe('<LoginScreen/>', function() {
//     it('renders button submit', function() {
//         const wrapper = shallow(
//             <LoginScreen>
//                 <input type="submit" className="login_Submit" id="navButton"/>
//             </LoginScreen>
//         );
//         expect(wrapper.contains(<input type="submit" className="login_Submit" id="navButton"/>)).to.equal(true);
//     });
// });