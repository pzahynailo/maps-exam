import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import './AreasMenu.scss';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { CreateArea } from './CreateArea';
import { Area } from './Area';
import { ShareButtons } from './ShareButtons';
import Box from '@material-ui/core/Box';

export class AreasMenu extends Component {
  state = {
    create: false,
    name: '',
    showShareButtons: false
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.place !== this.props.place) {
      if (!this.props.place) {
        this.setState({showShareButtons: false});
      }
    }
  }

  onClickAdd = () => {
    this.setState({
      create: true
    });
    this.props.onClickAdd();
  };

  onClickEdit = area => {
    this.props.onClickEdit(area);
  };

  handleNameChange = event => {
    this.setState({name: event.target.value});
  };

  onSaveArea = () => {
    this.setState({
      create: false,
      name: ''
    });
    this.props.onSaveArea(this.state.name);
  };

  onExport = () => {
    window.print();
  };

  onShare = () => {
    this.setState({
      showShareButtons: true
    });
  };

  render() {
    return (
      <Card className="areas-menu">
        <CardContent className="areas-menu__content">
          {this.props.areas.map(area => (
            <Area
              key={area.id}
              area={area}
              edit={this.props.edit}
              onEdit={() => this.onClickEdit(area)}
              onDelete={() => this.props.onDeleteArea(area)}
            />
          ))}
          {this.state.create && (
            <CreateArea
              value={this.state.name}
              onChange={this.handleNameChange}
              isAreaDrawn={!!this.props.areaInProgress}
              onSave={this.onSaveArea}
            />
          )}
          {!this.props.edit && !this.state.create && (
            <Tooltip title="Add new area" placement="top" onClick={this.onClickAdd}>
              <Fab size="small" color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </Tooltip>
          )}
        </CardContent>
        <CardActions className="areas-menu__actions">
          <Button variant="outlined" color="primary" onClick={this.onExport}>
            Export to PDF
          </Button>
          {this.state.showShareButtons ? (
            <ShareButtons place={this.props.place} />
          ) : (
            <Tooltip title={this.props.place ? '' : 'Please, select place on the map using search'}>
              <Box>
                <Button variant="outlined" color="primary" onClick={this.onShare} disabled={!this.props.place}>
                  Share
                </Button>
              </Box>
            </Tooltip>
          )}
        </CardActions>
      </Card>
    );
  }
}
