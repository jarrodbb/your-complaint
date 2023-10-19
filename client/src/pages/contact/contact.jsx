import './Contact.css';

const Contact = () => {
  return (
    <section id='contact'>
      <h1>Contact || Resume</h1>
      <div className="contact-container">
        <div className="text-box">
          <div className="contact-text">
            <p>Thanks for viewing my website <br /> Feel free to contact me here</p>
          </div>
        </div>
        <div className="contact-details">
          {/* All links open in a new tab */}
          <a href="tel:+9999999999" className="contact-button"><i className="fas fa-phone"></i> Phone</a>
          <a href="https://makeredundant.github.io/Brian-Website/" className="contact-button" target="_blank" rel="noreferrer"><i className="fas fa-globe"></i> Website</a>
          <a href="mailto:Brian.trang@hotmail.com" className="contact-button"><i className="fas fa-envelope"></i> Email</a>
          <a href="https://github.com/MakeRedundant" className="contact-button" target="_blank" rel="noreferrer"><i className="fab fa-github"></i> GitHub</a>
          <a href="https://drive.google.com/drive/folders/178aJT71OVJzvM4JJm0IqHat_YxyOVq7O?usp=drive_link" className="contact-button" target="_blank" rel="noreferrer"><i className="fas fa-file-pdf"></i> Download Resume</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
