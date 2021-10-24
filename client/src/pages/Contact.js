import React, { useState } from "react";

import { validateEmail } from "../utils/helpers";

import { useMutation } from "@apollo/client";
import { CONTACT_SUBMIT } from "../utils/mutations";

var nodemailer = require('nodemailer');

function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { name, email, message } = formState;
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // create transporter object that sends mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ruffcutsinfo@gmail.com",
        pass: "Ruffcut$123"
      }
    });
  
    const mailOptions = {
      from: formState.email,
      to: 'ruffcutsinfo@gmail.com',
      text: formState.message,
    };
  
    transporter.sendMail(mailOptions, function(err, res) {
      if (err) {
        console.error("there was an error: ", err);
      } else {
        console.log("here is the res: ", res);
      }
    });

    if (!errorMessage) {
    //   setFormState({ ...formState, [e.target.name]: e.target.value });
      console.log(formState);
    }
  };

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormState ({ ...formState, [name]:value });

    // send formState to email?


    if (e.target.name === "email") {
      const isValid = validateEmail(e.target.value);
      if (!isValid) {
        setErrorMessage("Your email is invalid.");
      } else {
        setErrorMessage("");
      }
    } else {
      if (!e.target.value.length) {
        setErrorMessage(`${e.target.name} is required.`);
      } else {
        setErrorMessage("");
      }
    }
  };

  return (
    <section>
      <h1 data-testid="h1tag">Contact us with any questions</h1>
      <form id="contact-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            name="message"
            rows="5"
            value={formState.message}
            onChange={handleChange}
          />
        </div>
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
        <button data-testid="button" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
}






export default ContactForm;