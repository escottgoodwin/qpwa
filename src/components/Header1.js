import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import {Link} from 'react-router-dom'

  import '../css/App.css';
  import HeaderDropdown from './HeaderDropdown'
  import SignInButton from './SignInButton'

  export default class Header1 extends React.Component {
      constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

signOut() {
  firebase.auth().signOut().then(function() {
  this.props.history.push("/sign_in");
}).catch(function(error) {
  // An error happened.
});
}

  render() {
    return (
      <div>
        <Navbar color="dark" light expand="md">
        <UncontrolledDropdown nav inNavbar>
        <NavItem>
          <SignInButton signout={this.signOut} signin={this.props.signIn} authenticated={this.props.authenticated} />
        </NavItem>
          <NavbarBrand href="/">Quandria</NavbarBrand>
          <DropdownToggle nav caret>
            Menu
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
            <Link className="App-routes" to="/main">Main</Link>
            </DropdownItem>
            <DropdownItem>
              <Link className="App-routes" to="/teacher_dashboard">Teacher</Link>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <Link className="App-routes" to="/course_dashboard">Course</Link>
            </DropdownItem>
            <DropdownItem>
              <Link className="App-routes" to="/add_test">Add Test</Link>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        </Navbar>
      </div>
    );
  }
}
