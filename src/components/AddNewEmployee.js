import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function AddNewEmployee() {
    const [inputs, setInputs] = useState({});
    const nav = useNavigate();
    let apiurl = "https://ysapi.onrender.com/newempl";
    const { id } = useParams();
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!inputs.fullname.trim() || inputs.fullname.length < 5 || inputs.fullname.length > 20) {
            errors.fullname = 'Tên không phù hợp';
        }

        const ageValue = parseInt(inputs.age);
        if (isNaN(ageValue) || ageValue < 18 || ageValue > 40) {
            errors.age = 'Độ tuổi phải trong khoảng từ 18 - 40';
        }

        if (!inputs.address.trim()) {
            errors.address = 'Yêu cầu nhập địa chỉ';
        }

        if (!inputs.image) {
            errors.image = 'Phải có ảnh';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        setInputs({ ...inputs, [id]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);

        if (validateForm()) {
            if (id != null) {
                let url = apiurl + "/" + id;
                axios.put(url, inputs)
                    .then(res => { console.log("Update completed!") })
                    .catch(err => { console.log("Lỗi: " + err) });
                nav("/newempl");
            } else {

            }
            axios.post(apiurl, inputs)
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

    const onLoadDetail = () => {
        if (id != null) {
            console.log("Load Detail");
            let url = apiurl + "/" + id;
            axios.get(url)
                .then(json => {
                    console.log(json.data);
                    setInputs(json.data)
                })
                .catch(err => console.log(err));
        }
    }
    useEffect(onLoadDetail, []);
    return (
        <div>
            <Container className='w-25 mt-5 border rounded text-start p-3'>
                <form onSubmit={handleSubmit}>
                    <h5 className='mb-2 text-center'>Thêm nhân viên</h5>
                    <div className="mb-2">
                        <label>Tên nhân viên:</label>
                        <input type="text" className="form-control" id="fullname" required value={inputs.fullname} onChange={handleChange} />
                        {errors.fullname && <span className='text-danger'>{errors.fullname}</span>}
                    </div>
                    <div className="mb-2">
                        <label>Tuổi:</label>
                        <input type="number" className="form-control" id="age" required value={inputs.age} onChange={handleChange} min="18" max="40" />
                        {errors.age && <span className='text-danger'>{errors.age}</span>}
                    </div>
                    <div className="mb-2">
                        <label>Địa chỉ:</label>
                        <input type="text" className="form-control" id="address" required value={inputs.address} onChange={handleChange} />
                        {errors.address && <span className='text-danger'>{errors.address}</span>}
                    </div>
                    <div className="mb-2">
                        <label>Giới tính:</label>
                        <select id="gender" value={inputs.gender} onChange={handleChange}>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label>Ảnh:</label>
                        <input type="file" id="image" value={inputs.image} onChange={handleChange} />
                        {errors.image && <span className='text-danger'>{errors.image}</span>}
                    </div>
                    <button type="submit" className="btn btn-dark w-100 p-3 text-white">Register</button>
                </form>
            </Container>
        </div>
    );
}

export default AddNewEmployee;