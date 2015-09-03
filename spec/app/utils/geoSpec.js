import {onSitesWithinRadius, addSiteLocation, getLocation} from '../../../app/utils/geo';
import {geo} from '../../../config';

describe('GeoFire helpers', () => {
  let cancel;
  it('add a dummy location', (done) => {
    getLocation()
    .then(({coords: {latitude, longitude}}) =>
      addSiteLocation('fake-o', [latitude, longitude])
    )
    .then(done)
    .catch(done);
  }, 9000);
  it('finds the dummy location', (done) => {
    cancel = onSitesWithinRadius(10, (key) => {
      if (key === 'fake-o') {
        expect(true).toBe(true);
        geo.remove(key);
        done();
      }
    });
  });
  afterAll(() => cancel());
});
