import React, { useState, useEffect } from "react";
import AlertBox from './AlertBox.js';
import './Dashboard.css';
import ArticleModal from "./ArticleModal";
import Dashboard from "./Dashboard.js";

function Article() {
  const [headline, setHeadline] = useState("");
  const [details, setDetails] = useState("");
  const [publisher, setPublisher] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [reporter, setReporter] = useState("");
  const [view, setView] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/ayesha/article/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setData(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getSingleReporter = (id) => {
    fetch(`http://127.0.0.1:8000/ayesha/reporter/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReporter(data);
      })
      .catch((error) => {
        console.log(error, 22222222);
      });
  };

  const handleView = (item) => {
    console.log("View:", item);
    console.log("View:", item.reporter);
    getSingleReporter(item.reporter.id);
    setView(true);
  };

  const handleEdit = (item) => {
    setEditUser(item);
    setHeadline(item.headline);
    setDetails(item.details);
    setReporter(item.reporter);
    setPublisher(item.publisher);
    setShow(true);
  };

  const handleUpdate = () => {
    const updatedUser = {
      id: editUser.id,
      headline: headline,
      details: details,
      reporter: reporter,
      publisher: publisher,
    };

    fetch(`http://127.0.0.1:8000/ayesha/article/${editUser.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const updatedData = data.map((item) =>
          item.id === editUser.id ? data : item
        );
        setData(updatedData);
        setEditUser(null);
        setHeadline("");
        setDetails("");
        setReporter("");
        setPublisher("");
        setShow(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/ayesha/article/${id}/`, {
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
      headline: headline,
      details: details,
      reporter: reporter,
      publisher: [],
    };

    fetch("http://127.0.0.1:8000/ayesha/article/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setData([...data, responseData]);
        setHeadline("");
        setDetails("");
        setReporter("");
        setPublisher("");
        setShow(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const hideModal = () => {
    setShow(false);
    setEditUser(null);
    setHeadline("");
    setDetails("");
    setReporter("");
    setPublisher("");
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
        <div className="content-container">
          <center>
            <h1>Article</h1>
          </center>
          <br></br>
        </div>
        <AlertBox show={show} handleClose={hideModal}>
          <div className="main">
            <div className="sub-main">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div>
                  <h1>{editUser ? "Edit User" : "Student Sign Up"}</h1>
                  <br />
                  <div>
                    <input
                      type="text"
                      placeholder="Headline"
                      className="headline"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      required
                    />
                  </div>
                  <div className="second-input">
                    <input
                      type="text"
                      placeholder="Details"
                      className="details"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                    />
                  </div>
                  <div className="second-input">
                    <input
                      type="text"
                      placeholder="Reporter"
                      className="reporter"
                      value={reporter}
                      required={true}
                      onChange={(e) => setReporter(e.target.value)}
                    />
                  </div>
                  <div className="second-input">
                    <input
                      type="text"
                      placeholder="Publisher"
                      className="publisher"
                      value={publisher}
                      required={true}
                      onChange={(e) => setPublisher(e.target.value)}
                    />
                  </div>
                  <br></br>
                  <div className="SignUp-button">
                    <button>{editUser ? "Update" : "Add"}</button>
                  </div>
                </div>
              </form>
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
              <th>Headline</th>
              <th>Detail</th>
              <th>Reporter</th>
              <th>Publisher</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.headline}</td>
                <td>{item.details}</td>
                <td>{item.reporter.firstName}</td>
                <td>
                  {item.publisher.map((single, index) => (
                    <li key={index}>{single.company_name}</li>
                  ))}
                </td>
                <td>
                  <button onClick={() => handleView(item)}>View</button>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {view && <ArticleModal reporter={reporter} />}
      </div>
      <Dashboard/>
    </>
  );
}

export default Article;
