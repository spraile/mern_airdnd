import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from './components/layouts/Navbar';
import Places from './components/Places';
import PlaceView from './components/layouts/PlaceView';


function App() {
  const [topPlaces,setTopPlaces] = useState([])
  const [selectedPlace,setSelectedPlace] = useState({})
  useEffect(() => {
    fetch("http://localhost:8000/places", {
      method : "GET"
    })
    .then(data => data.json())
    .then(places => {
      setTopPlaces(places)
    })
    .catch(error=>console.log(error))

  }, [])

  const handleSelectedPlace = (placeid) => {
    fetch("http://localhost:8000/places/"+placeid,{
      method : "GET"
    })
    .then(data => data.json())
    .then(place=>{
      setSelectedPlace(place)
    })
    .catch(error=>console.log(error))
  }

  return (
        <Router>
        <div className="App">
            <Navbar/>
            <Switch>
              <Route exact path="/">
                <Places topPlaces={topPlaces} handleSelectedPlace={handleSelectedPlace}/>  
              </Route>
              <Route path={"/places/view"}>
                <PlaceView selectedPlace={selectedPlace} />  
              </Route>
            </Switch>
        </div>
        </Router>
  );
}

export default App;
