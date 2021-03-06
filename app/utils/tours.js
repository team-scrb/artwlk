import {fireRef} from '../../config';
import {getSiteByKey} from './sites';

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
    return new Promise((resolve, reject) => {
      resolve(fireRef.child('tours').push(tour, error => error && reject(error)).key());
    })
    .then(tourId => {
      tour.id = tourId;
      const promises = tour.sites.map(siteId => {
        const idObj = {};
        idObj[tourId] = tourId;
        return new Promise((resolve, reject) => {
          fireRef.child('toursBySite').child(siteId)
          .update(idObj, error => {
            error && reject(error) || resolve(tour);
          });
        });
      });
      return Promise.all(promises)
      .then(() => tour);
    });
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

export const findToursBySiteId = siteId => {
  return new Promise((resolve, reject) => {
    fireRef.child('toursBySite').child(siteId).once('value',
      snap => resolve(snap.val() && Object.keys(snap.val())),
      reject
    );
  });
};

export const getTourById = tourId => {
  return new Promise((resolve, reject) => {
    fireRef.child('tours').child(tourId).once('value',
      snap => resolve(snap.val()),
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

export const getTourByKey = key => {
  return new Promise((resolve, reject) => {
    fireRef.child('tours').child(key).once('value', snap => {
      const tour = snap.val();
      tour.id = snap.key();
      Promise.all(tour.sites.map(siteId => {
        return getSiteByKey(siteId)
        .then(site => tour.sites[tour.sites.indexOf(siteId)] = site);
      }))
      .then(() => tour.imageUrl = tour.sites[0].imageUrl)
      .then(() => resolve(tour));
    }, reject);
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
