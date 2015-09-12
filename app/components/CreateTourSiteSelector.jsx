import React from 'react';
import {getAllSites} from '../utils/sites';

export default class CreateTourSiteSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [],
    };

    this.done = this.done.bind(this);
  }

  componentDidMount() {
    getAllSites().then(sites => {
      this.setState({sites}, () => {
        this.state.sites.forEach((n, i) => {
          if (this.props.selectedSites.find(site => site.id === n.id)) {
            this.refs['site' + i].getDOMNode().checked = true;
          }
        });
      });
    });
  }

  done() {
    const selected = this.state.sites.filter((n, i) =>
      this.refs['site' + i].getDOMNode().checked
    );
    this.props.selectSites(selected);
    this.context.router.transitionTo('create-tour');
  }


  render() {
    const list = this.state.sites.map((n, i) =>
      <label><input type="checkbox" ref={'site' + i}/>{n.name}</label>
    );

    return (
      <div>
        {list}
        <button onClick={this.done}>Done</button>
      </div>
    );
  }
}

CreateTourSiteSelector.propTypes = {
  selectSites: React.PropTypes.func.isRequired,
  selectedSites: React.PropTypes.array.isRequired,
};

CreateTourSiteSelector.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
