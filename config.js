import Firebase from 'firebase';
import GeoFire from 'geofire';

const env = 'artwlk';
export const firebaseUrl = ['https://', env, '.firebaseio.com'].join('');
export const siteUrl = ['https://', env, '.firebaseapp.com'].join('');
export const fireRef = new Firebase(firebaseUrl);
export const geoRef = new GeoFire(fireRef.child('locations'));
export const paths = ['users', 'locations', 'arts'];
