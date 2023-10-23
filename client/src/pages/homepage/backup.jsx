import "./Homepage.css";
// import {complainCategories} from "../../components/utils/";
import FeaturedPost from "../../components/FeaturedPost/FeaturedPost";
import Post from "../../components/posts/Post";

const Homepage = () => {
  // const samplePost = {
  //   title: "Maccas gave me 9 nuggets instead of 10!",
  //   date: "October 21, 2023",
  //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   image: "sample-image-url.jpg",
  //   imageLabel: "Sample Image Label",
  // };
  return (
    <header id="home" className="home">
      <div className="header-container">
        <div className="Header-section">
          <h1>Let&aposs Complain</h1>
          <div className="header-text">
            <p>What are you interested in complaining about?</p>
          </div>
          {/* Featured Post Section */}
          {/* <FeaturedPost post={samplePost} /> */}
        </div>
      </div>
    </header>
  );
};

export default Homepage;