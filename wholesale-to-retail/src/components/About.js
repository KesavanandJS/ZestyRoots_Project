import React from 'react';
import './aboutStyle.css';
import { motion } from 'framer-motion';
import { FaSeedling, FaHandshake, FaLeaf, FaTruck, FaRecycle, FaHeart } from 'react-icons/fa';

function About() {
  return (
    <div className="about-container">
      <section className="hero-section">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="highlight">ZestyRoots</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Your one-stop solution for fresh and sustainable produce directly from local farmers.  
          Connecting communities through healthy, ethically grown food.
        </motion.p>
      </section>

      <section className="story-section">
        <h2>🌿 Our Story</h2>
        <p>
          ZestyRoots was born out of a desire to connect communities with healthy, organic produce while supporting local
          farmers. We believe in sustainability and transparency, ensuring that every product you receive is fresh and naturally grown.
        </p>
        <p>
          As a tech-driven platform, we also aim to revolutionize the way wholesale-to-retail operations are conducted—seamlessly integrating local farmers and retailers with modern technology.
        </p>
      </section>

      <section className="mission-section">
        <h2>🎯 Our Mission</h2>
        <p>
          To build a healthier future by promoting farm-to-table initiatives that benefit both consumers and producers.
          Our platform empowers local farmers while delivering fresh, top-quality produce to your doorstep.
        </p>
      </section>

      <section className="values-section">
        <h2>💚 Our Values</h2>
        <ul>
          <li>
            <FaLeaf className="value-icon" /> Sustainability and eco-conscious farming practices
          </li>
          <li>
            <FaHandshake className="value-icon" /> Fair trade and ethical partnerships
          </li>
          <li>
            <FaSeedling className="value-icon" /> Commitment to customer satisfaction
          </li>
          <li>
            <FaTruck className="value-icon" /> Fast and reliable farm-to-door delivery
          </li>
          <li>
            <FaRecycle className="value-icon" /> Zero-waste packaging initiatives
          </li>
          <li>
            <FaHeart className="value-icon" /> Personalized customer experience
          </li>
        </ul>
      </section>


      <section className="unique-features">
        <h2>✨ Unique Features</h2>
        <p>
          ZestyRoots isn't just a store—it's a movement towards smarter, more ethical retail solutions:
        </p>
        <ul>
          <li>📦 Getting products from their own origin</li>
          <li>📱 User-friendly web apps for seamless operations</li>
        </ul>
      </section>
    </div>
  );
}

export default About;
