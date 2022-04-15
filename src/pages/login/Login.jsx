import axios from 'axios';
import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await axios.post(
        'https://blogapp-retry.herokuapp.com/api/login/login',
        {
          username: userRef.current.value,
          password: passwordRef.current.value,
        }
      );
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      )
        toast.error('Email or Password is Invalid');
      {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="login">
        <span className="loginTitle">LOGIN</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            className="loginInput"
            placeholder="Enter username"
            ref={userRef}
          />
          <label>Password</label>
          <input
            type="password"
            className="loginInput"
            placeholder="Enter password"
            ref={passwordRef}
          />
          <br></br>
          <div>
            Username : guest |<span> Password : Guest@123</span>
          </div>

          {error && <div className="error_msg">{error}</div>}
          <button className="loginButton" type="submit" disabled={isFetching}>
            Login
          </button>
        </form>
        <button className="loginRegisterButton">
          <Link className="link" to="/register">
            Register
          </Link>
        </button>
      </div>
    </>
  );
}
