// import React, { useEffect, useRef } from 'react';
// import { useStaticQuery, graphql } from 'gatsby';
// import { GatsbyImage, getImage } from 'gatsby-plugin-image';
// import styled from 'styled-components';
// import sr from '@utils/sr';
// import { srConfig } from '@config';
// import { Icon } from '@components/icons';
// import { usePrefersReducedMotion } from '@hooks';

// const StyledProjectsGrid = styled.ul`
//   ${({ theme }) => theme.mixins.resetList};

//   a {
//     position: relative;
//     z-index: 1;
//   }
// `;

// const StyledProject = styled.li`
//   position: relative;
//   display: grid;
//   grid-gap: 10px;
//   grid-template-columns: repeat(12, 1fr);
//   align-items: center;

//   @media (max-width: 768px) {
//     ${({ theme }) => theme.mixins.boxShadow};
//   }

//   &:not(:last-of-type) {
//     margin-bottom: 100px;

//     @media (max-width: 768px) {
//       margin-bottom: 70px;
//     }

//     @media (max-width: 480px) {
//       margin-bottom: 30px;
//     }
//   }

//   /* -------------------------------------------------- */
//   /* ALIGNMENT FIX: Force Content LEFT, Image RIGHT    */
//   /* -------------------------------------------------- */

//   .project-content {
//     position: relative;
//     grid-column: 1 / 7; /* Content takes left half */
//     grid-row: 1 / -1;
//     text-align: left;   /* Text is always left-aligned */

//     @media (max-width: 1080px) {
//       grid-column: 1 / 9;
//     }

//     @media (max-width: 768px) {
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//       height: 100%;
//       grid-column: 1 / -1;
//       padding: 40px 40px 30px;
//       z-index: 5;
//     }

//     @media (max-width: 480px) {
//       padding: 30px 25px 20px;
//     }
//   }

//   .project-overline {
//     margin: 10px 0;
//     color: var(--green);
//     font-family: var(--font-mono);
//     font-size: var(--fz-xs);
//     font-weight: 400;
//   }

//   .project-title {
//     color: var(--lightest-slate);
//     font-size: clamp(24px, 5vw, 28px);

//     @media (min-width: 768px) {
//       margin: 0 0 20px;
//     }

//     @media (max-width: 768px) {
//       color: var(--white);
//       a {
//         position: static;
//         &:before {
//           content: '';
//           display: block;
//           position: absolute;
//           z-index: 0;
//           width: 100%;
//           height: 100%;
//           top: 0;
//           left: 0;
//         }
//       }
//     }
//   }

//   .project-description {
//     ${({ theme }) => theme.mixins.boxShadow};
//     position: relative;
//     z-index: 2;
//     padding: 25px;
//     border-radius: var(--border-radius);
//     background-color: var(--light-navy);
//     color: var(--light-slate);
//     font-size: var(--fz-lg);

//     @media (max-width: 768px) {
//       padding: 20px 0;
//       background-color: transparent;
//       box-shadow: none;
//       &:hover {
//         box-shadow: none;
//       }
//     }

//     a {
//       ${({ theme }) => theme.mixins.inlineLink};
//     }

//     strong {
//       color: var(--white);
//       font-weight: normal;
//     }
//   }

//   .project-tech-list {
//     display: flex;
//     flex-wrap: wrap;
//     position: relative;
//     z-index: 2;
//     margin: 25px 0 10px;
//     padding: 0;
//     list-style: none;
//     justify-content: flex-start; /* List always starts on left */

//     li {
//       margin: 0 20px 5px 0;
//       color: var(--light-slate);
//       font-family: var(--font-mono);
//       font-size: var(--fz-xs);
//       white-space: nowrap;
//     }

//     @media (max-width: 768px) {
//       margin: 10px 0;
//       li {
//         margin: 0 10px 5px 0;
//         color: var(--lightest-slate);
//       }
//     }
//   }

//   .project-links {
//     display: flex;
//     align-items: center;
//     position: relative;
//     margin-top: 10px;
//     margin-left: -10px;
//     color: var(--lightest-slate);
//     justify-content: flex-start; /* Links always start on left */

//     a {
//       ${({ theme }) => theme.mixins.flexCenter};
//       padding: 10px;
//       &.external {
//         svg {
//           width: 22px;
//           height: 22px;
//           margin-top: -4px;
//         }
//       }
//       svg {
//         width: 20px;
//         height: 20px;
//       }
//     }
//   }

//   .project-image {
//     ${({ theme }) => theme.mixins.boxShadow};
//     grid-column: 6 / -1; /* Image takes right half */
//     grid-row: 1 / -1;
//     position: relative;
//     z-index: 1;

//     @media (max-width: 768px) {
//       grid-column: 1 / -1;
//       height: 100%;
//       opacity: 0.25;
//     }

//     a {
//       width: 100%;
//       height: 100%;
//       background-color: var(--green);
//       border-radius: var(--border-radius);
//       vertical-align: middle;

