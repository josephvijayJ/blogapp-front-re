import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./TopBar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <Link className="link animate-character" to="/">
          MY BLOGGER
        </Link>

      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem logOut" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {
          !user
            ?
            <>
              <ul className="topList">
                <li className="topListItem login-top">
                  <Link className="link" to="/login">
                    LOGIN
                  </Link>
                </li>
                <li className="topListItem register-top">
                  <Link className="link" to="/register">
                    REGISTER
                  </Link>
                </li>
              </ul>
            </>
            :
            <>
              
              <img className="gify" src="https://i.pinimg.com/originals/f0/f6/6e/f0f66e9196fe55d62653cf56c3585435.gif" style={{ width: "40px", marginRight: "5px" }} alt="" />
              <span className=' ml-auto animate-charcter '><pre className='logo-text animate-character'>Welcome <strong style={{ fontSize: '25x' }}>{user.username || user[0].username}!</strong></pre></span>
            </>
        }
      </div>
    </div>
  );
}