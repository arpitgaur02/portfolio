// import React, { useEffect, useRef } from 'react';
// import styled from 'styled-components';
// import { srConfig, email } from '@config';
// import sr from '@utils/sr';
// import { usePrefersReducedMotion } from '@hooks';

// const StyledContactSection = styled.section`
//   max-width: 600px;
//   margin: 0 auto 70px;
//   text-align: center;

//   @media (max-width: 768px) {
//     margin: 0 auto 50px;
//   }

//   .overline {
//     display: block;
//     margin-bottom: 20px;
//     color: var(--green);
//     font-family: var(--font-mono);
//     font-size: var(--fz-md);
//     font-weight: 400;

//     &:before {
//       bottom: 0;
//       font-size: var(--fz-sm);
//     }

//     &:after {
//       display: none;
//     }
//   }

//   .title {
//     font-size: clamp(40px, 5vw, 60px);
//   }

//   .email-link {
//     ${({ theme }) => theme.mixins.bigButton};
//     margin-top: 50px;
//   }
// `;

// const Contact = () => {
//   const revealContainer = useRef(null);
//   const prefersReducedMotion = usePrefersReducedMotion();

//   useEffect(() => {
//     if (prefersReducedMotion) {
//       return;
//     }

//     sr.reveal(revealContainer.current, srConfig());
//   }, []);

//   return (
//     <StyledContactSection id="contact" ref={revealContainer}>
//       <h2 className="numbered-heading overline"> Contact Me </h2>

//       <h2 className="title">Get In Touch</h2>

//       <p>
//         Whether you have a question or just want to say hi, I’ll try my best to get back to you!
//       </p>

//       <a className="email-link" href={`mailto:${email}`}>
//         arpit.gaur2006@gmai.com
//       </a>
//       <a className="email-link" href={`phone:${email}`}>
//         9680210566
//       </a>
//     </StyledContactSection>
//   );
// };

// export default Contact;
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 0px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 30px;
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
    margin-bottom: 20px;
  }

  .contact-details {
    margin-top: 40px;
    font-size: var(--fz-xl);
    color: var(--light-slate);

    p {
      margin-bottom: 10px;
    }

    a {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-lg);
      
      &:hover {
        text-decoration: underline;
      }
    }

    .label {
      font-size: var(--fz-md);
      color: var(--slate);
      margin-right: 10px;
    }
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      {/* <h2 className="numbered-heading overline">What’s Next?</h2> */}

      {/* <h2 className="title">Get In Touch</h2> */}

      {/* <p>
        
      </p> */}

      <div className="contact-details">
        <p>
          <span className="label">Email:</span>
          <a href={`mailto:${email}`}>{email}</a>
        </p>
        
        <p>
          <span className="label">Mobile:</span>
          {/* REPLACE THIS WITH YOUR ACTUAL NUMBER */}
          <a href="tel:+919876543210">+91 9680210566</a>
        </p>
      </div>

    </StyledContactSection>
  );
};

export default Contact;