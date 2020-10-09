import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Nav, Navbar, Alert} from 'react-bootstrap';

export const Editreservation = () => {

      const [email, setEmail] = useState("");
      const [phoneNum, setPhoneNum] = useState("");
      const [table, setTable] = useState("");
      const [date, setDate] = useState("");
      const [time, setTime] = useState("");

      const [show, setShow] = useState(false);

      const [msg, setMsg] = useState("");

      const history = useHistory();

    const handleSubmit = () => {
        const id = JSON.parse(localStorage.getItem("id"));

             if (
               email !== "" &&
               phoneNum !== "" &&
               table !== "" &&
               date !== "" &&
               time !== ""
             ) {
               fetch("/user/reservation/edit", {
                 method: "PUT",
                 headers: {
                   "Content-Type": "application/json",
                 },
                 body: JSON.stringify({ id, email, phoneNum, table, date, time }),
               })
                 .then((res) => res.json())
                 .then((data) => {
                   history.push("/viewreservation");
                 })
                 .catch((err) => {
                   setShow(true);
                   setMsg('Unable to Edit reservation please try again!');
                 });
             } else {
               setShow(true);
               setMsg('Fields cannot be Empty');
             }
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
              <Nav.Link className="nav-item" as={Link} to="/viewreservation">
                Logout
              </Nav.Link>
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
        <div className="container mt-5 p-5">
          <div className="row">
            <div className="col-md-12 reservation-container m-auto text-center">
              <h4 className="p-4">Reservation</h4>
              <div className="form-row">
                <div className="col-6 mb-2">
                  <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-6 mb-2">
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Phone Number"
                    onChange={(e) => setPhoneNum(e.target.value)}
                    required
                  />
                </div>
                <div className="col-6 mb-2">
                  <input
                    type="date"
                    className="form-control mb-3"
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="col-6 mb-2">
                  <input
                    type="time"
                    className="form-control mb-3"
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
                <div className="col-6 mb-2">
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Tables"
                    onChange={(e) => setTable(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button className="btn btn-primary mb-3" onClick={handleSubmit}>
                Update Reservation
              </button>
            </div>
          </div>
        </div>
      </div>
    );}
