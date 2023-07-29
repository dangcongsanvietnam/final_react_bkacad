import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

function EmployeeList(props) {
    let apiurl = "https://ysapi.onrender.com/empl";
    const [db, setDB] = useState([]);
    const [inputs, setInputs] = useState({});

    let reset = {
        "id": 0,
        "fullname": "",
        "email": "",
        "salary": ""
    }
    const loadAPI = () => {
        axios.get(apiurl)
            .then(res => {
                setDB(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    const handleChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;

        setInputs(inputs => ({ ...inputs, [id]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let url = apiurl;
        const data = {
            fullname: inputs.fullname,
            email: inputs.email,
            salary: parseInt(inputs.salary),
        };
        axios.post(url, data)
            .then(res => {
                console.log(res);
                setInputs(reset);
                loadAPI();
            })
            .catch(err => console.log(err))
    }

    useEffect(() => { loadAPI() }, []);
    return (
        <div>
            <div>
                <Container className='mt-5 w-75 text-start mb-5'>
                    <h1 className='text-primary text-center'>React - Display Form Data in a Table</h1>
                    <form class="row mt-3" onSubmit={handleSubmit}>
                        <div class="col-auto">
                            <input type="text" placeholder='Fullname' id="fullname" className="form-control" required value={inputs.fullname} onChange={handleChange} />
                        </div>
                        <div class="col-auto">
                            <input type="email" placeholder='Email Address' id="email" className="form-control" required value={inputs.email} onChange={handleChange} />
                        </div>
                        <div class="col-auto">
                            <input type="number" placeholder='Salary' id="salary" className="form-control" required value={inputs.salary} onChange={handleChange} />
                        </div>
                        <div class="col-auto">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                    <table class="table mt-3">
                        <thead>
                            <tr>
                                <th scope="col">S.N</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Email Address</th>
                                <th scope="col">Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {db?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='pt-3 pb-3'>{item.id}</td>
                                        <td className='pt-3 pb-3'>{item.fullname}</td>
                                        <td className='pt-3 pb-3'>{item.email}</td>
                                        <td className='pt-3 pb-3'>{item.salary}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Container>
            </div>
        </div>
    );
}

export default EmployeeList;