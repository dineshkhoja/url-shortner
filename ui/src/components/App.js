import React from "react";

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import URLShortner from './URLShortner';

function App(props) {

  return (
    <Grid  container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={0}>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" >
              {"Smart URL"}
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        <URLShortner />
      </Grid>
    </Grid>
  );
}

export default App;
