import React, { Component, createRef } from 'react';
import { GOOGLE_API_KEY } from '../config';

const defaultRectangleOptions = {
  fillColor: 'rgba(0, 0, 0, 0)',
  strokeColor: '#ed4e79',
  fillOpacity: 1,
  strokeWeight: 5,
  clickable: false,
  editable: false,
  draggable: false,
  zIndex: 1
};

export class GoogleMap extends Component {
  google = null;
  map = null;
  drawingManager = null;
  marker = null;
  ref = createRef();
  libraries = [
    'places',
    'drawing'
  ];

  componentDidMount() {
    this.loadGoogleScript();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.drawingEnabled !== this.props.drawingEnabled) {
      this.toggleDrawing();
    }
    if (prevProps.place !== this.props.place) {
      this.updateMarker();
    }
  }

  updateMarker = () => {
    this.clearMarker();
    const place = this.props.place;
    if (place && place.geometry) {
      this.map.panTo(place.geometry.location);
      this.map.setZoom(15);
      this.marker = new this.google.maps.Marker({
        position: place.geometry.location,
        map: this.map
      });
    }
  };

  clearMarker = () => {
    if (this.marker) {
      this.marker.setMap(null);
      this.marker = null;
    }
  };

  toggleDrawing = () => {
    if (!this.drawingManager || !this.google) {
      return;
    }
    this.drawingManager.setOptions({
      drawingMode: this.props.drawingEnabled ? this.google.maps.drawing.OverlayType.RECTANGLE : null
    });
    this.drawingManager.setMap(this.map);
  };

  loadGoogleScript = () => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=${this.libraries.join(',')}`;
    window.document.body.appendChild(script);
    script.addEventListener('load', () => {
      this.props.onGoogleScriptLoaded();
      this.initializeMap();
    })
  };

  initializeMap = () => {
    if (!window.google) {
      return;
    }
    this.google = window.google;
    this.map = new this.google.maps.Map(this.ref.current, {
      center: {lat: 32.083333, lng: 34.7999968},
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false
    });
    this.drawingManager = new this.google.maps.drawing.DrawingManager({
      drawingControl: false,
      rectangleOptions: defaultRectangleOptions
    });
    this.drawingManager.setMap(this.map);
    this.google.maps.event.addListener(this.drawingManager, 'rectanglecomplete', (rectangle) => {
      this.drawingManager.setOptions({
        ...defaultRectangleOptions,
        drawingMode: null
      });
      this.drawingManager.setMap(this.map);
      this.props.onAreaDrawn(rectangle);
    });
  };

  render() {
    return (
      <div
        id="map"
        ref={this.ref}
        style={{height: '500px'}}
      />
    );
  }
}
