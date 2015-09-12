import {fireRef} from '../../config';
/**
 * Add tourInfo object to database.
 * @param {Object} tourInfo Must contain Google directions object.
 */
export const addTour = tourInfo => {
  const DirectionsService = new google.maps.DirectionsService();
  return new Promise((resolve, reject) => {
    DirectionsService.route({
      origin: new google.maps.LatLng(tourInfo.sites[0].coords.latitude, tourInfo.sites[0].coords.longitude),
      destination: new google.maps.LatLng(tourInfo.sites[tourInfo.sites.length - 1].coords.latitude, tourInfo.sites[tourInfo.sites.length - 1].coords.longitude),
      travelMode: google.maps.TravelMode.WALKING,
      optimizeWaypoints: false,
      waypoints: tourInfo.sites.slice(1, tourInfo.sites.length - 1).map(site => {
        return {
          location: new google.maps.LatLng(site.coords.latitude, site.coords.longitude),
          stopover: true,
        };
      }),
    },
    (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        resolve(result);
      } else {
        reject(`error fetching directions ${ result }`);
      }
    });
  })
  .then(directions => {
    const legs = directions.routes[0].legs;
    const distance = legs.reduce((dist, leg) => dist + leg.distance.value, 0);
    const duration = legs.reduce((dur, leg) => dur + leg.duration.value, 0);
    const tour = Object.keys(tourInfo).reduce((obj, key) => {
      obj[key] = tourInfo[key];
      return obj;
    }, {});
    tour.duration = duration;
    tour.distance = distance;
    tour.sites = tour.sites.map(site => site.id);
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
  });
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

export const getAllTours = () => {
  return new Promise((resolve, reject) => {
    fireRef.child('tours').once('value', snap => {
      const collection = snap.val();
      resolve(Object.keys(collection).map(key => {
        const tour = collection[key];
        tour.id = key;
        return tour;
      }));
    },
    error => {
      reject(error);
    });
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
