import {fireRef} from '../../config';

const fqById = ({id, path, data}) => {
  const obj = {};
  obj[id] = data;
  const _path = path instanceof Arraypath ? path.join('/') : path;
  return new Promise(
    (resolve, reject) => fireRef.child(_path).set(data, resolve.bind(null, data), reject)
  );
};

export const createUser = ({provider, uid, imageUrl, profileUrl, name}) => fqById({
  id: uid,
  path: ['users'],
  data: {provider, uid, imageUrl, profileUrl, name},
});

export const addBookmark = ({uid, bookmarkType, id}) => fqById({
  id: uid,
  path: ['users', uid, 'bookmarks', bookmarkType],
  data: {uid, bookmarkType, id},
});

export const addUserSite = ({uid, id}) => fqById({
  id: uid,
  path: ['users', uid, 'sites'],
  data: {uid, id},
});

export const addUserTour = ({uid, id}) => fqById({
  id: uid,
  path: ['users', uid, 'tours'],
  data: {uid, id},
});
