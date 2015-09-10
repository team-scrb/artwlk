import {fireRef} from '../../config';
import {default as Login} from '../components/login-signup/Login';
import {createUser} from './users';

export const isLoggedIn = () => fireRef.getAuth();
export const logout = () => fireRef.unauth();
export const login = () => {
  return new Promise((resolve, reject) => {
    fireRef.authWithOAuthPopup('facebook', (error, authData) => {
      if (error) return reject(error);
      const {facebook: {id, displayName, profileImageURL}} = authData;
      createUser({id, displayName, profileImageURL})
      .then(() => {
        if (Login.attemptedTransition) {
          const transition = Login.attemptedTransition;
          Login.attemptedTransition = null;
          transition.retry();
        } else {
          this.replaceWith('/');
        }
        resolve(authData);
      })
      .catch(reject);
    }, {
      remember: 'none',
    });
  });
};

// replacement for mixin; to be attached to route handler/views/components that should be authorized.
export const willTransitionTo = (transition) => {
  if (!isLoggedIn()) {
    Login.attemptedTransition = transition;
    transition.redirect('login');
  }
};
