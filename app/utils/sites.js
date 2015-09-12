import {fireRef} from '../../config';
import {addSiteLocation} from './geo';

/**
 * Adds site meta information to firebase.
 * @param {{coords:{latitude: Number, longitude: Number}, ...Object}}  Site metadata including at least coords.
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

/**
 * Get promise of siteInfo.
 * @param {string} key  firebase key
 * @return {Promise}
 */
export const getSiteByKey = key => {
  return new Promise((resolve, reject) => {
    fireRef.child('sites').child(key).once('value', snap => {
      const site = snap.val();
      site.id = snap.key();
      resolve(site);
    }, reject);
  });
};

export const getAllSites = () => {
  return new Promise((resolve, reject) => {
    fireRef.child('sites').once('value', snap => {
      const collection = snap.val();
      const array = Object.keys(collection).map(key => {
        const siteInfo = collection[key];
        siteInfo.id = key;
        return siteInfo;
      });
      resolve(array);
    }, reject);
  });
};
