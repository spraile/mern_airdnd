import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Navbar from './components/layouts/Navbar';
import Places from './components/Places';
import PlaceView from './components/layouts/PlaceView';
import AddPlace from './components/forms/AddPlace';
import Login from './components/forms/LoginForm';
import Register from './components/forms/RegisterForm';
import DayPicker from './components/layouts/DayPicker'
import HostPanel from './components/HostPanel'

function App() {
  const [topPlaces,setTopPlaces] = useState([])
  const [places,setPlaces] = useState([])
  const [selectedPlace,setSelectedPlace] = useState({})
  const [categories,setCategories] = useState([])
  const [isLogged,setIsLogged] = useState({
    status : false
  })

  useEffect(() => {

    //top places
    fetch("http://localhost:8000/places", {
      method : "GET"
    })
    .then(data => data.json())
    .then(places => {
      places = places.slice(0,4)
      setTopPlaces(places)
    })
    .catch(error=>console.log(error))


    // all places
    fetch("http://localhost:8000/places", {
      method : "GET"
    })
    .then(data => data.json())
    .then(places => {
      setPlaces(places)
    })
    .catch(error=>console.log(error))

    fetch("http://localhost:8000/categories", {
			method : "GET"
		})
		.then(data => data.json())
		.then(categories => {
			setCategories(categories)
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

  const handleIsLogged = () => {
    setIsLogged({status : true})
  }

  return (
        <Router>
        <div className="App">
            <Navbar/>
            <Switch>
              <Route exact path="/">
                <Places topPlaces={topPlaces} handleSelectedPlace={handleSelectedPlace} categories={categories} />  
              </Route>
              <Route path={"/places/view"}>
                { !selectedPlace.name ? <Redirect to='/'/> : <PlaceView selectedPlace={selectedPlace} />} 
              </Route>
              <Route path={"/my-places"}>
                <HostPanel 
                  selectedPlace={selectedPlace} 
                  categories={categories} 
                  places={places} 
                  handleSelectedPlace={handleSelectedPlace}
                />  
              </Route>
              <Route path={"/places/add-place"}>
                <AddPlace categories={categories}/>  
              </Route>
              <Route path={"/login"}>
                {isLogged.status ? <Redirect to ="/" /> : <Login handleIsLogged={handleIsLogged}/>}  
              </Route>
              <Route path={"/register"}>
                <Register/>  
              </Route>
              <Route path={"/daypicker"}>
                <DayPicker />  
              </Route>
            </Switch>
        </div>
        </Router>
  );
}

export default App;
