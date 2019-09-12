import React from 'react';
import Input from '@material-ui/core/Input';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { Done } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';

export const CreateArea = ({value, onChange, isAreaDrawn, onSave}) => {
  return (
    <Paper className="area">
      <Input
        value={value}
        onChange={onChange}
        placeholder='Area name'
        disableUnderline={true}
      />
      <Tooltip title={isAreaDrawn ? '' : 'Please draw the area on the map and enter the name.'} placement="top">
        <Box>
          <IconButton aria-label="save area" onClick={onSave} disabled={!isAreaDrawn || !value}>
            <Done color="primary"/>
          </IconButton>
        </Box>
      </Tooltip>
    </Paper>
  )
};
