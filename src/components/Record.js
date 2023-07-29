import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

function Record(props) {
    let apiurl = "https://ysapi.onrender.com/record";
    const [db, setDB] = useState([]);
    const [inputs, setInputs] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const dateRegex = /^(0?[1-9]|[1-2][0-9]|3[0-1])-(0?[1-9]|1[0-2])-(\d{4})$/;

    let reset = {
        "id": 0,
        "date": "",
        "title": "",
        "amount": ""
    }
    const loadAPI = () => {
        axios.get(apiurl)
            .then(res => {
                setDB(res.data);
                setErrorMessage("");
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        let url = apiurl + '/' + id;
        axios.delete(url)
            .then(res => {
                alert('Delete Completed!');
                console.log(res.data);
                loadAPI();
            })
    }

    const handleChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;

        setInputs(inputs => ({ ...inputs, [id]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let url = apiurl;
        if (!dateRegex.test(inputs.date)) {
            setErrorMessage('Invalid date format. Please use d-m-y format.');
            return;
        }

        const data = {
            title: inputs.title,
            date: inputs.date,
            amount: parseInt(inputs.amount),
        };
        axios.post(url, data)
            .then(res => {
                console.log(res);
                setInputs(reset);
                loadAPI();
            })
            .catch(err => console.log(err))
    }

    const sumNegative = () => {
        let sum = 0;
        db.forEach(item => {
            if (typeof item.amount === 'number' && item.amount < 0) {
                sum += item.amount;
            }
        });
        return sum;
    };

    const sumPositive = () => {
        let sum = 0;
        db.forEach(item => {
            if (typeof item.amount === 'number' && item.amount >= 0) {
                sum += item.amount;
            }
        });
        return sum;
    };

    useEffect(() => { loadAPI() }, []);
    return (
        <div>
            <Container className='mt-5 w-75 text-start mb-5'>
                <h2>Records</h2>
                <div class="row mt-3">
                    <div class="col">
                        <div class="card w-100">
                            <div class="card-header" style={{ color: "green", backgroundColor: "#E2EFDA" }}>
                                Credit
                            </div>
                            <ul class="list-group list-group-flush pt-2 pb-2">
                                <li class="list-group-item">
                                    $ {sumPositive()}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card w-100">
                            <div class="card-header" style={{ color: "#A45A5A", backgroundColor: "#EFDFDE" }}>
                                Debit
                            </div>
                            <ul class="list-group list-group-flush pt-2 pb-2">
                                <li class="list-group-item">
                                    $ {sumNegative()}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card w-100">
                            <div class="card-header" style={{ color: "#7692A9", backgroundColor: "#DDECF6" }}>
                                Balance
                            </div>
                            <ul class="list-group list-group-flush pt-2 pb-2">
                                <li class="list-group-item">$ {db.reduce((acc, item) => acc + item.amount, 0)}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <form class="row mt-3" onSubmit={handleSubmit}>
                    <div class="col-auto">
                        <input type="text" placeholder='Date' id="date" className="form-control" required value={inputs.date} onChange={handleChange} />
                    </div>
                    <div class="col-auto">
                        <input type="text" placeholder='Title' id="title" className="form-control" required value={inputs.title} onChange={handleChange} />
                    </div>
                    <div class="col-auto">
                        <input type="number" placeholder='Amount' id="amount" className="form-control" required value={inputs.amount} onChange={handleChange} />
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-primary">Create record</button>
                    </div>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <hr />
                <table class="table table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {db?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.title}</td>
                                    <td>$ {item.amount}</td>
                                    <td><button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Container>
        </div>
    );
}

export default Record;