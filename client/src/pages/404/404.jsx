import React from 'react'

//display contents for 404
const WrongPage = () => {
  return (
    <section id='wrongPage'>
      <section className="error-page">
        <div className="page-center">
          <span>404</span>
          <h1>Oops, Don&apos;t complain but you broke us!</h1>
          <h2>The page you tried cannot be found, maybe put in a complaint?</h2>
        </div>
      </section>
    </section>
  );
};

export default WrongPage;