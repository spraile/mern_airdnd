import React, {Fragment} from 'react'
import {Link, NavLink} from "react-router-dom"
const Navbar = ({handleLogOut}) => {
	const handleHostAccessRequest = () => {
		fetch('https://cap3db.herokuapp.com/requests/', {
			method : "POST",
			headers : {
				"Authorization" : localStorage.getItem('token')
			}
		})
		.then(data => data.json())
		.then(user => console.log(user))
		.catch(err => console.log(err))
	} 
	const navWhich = (role) => {
		if(role == 'host') {
			return (
				<Fragment>
					<li className="nav-item">
						<NavLink to="/" className="nav-link">Places</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/my-places" className="nav-link">My Places</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/places/add-place" className="nav-link">Host a Home</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/reservations" className="nav-link">Reservations</NavLink>
					</li>
					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
						{usr.firstname}
						</a>
						<div className="dropdown-menu" aria-labelledby="navbarDropdown">
							<Link className="dropdown-item" to="#">Profile</Link>
					
							<Link className="dropdown-item" to="/" onClick={() => handleLogOut()}>Logout</Link>
						</div>
					</li>

				</Fragment>
			)
		} else if (role == 'user') {
			return (
				<Fragment>
					<li className="nav-item">
						<NavLink to="/" className="nav-link">Places</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/reservations" className="nav-link">Reservations</NavLink>
					</li>
					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
						{usr.firstname}
						</a>
						<div className="dropdown-menu" aria-labelledby="navbarDropdown">
							<Link className="dropdown-item" to="#">Profile</Link>
							<Link className="dropdown-item" data-toggle="modal" data-target="#hostRequest">Become a Host</Link>
						<div className="dropdown-divider"></div>
							<Link className="dropdown-item" to="/" onClick={() => handleLogOut()}>Logout</Link>
						</div>
					</li>
				</Fragment>
			)
		} else if(role == 'admin') {
			return (
				<Fragment>
				<li className="nav-item">
					<NavLink to="/requests" className="nav-link">Requests</NavLink>
				</li>
				<li className="nav-item dropdown">
					<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
					{usr.firstname}
					</a>
					<div className="dropdown-menu" aria-labelledby="navbarDropdown">
						<Link className="dropdown-item" to="#">Profile</Link>
					
						<Link className="dropdown-item" to="/" onClick={() => handleLogOut()}>Logout</Link>
					</div>
				</li>
			</Fragment>
			)
		} else {
			return (
				<Fragment>
				<li className="nav-item">
					<NavLink to="/" className="nav-link">Places</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to="/register" className="nav-link">Register</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to="/login" className="nav-link">Login</NavLink>
				</li>
			</Fragment>
			)
		}
	}

	const usr = JSON.parse(localStorage.getItem('user'))
	return (
		<Fragment>
			<nav className="navbar navbar-dark bg-dark navbar-expand-sm">
				<div className="container">
					<Link to="/" className="navbar-brand">Airdnd</Link>
					<button 
						className="navbar-toggler" 
						type="button"
						data-toggle="collapse"
						data-target="#navbarNav"
					><span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav mr-auto">
							<li>
								<form class="form-inline my-2 my-lg-0">
									<input className="form-control mr-sm-2" type="search" placeholder="Search" />
								</form>
							</li>
						</ul>
						<ul className="navbar-nav ml-auto">
							{usr ? navWhich(usr.role) : navWhich(usr)}
							
						</ul>
					</div>
				</div>
			</nav>
			<div className="modal fade" id="hostRequest" tabIndex="-1" role="dialog">
					<div className="modal-dialog">
						
						<div className="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">Become a Host</h5>
							<button type="button" class="close" data-dismiss="modal">
								<span>&times;</span>
							</button>
						</div>
						<div className="modal-body">
							Becoming a host gives you the privilege to list places for other people to book. An email will be sent to you regarding the required documents to be a host. Do you want to send a request for host access?
						</div>
						<div className="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
       						 <button type="button" class="btn btn-primary" onClick={handleHostAccessRequest} data-dismiss="modal">Yes</button>
						</div>
						</div>
					</div>
				</div>
		</Fragment>
	)
}

export default Navbar;