// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Spots from './components/Spots'
import SpotId from "./components/Spots/SpotDetailPage";
import Navigation from "./components/Navigation";
import {Route} from "react-router-dom"



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch></Switch>}
      <Switch>
        <Route exact path="/">
          <Spots />
        </Route>
        <Route path="/spots/:spotId">
          <SpotId />
        </Route>
      </Switch>
    </>
  );
}

export default App;
