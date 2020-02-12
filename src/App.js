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
import Reservations from './components/Reservations'
import Requests from './components/Requests'

function App() {
  const [topPlaces,setTopPlaces] = useState([])
  const [places,setPlaces] = useState([])
  const [selectedPlace,setSelectedPlace] = useState({})
  const [categories,setCategories] = useState([])
  const [isLogged,setIsLogged] = useState({
    status : false
  })

  const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  } return array
  }
  useEffect(() => {

    //top places
    fetch("http://localhost:8000/places", {
      method : "GET"
    })
    .then(data => data.json())
    .then(places => {
      places = places.slice(0,4)
      places = shuffleArray(places)

      setTopPlaces(places)
    })
    .catch(error=>console.log(error))


    // all places
    fetch("http://localhost:8000/places", {
      method : "GET"
    })
    .then(data => data.json())
    .then(places => {
      places = shuffleArray(places)

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

  const handleLogOut = () => {
    setIsLogged({status : false})
    localStorage.clear()

  }

  return (
        <Router>
        <div className="App">
            <Navbar handleLogOut={handleLogOut}/>
            <Switch>
              <Route exact path="/">
                <Places topPlaces={topPlaces} handleSelectedPlace={handleSelectedPlace} categories={categories} places={places} />  
              </Route>
              <Route path={"/places/view"}>
                { !selectedPlace.name ? <Redirect to='/'/> : <PlaceView selectedPlace={selectedPlace} categories={categories} />} 
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
              <Route path={"/reservations"}>
                <Reservations places={places}/>  
              </Route>
              <Route path={"/requests"}>
                <Requests/>  
              </Route>
            </Switch>
        </div>
        </Router>
  );
}

export default App;
