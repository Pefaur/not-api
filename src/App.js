import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import CardList from './components/CardList';
import { apiService } from './services/api';
 
function Copyright() {
  const curretYear = new Date().getFullYear();
  return (
    <Typography variant="body2" color="text.secondary" align="center" pt="10px">
      {`Made with 🖤 NotAPI ${curretYear}`}
    </Typography>
  );
}

const App = () => {
  const [data, setData] = useState([]);
  const [config, setConfig] = useState({});

  useEffect(() => {
    (async () => {
      const port = 5022;
      const config = await apiService.getConfig(port);
      const { data } = await apiService.getConfigData(port);
      setConfig(config);
      setData(data);
    })()
  }, []);

  return (
    <Container maxWidth="lg" style={styles.container}>
      <Box style={styles.content}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {config.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="h1" ml={1}>
              {config.description}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Port: {config.port}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Origin: {config.origin || 'none'}
            </Typography>
          </Box>
        </Box>
        {data.length && <CardList data={{ port: config.port, api: data }} />}
      </Box>
      <Box component="footer" style={styles.footer}>
        <Copyright />
      </Box>
    </Container>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    margin: '16px 0',
    flex: 1,
  },
  footer: {
    padding: '16px 0',
  },
};

export default App;
