import Firebase from 'firebase';

export const firebaseUrl = 'https://artwlk.firebaseio.com';
export const siteUrl = 'https://artwlk.firebaseapp.com';
export const ref = () => new Firebase(firebaseUrl);
export const paths = ['users'];
