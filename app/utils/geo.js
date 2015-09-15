import {geoRef} from '../../config';

/**
 * Promisify navigator.geolocation.getCurrentPosition
 * @param  {PositionOptions} opts See [PositionOptions]{@link http://mdn.io/PositionOptions}
 * @return {Promise}      Resolve receives [Position]{@link http://mdn.io/Position} Object.
 */
const getCurrentPosition = (opts) => {
  return new Promise(
    (resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, opts)
  );
};

/**
 * Exposed for setting test location.
 * @type {{location:Position}} {@See http://mdn.io/Position}
 */
export const mockLocation = {};

/**
 * Get current location, trying high-accuracy first, then falling back to low-
 * accuracy after timeout.  May still reject is low-accuracy attempt rejects.
 * @return {Promise} Resolve receives [Position]{@link http://mdn.io/Position} Object.
 */
export const getLocation = () => {
  // allow mocking
  if (mockLocation.coords) {
    return new Promise((resolve) => resolve(mockLocation));
  }

  // try high-accuracy, then fall-back to cell.
  return getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 500,
  })
  .catch(getCurrentPosition.bind(null, {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 500,
  }));
};

/**
 * Private reference to most recently executed GeoFire query.
 */
let cancelQuery;

/**
 * Register handler callback for all items found within given radius.
 * @param {Position} Center from which to search {@see http://mdn.io/Position}
 * @param  {Number}   radius
 * @param  {function} handler Will be passed (key, location, distance) for every item found.
 * @return {function}         Call to cancel all callbacks on the current query.
 */
export const onSitesWithinRadius = (center, radius, handler) => {
  const {coords: {latitude, longitude}} = center;
  cancelQuery && cancelQuery();
  const query = geoRef.query({center: [latitude, longitude], radius});
  query.on('key_entered', handler);
  cancelQuery = () => query.cancel();
  return cancelQuery;
};

/**
 * Add site location to GeoFire table.
 * @param  {String} siteId      Firebase key String
 * @param  {[Number, Number]}   [latitude, longitude]
 * @return {Promise}            Then callback called when data synchronized with Firebase.
 */
export const addSiteLocation = (siteId, [latitude, longitude]) =>
  geoRef.set(siteId, [latitude, longitude]);

export const latLngToAddress = coords => {
  return new Promise((resolve, reject) => {
    if (coords) {
      const geocoder = new google.maps.Geocoder();
      const {latitude, longitude} = coords;
      const latLng = new google.maps.LatLng(latitude, longitude);

      geocoder.geocode({'location': latLng}, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            resolve(results[1].formatted_address);
          } else {
            reject('Geocode: no results found');
          }
        } else {
          reject(status);
        }
      });
    } else {
      reject('no coords');
    }
  });
};
