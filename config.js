import Firebase from 'firebase';
// import {MockFirebase as Firebase} from 'mockfirebase';
import GeoFire from 'geofire';

export const firebaseUrl = 'https://artwlk.firebaseio.com';
export const siteUrl = 'https://artwlk.firebaseapp.com';
export const fireRef = new Firebase(firebaseUrl);
export const geoRef = new GeoFire(fireRef.child('locations'));
export const paths = ['users', 'locations', 'arts'];
