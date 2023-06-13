import React, { useEffect, useState } from "react";
import "./modal.css";
import AlertBox from './AlertBox.js';
import Dashboard from "./Dashboard";

function SignUp() {
  const [name, setName] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_no, setPhoneNo] = useState("");
  const [data, setData] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/ayesha/publisher/")
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
    setName(item.name);
    setCompanyName(item.company_name);
    setEmail(item.email);
    setPhoneNo(item.phone_no);
    setShow(true);
  };

  const handleUpdate = () => {
    const updatedUser = {
      id: editUser.id,
      name: name,
      company_name: company_name,
      email: email,
      phone_no:phone_no
    };
  
    fetch(`http://127.0.0.1:8000/ayesha/publisher/${editUser.id}`, {
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
        setEditUser(''); // Reset the editUser state variable
        setName(""); // Clear the form inputs
        setCompanyName("");
        setEmail("");
        setPhoneNo("");
        setShow(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };  

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/ayesha/publisher/${id}/`, {
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
      name: name,
      company_name: company_name,
      email: email,
      phone_no:phone_no
    };

    fetch("http://127.0.0.1:8000/ayesha/publisher/", {
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
        setName(""); // Clear the form inputs
        setCompanyName("");
        setEmail("");
        setPhoneNo("");
        setShow(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const hideModal = () => {
    setShow(false);
    setEditUser(null); // Reset the editUser state variable
    setName(""); // Clear the form inputs
    setCompanyName("");
    setEmail("");
    setPhoneNo("");
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
                <h1>{editUser ? "Edit User" : "ADD Publisher"}</h1>
                <br />
                <div>
                  <input
                    type="text"
                    placeholder=" Name"
                    className="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="second-input">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="name"
                    value={company_name}
                    onChange={(e) => setCompanyName(e.target.value)}
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
                <div className="second-input">
                  <input
                    type="number"
                    placeholder="Phone No"
                    className="name"
                    value={phone_no}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </div>
                <br></br>
                <div className="SignUp-button">
                  <button onClick={handleSubmit}>
                    {editUser ? "Update" : "Add publisher"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AlertBox>
      
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
              <td>{item.name}</td>
              <td>{item.company_name}</td>
              <td>{item.email}</td>
              <td>{item.phone_no}</td>
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
