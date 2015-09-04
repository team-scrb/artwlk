import {fireRef} from '../../config';
import {addSiteLocation} from './geo';

/**
 * Adds site meta information to firebase.
 * @type {{coords:{latitude: Number, longitude: Number}, ...Object}}  Site metadata including at least coords.
 * @return {Promise}  A promise to the key of the added object.
 */
export const addSite = siteInfo => {
  return new Promise((resolve, reject) => {
    const {coords: {latitude, longitude}} = siteInfo;
    const key = fireRef.child('sites').push(siteInfo, error => {
      if (error) return reject(error);
      addSiteLocation(key, [latitude, longitude])
      .then(() => resolve(key))
      .catch(reject);
    }).key();
  });
};
