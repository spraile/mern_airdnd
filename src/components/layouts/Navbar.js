import React, {Fragment} from 'react'
import {Link} from "react-router-dom"
const Navbar = () => {
	return (
		<Fragment>
			<nav className="navbar navbar-dark bg-dark navbar-expand-sm">
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
						<li className="nav-item">
							<Link to="/" className="nav-link">Places</Link>
						</li>
						<li className="nav-item">
							<Link to="/my-places" className="nav-link">My Places</Link>
						</li>
						<li className="nav-item">
							<Link to="/places/add-place" className="nav-link">Hosting? List your place</Link>
						</li>
						<li className="nav-item">
							<Link to="/reservations" className="nav-link">Reservations</Link>
						</li>
						<li className="nav-item">
							<Link to="/requests" className="nav-link">Requests</Link>
						</li>
						<li className="nav-item">
							<Link to="/become-a-host" className="nav-link">Become a Host</Link>
						</li>
						<li className="nav-item">
							<Link to="/register" className="nav-link">Register</Link>
						</li>
						<li className="nav-item">
							<Link to="/login" className="nav-link">Login</Link>
						</li>
					</ul>
				</div>
			</nav>
		</Fragment>
	)
}

export default Navbar;