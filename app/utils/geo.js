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
 * Get current location, trying high-accuracy first, then falling back to low-
 * accuracy after timeout.  May still reject is low-accuracy attempt rejects.
 * @param {{coords:{latitude,longitude}}} mockLocation Optional
 * @return {Promise} Resolve receives [Position]{@link http://mdn.io/Position} Object.
 */
export const getLocation = (mockLocation) => {
  // allow mocking
  if (mockLocation) return new Promise(() => mockLocation, (err) => console.error(err)); // eslint-disable-line no-console

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
  }))
  .catch(err => console.log(err)); // eslint-disable-line no-console
};

/**
 * Private reference to most recently executed GeoFire query.
 */
let cancelQuery;

/**
 * Register handler callback for all items found within given radius.
 * @param  {Number}   radius
 * @param  {function} handler Will be passed (key, location, distance) for every item found.
 * @return {function}         Call to cancel all callbacks on the current query.
 */
export const onSitesWithinRadius = (radius, handler) => {
  getLocation().then(({coords: {latitude, longitude}}) => {
    const center = [latitude, longitude];
    cancelQuery && cancelQuery();
    const query = geoRef.query({center, radius});
    query.on('key_entered', handler);
    cancelQuery = () => query.cancel();
    return cancelQuery;
  }).catch(err => console.error(err)); // eslint-disable-line no-console
};

/**
 * Add site location to GeoFire table.
 * @param  {String} siteId      Firebase key String
 * @param  {[Number, Number]}   [latitude, longitude]
 * @return {Promise}            Then callback called when data synchronized with Firebase.
 */
export const addSiteLocation = (siteId, [latitude, longitude]) =>
  geoRef.set(siteId, [latitude, longitude]);
