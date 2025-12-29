// import React, { useEffect, useRef } from 'react';
// import { useStaticQuery, graphql } from 'gatsby';
// import { GatsbyImage, getImage } from 'gatsby-plugin-image';
// import styled from 'styled-components';
// import sr from '@utils/sr';
// import { srConfig } from '@config';
// import { usePrefersReducedMotion } from '@hooks';

// const StyledFeaturedSection = styled.section`
//   h2 {
//     font-size: clamp(24px, 5vw, var(--fz-heading));
//   }

//   .featured-projects-grid {
//     ${({ theme }) => theme.mixins.resetList};
//     a {
//       position: relative;
//       z-index: 1;
//     }
//   }

//   .project {
//     display: grid;
//     grid-gap: 10px;
//     grid-template-columns: repeat(12, 1fr);
//     align-items: center;

//     &:not(:last-of-type) {
//       margin-bottom: 100px;
//       @media (max-width: 768px) {
//         margin-bottom: 70px;
//       }
//       @media (max-width: 480px) {
//         margin-bottom: 30px;
//       }
//     }

//     /* --- UNIFORM LAYOUT (LEFT ALIGNED) --- */
//     .project-content {
//       position: relative;
//       grid-column: 1 / 7;
//       grid-row: 1 / -1;
//       text-align: left;

//       @media (max-width: 1080px) {
//         grid-column: 1 / 9;
//       }
//       @media (max-width: 768px) {
//         grid-column: 1 / -1;
//         padding: 40px 40px 30px;
//         z-index: 5;
//       }
//       @media (max-width: 480px) {
//         padding: 30px 25px 20px;
//       }
//     }

//     .project-image {
//       ${({ theme }) => theme.mixins.boxShadow};
//       grid-column: 6 / -1;
//       grid-row: 1 / -1;
//       position: relative;
//       z-index: 1;

//       @media (max-width: 768px) {
//         grid-column: 1 / -1;
//         height: 100%;
//         opacity: 0.25;
//       }

//       a {
//         width: 100%;
//         height: 100%;
//         background-color: var(--green);
//         border-radius: var(--border-radius);
//         vertical-align: middle;

//         &:hover,
//         &:focus {
//           background: transparent;
//           outline: 0;
//           &:before,
//           .img {
//             background: transparent;
//             filter: none;
//           }
//         }

//         &:before {
//           content: '';
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           z-index: 3;
//           transition: var(--transition);
//           background-color: var(--navy);
//           mix-blend-mode: screen;
//         }
//       }

//       .img {
//         border-radius: var(--border-radius);
//         mix-blend-mode: multiply;
//         filter: grayscale(100%) contrast(1) brightness(90%);
//         @media (max-width: 768px) {
//           object-fit: cover;
//           width: auto;
//           height: 100%;
//           filter: grayscale(100%) contrast(1) brightness(50%);
//         }
//       }
//     }

//     .project-tech-list {
//       display: flex;
//       flex-wrap: wrap;
//       position: relative;
//       z-index: 2;
//       margin: 25px 0 10px;
//       padding: 0;
//       list-style: none;
//       justify-content: flex-start;

//       li {
//         margin: 0 20px 5px 0;
//         color: var(--light-slate);
//         font-family: var(--font-mono);
//         font-size: var(--fz-xs);
//         white-space: nowrap;
//       }
//       @media (max-width: 768px) {
//         li {
//           margin: 0 10px 5px 0;
//           color: var(--lightest-slate);
//         }
//       }
//     }

//     .project-links {
//       display: flex;
//       align-items: center;
//       position: relative;
//       margin-top: 10px;
//       margin-left: 0;
//       color: var(--lightest-slate);
//       justify-content: flex-start;

//       a {
//         padding: 5px 10px;
//         margin-right: 15px;
//         border: 1px solid var(--green);
//         border-radius: var(--border-radius);
//         color: var(--green);
//         font-family: var(--font-mono);
//         font-size: var(--fz-xs);
//         background-color: transparent;
//         transition: var(--transition);

//         &:hover {
//           background-color: var(--green-tint);
//         }
//       }
//     }

//     .project-overline {
//       margin: 10px 0;
//       color: var(--green);
//       font-family: var(--font-mono);
//       font-size: var(--fz-xs);
//       font-weight: 400;
//     }

//     .project-title {
//       color: var(--lightest-slate);
//       font-size: clamp(24px, 5vw, 28px);
//       @media (min-width: 768px) {
//         margin: 0 0 20px;
//       }
//       @media (max-width: 768px) {
//         color: var(--white);
//         a {
//           position: static;
//           &:before {
//             content: '';
//             display: block;
//             position: absolute;
//             z-index: 0;
//             width: 100%;
//             height: 100%;
//             top: 0;
//             left: 0;
//           }
//         }
//       }
//     }

