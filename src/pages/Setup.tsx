import "../styles/setup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveProfile } from "../utils/storage";
import { isSetupValid } from "../utils/validation";

export default function Setup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        category: "",
        income: 0,
        fixedExpenses: 0,
        savingTarget: 0,
        behavior: "",
    });

    const [error, setError] = useState(false);

    const handleChange = (field: string, value: any) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = () => {
        if (!isSetupValid(form)) {
            setError(true);
            return;
        }

        saveProfile(form);
        navigate("/dashboard");
    };

    return (
        <>
            <div className="bg-orb orb1"></div>
            <div className="bg-orb orb2"></div>

            <div className="setup-container">
                <div className="setup-illustration">
                    <img src="/assets/images/setupImg.svg" alt="Setup Illustration" />
                </div>

                <div className="setup-card">
                    <h2>Let’s Understand You</h2>
                    <p className="subtitle">
                        This helps your AI work smarter — completely offline.
                    </p>

                    <input
                        type="text"
                        placeholder="Your Name"
                        onChange={(e) => handleChange("name", e.target.value)}
                    />

                    <select
                        onChange={(e) => handleChange("category", e.target.value)}
                    >
                        <option value="">Select Category</option>
                        <option value="student">Student</option>
                        <option value="working">Working Professional</option>
                        <option value="business">Business</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Monthly Income"
                        onChange={(e) => handleChange("income", Number(e.target.value))}
                    />

                    <input
                        type="number"
                        placeholder="Fixed Monthly Expenses"
                        onChange={(e) => handleChange("fixedExpenses", Number(e.target.value))}
                    />

                    <input
                        type="number"
                        placeholder="Monthly Savings Goal"
                        onChange={(e) => handleChange("savingTarget", Number(e.target.value))}
                    />

                    {error && (
                        <p style={{ color: "red" }}>
                            Fixed Expenses + Saving Goal cannot exceed Income
                        </p>
                    )}

                    <label className="textarea-label">
                        Describe your money habits in your own words
                    </label>

                    <textarea
                        placeholder="Describe your money behavior..."
                        onChange={(e) => handleChange("behavior", e.target.value)}
                    ></textarea>

                    <button onClick={handleSubmit}>
                        Save & Continue
                    </button>
                </div>
            </div>
        </>
    );
}




// import "../styles/setup.css";

// export default function Setup() {
//     return (
//         <>
//             <div className="bg-orb orb1"></div>
//             <div className="bg-orb orb2"></div>

//             <div className="setup-container">
//                 <div className="setup-illustration">
//                     <img src="/assets/images/setupImg.svg" alt="Setup Illustration" />
//                 </div>

//                 <div className="setup-card">
//                     <h2>Let’s Understand You</h2>
//                     <p className="subtitle">
//                         This helps your AI work smarter — completely offline.
//                     </p>

//                     <input type="text" placeholder="Your Name" />

//                     <select>
//                         <option value="">Select Category</option>
//                         <option value="student">Student</option>
//                         <option value="working">Working Professional</option>
//                         <option value="business">Business</option>
//                     </select>

//                     <input type="number" placeholder="Monthly Income" />
//                     <input type="number" placeholder="Fixed Monthly Expenses" />
//                     <input type="number" placeholder="Monthly Savings Goal" />

//                     <label className="textarea-label">
//                         Describe your money habits in your own words
//                     </label>

//                     <textarea placeholder="Describe your money behavior..."></textarea>

//                     <button>Save & Continue</button>
//                 </div>
//             </div>
//         </>
//     );
// }