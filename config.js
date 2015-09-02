import Firebase from 'firebase';
import GeoFire from 'geofire';

export const firebaseUrl = 'https://artwlk.firebaseio.com';
export const siteUrl = 'https://artwlk.firebaseapp.com';
export const ref = new Firebase(firebaseUrl);
export const geo = new GeoFire(ref.child('locations'));
export const paths = ['users', 'locations', 'arts'];
