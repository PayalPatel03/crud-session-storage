import React, { useState, useRef, useEffect } from "react";
import './App.css'

function App() {
  const [employee, setEmployee] = useState({});
  const [empList, setEmpList] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const editRef = useRef();
  const focusRef = useRef();
 
 useEffect(() => {
  const sessionData = JSON.parse(sessionStorage.getItem("users"));
  const localData = JSON.parse(localStorage.getItem("users"));
  const firstList = sessionData || localData || [];
  setEmpList(firstList);
}, []);



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      let updatedCount = employee.count || [];

      if (checked) {
        updatedCount = [...updatedCount, value];
      } else {
        updatedCount = updatedCount.filter((item) => item !== value);
      }

      setEmployee({ ...employee, [name]: updatedCount });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  console.log(employee);

 const handleSubmit = (e) => {
  e.preventDefault();

  if (editIdx !== -1) {
    const updatedList = empList.map((item) =>
      item.id === editIdx ? { ...employee, id: editIdx } : item
    );
    localStorage.setItem("users", JSON.stringify(updatedList));
    sessionStorage.setItem("users", JSON.stringify(updatedList));
    setEmpList(updatedList);
    setEditIdx(-1);
  } else {
    const newList = [...empList, { ...employee, id: Date.now() }];
    localStorage.setItem("users", JSON.stringify(newList));
    sessionStorage.setItem("users", JSON.stringify(newList));
    setEmpList(newList);
  }

  setEmployee({});
  if (editRef.current) editRef.current.innerText = "Add";
};



  const handleDelete = (id) => {
    console.log(id);

    let data = empList.filter((data) => data.id !== id);
    setEmpList(data);
  };

  const handleEdit = (id) => {
    let data = empList.filter((data, idx) => data.id == id)[0];
    setEmployee(data);
    setEditIdx(id);
    editRef.current.innerText = "Update";
    focusRef.current.focus();
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const fileData = {
        name: file.name,
        type: file.type,
        url: reader.result,
      };
      setEmployee({ ...employee, file: fileData });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="container">
        <div className="row ">
          <div className="col-md-4 mx-auto ">
            <form method="post" onSubmit={handleSubmit}>
              <h2>Magagement Info</h2>
              <div className="mb-3">
                <label htmlFor="ename" className="form-label">
                  Employee Name
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  className="form-control"
                  id="ename"
                  name="ename"
                  value={employee.ename || ""}
                ></input>
              </div>
              <div className="mb-3">
                <label htmlFor="salary" className="form-label">
                  Salary
                </label>
                <input
                  type="number"
                  onChange={handleChange}
                  className="form-control"
                  name="salary"
                  value={employee.salary || ""}
                  id="salary"
                ></input>
              </div>
              {/* checkbox */}
              <div className="mb-3">
                <div>
                  <label className="form-label fw-bold">Position</label>
                  <br />
                  <div className="form-check form-check-inline ">
                    <label className="form-check-label" htmlFor="employee">
                      Employee
                    </label>
                    <input
                      className="form-check-input"
                      name="count"
                      type="checkbox"
                      value="employee"
                      id="employee"
                      checked={employee.count?.includes("employee") || false}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="manager">
                      Manager
                    </label>
                    <input
                      className="form-check-input"
                      name="count"
                      type="checkbox"
                      value="manager"
                      id="manager"
                      checked={employee.count?.includes("manager") || false}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="hr">
                      HR
                    </label>
                    <input
                      className="form-check-input"
                      name="count"
                      type="checkbox"
                      value="hr"
                      id="hr"
                      checked={employee.count?.includes("hr") || false}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* gender */}
              <div className="mb-3">
                <label className="form-label me-2" htmlFor="Gender">
                  Gender :{" "}
                </label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                    checked={employee.gender == "Male"}
                    id="male"
                  />
                  <label className="form-check-label" htmlFor="radioDefault1">
                    Male
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                    checked={employee.gender == "Female"}
                    id="female"
                  />
                  <label className="form-check-label" htmlFor="radioDefault2">
                    Female
                  </label>
                </div>
              </div>

              {/* dropdown */}
              <div className="mb-3">
                <label htmlFor="city" className="mb-3">
                  City
                </label>
                <select
                  id="city"
                  name="city"
                  className="form-select"
                  value={employee.city || ""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    ---select-city---
                  </option>
                  <option value="Gandevi">Gandevi</option>
                  <option value="Navsari">Navsari</option>
                  <option value="Bilimora">Bilimora</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Choose Image</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleImage}
                  className="form-control"
                />
              </div>

              {/* address */}
              <div className="mb-3">
                <textarea
                  name="address"
                  className="form-control"
                  id="address"
                  placeholder="Enter your address"
                  value={employee.address || ""}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button className="btn btn-info">Add</button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 mx-auto">
            <table className="table table-bordered mt-5 caption-top">
              <caption>
                <h2>Employee Data</h2>
              </caption>
              <thead className="table-dark">
                <tr>
                  <th>Sr.no</th>
                  <th>Employee Name</th>
                  <th>Salary</th>
                  <th>Count</th>
                  <th>City</th>
                  <th>Image</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {empList.map((user, index) => {
                  const {
                    id,
                    ename,
                    salary,
                    count,
                    image,
                    city,
                    address,
                    gender,
                  } = user;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{ename}</td>
                      <td>{salary}</td>
                      <td>{count}</td>
                      <td>{city}</td>
                      {user.file?.url ? (
                        <img
                          src={user.file.url}
                          alt=""
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        "No image"
                      )}

                      <td>{gender}</td>
                      <td>{address}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(id)}
                          className="btn btn-danger me-2"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleEdit(id)}
                          className="btn btn-warning"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
