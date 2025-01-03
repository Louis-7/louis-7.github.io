export function CV() {
  return (
    <>
      <h4>Projects</h4>
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
        <li>Back-end development based on Ruby on Rails.</li>
        <li>
          Data visualization & analysis. (Plotly.js, D3, Swarm plot, Stain
          Index)
        </li>
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
          Designed middleware to integrate various components of the product
          family.
        </li>
      </ul>
      <div className="project-title">
        <span className="project-duration">May, 2018 – August, 2018</span>
        <span className="project-name">Code Editor</span>
      </div>
      <p>Zowe Code Editor, a plug-in of Zowe running on IBM mainframe.</p>
      <ul>
        <li>
          As the only JavaScript developer in the team, responsible for
          front-end architecture and Node.js application.
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
      <p>Created a drag & drop mobile app UI design website.</p>
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
        <li>Led front-end team, used Grafana for data visualization.</li>
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
    </>
  );
}
