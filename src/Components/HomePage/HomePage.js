import React from 'react'
import {Grid, Paper} from '@material-ui/core'
import NavBar from '../NavBar/NavBar'

const HomePage = () => {
    return (
      <div>
          <NavBar/>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Paper>
              Welcome
              Welcome
              Welcome
              Welcome
              Welcome
              Welcome
              Welcome
              Welcome
              Welcome
              Welcome
              Welcome
          </Paper>
        </Grid>
      </div>
    );
}

export default HomePage
