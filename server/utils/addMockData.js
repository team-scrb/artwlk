import {ref, paths} from '../config';
Promise.all(
  paths.map(path => new Promise(
    (resolve, reject) => ref().child(path).set(
      'mock',
      error => error && reject(error) || resolve()))))
  .then(process.exit).catch(process.exit);
