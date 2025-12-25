import profileImg from '../../assets/profile.png';

import './About.css';
import Icon from '../../components/Icon';
import { Avatar } from '../../components/Avatar';

export function About() {
  return (
    <div className="page-about">
      <div className="background"></div>
      <div className="profile-container">
        <div className="profile-img-flip">
          <Avatar imageSrc={profileImg} alt="profile" targetPath="/farm" />
        </div>

        <svg
          className="dash-line left"
          viewBox="0 0 300 21"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="300,0 280,20 0,20" />
        </svg>

        <svg
          className="dash-line right"
          viewBox="0 0 300 21"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="1,20 20,1 300,1" />
        </svg>
        <span className="my-name">Louis Liu</span>
        {/* <div className="click-me">
          <Icon type="MoonFilled" className="icon-md"></Icon>
        </div> */}
        <div className="self-intro">
          <div className="tag">Software Engineer | Flow Cytometry Analysis</div>
          <div>
            I'm a full-stack web developer with a strong focus on web
            technologies.
          </div>
        </div>
        <div className="links">
          <a href="https://github.com/Louis-7" target="_blank">
            <Icon type="GithubOutlined" className="icon-md"></Icon>
          </a>
          <a href="https://dev.to/louis7" target="_blank">
            <img
              className='dev-to-logo'
              src="https://media2.dev.to/dynamic/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
              alt="DEV Community"
            ></img>
          </a>
          <a href="https://www.linkedin.com/in/louis360/" target="_blank">
            <Icon type="LinkedinOutlined" className="icon-md"></Icon>
          </a>
          <a href="mailto:louisgh.cn@gmail.com" target="_blank">
            <Icon type="MailOutlined" className="icon-md"></Icon>
          </a>

        </div>
      </div>
    </div>
  );
}
