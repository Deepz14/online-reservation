import React, {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import {Navbar, Nav, Alert} from 'react-bootstrap';

export const Viewreservation = () => {

    const [items, setItems] = useState('');

    const history = useHistory();

    const [show, setShow] = useState(false);

    const [msg, setMsg] = useState("");

    useEffect(() => {
      const id = JSON.parse(localStorage.getItem('id'));
      fetch(`/user/reservation/${id}`, {
        method : "GET",
        headers : {"Content-Type" : "application/json"}
      }).then(res => res.json())
      .then(data => {
        setItems(data)
      })
      .catch(err => {
        setShow(true);
        setMsg('Unable to get reservation list please try again!');
      })
    },[])

    const handleEdit = () => {
     history.push("/editreservation");
    }

      const handleDelete = (id) => {
        console.log(id);
        fetch(`/user/reservation/delete/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => {
            history.push('/newreservation');
          })
          .catch((err) => {
            setShow(true);
            setMsg('Unable to delete a reservation please try again!');
          });
      };

      const handleLogout = () => {
        localStorage.clear();
        history.push("/");
      };

    return (
      <div>
        <Navbar collapseOnSelect expand="lg" variant="dark" className="navbar">
          <Navbar.Brand className="brand-name">
            Reservation
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="navLinks">
              <Nav.Link className="nav-item" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {show ? (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>{msg}</Alert.Heading>
          </Alert>
        ) : (
          ""
        )}
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12 list-container m-auto">
              <div className="table-responsive-md">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Time</th>
                      <th scope="col">Email ID</th>
                      <th scope="col">Phone number</th>
                      <th scope="col">No of Tables</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delte</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items !== "" ? (
                      <tr>
                        <td>{items.Posts.date}</td>
                        <td>{items.Posts.time}</td>
                        <td>{items.Posts.email}</td>
                        <td>{items.Posts.phoneNum}</td>
                        <td>{items.Posts.table}</td>
                        <td>
                          {
                            <button
                              className="btn btn-sm btn-info"
                              onClick={handleEdit}
                            >
                              Edit
                            </button>
                          }
                        </td>
                        <td>
                          {
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(items.Posts._id)}
                            >
                              Delete
                            </button>
                          }
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="7">Loading...</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
