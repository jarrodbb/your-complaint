import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      {/* Second Navigation Bar */}
      <div className="navbar-container">
        <a href="#header" data-text="Home">
          <i className="far fa fa-home"></i>
          Home
        </a>
        <a href="#about" data-text="About">
          <i className="far fa-user"></i>
          About
        </a>
        <a href="#experience" data-text="Experience">
          <i className="fas fa-briefcase"></i>
          Experience
        </a>
        <a href="#skills" data-text="Skills">
          <i className="far fa-file-code"></i>
          Skills
        </a>
        <a href="#project" data-text="Project">
          <i className="far fa-folder-open"></i>
          Project
        </a>
        <a href="#education" data-text="Education">
          <i className="far fa fa-school"></i>
          Education
        </a>
        <a href="#contact" data-text="Contact">
          <i className="far fa fa-phone"></i>
          Contact || Resume
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
