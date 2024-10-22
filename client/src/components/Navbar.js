import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadGoogleFonts = () => {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Poppins:wght@400;600&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    };

    loadGoogleFonts();

    gsap.fromTo(
      '.navbar',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
    );

    gsap.fromTo(
      '.navbar-logo',
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1, ease: 'bounce.out' }
    );

    gsap.fromTo(
      '.connect-button',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)', delay: 0.5 }
    );

    gsap.fromTo(
      '.claim-button',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)', delay: 0.7 }
    );
  }, []);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access or there was an error");
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask extension.");
    }
  };

  const handleClaimPrize = () => {
    alert('Prize claimed successfully!'); 
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="navbar-title">AttendChain</span>
      </Link>
      <div className="navbar-actions">
        {account ? (
          <span className="connected-account">
            Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}
          </span>
        ) : (
          <button onClick={connectMetaMask} className="connect-button">
            Connect MetaMask
          </button>
        )}
        <button onClick={handleClaimPrize} className="claim-button">
          Claim Prize
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
