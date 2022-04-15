import './Header.css';

function Header() {
  return (
    <>
      <div className="header">
        <div className="headerTitles">
          <span className="headerTitleSm">Welcome To</span>
          <span className="headerTitleLg">My Blogger</span>
        </div>
        <img
          className="headerImg"
          src="https://images.unsplash.com/photo-1643644264891-c04194e937a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
      </div>
    </>
  );
}

export default Header;
