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

  const [placesStatus,setPlacesStatus] = useState({
    lastUpdated : null,
    status : null,
    isLoading : false
  })



  // useeffect on places
  useEffect(() => {
    fetch("https://cap3db.herokuapp.com/places", {
      method : "GET"
    })
    .then(data => data.json())
    .then(places => {
       places = shuffleArray(places)

      setPlaces(places)
           
      setPlacesStatus({isLoading : false})

    })
  }, [placesStatus.isLoading])  

  const handlePlacesStatus = (status) => {
    setPlacesStatus(status)
  }


  // for reservations
  const [reservations,setReservations] = useState([])

   const [reservationsStatus,setReservationsStatus] = useState({
    lastUpdated : null,
    status : null,
    isLoading : false
  })

  useEffect(() => {
    fetch('https://cap3db.herokuapp.com/reservations/',{
      headers : {
        "Authorization" : localStorage.getItem('token')
      }
    })
    .then(data => data.json())
    .then(reservations => {
      setReservations(reservations)
    })
    .catch(error => console.log(error))
  },[])

  useEffect(() => {
    fetch('https://cap3db.herokuapp.com/reservations/',{
      headers : {
        "Authorization" : localStorage.getItem('token')
      }
    })
    .then(data => data.json())
    .then(reservations => {
      setReservations(reservations)
          setReservationsStatus({isLoading : false})

    })
    .catch(error => console.log(error))
  },[reservationsStatus.isLoading])

  const handleReservationsStatus = (status) => {
    setReservationsStatus(status)
  }


  const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  } return array
  }
  useEffect(() => {

    //top places
    fetch("https://cap3db.herokuapp.com/places", {
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
    fetch("https://cap3db.herokuapp.com/places", {
      method : "GET"
    })
    .then(data => data.json())
    .then(places => {
      places = shuffleArray(places)

      setPlaces(places)
    })
    .catch(error=>console.log(error))

    fetch("https://cap3db.herokuapp.com/categories", {
			method : "GET"
		})
		.then(data => data.json())
		.then(categories => {
			setCategories(categories)
    })
    .catch(error=>console.log(error))
    

  }, [])

  const handleSelectedPlace = (placeid) => {
    fetch("https://cap3db.herokuapp.com/places/"+placeid,{
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

  let usr = localStorage.getItem('user')

  return (
        <Router>
        <div className="App">
            <Navbar handleLogOut={handleLogOut}/>
            <Switch>
              {
                if(usr) {
                  if(usr.role == 'admin') {
                    return (
                      <Route path={"/requests"}>
                        <Requests/>  
                      </Route>
                    )
                  } else if (usr.role == 'host') {
                    <Route path={"/my-places"}>
                      <HostPanel 
                        selectedPlace={selectedPlace} 
                        categories={categories} 
                        places={places} 
                        handleSelectedPlace={handleSelectedPlace}
                        handlePlacesStatus={handlePlacesStatus}
                      />  
                    </Route>
                    <Route path={"/places/add-place"}>
                      <AddPlace categories={categories} handlePlacesStatus={handlePlacesStatus}/>  
                    </Route>

                  }
                }
              }
              <Route exact path="/">
                <Places topPlaces={topPlaces} handleSelectedPlace={handleSelectedPlace} categories={categories} places={places} />  
              </Route>
              <Route path={"/places/view"}>
                { !selectedPlace.name ? <Redirect to='/'/> : <PlaceView selectedPlace={selectedPlace} categories={categories} handleReservationsStatus={handleReservationsStatus} />} 
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
                <Reservations places={places} reservations={reservations} handlePlacesStatus={handlePlacesStatus} handleReservationsStatus={handleReservationsStatus}/>  
              </Route>
              
            </Switch>
        </div>
        </Router>
  );
}

export default App;


{/*<Route exact path="/">
                <Places topPlaces={topPlaces} handleSelectedPlace={handleSelectedPlace} categories={categories} places={places} />  
              </Route>
              <Route path={"/places/view"}>
                { !selectedPlace.name ? <Redirect to='/'/> : <PlaceView selectedPlace={selectedPlace} categories={categories} handleReservationsStatus={handleReservationsStatus} />} 
              </Route>
              <Route path={"/my-places"}>
                <HostPanel 
                  selectedPlace={selectedPlace} 
                  categories={categories} 
                  places={places} 
                  handleSelectedPlace={handleSelectedPlace}
                  handlePlacesStatus={handlePlacesStatus}
                />  
              </Route>
              <Route path={"/places/add-place"}>
                <AddPlace categories={categories} handlePlacesStatus={handlePlacesStatus}/>  
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
                <Reservations places={places} reservations={reservations} handlePlacesStatus={handlePlacesStatus} handleReservationsStatus={handleReservationsStatus}/>  
              </Route>
              <Route path={"/requests"}>
                <Requests/>  
              </Route>*/}