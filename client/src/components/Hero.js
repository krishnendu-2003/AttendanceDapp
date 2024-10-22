// src/Hero.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(".hero-title", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });
    gsap.fromTo(".hero-button", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, delay: 0.5, duration: 1 });
  }, []);

  const handleJoinNow = () => {
    navigate('/join');
  };

  const handleInvest = () => {
    navigate('/investors');
  };

  return (
    <div className="hero-section">
      <div className="text-center">
        <h1 className="hero-title">
          Effortless,<span className="highlight-yellow">Transparent</span> <br />
          <span className="highlight-orange">attendance</span> with <br />
          decentralized <span className="highlight-yellow">trust</span>
          <br />
          <span>Join us now</span>
        </h1>
        <div className="button-group">
          <button
            onClick={handleJoinNow}
            className="hero-button join-now"
          >
            Join Now
          </button>
          <button
            onClick={handleInvest}
            className="hero-button invest"
          >
            Invest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
