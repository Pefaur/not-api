import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import { CheckCircle, RemoveCircle } from '@mui/icons-material';
import { green, red, yellow } from '@mui/material/colors';
import axios from 'axios';

export default function ResponseList({port, uriKey, responses}) {
  const [checked, setChecked] = useState(0);

  const onChange = async(port, index, key, response) => {
    // update api
    await axios.post(`http://localhost:${port}/config/change/${encodeURIComponent(key)}`, response)
    setChecked(index);
  };

  const PrettyPrintJson = (data) => (<div><pre>{ 
    JSON.stringify(data, undefined, 2) }</pre></div>);
  
  const getColor = (statusCode) => statusCode >= 400 ? red[500] : green[500];
  const getBgColor = (selected) => selected ? yellow[100] : 'white';

  const getId = (name, index) => name.replace(/\s/g, '') + index;

  return (
    <List
      sx={{ width: '100%',  bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Respuesta</ListSubheader>}
    >
        {
            responses.map((e, index) => (
                <ListItem sx={{ bgcolor:  getBgColor(checked === index),  width: 'auto' }}>
                    <ListItemIcon>
                        { checked === index ? (
                            <CheckCircle htmlColor={getColor(e.statusCode)} />
                        ) : 
                        (
                            <RemoveCircle htmlColor={getColor(e.statusCode)} />
                        )
                        }
                    </ListItemIcon>
                    <ListItemText id={getId(e.name, index)} primary={e.name} secondary={PrettyPrintJson(e.response)} />
                    <ListItemText style={{ width: '20%', textAlign: 'right', display: 'inline-block' }} id={getId(e.name + '2', index)} primary={`${e.delay} ms`} />

                    <Switch
                    edge="end"
                    onChange={() => onChange(port, index, uriKey, e)}
                    checked={checked === index}
                    inputProps={{
                        'aria-labelledby': 'switch-list-label-wifi',
                    }}
                    />
                </ListItem>
            ))
        }
    </List>
  );
}