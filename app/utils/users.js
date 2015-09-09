import {fireRef} from '../../config';

const setById = ({id, path, data}) => {
  const _path = path instanceof Array ? path.join('/') : path;
  return new Promise(
    (resolve, reject) => {
      fireRef.child(_path).child(id).set(data, error => {
        if (error) return reject(error);
        resolve(data);
      });
    }
  );
};

export const getUser = id => new Promise((resolve, reject) => {
  fireRef.child('users').child(id).once('value', snap => resolve(snap.val()), reject);
});

export const createUser = ({id, displayName, profileImageURL}) => {
  return getUser(id).then(user => {
    if (!user) {
      return setById({
        id: id,
        path: ['users'],
        data: {id, displayName, profileImageURL},
      });
    }
    return new Promise(() => {});
  });
};

export const addBookmark = ({uid, bookmarkType, id}) => setById({
  id: id,
  path: ['users', uid, 'bookmarks', bookmarkType],
  data: {id},
});

export const addUserSite = ({uid, id}) => setById({
  id: id,
  path: ['users', uid, 'sites'],
  data: {id},
});

export const addUserTour = ({uid, id}) => setById({
  id: id,
  path: ['users', uid, 'tours'],
  data: {id},
});
