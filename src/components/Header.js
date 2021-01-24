import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-light">
        <div className="container-fluid">
          <Link to='/'><span className="navbar-brand pt-0 h1">Blog Post <i className='fas fa-blog' /> </span></Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
