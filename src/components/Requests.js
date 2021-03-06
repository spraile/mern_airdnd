import React,{useState, useEffect} from 'react'

const Requests = () => {

 	const [requests,setRequests] = useState([])
	useEffect(() => {
		fetch('https://cap3db.herokuapp.com/requests/',{
			headers : {
				"Authorization" : localStorage.getItem('token')
			}
		})
		.then(data => data.json())
		.then(requests => {
			setRequests(requests)
		})
		.catch(error => console.log(error))
	},[])
	
	const handleActionButton = (decision,request) => {
                let newStatus = { decision : decision }
				console.log(newStatus)
				console.log('https://cap3db.herokuapp.com/requests/'+request._id)
				fetch('https://cap3db.herokuapp.com/requests/'+request._id, {
					method : "PUT",
					headers : {
						"Content-Type" : "application/json",
						"Authorization" : localStorage.getItem('token')
					},
					body : JSON.stringify(newStatus)
				})
				.then(data => data.json())
				.then(kek => console.log(kek))
                .catch(err=> console.log(err))
			
	}
	return (
		<div className="container py-5">

			<h3>Requests</h3>
			<hr/>
			<div className="row">
				<div className="col-12 col-md-3">
					<div className="btn-group-vertical w-100">
						<button className="btn btn-outline-info">All</button>
						<button className="btn btn-outline-info">Pending</button>
						<button className="btn btn-outline-info">Accepted</button>
						<button className="btn btn-outline-info">Rejected</button>
					</div>
				</div>
				<div className="col-12 col-md-9">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Request Code</th>
								<th scope="col">User</th>
								<th scope="col">Request Date</th>
								<th scope="col">Status</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{
								requests.map(request => {
									return(									
										<tr>
											<th scope="row">{request.code}</th>
											<td>{request.userName}</td>
											<td>{request.dateCreated}</td>
                                            <td>{request.status}</td>
											<td>
												<button className={request.status == "Pending" ? "btn btn-success" : "d-none"} onClick={() => handleActionButton("Accepted",request)}>Accept</button>
												<button className={request.status == "Pending" ? "btn btn-danger" : "d-none"} onClick={() => handleActionButton("Rejected",request)}>Reject</button>

											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default Requests