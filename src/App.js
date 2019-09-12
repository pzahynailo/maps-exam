import React, { Component } from 'react';
import './App.scss';
import { GoogleMap } from './components/GoogleMap';
import { Search } from './components/Search';
import Grid from '@material-ui/core/Grid';
import { Header } from './components/Header';
import { Box } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { AreasMenu } from './components/AreasMenu';
import { generateSimpleId } from './utils';

class App extends Component {
  state = {
    drawingEnabled: false,
    areas: [],
    areaInProgress: null,
    googleScriptLoaded: false,
    place: null,
    edit: false
  };

  onClickAdd = () => {
    this.setState({
      drawingEnabled: true
    });
  };

  onClickEdit = area => {
    this.setState({
      drawingEnabled: true,
      edit: true,
      areaInProgress: area
    });
    this.removeAreaFromMap(area);
  };

  onAreaDrawn = area => {
    if (this.state.edit) {
      this.replaceAreaReference(area);
      return;
    }
    // we should cache reference to rectangle object
    this.setState({
      areaInProgress: {
        reference: area,
        name: '',
        id: generateSimpleId()
      }
    });
  };

  replaceAreaReference = reference => {
    const areas = [...this.state.areas];
    const index = areas.findIndex(area => area.id === this.state.areaInProgress.id);
    if (index !== -1) {
      areas[index].reference = reference;
    }
    this.setState({
      edit: false,
      areas,
      areaInProgress: null,
      drawingEnabled: false
    })
  };

  onSaveArea = name => {
    this.setState(prevState => ({
      drawingEnabled: false,
      areaInProgress: null,
      areas: [
        ...prevState.areas,
        {
          ...prevState.areaInProgress,
          name
        }
      ]
    }));
  };

  onDeleteArea = area => {
    this.removeAreaFromMap(area);
    const areas = [...this.state.areas];
    const index = areas.findIndex(a => a.id === area.id);
    areas.splice(index, 1);
    this.setState({
      areas
    });
  };

  removeAreaFromMap = area => {
    area.reference.setMap(null);
    area.reference = null;
  };

  onGoogleScriptLoaded = () => {
    this.setState({
      googleScriptLoaded: true
    });
  };

  onSearch = place => {
    this.setState({place});
  };

  render() {
    return (
      <Box className="App">
        <Header/>
        <Container className="app-container">
          <Search
            googleScriptLoaded={this.state.googleScriptLoaded}
            onSearch={this.onSearch}
          />
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <GoogleMap
                drawingEnabled={this.state.drawingEnabled}
                onAreaDrawn={this.onAreaDrawn}
                onGoogleScriptLoaded={this.onGoogleScriptLoaded}
                place={this.state.place}
              />
            </Grid>
            <Grid item xs={4}>
              <AreasMenu
                onClickAdd={this.onClickAdd}
                onClickEdit={this.onClickEdit}
                onDeleteArea={this.onDeleteArea}
                areas={this.state.areas}
                areaInProgress={this.state.areaInProgress}
                onSaveArea={this.onSaveArea}
                edit={this.state.edit}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }
}

export default App;
