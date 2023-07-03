// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Spots from './components/Spots'
import SpotId from "./components/Spots/SpotDetailPage";
import NewSpot from "./components/Spots/CreateNewSpot";
import Navigation from "./components/Navigation";
import UserSpots from "./components/Spots/GetAllUserSpots";
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
        <Route exact path="/spots/" >
          {/* <NewSpot /> */}
          <h2>create new spot, dont forget to import component at top</h2>
        </Route>
        <Route path="/spots/current">
          <UserSpots />
        </Route>
        <Route path="/spots/:spotId">
          <SpotId />
        </Route>
      </Switch>
    </>
  );
}

export default App;
