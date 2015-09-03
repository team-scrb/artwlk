import { ref } from '../config';
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

ref.remove(() => process.exit()); // hulk smash
