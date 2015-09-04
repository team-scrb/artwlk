import {onSitesWithinRadius, addSiteLocation, getLocation, mockLocation} from '../../../app/utils/geo';
import {geoRef} from '../../../config';

describe('GeoFire helpers', () => {
  let cancel;
  mockLocation.coords = {latitude: 0, longitude: 0};
  it('has a mockLocation', (done) => {
    getLocation()
    .then(({coords: {latitude, longitude}}) => {
      dump([latitude, longitude]);
      expect(latitude === 0 && longitude === 0).toBe(true);
      done();
    }, 9000)
    .catch(done);
  });
  it('add a dummy location', (done) => {
    getLocation()
    .then(({coords: {latitude, longitude}}) =>
      addSiteLocation('fake-o', [latitude, longitude])
    )
    .then(done)
    .catch(done);
  }, 2000);
  it('finds the dummy location', (done) => {
    cancel = onSitesWithinRadius(mockLocation, 10, (key) => {
      if (key === 'fake-o') {
        expect(true).toBe(true);
        geoRef.remove(key);
        done();
      }
    });
  }, 2000);
  afterAll(() => cancel());
});
