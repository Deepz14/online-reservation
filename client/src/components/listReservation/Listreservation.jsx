import React,{useState, useEffect} from 'react';
import {Nav, Navbar, Alert} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import './style.css';

export const Listreservation = () => {

  const [lists, setLists] = useState([]);

  const history = useHistory();

  const [show, setShow] = useState(false);

  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch('/user/reservation', {
      method : "GET",
      headers : {"Content-Type" : "application/json"}
    }).then(res => res.json())
    .then(data => {
      setLists([...data.Posts])
    }).catch(err => {
      setShow(true);
      setMsg('Unable to get reservation list please try again!');
    });
  },[])

  const delBtn = (id) => {
    console.log(id);
    fetch(`/user/reservation/delete/${id}`, {
      method : "DELETE",
      headers : {"Content-Type" : "application/json"}
    }).then(res => res.json())
    .then(data => {
      window.location.reload();
    }).catch(err => {
      setShow(true);
      setMsg('Unable to delete a reservation please try again!');
    });
  }

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
              <div className="table-responsive-sm">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">DATE</th>
                      <th scope="col">TIME</th>
                      <th scope="col">EMAIL ID</th>
                      <th scope="col">PHONE NUMBER</th>
                      <th scope="col">NO OF TABLES</th>
                      <th scope="col">CANCEL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lists.length > 0 ? (
                      lists.map((list, index) => {
                        return (
                          <tr key={index}>
                            <td>{list.date}</td>
                            <td>{list.time}</td>
                            <td>{list.email}</td>
                            <td>{list.phoneNum}</td>
                            <td>{list.table}</td>
                            <td>
                              {
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => delBtn(list._id)}
                                >
                                  Delete
                                </button>
                              }
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6">Loading...</td>
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
