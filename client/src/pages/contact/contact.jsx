import "./contact.css";

const Contact = () => {
  return (
    <section id='contact'>
      <h1>Contact</h1>
      <div className="contact-container">
        <div className="text-box">
          <div className="contact-text">
            <p> Need to complain to the team? <br /> Feel free to contact us here</p>
          </div>
        </div>
        <div className="contact-details">
          {/* All links open in a new tab */}
          <a href="tel:+9999999999" className="contact-button"><i className="fas fa-phone"></i> Phone</a>
          <a href="https://makeredundant.github.io/Brian-Website/" className="contact-button" target="_blank" rel="noreferrer"><i className="fas fa-globe"></i> Website</a>
          <a href="mailto:Brian.trang@hotmail.com" className="contact-button"><i className="fas fa-envelope"></i> Email</a>
          <a href="https://github.com/MakeRedundant" className="contact-button" target="_blank" rel="noreferrer"><i className="fab fa-github"></i> GitHub</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
