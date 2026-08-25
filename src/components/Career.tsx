import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> Training
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech – CSE (AI & ML)</h4>
                <h5>Lovely Professional University</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Pursuing Computer Science & Engineering with specialization in
              Artificial Intelligence and Machine Learning. Focused on advanced
              algorithms, database systems, and intelligent applications.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Cybersecurity Awareness</h4>
                <h5>LPU & WNS CyberSmart</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Summer Training & Community Development: Conducted cybersecurity
              awareness sessions on phishing, safe browsing, OTP/password
              safety, and practical cyber-threat mitigation using WNS CyberSmart.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Secondary Higher School</h4>
                <h5>School Of Creative Learning</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Completed 12th standard (2023–2025) with a 62% CGPA, building
              strong competencies in mathematics, science, and computer
              fundamentals.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Higher School</h4>
                <h5>School Of Creative Learning</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Completed 10th standard (2022–2023) with a 72% CGPA with
              academic excellence in sciences and mathematical reasoning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
