import {getLocation, onSitesWithinRadius} from './geo';
import {findToursBySiteId, getTourById} from './tours';
import {getSiteByKey} from './sites';

const geocode = locationText => {
  return new Promise(resolve => {
    (new google.maps.Geocoder).geocode({address: locationText}, ([{geometry: {location: latLng}}], status) => {
      if (status !== 'OK') return reject(status);
      const {H: latitude, L: longitude} = latLng;
      resolve({coords: {latitude, longitude}});
    });
  });
};

export const onSearch = ({searchText, locationText}, filterSettings, handleSearchResult) => {
  // for all nearby sites, filter sites by search text and display those sites and tours that contain them.
  let query = searchText ? searchText.toLowerCase().split(' ') : [];
  const location = locationText ? geocode(locationText) : getLocation();
  const {distance} = filterSettings;
  query = query.concat(Object.keys(filterSettings).filter(key => {
    const val = filterSettings[key];
    return typeof val === 'boolean' && val;
  }));
  return location.then((center) => {
    const foundSites = {};
    const foundTours = {};
    onSitesWithinRadius(center, distance || 10, siteId => {
      if (siteId in foundSites) return;
      foundSites[siteId] = true;

      // find tours matching query
      findToursBySiteId(siteId)
      .then(tourIds => {
        tourIds.forEach(tourId => {
          if (tourId in foundTours) return;
          foundTours[tourId] = true;
          getTourById(tourId)
          .then(tour => {
            return Promise.all(tour.sites.map(site => {
              return getSiteByKey(site);
            }))
            .then(sites => {
              tour.sites = sites;
              tour.categories = {};
              tour.sites.forEach(site => {
                Object.keys(site.category).forEach(key => {
                  if (site.category[key]) {
                    tour.categories[key] = true;
                  }
                });
              });
              tour.imageUrl = tour.sites[0].imageUrl;
              return tour;
            });
          })
          .then(tour => {
            tour.id = tourId;
            const {title, descriptions} = tour;
            const attributes = [title, descriptions]
            .concat(Object.keys(tour.categories)).filter(key => tour.categories[key])
            .map(attr => attr.toLowerCase());
            if (attributes.some(attr => !query.length || query.some(q => attr.indexOf(q) !== -1))) {
              handleSearchResult('tour', tour);
            }
          })
          .catch(error => console.error(error)); // eslint-disable-line no-console
        });
      });

      // find sites matching query
      getSiteByKey(siteId)
      .then(site => {
        const {name, artist, category} = site;
        site.id = siteId;
        const attributes = [name, artist].concat(Object.keys(category).filter(key => category[key])).map(attr => attr.toLowerCase());
        if (attributes.some(attr => !query.length || query.some(q => attr.indexOf(q) !== -1))) {
          handleSearchResult('site', site);

          // find tours referenced by this site
          findToursBySiteId(siteId)
          .then(tourIds => {
            tourIds.forEach(tourId => {
              if (tourId in foundTours) return;
              foundTours[tourId] = true;
              getTourById(tourId)
              .then(tour => {
                return Promise.all(tour.sites.map(_site => {
                  return getSiteByKey(_site);
                }))
                .then(sites => {
                  tour.sites = sites;
                  tour.categories = {};
                  tour.sites.forEach(_site => {
                    Object.keys(_site.category).forEach(key => {
                      if (_site.category[key]) {
                        tour.categories[key] = true;
                      }
                    });
                  });
                  tour.imageUrl = tour.sites[0].imageUrl;
                  return tour;
                });
              })
              .then(tour => {
                tour.id = tourId;
                handleSearchResult('tour', tour);
              })
              .catch(error => console.error(error)); // eslint-disable-line no-console
            });
          });
        }
      });
    });
    return center;
  });
};
