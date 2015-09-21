/*
Basic login button.  Can serve as example for how to integrate auth into other views.
 */

import React from 'react/addons';
import {login, logout} from '../../utils/auth';

// styles
import '../../styles/components/Login';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.doLogin = this.doLogin.bind(this);
    this.doLogout = this.doLogout.bind(this);
  }

  componentWillMount() {
    this.props.setTopBar({
      title: 'Login',
    });
  }

  doLogout() {
    logout();
    this.context.router.transitionTo('/login');  // this doesn't refresh the page as expected
  }

  doLogin() {
    // TODO Implement as prop?
    login()
    .catch(error => alert(error)); // eslint-disable-line no-alert
  }

  render() {
    return (
      <div className="Login" onClick={this.doLogin}>
        <img src="../src/images/FB-f-Logo__blue_50.png" className="Login__img" />
        <span className="Login__span">Sign in with Facebook</span>
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

Login.propTypes = {
  setTopBar: React.PropTypes.func.isRequired,
};
