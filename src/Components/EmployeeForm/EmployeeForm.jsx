import React, { useState, useEffect } from "react";

const EmployeeForm = () => {

    const [inputValue, setInputValue] = useState({
        name: "",
        age: "",
        email: "",
        phoneNumber: "",
        password: "",
        city: "",
        address: "",
    });

    const [storage, setStorage] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {

        const storedData = JSON.parse(localStorage.getItem("employees"));

        if (storedData) {
            setStorage(storedData);
        }

    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setInputValue((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const storedData = JSON.parse(localStorage.getItem("employees")) || [];


        if (editingIndex !== null) {
            const updatedStorage = [...storage];
            updatedStorage[editingIndex] = inputValue;

            setStorage(updatedStorage);
            localStorage.setItem("employees", JSON.stringify(updatedStorage));
            setEditingIndex(null); 

        } else {
            const newStorage = [...storedData, inputValue];
            setStorage(newStorage);
            localStorage.setItem("employees", JSON.stringify(newStorage));
        }

        setInputValue({
            name: "",
            age: "",
            email: "",
            phoneNumber: "",
            password: "",
            city: "",
            address: "",
        });
    };

    const handleEdit = (index) => {

        const employee = storage[index];
        setInputValue(employee);
        setEditingIndex(index); 
    };

    const handleDelete = (index) => {
        const updatedStorage = storage.filter((_, i) => i !== index);
        setStorage(updatedStorage);
        localStorage.setItem("employees", JSON.stringify(updatedStorage));
    };

  return (
    <>
        <div className="container" style={{ display: "block", width: 1200, padding: 30 }}>
            <h2 className="text-center mb-5">Employee Form</h2>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6 mb-2">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name" onChange={handleChange} value={inputValue.name} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input type="number" className="form-control" id="age" name="age" placeholder="Enter Age" onChange={handleChange} value={inputValue.age} />
                </div>
                <div className="col-md-6 mb-2">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Enter Email" onChange={handleChange} value={inputValue.email} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input type="number" className="form-control" id="phoneNumber" name="phoneNumber" placeholder="Enter Phone Number" onChange={handleChange} value={inputValue.phoneNumber} />
                </div>
                <div className="col-md-6 mb-2">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Enter Password" onChange={handleChange} value={inputValue.password} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" name="city" placeholder="Enter City" onChange={handleChange} value={inputValue.city} />
                </div>
                <div className="col-12">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" name="address" placeholder="1234 Main St" onChange={handleChange} value={inputValue.address} />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-dark">{editingIndex !== null ? "Update" : "Submit"}</button>
                </div>
            </form>
        </div>

        <h2 className="text-center">Employee Data</h2>

        <div className="container" style={{ marginTop: "100px" }}>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Password</th>
                    <th scope="col">City</th>
                    <th scope="col">Address</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {storage.map((employee, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{employee.name}</td>
                        <td>{employee.age}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phoneNumber}</td>
                        <td>{employee.password}</td>
                        <td>{employee.city}</td>
                        <td>{employee.address}</td>
                        <td>
                        <button className="btn btn-dark" onClick={() => handleEdit(index)}>Edit</button> || <button className="btn btn-dark" onClick={() => handleDelete(index)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  );
};

export default EmployeeForm;
