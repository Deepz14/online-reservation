import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Nav, Navbar, Alert} from 'react-bootstrap';
import './style.css';

export const Login = () => {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('')

  const [show, setShow] = useState(false);

  const [msg, setMsg] = useState('')

  const history = useHistory();

  const handleClick = () => {

      if(email !== '' && password !== ''){
        fetch("/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("admin", JSON.stringify(data.token));
            history.push("/listreservation");
          })
          .catch((err) => {
            setShow(true);
            setMsg('Email or Password is Incorrect');
          });
      }
      else{
        setShow(true);
        setMsg('Field cannot be Empty');
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
        {
          show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{msg}</Alert.Heading>
        </Alert> : ''
        }
        <div className="p-5">
          <div className="card login-card p-5 m-auto">
            <h2 className="reserv-name">Reservation</h2>
            <input
              type="email"
              className="inp-field mt-3"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="inp-field mt-3"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="btn btn-primary mt-4"
              onClick={handleClick}
            >
              Login
            </button>
            <p className="mt-3">
              <Link to="/register">New User?</Link>
            </p>
          </div>
        </div>
      </div>
    );
}