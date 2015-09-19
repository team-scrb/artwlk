import React from 'react';

// styles
import '../styles/components/SiteList';

export default class SiteList extends React.Component {
  constructor(props) {
    super(props);

    this.siteDetailClick = this.siteDetailClick.bind(this);
  }

  componentWillMount() {
    this.props.renderTopBar();
  }

  siteDetailClick(siteId) {
    const router = this.context.router;
    this.props.getCurrSite(siteId);
    this.props.setCurrMap('singleSite');
    router.transitionTo('sites-detail', { siteId });
  }

  render() {
    let sites = this.props.sites;
    let siteList = null;

    if (this.props.limit) {
      sites = sites.slice(0, parseInt(this.props.limit, 10));
    }

    if (sites) {
      siteList = sites.map((site, index) => {
        const imageStyle = {
          backgroundImage: `url(${site.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '120px',
        };

        return (
          <li
            className="SiteList__site"
            key={index}
            onClick={this.siteDetailClick.bind(null, site.id)}
          >
            {site.imageUrl && (<div
              className="SiteList__site-hero-img"
              style={imageStyle}
            />)}
            <span className="SiteList__site-meta">
              {site.name && (<h3 className="SiteList__site-title">{site.name}</h3>)}
              {site.artist && (<span className="SiteList__site-artist">{site.artist}</span>)}
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
  renderTopBar: React.PropTypes.func.isRequired,
  getSites: React.PropTypes.func.isRequired,
  sites: React.PropTypes.array.isRequired,
  getCurrSite: React.PropTypes.func.isRequired,
  setCurrMap: React.PropTypes.func.isRequired,
  limit: React.PropTypes.string,
};
