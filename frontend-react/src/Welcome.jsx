import "./Welcome.css";
import bgImage from "./assets/library-welcome.png";

function Welcome({ onStart }) {
  return (
    <div className="welcome-page">
      <div className="welcome-main-box">

        <div className="welcome-content">
          <span className="welcome-label">DIGITAL LIBRARY PROJECT</span>

          <h1>Digital Library</h1>
          <div style={{marginTop: "20px"}}>
  <h3>Team Members</h3>

  <p>Harshitha</p>
  <p>pruthvika</p>
  <p>Nhikitha</p>
  
</div>

          <div className="welcome-line"></div>

          <ul>
            <li>Discover a wide range of books</li>
            <li>Enjoy a quiet place to read</li>
            <li>Access resources and services</li>
          </ul>

          <button onClick={onStart}>
            📖 GET STARTED
          </button>
        </div>

        <div className="welcome-image-box">
          <img src={bgImage} alt="Library" />
        </div>

      </div>
    </div>
  );
}

export default Welcome;