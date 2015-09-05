import {fireRef} from '../../config';

/**
 * Add tour object to database.
 * @param {Object} tour
 */
export const addTour = tour => {
  const {legs} = tour;

  fireRef.child('tours').push(tour);
};
