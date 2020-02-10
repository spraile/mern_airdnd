import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from './components/layouts/Navbar';
import Places from './components/Places';
import PlaceView from './components/layouts/PlaceView';
import AddPlace from './components/forms/AddPlace';
import Login from './components/forms/LoginForm';
import Register from './components/forms/RegisterForm';


function App() {
  const [topPlaces,setTopPlaces] = useState([])
  const [selectedPlace,setSelectedPlace] = useState({})
	const [categories,setCategories] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/places", {
      method : "GET"
    })
    .then(data => data.json())
    .then(places => {
      setTopPlaces(places)
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
              <Route path={"/places/add-place"}>
                <AddPlace categories={categories}/>  
              </Route>
              <Route path={"/login"}>
                <Login/>  
              </Route>
              <Route path={"/register"}>
                <Register/>  
              </Route>
            </Switch>
        </div>
        </Router>
  );
}

export default App;
