import { CheckCircle } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText, Switch } from "@mui/material";

const PrettyPrintJson = (data) => (<div><pre>{ 
    JSON.stringify(data, undefined, 2) }</pre></div>);

const ResponseItem = (bgColor, methodColor, jsonResponse, onSelect, isChecked) => (
    <ListItem sx={{ bgcolor: bgColor }}>
    <ListItemIcon>
      <CheckCircle htmlColor={methodColor} />
    </ListItemIcon>
    <ListItemText id="switch-list-label-wifi" primary="Login Success" secondary={PrettyPrintJson(jsonResponse)} />
    <Switch
      edge="end"
      onChange={onSelect}
      checked={isChecked}
      inputProps={{
        'aria-labelledby': 'switch-list-label-wifi',
      }}
    />
  </ListItem>
);

export default ResponseItem;