import React, { useState } from 'react'

const RegisterForm = () => {
	const [formData, setFormData] = useState({

		firstname:"",
		lastname:"",
		email:"",
		number : "",
		password:"",
		confirmPassword:""
	});
	
	const {firstname,lastname,email,number,password,confirmPassword} = formData;


	const onChangeHandler = (e) => {
		setFormData({
			...formData,
			[e.target.name] : e.target.value
		})
	}

	const handleRegister = e => {
		e.preventDefault();
		if(password !== confirmPassword){
			alert("Passwords do not match")
		} else {
			fetch("http://localhost:8000/users/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formData)
			})
			.then(data => data.json())
			.then(user => {
				
				if(user.message) {
					let alert = document.getElementById("message")
					alert.innerHTML = user.message
					alert.classList.remove("d-none")
					setTimeout(() => {
						alert.classList.add("d-none")
					},3000)
				} else {
					console.log(user)
					let alert = document.getElementById("message")
					alert.innerHTML = "You are now registered"
					alert.classList.remove("alert-danger")
					alert.classList.add("alert-success")
					alert.classList.remove("d-none")
					setTimeout(() => {
						alert.classList.add("d-none")
					},3000)
					setFormData({
						firstname:"",
						lastname:"",
						email:"",
						number:"",
						password:"",
						confirmPassword:""
					})
				}
			})
			.catch()
		}

	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-8 col-lg-6 mx-auto">

					<div className="alert alert-danger d-none" role="alert" id="message">
						
					</div>
					<h2 className="my-3 pt-4">Registration Page</h2>
					<form onSubmit={(e) => {handleRegister(e)}}>
						<div className="form-group">
							<label htmlFor="firstname">First name</label>
							<input 
								type="text" 
								name="firstname" 
								id="firstname" 
								className="form-control-sm w-100"
								value={firstname}
								onChange={ (e) => onChangeHandler(e) }
							/>
						</div>
						<div className="form-group">
							<label htmlFor="lastname">Last name</label>
							<input 
								type="text" 
								name="lastname" 
								id="lastname" 
								className="form-control-sm w-100"
								value={lastname}					
								onChange={ (e) => onChangeHandler(e) }
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input 
								type="email" 
								name="email" 
								id="email" 
								className="form-control-sm w-100"
								value={email}
								onChange={ (e) => onChangeHandler(e) }
							/>
						</div>
						<div className="form-group">
							<label htmlFor="number"className="d-block">Mobile Number</label>
							<p className="d-inline pr-3">+63</p>
							<input 
								type="string" 
								name="number" 
								id="number" 
								className="form-control-sm d-inline"
								value={number}
								onChange={ (e) => onChangeHandler(e) }
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input 
								type="password" 
								name="password" 
								id="password" 
								className="form-control-sm w-100"
								value={password}
								onChange={ (e) => onChangeHandler(e) }
							/>
						</div>
						<div className="form-group">
							<label htmlFor="confirmPassword">Confirm Password</label>
							<input 
								type="password" 
								name="confirmPassword" 
								id="confirmPassword" 
								className="form-control-sm w-100"
								value={confirmPassword}
								onChange={ (e) => onChangeHandler(e) }
							/>
						</div>
						<button type="submit" className="btn btn-primary w-25 p-2">Submit</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default RegisterForm;