//       &:hover,
//       &:focus {
//         background: transparent;
//         outline: 0;
//         &:before,
//         .img {
//           background: transparent;
//           filter: none;
//         }
//       }

//       &:before {
//         content: '';
//         position: absolute;
//         width: 100%;
//         height: 100%;
//         top: 0;
//         left: 0;
//         right: 0;
//         bottom: 0;
//         z-index: 3;
//         transition: var(--transition);
//         background-color: var(--navy);
//         mix-blend-mode: screen;
//       }
//     }

//     .img {
//       border-radius: var(--border-radius);
//       mix-blend-mode: multiply;
//       filter: grayscale(100%) contrast(1) brightness(90%);

//       @media (max-width: 768px) {
//         object-fit: cover;
//         width: auto;
//         height: 100%;
//         filter: grayscale(100%) contrast(1) brightness(50%);
//       }
//     }
//   }
// `;
// const Featured = () => {
//   const data = useStaticQuery(graphql`
//     {
//       featured: allMarkdownRemark(
//         filter: { fileAbsolutePath: { regex: "/content/featured/" } }
//         sort: { fields: [frontmatter___date], order: ASC }
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
//     <section id="projects">
//       <h2 className="numbered-heading" ref={revealTitle}>
//         Featured Projects
//       </h2>

//       <StyledProjectsGrid>
//         {featuredProjects &&
//           featuredProjects.map(({ node }, i) => {
//             const { frontmatter, html } = node;
//             const { external, title, tech, github, cover, cta } = frontmatter;
//             const image = getImage(cover);

//             return (
//               <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
//                 <div className="project-content">
//                   <div>
//                     <p className="project-overline">Projects</p>

//                     <h3 className="project-title">
//                       <a href={external}>{title}</a>
//                     </h3>

//                     <div
//                       className="project-description"
//                       dangerouslySetInnerHTML={{ __html: html }}
//                     />

//                     {tech.length && (
//                       <ul className="project-tech-list">
//                         {tech.map((tech, i) => (
//                           <li key={i}>{tech}</li>
//                         ))}
//                       </ul>
//                     )}

//                     <div className="project-links">
//                       {/* {cta && (
//                         <a href={cta} aria-label="Course Link" className="cta">
//                           Learn More
//                         </a>
//                       )} */}
//                       {github && (
//                         <a href={github} aria-label="GitHub Link">
//                           <Icon name="GitHub" />
//                         </a>
//                       )}
//                       {external && !cta && (
//                         <a href={external} aria-label="External Link" className="external">
//                           <Icon name="External" />
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="project-image">
//                   <a href={external ? external : github ? github : '#'}>
//                     <GatsbyImage image={image} alt={title} className="img" />
//                   </a>
//                 </div>
//               </StyledProject>
//             );
//           })}
//       </StyledProjectsGrid>
//     </section>
//   );
// };

// export default Featured;
import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
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

    /* 1. Force Text Content to the LEFT */
    .project-content {
      position: relative;
      grid-column: 1 / 7; /* Text starts at col 1, ends at 7 */
      grid-row: 1 / -1;
      text-align: left; /* Align text left */

      @media (max-width: 1080px) {
        grid-column: 1 / 9; /* Wider on tablets */
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

    /* 2. Force Image to the RIGHT */
    .project-image {
      ${({ theme }) => theme.mixins.boxShadow};
      grid-column: 6 / -1; /* Image starts at 6, goes to end */
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

    /* 3. Align Tech List to LEFT */
    .project-tech-list {
      display: flex;
      flex-wrap: wrap;
      position: relative;
      z-index: 2;
      margin: 25px 0 10px;
      padding: 0;
      list-style: none;
      justify-content: flex-start; /* Start from left */

      li {
        margin: 0 20px 5px 0; /* Margin on right side */
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

    /* 4. Align Links to LEFT */
    .project-links {
      display: flex;
      align-items: center;
      position: relative;
      margin-top: 10px;
      margin-left: -10px;
      color: var(--lightest-slate);
      justify-content: flex-start; /* Start from left */

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 10px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
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
              github
              external
              data
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
            const { external, title, tech, github, cover, data } = frontmatter;
            const image = getImage(cover);

            return (
              <li className="project" key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  <div>
                    <p className="project-overline">Featured Project</p>

                    <h3 className="project-title">
                      <a href={external} target="_blank" rel="noreferrer">
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
                      {/* 1. DATA LINK */}
                      {data && (
                        <a href={data} aria-label="Data Source" target="_blank" rel="noreferrer">
                          {/* Inline Database Icon */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-database">
                            <title>Data Source</title>
                            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                          </svg>
                        </a>
                      )}

                      {/* 2. GITHUB LINK */}
                      {github && (
                        <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                          <Icon name="GitHub" />
                        </a>
                      )}

                      {/* 3. EXTERNAL LINK */}
                      {external && (
                        <a
                          href={external}
                          aria-label="External Link"
                          className="external"
                          target="_blank"
                          rel="noreferrer">
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="project-image">
                  <a href={external || github || '#'} target="_blank" rel="noreferrer">
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
