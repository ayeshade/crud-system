import React, { useEffect, useState } from "react";
import "./modal.css";
import AlertBox from './AlertBox.js';
import Dashboard from "./Dashboard";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/ayesha/reporter/")
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.results);
        setData(responseData.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEdit = (item) => {
    setEditUser(item);
    setFirstName(item.firstName);
    setLastName(item.lastName);
    setEmail(item.email);
    setShow(true);
  };

  const handleUpdate = () => {
    const updatedUser = {
      id: editUser.id,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
  
    fetch(`http://127.0.0.1:8000/ayesha/reporter/${editUser.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        const updatedData = data.map((item) =>
          item.id === editUser.id ? responseData : item
        );
        setData(updatedData);
        setEditUser(null); // Reset the editUser state variable
        setFirstName(""); // Clear the form inputs
        setLastName("");
        setEmail("");
        setShow(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };  

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/ayesha/reporter/${id}/`, {
      method: "DELETE",
    })
      .then(() => {
        setData(data.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignUp = () => {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    fetch("http://127.0.0.1:8000/ayesha/reporter/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setData([...data, responseData]); // Update data with the new user object
        setFirstName(""); // Clear the form inputs
        setLastName("");
        setEmail("");
        setShow(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const hideModal = () => {
    setShow(false);
    setEditUser(null); // Reset the editUser state variable
    setFirstName(""); // Clear the form inputs
    setLastName("");
    setEmail("");
  };

  const handleSubmit = () => {
    if (editUser) {
      handleUpdate();
    } else {
      handleSignUp();
    }
    hideModal();
  };

  return (
    <>
      <main>
        <AlertBox show={show} handleClose={hideModal}>
          <div className="main">
            <div className="sub-main">
              <div>
                <h1>{editUser ? "Edit User" : "ADD USER"}</h1>
                <br />
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="second-input">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="second-input">
                  <input
                    type="email"
                    placeholder="Email"
                    className="name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <br></br>
                <div className="SignUp-button">
                  <button onClick={handleSubmit}>
                    {editUser ? "Update" : "Add users"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AlertBox>
        <button type="button" onClick={() => setShow(true)}>
          Add New User
        </button>
      </main>
      <br />
      <br />
      <div className="content-container">
        <div className="py-2 px-2">
          <button type="button" onClick={() => setShow(true)}>
            Add New User
          </button>
        </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Dashboard/>
    </>
  );
}

export default SignUp;
