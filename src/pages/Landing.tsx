import "../styles/landing.css";
import { useNavigate } from "react-router-dom";
import { getProfile, clearProfile } from "../utils/storage";

export default function Landing() {
    const navigate = useNavigate();

    const handleSetup = () => {
        const profile = getProfile();

        if (profile) {
            const confirmReset = window.confirm(
                "You have already entered details. If you continue, previous data will be erased. Continue?"
            );

            if (!confirmReset) return;

            clearProfile();
        }

        navigate("/setup");
    };

    const handleDashboard = () => {
        const profile = getProfile();

        if (!profile) {
            alert("Please complete setup first.");
            return;
        }

        navigate("/dashboard");
    };

    return (
        <div>
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="word">Understand</span>
                        <span className="word highlight">Your Money</span>
                        <span className="word">Like Never Before</span>
                    </h1>

                    <p className="hero-subtitle">
                        Offline AI-powered expense intelligence that connects your mood and money.
                    </p>

                    <div className="hero-buttons">
                        <button
                            className="btn primary"
                            onClick={handleSetup}
                        >
                            Start Setup
                        </button>

                        <button
                            className="btn secondary"
                            onClick={handleDashboard}
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>

                <div className="hero-visual">
                    <img src="/assets/images/finance.svg" alt="Finance Preview" />
                </div>

                <div className="hero-glow"></div>
            </section>

            <section id="features">
                <div className="features-container">
                    <h2>Why Choose Vibe Finance AI</h2>

                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>AI Budget Analysis</h3>
                            <p>Track spending patterns and optimize savings automatically.</p>
                        </div>

                        <div className="feature-card">
                            <h3>Smart Predictions</h3>
                            <p>Forecast future expenses and financial growth trends.</p>
                        </div>

                        <div className="feature-card">
                            <h3>Secure Insights</h3>
                            <p>Bank-level encryption to protect your financial data.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <h2>Your money deserves intelligence — not guesswork.</h2>
                <button
                    className="btn primary"
                    onClick={handleSetup}
                >
                    Start Your Journey
                </button>
            </section>
        </div>
    );
}




// import "../styles/landing.css";
// import { useNavigate } from "react-router-dom";

// export default function Landing() {
//     const navigate = useNavigate();

//     return (
//         <div>
//             <section className="hero">
//                 <div className="hero-content">
//                     <h1 className="hero-title">
//                         <span className="word">Understand</span>
//                         <span className="word highlight">Your Money</span>
//                         <span className="word">Like Never Before</span>
//                     </h1>

//                     <p className="hero-subtitle">
//                         Offline AI-powered expense intelligence that connects your mood and money.
//                     </p>

//                     <div className="hero-buttons">
//                         <button
//                             className="btn primary"
//                             onClick={() => navigate("/setup")}
//                         >
//                             Start Setup
//                         </button>

//                         <button
//                             className="btn secondary"
//                             onClick={() => navigate("/dashboard")}
//                         >
//                             Go to Dashboard
//                         </button>
//                     </div>
//                 </div>

//                 <div className="hero-visual">
//                     <img src="/assets/images/finance.svg" alt="Finance Preview" />
//                 </div>

//                 <div className="hero-glow"></div>
//             </section>

//             <section id="features">
//                 <div className="features-container">
//                     <h2>Why Choose Vibe Finance AI</h2>

//                     <div className="features-grid">
//                         <div className="feature-card">
//                             <h3>AI Budget Analysis</h3>
//                             <p>Track spending patterns and optimize savings automatically.</p>
//                         </div>

//                         <div className="feature-card">
//                             <h3>Smart Predictions</h3>
//                             <p>Forecast future expenses and financial growth trends.</p>
//                         </div>

//                         <div className="feature-card">
//                             <h3>Secure Insights</h3>
//                             <p>Bank-level encryption to protect your financial data.</p>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <section className="cta-section">
//                 <h2>Your money deserves intelligence — not guesswork.</h2>
//                 <button
//                     className="btn primary"
//                     onClick={() => navigate("/setup")}
//                 >
//                     Start Your Journey
//                 </button>
//             </section>
//         </div>
//     );
// }