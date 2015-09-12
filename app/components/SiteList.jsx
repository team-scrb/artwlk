import React from 'react';

// styles
import '../styles/components/SiteList';

export default class SiteList extends React.Component {
  constructor(props) {
    super(props);

    this.siteDetailClick = this.siteDetailClick.bind(this);
  }

  componentDidMount() {
    this.props.getSites();
  }

  siteDetailClick(event) {
    const router = this.context.router;
    router.transitionTo('sites-detail', { siteId: event.target.dataset.route });
  }

  render() {
    let sites = this.props.sites;

    if (this.props.limit) {
      sites = sites.slice(0, parseInt(this.props.limit, 10));
    }

    const siteList = sites.map((data, index) => {
      return (
        <li key={index}>
          {data.siteInfo.imageUrl && <img src={data.siteInfo.imageUrl}/>}
          {data.siteInfo.name && <h3 data-route={data.siteId} onClick={this.siteDetailClick}>{data.siteInfo.name}</h3>}
          {data.siteInfo.artist && <h5>{data.siteInfo.artist}</h5>}
          {data.siteInfo.coords && <h5>{data.siteInfo.coords}</h5>}
          {data.siteInfo.architecture && <h6>{data.siteInfo.architecture}</h6>}
          {data.siteInfo.streetArt && <h6>{data.siteInfo.streetArt}</h6>}
          {data.siteInfo.description && <p>{data.siteInfo.description}</p>}
        </li>
      );
    });

    return (
      <ul>
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
  limit: React.PropTypes.string,
};
