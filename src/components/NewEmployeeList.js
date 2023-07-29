import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function NewEmployeeList(props) {
    let apiurl = "https://ysapi.onrender.com/newempl";
    const [db, setDB] = useState([]);
    const [select, setSelect] = useState([]);

    const loadAPI = () => {
        axios.get(apiurl)
            .then(res => {
                setDB(res.data);
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

    const handleView = () => {

    }

    const handleMultipleDelete = () => {
        axios.delete(apiurl, {
            data: { id: select }
        })
            .then(() => {
                alert('Selected employees deleted successfully!');
                setSelect([]);
                loadAPI();
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleCheckbox = (event, id) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelect(prevSelect => [...prevSelect, id]);
        } else {
            setSelect(prevSelect => prevSelect.filter(ids => ids !== id));
        }
    };

    useEffect(() => { loadAPI() }, []);
    return (
        <div>
            <Navbar>
                <Container className='border bg-dark'>
                    <Nav className=''>
                        <NavLink to="/newempl" className='p-2 text-decoration-none text-white border border-secondary border-2'>New Employee List</NavLink>
                        <NavLink to="/newempl/newm/new" className='p-2 text-decoration-none text-white border border-secondary border-2'>Add New Employee</NavLink>
                    </Nav>
                </Container>
            </Navbar>
            <div>
                <Container className='mt-5 w-75 text-start mb-5'>
                    <h3 className='text-secondary text-center'>Employees List</h3>
                    <table class="table mt-3">
                        <thead>
                            <tr>
                                <th scope="col">Mã</th>
                                <th scope="col">Tên nhân viên</th>
                                <th scope="col">Tuổi</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Ảnh</th>
                                <th scope="col">Giới tính</th>
                                <th scope="col">Chức năng</th>
                                <th scope="col">Xoá nhiều</th>
                            </tr>
                        </thead>
                        <tbody>
                            {db?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='pt-3 pb-3'>{item.id}</td>
                                        <td className='pt-3 pb-3'>{item.fullname}</td>
                                        <td className='pt-3 pb-3'>{item.age}</td>
                                        <td className='pt-3 pb-3'>{item.address}</td>
                                        <td>
                                            <img
                                                src={item.image}
                                                alt={item.fullname}
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        </td>
                                        <td className='pt-3 pb-3'>{item.gender ? 'Nam' : 'Nữ'}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary btn-sm me-2"
                                                onClick={() => handleView(item.id)}
                                            >
                                                View
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm me-2"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="btn btn-success btn-sm"
                                            >
                                                <NavLink to={"/newempl/newm/new/" + item.id} className='update-button'>Update</NavLink>
                                            </button>
                                        </td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={select.includes(item.id)}
                                                onChange={(e) => handleCheckbox(e, item.id)}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <button
                        className="border-dark float-end me-5"
                        onClick={handleMultipleDelete}
                    >Xoá nhiều</button>
                </Container>
            </div>
        </div>
    );
}

export default NewEmployeeList;