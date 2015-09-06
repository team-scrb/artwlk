import {fireRef} from '../../config';

/**
 * Add tourInfo object to database.
 * @param {Object} tourInfo Must contain Google directions object.
 */
export const addTour = tourInfo => {
  const legs = tourInfo.directions.routes[0].legs;
  const distance = legs.reduce((dist, leg) => dist + leg.distance.value, 0);
  const duration = legs.reduce((dur, leg) => dur + leg.duration.value, 0);
  const tour = Object.keys(tourInfo).reduce((obj, key) => {
    obj[key] = tourInfo[key];
    return obj;
  }, {});
  tour.duration = duration;
  tour.distance = distance;
  delete tour.directions;
  let _tourId;
  return Promise.all([
    new Promise((resolve, reject) => {
      _tourId = fireRef.child('tours')
        .push(tour, error => error && reject(error) || resolve())
        .key();
    })].concat(tour.sites.map(siteId => {
      const tourId = {};
      tourId[_tourId] = _tourId;
      return new Promise((resolve, reject) => {
        fireRef.child('toursBySite').child(siteId)
        .update(tourId, error => error && reject(error) || resolve());
      });
    }))
  );
};

// TODO Make work.
// export const removeSiteFromTour = (tourId, siteId) => {
//   fireRef.child('tours').child(tourId).child('sites').once('value',
//     snap => snap.forEach(
//       siteRef => fireRef.child('tours').child(tourId).child('sites').child(siteRef.key()).remove()
//     )
//   );
//   fireRef.child('toursBySite').child(siteId).child(tourId).remove();
// };

export const findToursBySiteId = (siteId) => {
  return new Promise((resolve, reject) => {
    fireRef.child('toursBySite').child(siteId).once('value',
      snap => resolve(Object.keys(snap.val())),
      reject
    );
  });
};


/* Tests/Mock */
// addTour({
//   title: 'a fake tour',
//   description: 'some mock data',
//   directions: {
//     routes: [
//       {
//         legs: [
//           {distance: {value: 1}, duration: {value: 1}},
//           {distance: {value: 1}, duration: {value: 1}},
//           {distance: {value: 1}, duration: {value: 1}},
//         ],
//       },
//     ],
//   },
//   sites: [ '-JyQ2sYqov7NpFj2Lc7Z', '-JyQ4sdmNVfpiB0kqu_x', '-JyQ6RO3SDu6kEP_oZpm'],
// })
// .then(() => findToursBySiteId('-JyQ4sdmNVfpiB0kqu_x'))
// .then(tourId => {
//   console.log('found', tourId);
//   removeSiteFromTour(tourId[0], '-JyQ2sYqov7NpFj2Lc7Z');
// })
// .catch(error => console.error(error));
