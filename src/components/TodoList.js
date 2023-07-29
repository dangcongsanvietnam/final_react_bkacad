import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { faBook, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

function TodoList(props) {
    const [db, setDB] = useState([]);
    const [inputs, setInputs] = useState({});
    let apiurl = "https://ysapi.onrender.com/todolist";
    let reset = {
        "id": 0,
        "title": "",
        "status": false
    }

    const loadAPI = () => {
        axios.get(apiurl)
            .then((res) => {
                setDB(res.data);
            })
            .catch(err => { console.log(err) })
            .finally(() => { console.log("Load Done!") });
    }

    const handleCompleted = (id, status) => {
        let url = apiurl + '/' + id;
        axios.put(url, { status: !status })
            .then(() => {
                setDB(prevDB => {
                    return prevDB.map(todo => {
                        if (todo.id === id) {
                            return { ...todo, status: !status };
                        }
                        return todo;
                    });
                });
            })
            .catch(err => console.log(err));
    };

    const handleDoneClick = (event, id, status) => {
        event.preventDefault();
        handleCompleted(id, status);
    };

    const handleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        setInputs(inputs => ({ ...inputs, [id]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        let url = apiurl;
        const data = {
            ...inputs,
            status: false,
        };

        if (inputs.id > 0) {
            url = apiurl + "/" + inputs.id;
            axios.put(url, inputs)
                .then(res => {
                    console.log(res.data);
                    setInputs(reset);
                    loadAPI();
                })
                .catch(err => { console.log("Lỗi: " + err) });
        } else {
            axios.post(url, data)
                .then(res => {
                    console.log(res);
                    alert("Added!");
                    setInputs(reset);
                    loadAPI();
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const showCompleted = () => {
        let url = "https://ysapi.onrender.com/todolist?status=true";
        axios.get(url)
            .then((res) => {
                setDB(res.data);
            })
    }

    const showNotCompleted = () => {
        let url = "https://ysapi.onrender.com/todolist?status=false";
        axios.get(url)
            .then((res) => {
                setDB(res.data);
            })
    }

    const showAll = () => {
        return loadAPI();
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

    const deleteCompleted = () => {
        const url = apiurl + '?status=true';
        axios.delete(url)
            .then(res => {
                alert('Delete Completed!');
                console.log(res.data);
                loadAPI();
            })
            .catch(err => console.log(err));
    };

    const deleteAll = () => {
        axios.delete(apiurl)
            .then(res => {
                alert('All tasks deleted successfully!');
                setDB([]);
            })
            .catch(err => console.log(err));
    };

    const onLoadDetail = (id) => {
        console.log("Load Detail");
        let url = apiurl + "/" + id;
        axios.get(url)
            .then(json => {
                console.log(json.data);
                setInputs({
                    id: json.data.id,
                    title: json.data.title,
                    status: json.data.status,
                });
            })
            .catch(err => console.log(err));
    }

    useEffect(() => { loadAPI() }, []);
    return (
        <div>
            <h2 className='mt-5'>TodoInput</h2>
            <Container className='w-50 mt-3 border rounded text-start p-4'>
                <form onSubmit={handleSubmit}>
                    <div class="mb-3 input-group">
                        <div className="input-group-addon">
                            <button type="button" disable className="btn btn-info col-form-label"><FontAwesomeIcon icon={faBook} className='text-white' /></button>
                        </div>
                        <input type="text" placeholder='New Todo' className="form-control" id="title" required value={inputs.title} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-info w-100 text-white">Add new task</button>
                </form>
            </Container>
            <h2 className='mt-3'>TodoList</h2>
            <Container className='w-75'>
                <button type="button" className="btn btn-info ps-5 pe-5 mt-3 ms-4 me-4 text-white" style={{ width: '208px' }} onClick={showAll}>All</button>
                <button type="button" className="btn btn-info ps-5 pe-5 mt-3 ms-4 me-4 text-white" style={{ width: '208px' }} onClick={showCompleted}>Done</button>
                <button type="button" className="btn btn-info ps-5 pe-5 mt-3 ms-4 me-4 text-white" style={{ width: '208px' }} onClick={showNotCompleted}>Todo</button>
            </Container>
            <Container className='mt-5 mb-3'>
                <div className="row row-cols-1 justify-content-center">
                    {db?.map((item, index) => {
                        return (
                            <div className="col border rounded-top m-2 pt-2 pb-2" style={{ width: '720px' }} key={index}>
                                <a className={item.status ? 'float-start ms-2 mt-1 mb-1 text-decoration-line-through text-danger fw-bold' : 'float-start ms-2 mt-1 mb-1 text-decoration-none text-dark fw-bold'}>{item.title}</a>
                                <div className='float-end mt-1 mb-1'>
                                    <span className='text-dark me-3' onClick={(e) => handleDoneClick(e, item.id, item.status)}>
                                        {item.status ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}
                                    </span>
                                    <a href='#' className='text-warning me-3' onClick={() => onLoadDetail(item.id)}><FontAwesomeIcon icon={faPen} /></a>
                                    <a href='#' className='text-danger me-3' onClick={() => handleDelete(item.id)}><FontAwesomeIcon icon={faTrash} /></a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Container>
            <Container className='w-75 mb-5'>
                <button type="button" className="btn btn-danger ps-5 pe-5 mt-3 ms-4 me-4 text-white" style={{ width: '338px' }} onClick={deleteCompleted}>Delete Done Task</button>
                <button type="button" className="btn btn-danger ps-5 pe-5 mt-3 ms-4 me-4 text-white" style={{ width: '338px' }} onClick={deleteAll}>Delete All Task</button>
            </Container>
        </div>
    );
}

export default TodoList;