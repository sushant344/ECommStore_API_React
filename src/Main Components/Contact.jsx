import React, {useState} from "react";
import styled from "styled-components";
import { CircularProgress } from '@chakra-ui/react'

function Contact() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Wrapper>
      <h2 className="common-heading">Contact Page</h2>
      <CircularProgress value={30} id="progressCircular" style={{display: isLoaded ? "none" : "block"}} />

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60402.55635085045!2d72.8955896347301!3d18.879991930181827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7da47634ac5bf%3A0x51f27845111437ea!2sUran%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1707831814545!5m2!1sen!2sin"
        width="100%"
        height="350"
        style={{ border: 0 }}
        title="contact location"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={()=> setIsLoaded(true)}
      ></iframe>

      <div className="container">
        <div className="contact-form">
          <form action="https://formspree.io/f/mnqedjyg" method="POST" className="contact-inputs">
            <input
              type="text"
              name="username"
              placeholder="username"
              autoComplete="off"
              spellCheck="false"
              required
              style={{textTransform: "capitalize"}}
            />
            <input
              type="email"
              name="email"
              placeholder="email"
              autoComplete="off"
              required
              style={{textTransform: "none"}}
            />
            <textarea
              name="message"
              cols="30"
              rows="10"
              placeholder="Enter Your Message"
              required
              style={{outline: "none", textTransform: "none"}}
            ></textarea>
            <input type="submit" value="send" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 9rem 0 5rem 0;
  text-align: center;

  .container {
    margin-top: 6rem;

    .contact-form {
      max-width: 50rem;
      margin: auto;

      .contact-inputs {
        display: flex;
        flex-direction: column;
        gap: 3rem;

        input[type="submit"] {
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background-color: ${({ theme }) => theme.colors.white};
            border: 1px solid ${({ theme }) => theme.colors.btn};
            color: ${({ theme }) => theme.colors.btn};
            transform: scale(0.9);
          }
        }
      }
    }
  }
`;

export default Contact;
