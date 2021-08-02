import { useState } from 'react';

import axios from 'axios';

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


// import Alert from '@material-ui/lab/Alert';


function URLShortner(props) {

  const [state, setState] = useState({
    inputText: "",
    error: "",
    shortenedURL: "",
    copiedToClipboard: false,
  });

  const handleInputChange = (event) => { setState({ ...state, inputText: event.target.value }); }

  const isValidURL = () => {
    return (state.inputText && state.inputText.length > 2 && state.inputText.includes(".") && !state.inputText.includes(" ")) ?
      true : false;
  }

  const handleKeypress = (event) =>{ if (event.key === 'Enter') { handleSubmitURL(); } }

  const handleSubmitURL = () => {
    if (isValidURL()) {
      axios.post(`/shorten?url=${state.inputText}`)
        .then(respose => {
          setState({...state, inputText: "", shortenedURL: respose.data.shortenURL});
        })
        .catch(error => {
          setState({...state, error: error});
        })
    } else {
      setState({...state, error: "Provided URL is not valid, please check and try again."});
    }
  }

  const handleCopyToClipboard = () => {
    if (state.shortenedURL) {
      navigator.clipboard.writeText(state.shortenedURL)
        .then(function () {
          setState({ ...state, copiedToClipboard: true })
  
        }, function () {
          setState({ ...state, copiedToClipboard: false })
        });
    }
  }

  const clearError = () => { setState({...state, error: ""}) }

  return (
    <Grid container direction="row" justifyContent="center" alignItems="flex-start" >
      <Grid item xs={11} sm={9} md={7}>
        {/* Error block */}
        {
          (state.error) ?
              <Alert style={{maxWidth: '100%',margin: '20px 0px'}} 
              onClose={clearError}
              severity="error">
                {state.error}
              </Alert>
          : ""
        }

        {/* Input section */}
        <Paper elevation={5} style={{padding: '30px 16px', margin: '20px 0px'}}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item xs={7} sm={9} md={9} lg={10}>
            <TextField
              autoFocus
              variant="outlined" size="small" fullWidth
              value={state.inputText} label="Shorten your link"
              onChange={handleInputChange} onKeyPress={handleKeypress}
            />
          </Grid>
          <Button
            variant="contained" color="primary"
            title={"Submit to shorten URL"} onClick={handleSubmitURL}
          >
            {"Shorten"}
          </Button>
        </Grid>
        </Paper >

        {/* Copy block */}
        {
          (state.shortenedURL) ?
            <Paper elevation={5} style={{padding: '30px 16px', margin: '20px 0px'}}>
              <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                <Grid item xs={11} sm={12} md={4}>
                  <Typography variant="subtitle2" gutterBottom>
                    {(state.shortenedURL.length < 50) ? state.shortenedURL :state.shortenedURL.substring(0, 50)}
                  </Typography>
                </Grid>
                <Grid item xs={11} sm={7} md={4}>
                  <a href={state.shortenedURL} rel="noreferrer" target={"_blank"}>{state.shortenedURL}</a>
                </Grid>
                <Grid item xs={11} sm={4} md={2}>
                  {
                    (!state.copiedToClipboard) ?
                      <Button
                        variant="outlined" color="primary"
                        disabled={(state.copiedToClipboard) ? true : false}
                        title={"Copy shortened URL to clipboard"}
                        onClick={handleCopyToClipboard}
                      >
                        {"Copy"}
                      </Button>
                    : <Alert severity="info"> {"Copied"} </Alert>
                  }
                </Grid>
              </Grid>
            </Paper>
          : ""
        }
      </Grid>
    </Grid>
  );
}

export default URLShortner;
