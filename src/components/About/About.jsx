import "./About.css";

const About = () => {
  return (
    <div className="about">
      <div className="about__section">
        <h3 className="about__title">Andrew Weaver</h3>
        <p className="about__text">
          Auto Body Technician-turned-Software Engineer with strong
          problem-solving skills and a keen attention to detail. Proficient in
          HTML, JavaScript, and React, I&apos;m eager to apply my technical
          expertise and adaptability to software development. Seeking new
          opportunities to grow and contribute as a software engineer. I created
          this full stack, MERN app as a project for TripleTen&apos;s Software
          Engineer Bootcamp. I chose the Free-to-Game api for my final project
          as one of my main hobbies is playing video games! Some of my most
          played on this list are League of Legends, Smite, Overwatch 2, and
          Warframe.
        </p>
      </div>
      <div className="about__section">
        <h3 className="about__title">FREETOGAME</h3>
        <p className="about__text">
          FreeToGame.com essentially this webpage except it is way better in
          every way, but this one is nice, too. It is is a gaming platform that
          brings together the best Free-to-Play Multiplayer Online Games and MMO
          Games into one convenient place. Whether you&apos;re into MMORPGs,
          MOBAs, FPS, or strategy games, FreeToGame offers a comprehensive
          gaming experience tailored to your interests. FreeToGame also offers a
          free public API that can be accessed without any restrictions or the
          need to create an account. This Free-To-Play Games Database API
          provides developers and enthusiasts with valuable data to enhance
          their gaming projects.
        </p>
      </div>
      <div className="about__section">
        <h3 className="about__title">TripleTen</h3>
        <p className="about__text">
          TripleTen are professional tech bootcamps that help people from all
          walks of life to become tech professionals. What makes TripleTen
          different is an in-depth curriculum with lots of practice, flexible
          lessons, all-around support, and career coaches that teach grads how
          to get hired. The Software Engineering bootcamp teaches full-stack web
          development using JavaScript and the MERN stack: MongoDB, Express,
          React, Node.js, as well as HTML5 and CSS, and Git/GitHub.
        </p>
      </div>
    </div>
  );
};

export default About;