//     .project-description {
//       ${({ theme }) => theme.mixins.boxShadow};
//       position: relative;
//       z-index: 2;
//       padding: 25px;
//       border-radius: var(--border-radius);
//       background-color: var(--light-navy);
//       color: var(--light-slate);
//       font-size: var(--fz-lg);
//       @media (max-width: 768px) {
//         padding: 20px 0;
//         background-color: transparent;
//         box-shadow: none;
//         &:hover {
//           box-shadow: none;
//         }
//       }
//       a {
//         ${({ theme }) => theme.mixins.inlineLink};
//       }
//       strong {
//         color: var(--white);
//         font-weight: normal;
//       }
//     }
//   }
// `;

// const Featured = () => {
//   const data = useStaticQuery(graphql`
//     {
//       featured: allMarkdownRemark(
//         filter: {
//           fileAbsolutePath: { regex: "/content/featured/" }
//           frontmatter: { featured: { eq: true } }
//         }
//         sort: { fields: [frontmatter___date], order: DESC }
//       ) {
//         edges {
//           node {
//             frontmatter {
//               title
//               cover {
//                 childImageSharp {
//                   gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
//                 }
//               }
//               tech
//               github
//               external
//               data
//               architecture
//             }
//             html
//           }
//         }
//       }
//     }
//   `);

//   const featuredProjects = data.featured.edges.filter(({ node }) => node);
//   const revealTitle = useRef(null);
//   const revealProjects = useRef([]);
//   const prefersReducedMotion = usePrefersReducedMotion();

//   useEffect(() => {
//     if (prefersReducedMotion) {
//       return;
//     }
//     sr.reveal(revealTitle.current, srConfig());
//     revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
//   }, []);

//   return (
//     <StyledFeaturedSection id="projects">
//       <h2 ref={revealTitle}>Projects</h2>

//       <ul className="featured-projects-grid">
//         {featuredProjects &&
//           featuredProjects.map(({ node }, i) => {
//             const { frontmatter, html } = node;
//             const { external, title, tech, github, cover, data, architecture } = frontmatter;
//             const image = getImage(cover);

//             return (
//               <li className="project" key={i} ref={el => (revealProjects.current[i] = el)}>
//                 <div className="project-content">
//                   <div>
//                     <p className="project-overline">Featured Project</p>

//                     <h3 className="project-title">
//                       <a href={external} target="_blank" rel="noreferrer">
//                         {title}
//                       </a>
//                     </h3>

//                     <div
//                       className="project-description"
//                       dangerouslySetInnerHTML={{ __html: html }}
//                     />

//                     {tech && (
//                       <ul className="project-tech-list">
//                         {tech.map((tech, i) => (
//                           <li key={i}>{tech}</li>
//                         ))}
//                       </ul>
//                     )}

//                     <div className="project-links">
//                       {data && (
//                         <a href={data} target="_blank" rel="noreferrer">
//                           Data
//                         </a>
//                       )}
//                       {architecture && (
//                         <a href={architecture} target="_blank" rel="noreferrer">
//                           Arch
//                         </a>
//                       )}
//                       {github && (
//                         <a href={github} target="_blank" rel="noreferrer">
//                           Code
//                         </a>
//                       )}
//                       {external && (
//                         <a href={external} target="_blank" rel="noreferrer">
//                           Demo
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="project-image">
//                   <a href={external || github || '#'} target="_blank" rel="noreferrer">
//                     <GatsbyImage image={image} alt={title} className="img" />
//                   </a>
//                 </div>
//               </li>
//             );
//           })}
//       </ul>
//     </StyledFeaturedSection>
//   );
// };

