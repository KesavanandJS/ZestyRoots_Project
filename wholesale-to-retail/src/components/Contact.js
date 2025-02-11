import React, { useState } from 'react';
import './ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: '',
    purpose: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        console.log('Contact details saved successfully!');
        setFormData({ name: '', phone: '', state: '', purpose: '' });
      } else {
        console.error('Failed to save contact details.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Me</h1>

      <section className="contact-details">
        <p><strong>Email:</strong> zestyroots@gmail.com</p>
        <p><strong>Phone:</strong> +1 234-567-8901</p>
        <p><strong>Location:</strong> Greenfield Avenue, Eco City</p>
      </section>

      {!submitted ? (
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </label>
          <label>
            State:
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter your state"
              required
            />
          </label>
          <label>
            Purpose:
            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              placeholder="How can we assist you?"
              required
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="thank-you-message">
          <h2>Thank you, {formData.name}!</h2>
          <p>We have received your inquiry and will contact you at {formData.phone} shortly.</p>
        </div>
      )}
    </div>
  );
}

export default ContactPage;
