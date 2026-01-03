// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useStaticQuery, graphql } from 'gatsby';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import styled from 'styled-components';
// import { srConfig } from '@config';
// import sr from '@utils/sr';
// import { Icon } from '@components/icons';
// import { usePrefersReducedMotion } from '@hooks';

// const StyledProjectsSection = styled.section`
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   h2 {
//     font-size: clamp(24px, 5vw, var(--fz-heading));
//   }

//   .archive-link {
//     font-family: var(--font-mono);
//     font-size: var(--fz-sm);
//     &:after {
//       bottom: 0.1em;
//     }
//   }

//   .projects-grid {
//     ${({ theme }) => theme.mixins.resetList};
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//     grid-gap: 15px;
//     position: relative;
//     margin-top: 50px;

//     @media (max-width: 1080px) {
//       grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//     }
//   }

//   .project-inner {
//     ${({ theme }) => theme.mixins.boxShadow};
//     ${({ theme }) => theme.mixins.flexBetween};
//     flex-direction: column;
//     align-items: flex-start;
//     position: relative;
//     height: 100%;
//     padding: 2rem 1.75rem;
//     border-radius: var(--border-radius);
//     background-color: var(--light-navy);
//     transition: var(--transition);
//     overflow: auto;

//     &:hover,
//     &:focus {
//       transform: translateY(-5px);
//     }
//   }

//   .project-top {
//     ${({ theme }) => theme.mixins.flexBetween};
//     width: 100%;
//     margin-bottom: 30px;

//     .folder {
//       color: var(--green);
//       svg {
//         width: 40px;
//         height: 40px;
//       }
//     }

//     .project-links {
//       display: flex;
//       align-items: center;
//       flex-wrap: wrap;
//       color: var(--lightest-slate);
//       position: relative;
//       z-index: 5;
//       margin: 20px 0 10px;

//       a {
//         padding: 5px 10px;
//         margin: 0 10px 10px 0;
//         border: 1px solid var(--green);
//         border-radius: var(--border-radius);
//         color: var(--green);
//         font-family: var(--font-mono);
//         font-size: var(--fz-xxs);
//         background-color: transparent;
//         transition: var(--transition);
//         white-space: nowrap;

//         &:hover {
//           background-color: var(--green-tint);
//         }
//       }
//     }
//   }

//   .project-title {
//     margin: 0 0 10px;
//     color: var(--lightest-slate);
//     font-size: var(--fz-xxl);

//     a {
//       position: static;

//       &:before {
//         content: '';
//         display: block;
//         position: absolute;
//         z-index: 0;
//         width: 100%;
//         height: 100%;
//         top: 0;
//         left: 0;
//       }
//     }
//   }

//   .project-description {
//     color: var(--light-slate);
//     font-size: 17px;

//     a {
//       ${({ theme }) => theme.mixins.inlineLink};
//     }
//   }

//   .project-tech-list {
//     display: flex;
//     align-items: flex-end;
//     flex-grow: 1;
//     flex-wrap: wrap;
//     padding: 0;
//     margin: 20px 0 0 0;
//     list-style: none;

//     li {
//       font-family: var(--font-mono);
//       font-size: var(--fz-xxs);
//       line-height: 1.75;

//       &:not(:last-of-type) {
//         margin-right: 15px;
//       }
//     }
//   }

//   .more-button {
//     ${({ theme }) => theme.mixins.button};
//     margin: 80px auto 0;
//   }
// `;

// const Projects = () => {
//   const data = useStaticQuery(graphql`
//     {
//       projects: allMarkdownRemark(
//         filter: {
//           fileAbsolutePath: { regex: "/content/projects/" }
//           frontmatter: { showInProjects: { ne: false } }
//         }
//         sort: { fields: [frontmatter___date], order: DESC }
//       ) {
//         edges {
//           node {
//             frontmatter {
//               title
//               tech
//               code     # Changed from github
//               demo     # Changed from external
//               data
//               architecture
//               results
//             }
//             html
//           }
//         }
//       }
//     }
//   `);

//   const [showMore, setShowMore] = useState(false);
//   const revealTitle = useRef(null);
//   const revealArchiveLink = useRef(null);
//   const revealProjects = useRef([]);
//   const prefersReducedMotion = usePrefersReducedMotion();

//   useEffect(() => {
//     if (prefersReducedMotion) {
//       return;
//     }

//     sr.reveal(revealTitle.current, srConfig());
//     sr.reveal(revealArchiveLink.current, srConfig());
//     revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
//   }, []);

//   const GRID_LIMIT = 6;
//   const projects = data.projects.edges.filter(({ node }) => node);
//   const firstSix = projects.slice(0, GRID_LIMIT);
//   const projectsToShow = showMore ? projects : firstSix;

//   const projectInner = node => {
//     const { frontmatter, html } = node;
//     const { code, demo, title, tech, data, architecture, results } = frontmatter;

//     return (
//       <div className="project-inner">
//         <header>
//           <div className="project-top">
//             {/* <div className="folder">
//               <Icon name="Folder" />
//             </div> */}
//           </div>

//           <h3 className="project-title">
//             <a href={demo || code} target="_blank" rel="noreferrer">
//               {title}
//             </a>
//           </h3>

//           <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
//         </header>

//         <footer>
//           <div className="project-links">
//             {/* Order: Demo -> Data -> Arch -> Results -> Code */}
//             {demo && <a href={demo} target="_blank" rel="noreferrer">Demo</a>}
//             {data && <a href={data} target="_blank" rel="noreferrer">Data</a>}
//             {architecture && <a href={architecture} target="_blank" rel="noreferrer">Arch</a>}
//             {results && <a href={results} target="_blank" rel="noreferrer">Results</a>}
//             {code && <a href={code} target="_blank" rel="noreferrer">Code</a>}
//           </div>

//           {tech && (
//             <ul className="project-tech-list">
//               {tech.map((tech, i) => (
//                 <li key={i}>{tech}</li>
//               ))}
//             </ul>
//           )}
//         </footer>
//       </div>
//     );
//   };

//   return (
//     <StyledProjectsSection>
//       <h2 ref={revealTitle}>Other Noteworthy Projects</h2>

//       <Link className="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
//         view the archive
//       </Link>

//       <ul className="projects-grid">
//         {prefersReducedMotion ? (
//           <>
//             {projectsToShow &&
//               projectsToShow.map(({ node }, i) => <li key={i}>{projectInner(node)}</li>)}
//           </>
//         ) : (
//           <TransitionGroup component={null}>
//             {projectsToShow &&
//               projectsToShow.map(({ node }, i) => (
//                 <CSSTransition
//                   key={i}
//                   classNames="fadeup"
//                   timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
//                   exit={false}>
//                   <li
//                     key={i}
//                     ref={el => (revealProjects.current[i] = el)}
//                     style={{
//                       transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
//                     }}>
//                     {projectInner(node)}
//                   </li>
//                 </CSSTransition>
//               ))}
//           </TransitionGroup>
//         )}
//       </ul>

//       <button className="more-button" onClick={() => setShowMore(!showMore)}>
//         Show {showMore ? 'Less' : 'More'}
//       </button>
//     </StyledProjectsSection>
//   );
// };

// export default Projects;
import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    margin-top: 50px;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);

    &:hover {
      transform: translateY(-5px);
    }
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 30px;
    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
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

  .project-description {
    color: var(--light-slate);
    font-size: 17px;
  }

  /* --- THE BUTTON STYLING --- */
  .project-links {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0 10px;
    position: relative;
    z-index: 5; /* Sit above the title link */

    a {
      padding: 0.5rem 0.75rem;
      margin: 0 0.5rem 0.5rem 0;
      border: 1px solid var(--green);
      border-radius: var(--border-radius);
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1;
      text-decoration: none;
      background-color: transparent;

      &:hover,
      &:focus {
        background-color: var(--green-tint);
        outline: none;
      }
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 10px 0 0;
    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      color: var(--slate);
      margin-right: 15px;
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              code
              demo
              data
              architecture
              results
            }
            html
          }
        }
      }
    }
  `);

  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {return;}
    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const projects = data.projects.edges.filter(({ node }) => node);
  const projectsToShow = showMore ? projects : projects.slice(0, 6);

  const projectInner = node => {
    const { frontmatter, html } = node;
    const { code, demo, title, tech, data, architecture, results } = frontmatter;

    return (
      <div className="project-inner">
        <header>
          <div className="project-top">
            <div className="folder">
              <Icon name="Folder" />
            </div>
          </div>
          <h3 className="project-title">
            <a href={demo || code} target="_blank" rel="noreferrer">
              {title}
            </a>
          </h3>
          <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
        </header>

        <footer>
          <div className="project-links">
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
          {tech && (
            <ul className="project-tech-list">
              {tech.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    );
  };

  return (
    <StyledProjectsSection>
      <h2 ref={revealTitle}>Other Noteworthy Projects</h2>
      <ul className="projects-grid">
        <TransitionGroup component={null}>
          {projectsToShow.map(({ node }, i) => (
            <CSSTransition key={i} classNames="fadeup" timeout={300}>
              <li ref={el => (revealProjects.current[i] = el)}>{projectInner(node)}</li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
      <button className="more-button" onClick={() => setShowMore(!showMore)}>
        Show {showMore ? 'Less' : 'More'}
      </button>
    </StyledProjectsSection>
  );
};

export default Projects;