// export default Featured;
import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const StyledFeaturedSection = styled.section`
  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .featured-projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    a {
      position: relative;
      z-index: 1;
    }
  }

  .project {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(12, 1fr);
    align-items: center;

    &:not(:last-of-type) {
      margin-bottom: 100px;
      @media (max-width: 768px) {
        margin-bottom: 70px;
      }
      @media (max-width: 480px) {
        margin-bottom: 30px;
      }
    }

    /* --- UNIFORM LAYOUT (LEFT ALIGNED) --- */
    .project-content {
      position: relative;
      grid-column: 1 / 7;
      grid-row: 1 / -1;
      text-align: left;

      @media (max-width: 1080px) {
        grid-column: 1 / 9;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        z-index: 5;
      }
      @media (max-width: 480px) {
        padding: 30px 25px 20px;
      }
    }

    .project-image {
      ${({ theme }) => theme.mixins.boxShadow};
      grid-column: 6 / -1;
      grid-row: 1 / -1;
      position: relative;
      z-index: 1;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
        height: 100%;
        opacity: 0.25;
      }

      a {
        width: 100%;
        height: 100%;
        background-color: var(--green);
        border-radius: var(--border-radius);
        vertical-align: middle;

        &:hover,
        &:focus {
          background: transparent;
          outline: 0;
          &:before,
          .img {
            background: transparent;
            filter: none;
          }
        }

        &:before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 3;
          transition: var(--transition);
          background-color: var(--navy);
          mix-blend-mode: screen;
        }
      }

      .img {
        border-radius: var(--border-radius);
        mix-blend-mode: multiply;
        filter: grayscale(100%) contrast(1) brightness(90%);
        @media (max-width: 768px) {
          object-fit: cover;
          width: auto;
          height: 100%;
          filter: grayscale(100%) contrast(1) brightness(50%);
        }
      }
    }

    .project-tech-list {
      display: flex;
      flex-wrap: wrap;
      position: relative;
      z-index: 2;
      margin: 25px 0 10px;
      padding: 0;
      list-style: none;
      justify-content: flex-start;

      li {
        margin: 0 20px 5px 0;
        color: var(--light-slate);
        font-family: var(--font-mono);
        font-size: var(--fz-xs);
        white-space: nowrap;
      }
      @media (max-width: 768px) {
        li {
          margin: 0 10px 5px 0;
          color: var(--lightest-slate);
        }
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      position: relative;
      margin-top: 10px;
      margin-left: 0;
      color: var(--lightest-slate);
      justify-content: flex-start;

      a {
        padding: 5px 10px;
        margin-right: 15px;
        border: 1px solid var(--green);
        border-radius: var(--border-radius);
        color: var(--green);
        font-family: var(--font-mono);
        font-size: var(--fz-xs);
        background-color: transparent;
        transition: var(--transition);

        &:hover {
          background-color: var(--green-tint);
        }
      }
    }

    .project-overline {
      margin: 10px 0;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      font-weight: 400;
    }

    .project-title {
      color: var(--lightest-slate);
      font-size: clamp(24px, 5vw, 28px);
      @media (min-width: 768px) {
        margin: 0 0 20px;
      }
      @media (max-width: 768px) {
        color: var(--white);
        a {
          position: static;
          &:before {
            content: '';
            display: block;
            position: absolute;
            z-index: 0;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
          }
        }
      }
    }

    .project-description {
      ${({ theme }) => theme.mixins.boxShadow};
      position: relative;
      z-index: 2;
      padding: 25px;
      border-radius: var(--border-radius);
      background-color: var(--light-navy);
      color: var(--light-slate);
      font-size: var(--fz-lg);
      @media (max-width: 768px) {
        padding: 20px 0;
        background-color: transparent;
        box-shadow: none;
        &:hover {
          box-shadow: none;
        }
      }
      a {
        ${({ theme }) => theme.mixins.inlineLink};
      }
      strong {
        color: var(--white);
        font-weight: normal;
      }
    }
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/featured/" }
          frontmatter: { featured: { eq: true } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              tech
              data
              architecture
              code
              demo
              results
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledFeaturedSection id="projects">
      <h2 ref={revealTitle}>Some Things I’ve Built</h2>

      <ul className="featured-projects-grid">
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { title, tech, cover, data, architecture, code, demo, results } = frontmatter;
            const image = getImage(cover);

            return (
              <li className="project" key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  <div>
                    <p className="project-overline">Featured Project</p>

                    <h3 className="project-title">
                      <a href={demo || code} target="_blank" rel="noreferrer">
                        {title}
                      </a>
                    </h3>

                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />

                    {tech && (
                      <ul className="project-tech-list">
                        {tech.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-links">
                      {/* ORDER: Demo -> Data -> Arch -> Results -> Code */}
                      {demo && (
                        <a href={demo} target="_blank" rel="noreferrer">
                          Demo
                        </a>
                      )}
                      {data && (
                        <a href={data} target="_blank" rel="noreferrer">
                          Data
                        </a>
                      )}
                      {architecture && (
                        <a href={architecture} target="_blank" rel="noreferrer">
                          Arch
                        </a>
                      )}
                      {results && (
                        <a href={results} target="_blank" rel="noreferrer">
                          Results
                        </a>
                      )}
                      {code && (
                        <a href={code} target="_blank" rel="noreferrer">
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="project-image">
                  <a href={demo || code || '#'} target="_blank" rel="noreferrer">
                    <GatsbyImage image={image} alt={title} className="img" />
                  </a>
                </div>
              </li>
            );
          })}
      </ul>
    </StyledFeaturedSection>
  );
};

export default Featured;
