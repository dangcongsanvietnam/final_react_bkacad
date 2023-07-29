import axios from 'axios';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

function Register() {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!inputs.name.trim() || inputs.name.length < 1 || inputs.name.length > 20) {
            errors.name = 'Name is not required';
        }

        if (!inputs.phone.trim() || inputs.phone.length < 10 || inputs.phone.length > 11) {
            errors.phone = 'Phone number require 10-11 numbers';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!inputs.email.match(emailPattern)) {
            errors.email = 'Email is not required';
        }

        if (inputs.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;

        setInputs({ ...inputs, [id]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        if (validateForm()) {
            let url = "https://64be9bb05ee688b6250cb291.mockapi.io/hr/tasks";
            axios.post(url, inputs)
                .then(res => {
                    console.log(res);
                    alert("Added!");
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    return (
        <div>
            <Container className='w-25 mt-5 border rounded text-start p-3'>
                <form onSubmit={handleSubmit}>
                    <h5 className='mb-2'>Registration Page</h5>
                    <div className="mb-2">
                        <label>Name</label>
                        <input type="text" className="form-control" id="name" required value={inputs.name} onChange={handleChange} />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className="mb-2">
                        <label>Email ID:</label>
                        <input type="email" className="form-control" id="email" required value={inputs.email} onChange={handleChange} />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className="mb-2">
                        <label>Mobile No:</label>
                        <input type="number" className="form-control" id="phone" required value={inputs.phone} onChange={handleChange} />
                        {errors.phone && <span className='text-danger'>{errors.phone}</span>}
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" className="form-control" id="password" required value={inputs.password} onChange={handleChange} />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-info w-100 p-3 text-white">Register</button>
                </form>
            </Container>
        </div>
    );
}

export default Register;