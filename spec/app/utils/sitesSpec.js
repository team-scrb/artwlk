// import {onSitesWithinRadius, addSiteLocation, getLocation, mockLocation} from '../../../app/utils/geo';
import {geoRef, fireRef} from '../../../config';
import {getSiteByKey, addSite} from '../../../app/utils/sites';

describe('site helpers', () => {
  let _key;
  const _siteInfo = {
    name: 'Cradle',
    artist: 'dont care',
    category: 'Architecture',
    tags: ['shiny', 'corporate', 'touristy'],
    description: 'a bunch of shiny balls hanging off a wall',
    coords: {latitude: 34.0147601, longitude: -118.4934095},
    imageUrl: 'http://i.imgur.com/tDO1tmL.jpg',
  };
  it('adds a site', done => {
    addSite(_siteInfo).then(key => {
      _key = key;
      done();
    }).catch(error => console.error(error));
  }, 5000);

  it('finds a site', done => {
    getSiteByKey(_key).then(siteInfo => {
      expect(_siteInfo).toEqual(siteInfo);
      done();
    });
  }, 5000);

  afterAll(() => {
    console.log('removing', key);
    geoRef.remove(key);
    fireRef.child('sites').remove(key);
  });
});
