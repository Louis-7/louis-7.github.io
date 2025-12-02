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
  const certificates = ['Scrum Alliance – CSM', 'Scrum Alliance - CSPO'];
  return (
    <div className="page-resume">
      <div className="page-container">
        <div className="personal-info">
          <div className="my-name">Louis Liu</div>
          <div className="personal-info-cols">
            <div className="personal-info-col">
              <div>A web developer</div>
              <div>Quick learner 🚀</div>
            </div>
            <div className="personal-info-col">
              <div>
                <a href="mailto:louisgh.cn@gmail.com">louisgh.cn@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="section-title">Projects</div>
        <div className="project-list">
          <div className="project-title">
            <span className="project-duration">Jun, 2025 - present</span>
            <span className="project-name">SnapMind</span>
          </div>
          <p>
            SnapMind is a desktop AI assistant that lets you instantly interact with LLMs from anywhere in your system.
          </p>
          <ul>
            <li>
              Responsible for the entire product development cycle.
            </li>
            <li>
              Architecture design, front-end and back-end development, CI/CD workflow.
            </li>
          </ul>
          <div className="project-title">
            <span className="project-duration">Jun, 2020 - present</span>
            <span className="project-name">Cytobank</span>
          </div>
          <p>
            Cytobank is a cloud-based Flow Cytometry data analysis platform.
          </p>
          <ul>
            <li>
              Cloud-based file upload (S3, API Gateway, Lambda, DynamoDB, Step
              Functions)
            </li>
            <li>Front-end development using Backbone.js and Marionette.js.</li>
            <li>Back-end development using Ruby on Rails.</li>
            <li>
              Data visualization & analysis: implemented Swarm plot, Volcano
              plot, and Bar chart with Plotly.js.
            </li>
            <li>
              Designed and implemented multiple modules, e.g., audit log,
              electronic signature, etc.
            </li>
            <li>
              Maintainer of public API (
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
              Developed a web portal using AngularJS for a modern UI and user
              experience.
            </li>
            <li>Full-stack development with JavaScript.</li>
            <li>
              Developed a Node.js backend service compatible with Linux and IBM
              i platforms.
            </li>
            <li>
              Designed a middle layer to integrate various components of the
              product family.
            </li>
          </ul>
          <div className="project-title">
            <span className="project-duration">May, 2018 – August, 2018</span>
            <span className="project-name">Code Editor</span>
          </div>
          <p>
            <a href="https://github.com/zowe/zlux-editor" target="_blank">
              Zowe Code Editor
            </a>
            , a plug-in of Zowe running on IBM mainframe.
          </p>
          <ul>
            <li>
              Responsible for front-end architecture and Node.js application
              development.
            </li>
            <li>Developed core engine, file system, and menu system.</li>
            <li>Integrated language server with Monaco Editor.</li>
          </ul>

          <div className="project-title">
            <span className="project-duration">Mar, 2018 – Apr, 2018</span>
            <span className="project-name">Web Portal React Native</span>
          </div>
          <p>Ported the web portal to the mobile platform.</p>
          <ul>
            <li>
              Solely responsible for architecture and development using
              TypeScript and React Native.
            </li>
            <li>Implemented voice command and QR code sharing features.</li>
          </ul>

          <div className="project-title">
            <span className="project-duration">Oct, 2015 – Nov, 2017</span>
            <span className="project-name">Design Studio</span>
          </div>
          <p>Built a low-code mobile app platform for Ionic.</p>
          <ul>
            <li>
              Full-stack development using Angular, Node.js, Webpack, and
              MongoDB.
            </li>
            <li>Handled server maintenance and DevOps.</li>
          </ul>

          <div className="project-title">
            <span className="project-duration">Jun, 2017 - Aug, 2017</span>
            <span className="project-name">SOH</span>
          </div>
          <p>Data science and data visualization project.</p>
          <ul>
            <li>
              Led the front-end team and used Grafana for data visualization.
            </li>
            <li>Developed an Angular-based admin system.</li>
          </ul>

          <div className="project-title">
            <span className="project-duration">Sep, 2014 – Aug, 2015</span>
            <span className="project-name">Self Engagement Portal</span>
          </div>
          <p>ASP.NET website maintenance and hybrid mobile project.</p>
          <ul>
            <li>
              Handled daily maintenance, automation scripts, and bug fixes.
            </li>
            <li>
              Migrated web features to mobile for a better user experience.
            </li>
            <li>Served as Scrum Master and tracked project progress.</li>
          </ul>
        </div>

        <div className="section-title">Work Experience</div>
        <div className="work-experience">
          <div className="work-experience-title">
            <span className="work-duration">Jun, 2020 – Present</span>
            <span className="work-company">Beckman Coulter</span>
            <span className="work-position">Senior Software Engineer</span>
          </div>
          <div className="work-experience-title">
            <span className="work-duration">Nov, 2017 - May, 2020</span>
            <span className="work-company">Rocket Software</span>
            <span className="work-position">Software Engineer</span>
          </div>
          <div className="work-experience-title">
            <span className="work-duration">Aug, 2014 - Nov, 2017</span>
            <span className="work-company">Accenture</span>
            <span className="work-position">Senior Software Analyst</span>
          </div>
        </div>

        <div className="section-title">Skills</div>
        <div className="skill-list">
          <List items={skills} />
        </div>

        <div className="section-title">Certificates</div>
        <div className="certificate-list">
          <List items={certificates} />
        </div>

        <div className="section-title">Education</div>
        <div className="education-list">
          <div className="education-title">
            <span className="education-duration">2010 - 2014</span>
            <span className="education-name">
              Dalian Neusoft University of Information
            </span>
            <span className="education-major">Bachelor of E-commerce</span>
          </div>
        </div>
      </div>
    </div>
  );
}
