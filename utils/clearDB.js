import { fireRef } from '../config';
// Promise.all(
//   paths.map(path => new Promise(
//     (resolve, reject) => ref.child(path).remove(
//       error => error && reject(error) || resolve()
//     ))))
//   .then(process.exit)
//   .catch(error => {
//     console.log(error);  // eslint-disable-line no-console
//     process.exit();
//   });

fireRef.remove(() => process.exit()); // hulk smash
