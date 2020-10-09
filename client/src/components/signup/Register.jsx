import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Nav, Navbar, Alert} from 'react-bootstrap';
import './style.css';

export const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [show, setShow] = useState(false);

  const [msg, setMsg] = useState("");

  const history = useHistory();

  const handleClick = () => {
    if(username !== '' && email !== '' && password !== ''){
        console.log(username, email, password);
          fetch("/user/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              localStorage.setItem('user', data.token);
              history.push("/newreservation");
            })
            .catch((err) => {
              setShow(true);
              setMsg('Unable to Create a User');
            });
    }
    else{
      setShow(true);
      setMsg('Fields cannot be Empty');
    }

  }

    return (
      <div>
        <Navbar collapseOnSelect expand="lg" variant="dark" className="navbar">
          <Navbar.Brand className="brand-name" as={Link} to="/">
            Reservation
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="navLinks">
              <Nav.Link className="nav-item" as={Link} to="/register">
                SignUp
              </Nav.Link>
              <Nav.Link className="nav-item" as={Link} to="/">
                Login
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
        <div className="p-5">
          <div className="card signup-card p-5 m-auto">
            <h2 className="reserv-name">Reservation</h2>
            <input
              type="text"
              className="inp-field mt-3"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              className="inp-field mt-3"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <input
              type="password"
              className="inp-field mt-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="btn btn-primary mt-4" onClick={handleClick}>
              Register
            </button>
          </div>
        </div>
      </div>
    );
}
