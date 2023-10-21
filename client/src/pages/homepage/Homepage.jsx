import "./Homepage.css";
// import {complainCategories} from "../../components/utils/";

const Homepage = () => {
  return (
    <header id="header" className="header">
      <div className="header-container">
        <div className="Header-section">
          <h1>Let's Complain</h1>
          <div className="header-text">
            <p>What are you interested in complaining about?</p>
            {/* <div className="Categories">
              {complainCategories.map((category, index) => (
                <div
                  key={index}
                  className="category-tag"
                  style={{ backgroundColor: category.color }}
                >
                  {category.category}
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Homepage;