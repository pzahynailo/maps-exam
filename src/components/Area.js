import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { Delete, DeleteForever, Edit, Undo } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

export class Area extends Component {
  state = {
    delete: false
  };

  onDeleteClick = () => {
    this.setState({delete: true});
  };

  onUndoClick = () => {
    this.setState({delete: false});
  };

  onConfirmDelete = () => {
    this.setState({delete: false});
    this.props.onDelete();
  };

  render() {
    const { area } = this.props;
    return (
      <Paper className='area'>
        <Typography noWrap={true}>
          {area.name}
        </Typography>
        <Box className="show-on-hover">
          {!this.state.delete && !this.props.edit && (
            <React.Fragment>
              <Tooltip title={'Edit area'} placement="top">
                <IconButton aria-label="edit area" onClick={this.props.onEdit}>
                  <Edit color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip title={'Delete area'} placement="top">
                <IconButton aria-label="delete area" onClick={this.onDeleteClick}>
                  <Delete color="primary" />
                </IconButton>
              </Tooltip>
            </React.Fragment>
          )}
          {this.state.delete && !this.props.edit && (
            <React.Fragment>
              <Tooltip title={'Undo'} placement="top">
                <IconButton aria-label="undo delete area" onClick={this.onUndoClick}>
                  <Undo color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip title={'Confirm Deletion'} placement="top">
                <IconButton aria-label="confirm delete area" onClick={this.onConfirmDelete}>
                  <DeleteForever color="primary" />
                </IconButton>
              </Tooltip>
            </React.Fragment>
          )}
        </Box>
      </Paper>
    )
  }
}
