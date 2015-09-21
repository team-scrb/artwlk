import React from 'react';
import {Draggable, Droppable} from 'react-drag-and-drop';
import {addTour} from '../utils/tours';

// styles
import '../styles/components/CreateTour';

export default class CreateTour extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.save = this.save.bind(this);
    this.selectSites = this.selectSites.bind(this);
  }

  componentWillMount() {
    this.props.setTopBar({
      title: 'Create',
    });
  }

  onDrop(targetId, {site: droppedId}) {
    const sites = this.props.selectedSites.slice();
    const droppedIndex = sites.findIndex(site => site.id === droppedId);
    const [dropped] = sites.splice(droppedIndex, 1);
    const targetIndex = sites.findIndex(site => site.id === targetId);
    sites.splice(targetIndex === droppedIndex ? targetIndex + 1 : targetIndex, 0, dropped);
    this.props.reorderSites(sites);
  }

  save(event) {
    event.preventDefault();
    addTour({
      title: this.refs.title.getDOMNode().value,
      descriptions: this.refs.description.getDOMNode().value,
      sites: this.props.selectedSites,
    }).then(() => {
      this.props.saveTourFormData({
        title: '',
        description: '',
      });

      this.props.selectSites([]);
      this.refs.title.getDOMNode().value = '';
      this.refs.description.getDOMNode().value = '';
      this.context.router.transitionTo('tours');
    });
  }

  selectSites(event) {
    event.preventDefault();
    this.props.saveTourFormData({
      title: this.refs.title.getDOMNode().value,
      description: this.refs.description.getDOMNode().value,
    });

    this.context.router.transitionTo('create-tour-site-selector');
  }

  render() {
    const list = this.props.selectedSites.map(n => {
      return (
        <div>
          <Droppable
              types={['site']}
              onDrop={this.onDrop.bind(null, n.id)}>
              <Draggable type="site" data={n.id}><li className="CreateTour__form-list-item">{n.name}</li></Draggable>
          </Droppable>
        </div>
      );
    });

    return (
      <div className="CreateTour">
        <h1>Create Tour</h1>
        <form className="CreateTour__form" onSubmit={this.save}>
          <div className="CreateSection__form-container">
            <label className="CreateTour__form-label">
              Title
              <input className="CreateTour__form-input" type="text" ref="title" defaultValue={this.props.tourFormData && this.props.tourFormData.title} />
            </label>
            <label className="CreateTour__form-label">
              Description
              <input className="CreateTour__form-input" type="text" ref="description" defaultValue={this.props.tourFormData && this.props.tourFormData.description} />
            </label>
            <p className="CreateTour__form-label">Selected Sites:</p>
            <span className="CreateTour__form-label-emphasized">Drag and drop to reorder</span>
            <ol className="CreateTour__form-list">
              {list}
            </ol>
          </div>
          <div className="CreateTour__form-submit-container">
            <button onClick={this.selectSites} className="CreateTour__form-select">Select Sites</button>
            <input type="submit" name="Save" className="CreateTour__form-submit" />
          </div>
        </form>
      </div>
    );
  }
}

CreateTour.propTypes = {
  setTopBar: React.PropTypes.func.isRequired,
  selectedSites: React.PropTypes.array.isRequired,
  reorderSites: React.PropTypes.func.isRequired,
  saveTourFormData: React.PropTypes.func.isRequired,
  tourFormData: React.PropTypes.object.isRequired,
  selectSites: React.PropTypes.func.isRequired,
};

CreateTour.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
