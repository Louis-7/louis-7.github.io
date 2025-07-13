import List from '../../components/List';
import './Resume.css';

export function Resume() {
  const skills = [
    'JavaScript, TypeScript, Node.js, Backbone.js, React, Angular',
    'Ruby on Rails',
    'HTML5, CSS3, Bootstrap',
    'MongoDB, MySQL',
    'AWS (S3, Lambda, API Gateway, etc.)',
    'Hybrid, Electron',
    'Git, Docker, Linux',
  ];
  const certificates = [
    'Scrum Alliance – CSM',
    'Scrum Alliance - CSPO',
  ];
  return (
    <>
      <div className="page-container">
        <div className='personal-info'>
          <div className='my-name'>Louis Liu</div>
          <div className="personal-info-cols">
            <div className="personal-info-col">
              <div>A web developer</div>
              <div>Born in Jun, 1991</div>
            </div>
            <div className="personal-info-col">
              <div>Living in Dalian, China</div>
              <div>louisgh.cn@gmail.com</div>
            </div>
          </div>
        </div>

        <div className='section-title'>Projects</div>
        <div className='project-list'>
          <div className="project-title">
            <span className="project-duration">Jun, 2020 - present</span>
            <span className="project-name">Cytobank</span>
          </div>
          <p>Cytobank is a cloud-based Flow Cytometry data analysis platform.</p>
          <ul>
            <li>
              Cloud based file upload (S3, API Gateway, Lambda, DynamoDB, Step
              Functions)
            </li>
            <li>Front-end deelopment based on Backbone.js + Marionette.js.</li>
            <li>Back-end development based on Ruby on Rails.</li>
            <li>
              Data visualization & analysis, implement Swarm plot, Volcano plot, Bar chart with Plotly.js.
            </li>
            <li> Design and impeplement multiple modules. e.g, aduit log, electronic signature, etc.</li>
            <li>
              Maintainer of public API.(
              <a href="https://developer.cytobank.org/" target="_blank">
                Cytobank public API
              </a>{' '}
              &{' '}
              <a
                href="https://cran.rstudio.com/web/packages/CytobankAPI/index.html"
                target="_blank"
              >
                Cytobank API Wrapper for R
              </a>
              )
            </li>
          </ul>
          <div className="project-title">
            <span className="project-duration">Nov, 2017 ~ May, 2020</span>
            <span className="project-name">Lifecycle Management</span>
          </div>
          <p>A Software Lifecycle Management tool on IBM i</p>
          <ul>
            <li>
              Developed Web Portal using AngularJS for modern UI and user
              experience.
            </li>
            <li>Full-stack development with JavaScript.</li>
            <li>
              Develop a Node.js backend service compatible with Linux and IBM i
              platforms.
            </li>
            <li>
              Designed middle layer to integrate various components of the product
              family.
            </li>
          </ul>
          <div className="project-title">
            <span className="project-duration">May, 2018 – August, 2018</span>
            <span className="project-name">Code Editor</span>
          </div>
          <p><a href='https://github.com/zowe/zlux-editor' target='_blank'>Zowe Code Editor</a>, a plug-in of Zowe running on IBM mainframe.</p>
          <ul>
            <li>
              Responsible for front-end architecture and Node.js application.
            </li>
            <li>Developed core engine, file system, and menu system.</li>
            <li>Integrated language server with Monaco Editor.</li>
          </ul>

          <div className="project-title">
            <span className="project-duration">Mar, 2018 – Apr, 2018</span>
            <span className="project-name">Web Portal React Native</span>
          </div>
          <p>Transplanted Web Portal to the mobile platform.</p>
          <ul>
            <li>
              Solely responsible for architecture and development using Typescript
              and React Native.
            </li>
            <li>Implemented voice command and QR code sharing features.</li>
          </ul>

          <div className="project-title">
            <span className="project-duration">Oct, 2015 – Nov, 2017</span>
            <span className="project-name">Design Studio</span>
          </div>
          <p>Build a low code mobile app platform for Ionic.</p>
          <ul>
            <li>
              Full-stack development using Angular, Node.js, Webpack, and MongoDB.
            </li>
            <li>Server maintenance and DevOps.</li>
          </ul>

          <div className="project-title">
            <span className="project-duration">Jun, 2017 - Aug, 2017</span>
            <span className="project-name">SOH</span>
          </div>
          <p>Data Science and Data Visualization project.</p>
          <ul>
            <li>Lead front-end team, used Grafana for data visualization.</li>
            <li>Developed Angular-based admin system.</li>
          </ul>

          <div className="project-title">
            <span className="project-duration">Sep, 2014 – Aug, 2015</span>
            <span className="project-name">Self Engagement Portal</span>
          </div>
          <p>ASP .NET website maintenance and hybrid mobile project.</p>
          <ul>
            <li>Daily maintenance, automation scripts, and bug-fix.</li>
            <li>Moved web features to mobile for better user experience.</li>
            <li>Scrum Master, tracked project progress.</li>
          </ul>
        </div>

        <div className='section-title'>Work Experience</div>
        <div className='work-experience'>
          <div className="work-experience-title">
            <span className="work-duration">Jun, 2020 – Present</span>
            <span className="work-company">Beckman Coulter</span>
            <span className="work-position"><span className='as'>as</span>Software Engineer</span>
          </div>
          <div className="work-experience-title">
            <span className="work-duration">Nov, 2017 - May, 2020</span>
            <span className="work-company">Rocket Software</span>
            <span className="work-position"><span className='as'>as</span>Software Engineer</span>
          </div>
          <div className="work-experience-title">
            <span className="work-duration">Aug, 2014 - Nov, 2017</span>
            <span className="work-company">Accenture</span>
            <span className="work-position"><span className='as'>as</span>Senior Software Analyst</span>
          </div>
        </div>

        <div className='section-title'>Skills</div>
        <div className='skill-list'>  
          <List items={skills} />
        </div>

        <div className='section-title'>Certificates</div>
        <div className='certificate-list'>
          <List items={certificates} />
        </div>

        <div className='section-title'>Education</div>
        <div className='education-list'>
          <div className="education-title">
            <span className="education-duration">2010 - 2014</span>
            <span className="education-name">Dalian Neusoft University of Information</span>
            <span className="education-major">bachelor of E-commerce</span>
          </div>
        </div>
      </div>
    </>
  );
}
