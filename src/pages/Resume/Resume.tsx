import List from '../../components/List';
import './Resume.css';

// Parse markdown-style links [text](url) into JSX anchor elements
function parseMarkdownLinks(text: string) {
  if (!text) return text;
  
  return text.split(/(\[.*?\]\(.*?\))/).map((part, idx) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);
    if (match) {
      return (
        <a key={idx} href={match[2]} target="_blank" rel="noopener noreferrer">
          {match[1]}
        </a>
      );
    }
    return part;
  });
}

export function Resume() {
  const resumeData = {
    personalInfo: {
      name: 'Louis Liu',
      title: 'A web developer',
      tagline: 'Quick learner 🚀',
      email: 'louisgh.cn@gmail.com',
      website: 'https://louis-7.github.io',
    },

    recentFocus: [
      {
        title: 'AI/ML Product Development',
        description: 'Building production-ready AI applications with multi LLM integration, cross-platform desktop deployment, and modern React/TypeScript architecture',
      },
      {
        title: '10+ Years Full-Stack Expertise',
        description: 'Specializing in TypeScript, React ecosystem, and scalable cloud-based applications with proven track record in enterprise and startup environments',
      },
      {
        title: 'Cross-Platform Architecture',
        description: 'Deep experience in Electron desktop apps, React Native mobile development, and responsive web applications with modern UI/UX practices',
      },
    ],

    projects: [
      {
        duration: 'Jun, 2025 - present',
        name: 'SnapMind',
        description: 'SnapMind is a cross-platform desktop AI assistant that lets you instantly interact with LLMs from anywhere in your system.',
        techStack: 'Electron, TypeScript, React (Hooks), Node.js, LLM APIs (OpenAI, Anthropic, Google, Qwen, etc.)',
        highlights: [
          'Responsible for the entire product development cycle: architecture design, front-end and back-end development, CI/CD workflow',
          'Implemented multi-LLM provider integration with intelligent context management for AI-powered features (translation, rewriting, summarization, brainstorming)',
          'Built system-wide hotkey activation and seamless OS integration for macOS and Windows',
          'Designed responsive UI with modern UX patterns and real-time streaming responses from LLM providers',
        ],
      },
      {
        duration: 'Jun, 2020 - present',
        name: 'Cytobank',
        description: 'Cytobank is a cloud-based Flow Cytometry data analysis platform. Maintainer of public APIs including [Cytobank public API](https://developer.cytobank.org/) and [Cytobank API Wrapper for R](https://cran.rstudio.com/web/packages/CytobankAPI/index.html).',
        techStack: 'Backbone.js, Marionette.js, Ruby on Rails, AWS (S3, Lambda, API Gateway, DynamoDB, Step Functions), Plotly.js',
        highlights: [
          'Cloud-based file upload architecture using serverless AWS services with real-time progress tracking',
          'Front-end development with responsive UI design and cross-browser compatibility',
          'Data visualization & analysis: implemented Swarm plot, Volcano plot, and Bar chart with Plotly.js, optimized rendering performance for large datasets (100K+ data points)',
          'Built interactive drag-and-drop canvas for custom chart layouts, enabling users to freely position, resize, and arrange visualization components on a flexible grid',
          'Designed and implemented multiple modules with OOP principles: audit log system, electronic signature workflow, user management',
        ],
      },
      {
        duration: 'Nov, 2017 ~ May, 2020',
        name: 'Lifecycle Management',
        description: 'A Software Lifecycle Management tool on IBM i',
        techStack: 'Angular, TypeScript, Node.js, RESTful APIs',
        highlights: [
          'Developed a web portal using Angular with modern UI/UX, responsive design, and mobile-first approach for better user experience',
          'Full-stack development with TypeScript and JavaScript, implementing component-based architecture',
          'Developed a Node.js backend service compatible with Linux and IBM i platforms using design patterns and OOP principles',
          'Designed a middle layer to integrate various components of the product family with extensible architecture',
        ],
      },
      {
        duration: 'May, 2018 – August, 2018',
        name: 'Code Editor',
        description: '[Zowe Code Editor](https://github.com/zowe/zlux-editor), a plug-in of Zowe running on IBM mainframe.',
        techStack: 'TypeScript, React, Node.js, Monaco Editor, Language Server Protocol',
        highlights: [
          'Responsible for front-end architecture design and Node.js application development with modular, scalable structure',
          'Developed core engine, file system abstraction layer, and extensible menu system using design patterns',
          'Integrated language server with Monaco Editor, implementing real-time syntax highlighting and IntelliSense',
        ],
      },
      {
        duration: 'Mar, 2018 – Apr, 2018',
        name: 'Web Portal React Native',
        description: 'Ported the web portal to the mobile platform.',
        techStack: 'TypeScript, React Native, Native Modules',
        highlights: [
          'Solely responsible for architecture and development using TypeScript and React Native with cross-platform compatibility',
          'Implemented voice command integration and QR code sharing features with native module bridging',
          'Designed responsive mobile UI with platform-specific adaptations for iOS and Android',
        ],
      },
      {
        duration: 'Oct, 2015 – Nov, 2017',
        name: 'Design Studio',
        description: 'Built a low-code mobile app platform for Ionic.',
        techStack: 'Angular, TypeScript, Node.js, Webpack, MongoDB',
        highlights: [
          'Full-stack development with component-based architecture and real-time collaboration features',
          'Implemented drag-and-drop UI builder with responsive preview and code generation',
          'Handled server maintenance and DevOps including deployment automation and monitoring',
        ],
      },
      {
        duration: 'Jun, 2017 - Aug, 2017',
        name: 'SOH',
        description: 'Data science and data visualization project.',
        techStack: 'Angular, Grafana, TypeScript',
        highlights: [
          'Led the front-end team and used Grafana for real-time data visualization dashboards',
          'Developed an Angular-based admin system with responsive design and role-based access control',
        ],
      },
      {
        duration: 'Sep, 2014 – Aug, 2015',
        name: 'Self Engagement Portal',
        description: 'ASP.NET website maintenance and hybrid mobile project.',
        techStack: null,
        highlights: [
          'Handled daily maintenance, automation scripts, and bug fixes for enterprise web application',
          'Migrated web features to mobile using hybrid app framework for better user experience',
          'Served as Scrum Master and tracked project progress, facilitating team collaboration',
        ],
      },
    ],

    workExperience: [
      {
        duration: 'Jun, 2020 – Present',
        company: 'Beckman Coulter',
        position: 'Senior Software Engineer',
      },
      {
        duration: 'Nov, 2017 - May, 2020',
        company: 'Rocket Software',
        position: 'Software Engineer',
      },
      {
        duration: 'Aug, 2014 - Nov, 2017',
        company: 'Accenture',
        position: 'Senior Software Analyst',
      },
    ],

    skills: {
      'Frontend Development': [
        'TypeScript, JavaScript (ES6+)',
        'React (Hooks, Context API, Router)',
        'CSS3, HTML5, Responsive Design, Mobile-First Development',
        'Angular, Backbone.js, Marionette.js',
      ],
      'Architecture & Engineering': [
        'Object-Oriented Programming (OOP)',
        'Design Patterns, System Architecture',
        'Data Structures & Algorithms',
        'RESTful API Design',
      ],
      'Cross-Platform Development': [
        'Electron (Desktop Apps)',
        'React Native (Mobile)',
        'Hybrid Apps (Ionic, Cordova)',
      ],
      'AI/ML & GenAI': [
        'LLM Integration (OpenAI, Anthropic, Google, Qwen, DeepSeek, etc.)',
        'GenAI Applications, Prompt Engineering',
        'AI-Powered Features & Workflows',
      ],
      'Cloud & DevOps': [
        'AWS (S3, Lambda, API Gateway, DynamoDB, Step Functions)',
        'Node.js, Ruby on Rails',
        'Git, Docker, k8s, CI/CD, Linux',
        'MongoDB, MySQL',
      ],
    },

    certificates: ['Scrum Alliance – CSM', 'Scrum Alliance - CSPO'],

    education: [
      {
        duration: '2010 - 2014',
        institution: 'Dalian Neusoft University of Information',
        degree: 'Bachelor of E-commerce',
      },
    ],
  };

  return (
    <div className="page-resume">
      <div className="page-container">
        <div className="personal-info">
          <div className="my-name">{resumeData.personalInfo.name}</div>
          <div className="personal-info-cols">
            <div className="personal-info-col">
              <div>{resumeData.personalInfo.title}</div>
              <div>{resumeData.personalInfo.tagline}</div>
            </div>
            <div className="personal-info-col">
              <div>
                <a href={`mailto:${resumeData.personalInfo.email}`}>
                  {resumeData.personalInfo.email}
                </a>
              </div>
              <div>
                <a href={resumeData.personalInfo.website} target="_blank" rel="noopener noreferrer">
                  {resumeData.personalInfo.website}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="section-title">Recent Focus</div>
        <div className="recent-focus">
          <ul>
            {resumeData.recentFocus.map((item, index) => (
              <li key={index}>
                <strong>{item.title}:</strong> {item.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="section-title">Projects</div>
        <div className="project-list">
          {resumeData.projects.map((project, index) => (
            <div key={index}>
              <div className="project-title">
                <span className="project-duration">{project.duration}</span>
                <span className="project-name">{project.name}</span>
              </div>
              <p>{parseMarkdownLinks(project.description)}</p>
              <ul>
                {project.techStack && (
                  <li>
                    <strong>Tech Stack:</strong> {project.techStack}
                  </li>
                )}
                {project.highlights.map((highlight, hIndex) => (
                  <li key={hIndex}>{parseMarkdownLinks(highlight)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="section-title">Work Experience</div>
        <div className="work-experience">
          {resumeData.workExperience.map((work, index) => (
            <div key={index} className="work-experience-title">
              <span className="work-duration">{work.duration}</span>
              <span className="work-company">{work.company}</span>
              <span className="work-position">{work.position}</span>
            </div>
          ))}
        </div>

        <div className="section-title">Skills</div>
        <div className="skill-list">
          {Object.entries(resumeData.skills).map(([category, items]) => (
            <div key={category} className="skill-category">
              <strong>{category}</strong>
              <List items={items} />
            </div>
          ))}
        </div>

        <div className="section-title">Certificates</div>
        <div className="certificate-list">
          <List items={resumeData.certificates} />
        </div>

        <div className="section-title">Education</div>
        <div className="education-list">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="education-title">
              <span className="education-duration">{edu.duration}</span>
              <span className="education-name">{edu.institution}</span>
              <span className="education-major">{edu.degree}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
