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
      dump(key);
      done();
    }).catch(error => console.error(error)); // eslint-disable-line no-console
  }, 9000);

  it('finds a site', done => {
    getSiteByKey(_key).then(siteInfo => {
      expect(_siteInfo).toEqual(siteInfo);
      dump('removing', _key);
      geoRef.remove(_key);
      dump('ok');
      fireRef.child('sites').child(_key).remove(done);
      dump('ok');
    });
  }, 9000);
});
