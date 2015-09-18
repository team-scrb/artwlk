import React from 'react';

// styles
import '../styles/components/SiteList';

export default class SiteList extends React.Component {
  constructor(props) {
    super(props);

    this.siteDetailClick = this.siteDetailClick.bind(this);
  }

  siteDetailClick(event) {
    const router = this.context.router;
    this.props.getCurrSite(event.target.dataset.route);
    this.props.setCurrMap('singleSite');
    router.transitionTo('sites-detail', { siteId: event.target.dataset.route });
  }

  render() {
    let sites = this.props.sites;
    let siteList = null;

    if (this.props.limit) {
      sites = sites.slice(0, parseInt(this.props.limit, 10));
    }

    if (sites) {
      siteList = sites.map((data, index) => {
        const imageStyle = {
          backgroundImage: `url(${data.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '120px',
        };

        return (
          <li
            className="SiteList__site"
            key={index}
            data-route={data.id}
            onClick={this.siteDetailClick}
          >
            {data.imageUrl && (<div
              className="SiteList__site-hero-img"
              style={imageStyle}
            />)}
            <span className="SiteList__site-meta">
              {data.name && (<h3 className="SiteList__site-title">{data.name}</h3>)}
              {data.artist && (<span className="SiteList__site-artist">{data.artist}</span>)}
            </span>
          </li>
        );
      });
    }

    return (
      <ul className="SiteList__sites">
        {siteList}
      </ul>
    );
  }
}

SiteList.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

SiteList.propTypes = {
  getSites: React.PropTypes.func.isRequired,
  sites: React.PropTypes.array.isRequired,
  getCurrSite: React.PropTypes.func.isRequired,
  setCurrMap: React.PropTypes.func.isRequired,
  limit: React.PropTypes.string,
};
