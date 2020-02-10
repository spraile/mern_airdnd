import React, {useState} from 'react'
import {Link} from "react-router-dom"

const LoginForm = () => {


	const [formData, setFormData] = useState({
		email : "",
		password : ""
	}) 

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name] : e.target.value
		})
	}

	const handleLogin = (e) => {
		e.preventDefault()

		let url = 'http://localhost:8000/users/login'
		let data = {
			email : formData.email,
			password : formData.password
		}

		fetch(url, {
			method : "post",
			headers : {
				"Content-Type" : "application/json"
			},
			body : JSON.stringify(data)
		})
		.then( data => data.json())
		.then( result => {
			let alert = document.getElementById('message')
			alert.classList.remove('d-none')
			if(result.token) {
				alert.classList.remove('alert-danger')
				alert.classList.add('alert-success')
				console.log(result.token)
				localStorage.setItem('user', JSON.stringify(result.user))
				localStorage.setItem('token', "Bearer "+result.token)
				// console.log(localStorage.getItem('user'))
		
			} else {
				alert.classList.remove('alert-success')
				alert.classList.add('alert-danger')
			}
			
			alert.innerHTML = result.message
			// console.log(result)

			setTimeout(() => {
						alert.classList.add("d-none")
			},3000)

		})
	}
	return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-8 col-lg-6 mx-auto">
					<div className="alert alert-danger d-none" id="message">
						
					</div>
					<div className="card">
						<div className="card-header">
							<h4>Login</h4>
						</div>
						<div className="card-body">
							<form onSubmit={handleLogin}>
								<div className="form-group text-center">
									<input 
										type="email" 
										name="email" 
										id="email" 
										placeholder="Email"
										className="form-control"
										onChange={handleChange}
									/>
								</div>
								<div className="form-group text-center">
									<input 
										type="password" 
										name="password" 
										id="password"
										placeholder="Password"
										className="form-control"
										onChange={handleChange}										
								/>
								</div>
							<hr/>
							<div className="row">
								<div className="col-4">
									<button className="btn btn-primary px-5">Login</button>
								</div>
								<div className="col-8 align-bottom">
									<p className="align-text-bottom float-right"><Link to="/register" >No account yet? Register here.</Link></p>
								</div>
							</div>
							</form>
						</div>
							
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginForm;