import React from 'react';
import {RouteHandler} from 'react-router';
import {getLocation} from '../utils/geo';

// styles
import '../styles/components/SiteSection';

export default class SiteSection extends React.Component {
  constructor(props) {
    super(props);
    this.siteDetailClick = this.siteDetailClick.bind(this);
  }

  componentDidMount() {
    getLocation().then(this.props.getSites);
  }

  siteDetailClick(event) {
    const router = this.context.router;
    router.transitionTo('sites-detail', { siteId: event.target.dataset.route });
  }

  render() {
    const siteList = this.props.sites.map((data, index) => {
      return (
        <li className="" key={index}>
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
      <div className="SiteSection">
        <RouteHandler
          {...this.state}
          {...this.props}
        />

        <h2>Browse our sites!!!</h2>
        <ul>
          {siteList}
        </ul>
      </div>
    );
  }
}

SiteSection.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

SiteSection.propTypes = {
  getSites: React.PropTypes.func.isRequired,
  sites: React.PropTypes.array.isRequired,
};
