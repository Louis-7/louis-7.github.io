import profileImg from '../../assets/profile.png';
import Label from '../../components/Label';
import Card from '../../components/Card';

import './About.css';
import Icon from '../../components/Icon';

export function About() {
  return (
    <>
      <div className="page-container">
        <div className="right-section">
          <div className="profile-img">
            <img src={profileImg} alt="profile" />
          </div>
          <div className="personal-info">
            <Card
              title="email"
              text="louisgh.cn@gmail.com"
              iconName="icon-mail"
            ></Card>
            <Card
              title="birthday"
              text="Jun 12, 1991"
              iconName="icon-mail"
            ></Card>
            <Card
              title="location"
              text="Dalian, China"
              iconName="icon-mail"
            ></Card>
          </div>
          <div className="links">
            <a href="https://github.com/Louis-7" target="_blank">
              <Icon type="GithubOutlined" className="icon-md"></Icon>
            </a>
            <a href="https://www.linkedin.com/in/louis360/" target="_blank">
              <Icon type="LinkedinOutlined" className="icon-md"></Icon>
            </a>
          </div>
          <div className="skill-sets">
            <Label text="JavaScript"></Label>
            <Label text="TypeScript"></Label>
            <Label text="CSS"></Label>
            <Label text="Ruby"></Label>
            <Label text="AWS"></Label>
            <Label text="Node.js"></Label>
            <Label text="Ruby on Rails"></Label>
            <Label text="Hybrid"></Label>
            <Label text="SQL"></Label>
            <Label text="Python"></Label>
            <Label text="Electron"></Label>
          </div>
        </div>
        <div className="left-section">
          <h1 className="my-name">Louis Liu</h1>
          {/* <p className="job-title">Software Engineer</p> */}
          <div className="self-intro">
            <p>
              I'm a full-stack web developer with a strong focus on web
              technologies since the beginning of my career. I have a passion
              for coding and maintain several open-source projects.
              Additionally, I enjoy writing blogs to share my programming
              methodologies and experiences.
            </p>

            <p>
              Most of the time, I work with JavaScript. I have extensive
              experience building web applications using modern frameworks such
              as React, Angular, and Vue, and even some older frameworks like
              Backbone. I also have experience developing hybrid mobile apps and
              web-based desktop applications. While web technologies are my
              primary focus, I am also proficient in other programming languages
              like Python.
            </p>

            <p>
              Recently, I've been working with Ruby as well. Currently, I'm
              involved in the field of flow cytometry, developing a cloud-based
              flow analysis software. This project has allowed me to expand my
              skill set and contribute to the scientific community.
            </p>

            <p>
              In addition to my professional work, I'm an amateur photographer.
              I am passionate about capturing the beauty of everyday life
              through my lens and enjoy exploring different styles and
              techniques, from landscapes to still life.
            </p>

            <p>
              I'm also a fan of Soul-like games, enjoying the challenge and
              immersive experiences they offer.
            </p>
          </div>
          {/* <hr></hr> */}
        </div>
      </div>
    </>
  );
}
