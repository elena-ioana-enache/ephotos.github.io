import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import UploadImage from './containers/UploadImage/UploadImage';
import DisplayImages from './containers/DisplayImages/DisplayImages';
import Layout from './hoc/Layout/Layout';
import FlickrSearch from './containers/FlickrSearch/FlickrSearch';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/flickr" component={FlickrSearch} />
          <Route path="/upload" component={UploadImage} />
          <Route path="/" component={DisplayImages} />
        </Switch>
      </Layout>
    </div >
  );
}

export default App;
