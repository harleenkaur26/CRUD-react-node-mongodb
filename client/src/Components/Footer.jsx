import React from 'react';
import './style.css';

function Footer() {
  return (
    <footer data-bs-theme="dark" className="footer">
      <div className="container">
        <span className="text-muted">© 2024 MovieFlix. All rights reserved.</span>
        <br/>
        <span className="createinfo">
          Built with 	&#10084; by <a href="https://github.com/Omprakashx"> Om Singh </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
