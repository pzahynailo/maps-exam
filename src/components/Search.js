import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './Search.scss';

export class Search extends Component {
  state = {
    place: null
  };

  componentDidMount() {
    if (this.props.googleScriptLoaded) {
      this.initialize();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.googleScriptLoaded && !prevProps.googleScriptLoaded) {
      this.initialize();
    }
  }

  initialize() {
    const google = window.google;
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
    this.autocomplete.setFields(['geometry']);
    this.autocomplete.addListener('place_changed', this.onPlaceChanged);
  }

  onPlaceChanged = () => {
    const place = this.autocomplete.getPlace();
    this.setState({
      place
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSearch(this.state.place);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="search">
        <TextField id="autocomplete" required={true} className="search__input" />
        <Button variant="outlined" color="primary" type="submit">
          Search
        </Button>
      </form>
    )
  }
}
