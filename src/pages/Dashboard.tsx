// import { generateInsight } from "../services/aiEngine";
// import "../styles/dashboard.css";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//     getProfile,
//     getExpenses,
//     saveExpenses,
//     Expense,
// } from "../utils/storage";
// import {
//     calculateRemaining,
//     calculateProgressPercentage,
// } from "../services/financeService";
// import { isExpenseAllowed } from "../utils/validation";
// import { useRef } from "react";

// export default function Dashboard() {
//     const navigate = useNavigate();
//     const profile = getProfile();

//     const [expenses, setExpenses] = useState<Expense[]>([]);
//     const [showForm, setShowForm] = useState(false);
//     const [amount, setAmount] = useState<number>(0);
//     const [category, setCategory] = useState<string>("");
//     const [error, setError] = useState(false);
//     const [aiResponse, setAiResponse] = useState<string>("Analyzing your finances...");
//     const [loadingAI, setLoadingAI] = useState(false);

//     useEffect(() => {
//         if (!profile) {
//             alert("Please complete setup first.");
//             navigate("/setup");
//             return;
//         }

//         const storedExpenses = getExpenses();
//         setExpenses(storedExpenses);
//     }, []);

//     // // 🔥 AI Auto Analyze when expenses change
//     // useEffect(() => {
//     //     if (!profile) return;

//     //     const runAI = async () => {
//     //         setLoadingAI(true);

//     //         try {
//     //             const response = await generateInsight({
//     //                 income: profile.income,
//     //                 expenses: profile.expenses,
//     //                 savings: profile.savings,
//     //                 dailyExpenses: expenses,
//     //             });

//     //             setAiResponse(response);
//     //         } catch (err) {
//     //             setAiResponse("AI unavailable. Try again.");
//     //         }

//     //         setLoadingAI(false);
//     //     };

//     //     runAI();
//     // }, [expenses]);

//     const hasRunRef = useRef(false);

//     useEffect(() => {
//         if (!profile) return;

//         // 🚫 Prevent double execution in StrictMode
//         if (hasRunRef.current) return;
//         hasRunRef.current = true;

//         const runAI = async () => {
//             setLoadingAI(true);

//             try {
//                 const response = await generateInsight({
//                     income: profile.income,
//                     fixedExpenses: profile.fixedExpenses,
//                     savingTarget: profile.savingTarget,
//                 }, expenses);

//                 setAiResponse(response);
//             } catch (err) {
//                 setAiResponse("AI unavailable. Try again.");
//             }

//             setLoadingAI(false);
//         };

//         runAI();
//     }, [expenses]);

//     if (!profile) return null;

//     const remaining = calculateRemaining(profile, expenses);
//     const progress = calculateProgressPercentage(profile, expenses);

//     const today = new Date();
//     const dateString = today.toLocaleDateString();

//     const lastDay = new Date(
//         today.getFullYear(),
//         today.getMonth() + 1,
//         0
//     ).getDate();

//     const daysRemaining = lastDay - today.getDate();

//     const handleAddExpense = () => {
//         if (!isExpenseAllowed(profile, expenses, amount) || !category) {
//             setError(true);
//             return;
//         }

//         const newExpense: Expense = {
//             id: Date.now().toString(),
//             amount,
//             date: new Date().toLocaleDateString(),
//             category,
//         } as any;

//         const updated = [...expenses, newExpense];
//         setExpenses(updated);
//         saveExpenses(updated);

//         setAmount(0);
//         setCategory("");
//         setError(false);
//         setShowForm(false);
//     };

//     const handleDelete = (id: string) => {
//         const confirmDelete = window.confirm("Delete this expense?");
//         if (!confirmDelete) return;

//         const updated = expenses.filter((exp: any) => exp.id !== id);
//         setExpenses(updated);
//         saveExpenses(updated);
//     };

//     return (
//         <div className="dashboard-wrapper">

//             <div className="left-panel">
//                 <div className="date-panel">
//                     <div className="date-big">{dateString}</div>
//                     <div className="date-small">
//                         {daysRemaining} days remaining this month
//                     </div>
//                 </div>

//                 <div className="tube-section">
//                     <div className="tube-container">
//                         <div
//                             className="tube-fill"
//                             style={{ height: `${progress}%` }}
//                         ></div>
//                         <div className="tube-shine"></div>
//                     </div>
//                     <div className="remaining-text">
//                         Remaining ₹{remaining}
//                     </div>
//                 </div>

//                 <div className="ai-box">
//                     <div className="ai-header">
//                         <h3>AI Financial Insight</h3>
//                         {loadingAI && <span className="ai-loader"></span>}
//                     </div>

//                     <div className="ai-content">
//                         {loadingAI ? (
//                             <p>Analyzing your spending patterns...</p>
//                         ) : (
//                             aiResponse.split("\n").map((line, index) => {
//                                 if (line.startsWith("PERSONALITY:"))
//                                     return <h4 key={index} className="ai-section">{line}</h4>;

//                                 if (line.startsWith("RISK:"))
//                                     return <h4 key={index} className="ai-section">{line}</h4>;

//                                 if (line.startsWith("TOP SPENDING CATEGORY:"))
//                                     return <h4 key={index} className="ai-section">{line}</h4>;

//                                 if (line.startsWith("SUGGESTION:"))
//                                     return <h4 key={index} className="ai-section">{line}</h4>;

//                                 return <p key={index}>{line}</p>;
//                             })
//                         )}
//                     </div>
//                 </div>
//             </div>

//             <div className="right-panel">
//                 <div className="table-header">
//                     <h2>Daily Expenses</h2>
//                     <button
//                         className="add-expense-btn"
//                         onClick={() => setShowForm(true)}
//                     >
//                         + Add Expense
//                     </button>
//                 </div>

//                 {showForm && (
//                     <div style={{ marginBottom: "20px" }}>
//                         <input
//                             type="number"
//                             placeholder="Enter Amount"
//                             value={amount}
//                             min={1}
//                             max={remaining}
//                             onChange={(e) =>
//                                 setAmount(
//                                     Math.min(Number(e.target.value), remaining)
//                                 )
//                             }
//                         />

//                         <select
//                             value={category}
//                             onChange={(e) => setCategory(e.target.value)}
//                         >
//                             <option value="">Select Category</option>
//                             <option value="Food">Food</option>
//                             <option value="Travel">Travel</option>
//                             <option value="Movies">Movies</option>
//                             <option value="Shopping">Shopping</option>
//                             <option value="Bills">Bills</option>
//                             <option value="Other">Other</option>
//                         </select>

//                         {error && (
//                             <p style={{ color: "red" }}>
//                                 Invalid amount or category.
//                             </p>
//                         )}

//                         <div style={{ marginTop: "10px" }}>
//                             <button onClick={handleAddExpense}>
//                                 Save Expense
//                             </button>
//                             <button
//                                 style={{ marginLeft: "10px" }}
//                                 onClick={() => {
//                                     setShowForm(false);
//                                     setError(false);
//                                 }}
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 <table className="expense-table">
//                     <thead>
//                         <tr>
//                             <th>Date</th>
//                             <th>Category</th>
//                             <th>Amount</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {expenses.map((exp: any) => (
//                             <tr key={exp.id}>
//                                 <td>{exp.date}</td>
//                                 <td>{exp.category}</td>
//                                 <td>₹{exp.amount}</td>
//                                 <td>
//                                     <button
//                                         onClick={() => handleDelete(exp.id)}
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//         </div>
//     );
// }

//AFTER 270 WALA CODE




// import { generateInsight } from "../services/aiEngine";
// import "../styles/dashboard.css";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//     getProfile,
//     getExpenses,
//     saveExpenses,
//     Expense,
// } from "../utils/storage";
// import {
//     calculateRemaining,
//     calculateProgressPercentage,
// } from "../services/financeService";
// import { isExpenseAllowed } from "../utils/validation";

// export default function Dashboard() {
//     const navigate = useNavigate();
//     const profile = getProfile();

//     const [expenses, setExpenses] = useState<Expense[]>([]);
//     const [showForm, setShowForm] = useState(false);
//     const [amount, setAmount] = useState<number>(0);
//     const [category, setCategory] = useState<string>("");
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         if (!profile) {
//             alert("Please complete setup first.");
//             navigate("/setup");
//             return;
//         }

//         setExpenses(getExpenses());
//     }, []);

//     if (!profile) return null;

//     const remaining = calculateRemaining(profile, expenses);
//     const progress = calculateProgressPercentage(profile, expenses);

//     const today = new Date();
//     const dateString = today.toLocaleDateString();

//     const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
//     const daysRemaining = lastDay - today.getDate();

//     const handleAddExpense = () => {
//         if (!isExpenseAllowed(profile, expenses, amount) || !category) {
//             setError(true);
//             return;
//         }

//         const newExpense: Expense = {
//             id: Date.now().toString(),
//             amount,
//             date: new Date().toLocaleDateString(),
//             category,
//         } as any;

//         const updated = [...expenses, newExpense];
//         setExpenses(updated);
//         saveExpenses(updated);

//         setAmount(0);
//         setCategory("");
//         setError(false);
//         setShowForm(false);
//     };

//     const handleDelete = (id: string) => {
//         const confirmDelete = window.confirm("Delete this expense?");
//         if (!confirmDelete) return;

//         const updated = expenses.filter((exp) => exp.id !== id);
//         setExpenses(updated);
//         saveExpenses(updated);
//     };

//     return (
//         <div className="dashboard-wrapper">

//             <div className="left-panel">
//                 <div className="date-panel">
//                     <div className="date-big">{dateString}</div>
//                     <div className="date-small">
//                         {daysRemaining} days remaining this month
//                     </div>
//                 </div>

//                 <div className="tube-section">
//                     <div className="tube-container">
//                         <div
//                             className="tube-fill"
//                             style={{ height: `${progress}%` }}
//                         ></div>
//                         <div className="tube-shine"></div>
//                     </div>
//                     <div className="remaining-text">
//                         Remaining ₹{remaining}
//                     </div>
//                 </div>

//                 <div className="ai-box">
//                     <h3>AI Insight</h3>
//                     <p>AI response here...</p>
//                 </div>
//             </div>

//             <div className="right-panel">
//                 <div className="table-header">
//                     <h2>Daily Expenses</h2>
//                     <button
//                         className="add-expense-btn"
//                         onClick={() => setShowForm(true)}
//                     >
//                         + Add Expense
//                     </button>
//                 </div>

//                 {showForm && (
//                     <div style={{ marginBottom: "20px" }}>
//                         <input
//                             type="number"
//                             placeholder="Enter Amount"
//                             value={amount}
//                             min={1}
//                             max={remaining}
//                             onChange={(e) =>
//                                 setAmount(
//                                     Math.min(Number(e.target.value), remaining)
//                                 )
//                             }
//                         />

//                         <select
//                             value={category}
//                             onChange={(e) => setCategory(e.target.value)}
//                         >
//                             <option value="">Select Category</option>
//                             <option value="Food">Food</option>
//                             <option value="Travel">Travel</option>
//                             <option value="Movies">Movies</option>
//                             <option value="Shopping">Shopping</option>
//                             <option value="Bills">Bills</option>
//                             <option value="Other">Other</option>
//                         </select>

//                         {error && (
//                             <p style={{ color: "red" }}>
//                                 Invalid amount or category.
//                             </p>
//                         )}

//                         <div style={{ marginTop: "10px" }}>
//                             <button onClick={handleAddExpense}>
//                                 Save Expense
//                             </button>
//                             <button
//                                 style={{ marginLeft: "10px" }}
//                                 onClick={() => {
//                                     setShowForm(false);
//                                     setError(false);
//                                 }}
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 <table className="expense-table">
//                     <thead>
//                         <tr>
//                             <th>Date</th>
//                             <th>Category</th>
//                             <th>Amount</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {expenses.map((exp: any) => (
//                             <tr key={exp.id}>
//                                 <td>{exp.date}</td>
//                                 <td>{exp.category}</td>
//                                 <td>₹{exp.amount}</td>
//                                 <td>
//                                     <button
//                                         onClick={() => handleDelete(exp.id)}
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//         </div>
//     );
// }


// import "../styles/dashboard.css";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//     getProfile,
//     getExpenses,
//     saveExpenses,
//     Expense,
// } from "../utils/storage";
// import {
//     calculateRemaining,
//     calculateProgressPercentage,
// } from "../services/financeService";
// import { isExpenseAllowed } from "../utils/validation";

// export default function Dashboard() {
//     const navigate = useNavigate();
//     const profile = getProfile();

//     const [expenses, setExpenses] = useState<Expense[]>([]);
//     const [amount, setAmount] = useState<number>(0);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         if (!profile) {
//             alert("Please complete setup first.");
//             navigate("/setup");
//             return;
//         }

//         setExpenses(getExpenses());
//     }, []);

//     if (!profile) return null;

//     const handleAddExpense = () => {
//         if (!isExpenseAllowed(profile, expenses, amount)) {
//             setError(true);
//             return;
//         }

//         const newExpense: Expense = {
//             id: Date.now().toString(),
//             amount,
//             date: new Date().toLocaleDateString(),
//         };

//         const updated = [...expenses, newExpense];
//         setExpenses(updated);
//         saveExpenses(updated);
//         setAmount(0);
//         setError(false);
//     };

//     const remaining = calculateRemaining(profile, expenses);
//     const progress = calculateProgressPercentage(profile, expenses);

//     const today = new Date();
//     const dateString = today.toLocaleDateString();

//     return (
//         <div className="dashboard-wrapper">

//             <div className="left-panel">
//                 <div className="date-panel">
//                     <div className="date-big">{dateString}</div>
//                     <div className="date-small">Track your spending wisely</div>
//                 </div>

//                 <div className="tube-section">
//                     <div className="tube-container">
//                         <div
//                             className="tube-fill"
//                             style={{ height: `${progress}%` }}
//                         ></div>
//                         <div className="tube-shine"></div>
//                     </div>
//                     <div className="remaining-text">
//                         Remaining ₹{remaining}
//                     </div>
//                 </div>

//                 <div className="ai-box">
//                     <h3>AI Insight</h3>
//                     <p>AI response here...</p>
//                 </div>
//             </div>

//             <div className="right-panel">
//                 <div className="table-header">
//                     <h2>Daily Expenses</h2>
//                     <button
//                         className="add-expense-btn"
//                         onClick={handleAddExpense}
//                     >
//                         + Add Expense
//                     </button>
//                 </div>

//                 {error && (
//                     <p style={{ color: "red" }}>
//                         Expense exceeds your remaining balance.
//                     </p>
//                 )}

//                 <input
//                     type="number"
//                     placeholder="Enter Expense Amount"
//                     value={amount}
//                     onChange={(e) => setAmount(Number(e.target.value))}
//                 />

//                 <table className="expense-table">
//                     <thead>
//                         <tr>
//                             <th>Date</th>
//                             <th>Amount</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {expenses.map((exp) => (
//                             <tr key={exp.id}>
//                                 <td>{exp.date}</td>
//                                 <td>₹{exp.amount}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//         </div>
//     );
// }



// import "../styles/dashboard.css";

// export default function Dashboard() {
//     return (
//         <div className="dashboard-wrapper">

//             <div className="left-panel">
//                 <div className="date-panel">
//                     <div className="date-big">Date Here</div>
//                     <div className="date-small">Days Info</div>
//                 </div>

//                 <div className="tube-section">
//                     <div className="tube-container">
//                         <div className="tube-fill"></div>
//                         <div className="tube-shine"></div>
//                     </div>
//                     <div className="remaining-text">Remaining ₹0</div>
//                 </div>

//                 <div className="ai-box">
//                     <h3>AI Insight</h3>
//                     <p>AI response here...</p>
//                 </div>
//             </div>

//             <div className="right-panel">
//                 <div className="table-header">
//                     <h2>Daily Expenses</h2>
//                     <button className="add-expense-btn">+ Add Expense</button>
//                 </div>

//                 <table className="expense-table">
//                     <thead>
//                         <tr>
//                             <th>Date</th>
//                             <th>Category</th>
//                             <th>Amount</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody></tbody>
//                 </table>
//             </div>

//         </div>
//     );
// }

import { generateInsight } from "../services/aiEngine";
import "../styles/dashboard.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    getProfile,
    getExpenses,
    saveExpenses,
    Expense,
} from "../utils/storage";
import {
    calculateRemaining,
    calculateProgressPercentage,
} from "../services/financeService";
import { isExpenseAllowed } from "../utils/validation";

export default function Dashboard() {
    const navigate = useNavigate();
    const profile = getProfile();

    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState<string>("");
    const [error, setError] = useState(false);
    const [aiResponse, setAiResponse] = useState<string>("Analyzing your finances...");
    const [loadingAI, setLoadingAI] = useState(false);

    useEffect(() => {
        if (!profile) {
            alert("Please complete setup first.");
            navigate("/setup");
            return;
        }

        const storedExpenses = getExpenses();
        setExpenses(storedExpenses);
    }, []);

    // const hasRunRef = useRef(false);


    useEffect(() => {
        if (!profile) return;

        const runAI = async () => {
            setLoadingAI(true);

            try {
                const response = await generateInsight(
                    {
                        income: profile.income,
                        fixedExpenses: profile.fixedExpenses,
                        savingTarget: profile.savingTarget,
                    },
                    expenses
                );

                setAiResponse(response);
            } catch (err) {
                setAiResponse("AI unavailable. Try again.");
            }

            setLoadingAI(false);
        };

        // Small debounce to prevent rapid re-trigger crash
        const timeout = setTimeout(() => {
            runAI();
        }, 300);

        return () => clearTimeout(timeout);

    }, [expenses]);
    // useEffect(() => {
    //     if (!profile) return;
    //     if (hasRunRef.current) return;
    //     hasRunRef.current = true;

    //     const runAI = async () => {
    //         setLoadingAI(true);

    //         try {
    //             const response = await generateInsight(
    //                 {
    //                     income: profile.income,
    //                     fixedExpenses: profile.fixedExpenses,
    //                     savingTarget: profile.savingTarget,
    //                 },
    //                 expenses
    //             );

    //             setAiResponse(response);
    //         } catch (err) {
    //             setAiResponse("AI unavailable. Try again.");
    //         }

    //         setLoadingAI(false);
    //     };

    //     runAI();
    // }, [expenses]);

    if (!profile) return null;

    const remaining = calculateRemaining(profile, expenses);
    const progress = calculateProgressPercentage(profile, expenses);

    // ✅ NEW: Remaining percentage logic
    const usable =
        profile.income - (profile.fixedExpenses + profile.savingTarget);

    const remainingPercent =
        usable > 0 ? Math.max(0, Math.min(100, (remaining / usable) * 100)) : 0;

    const isCritical = remainingPercent <= 40;

    const today = new Date();
    const dateString = today.toLocaleDateString();

    const lastDay = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
    ).getDate();

    const daysRemaining = lastDay - today.getDate();

    const handleAddExpense = () => {
        if (!isExpenseAllowed(profile, expenses, amount) || !category) {
            setError(true);
            return;
        }

        const newExpense: Expense = {
            id: Date.now().toString(),
            amount,
            date: new Date().toLocaleDateString(),
            category,
        } as any;

        const updated = [...expenses, newExpense];
        setExpenses(updated);
        saveExpenses(updated);

        setAmount(0);
        setCategory("");
        setError(false);
        setShowForm(false);
    };

    const handleDelete = (id: string) => {
        const confirmDelete = window.confirm("Delete this expense?");
        if (!confirmDelete) return;

        const updated = expenses.filter((exp: any) => exp.id !== id);
        setExpenses(updated);
        saveExpenses(updated);
    };

    return (
        <div className="dashboard-wrapper">

            <div className="left-panel">
                {/* ✅ Added conditional class */}
                <div className={`date-panel ${isCritical ? "critical-date" : ""}`}>
                    <div className="date-big">{dateString}</div>
                    <div className="date-small">
                        {daysRemaining} days remaining this month
                    </div>
                </div>

                <div className="tube-section">
                    {/* ✅ Added conditional class */}
                    <div className={`tube-container ${isCritical ? "critical-tube" : ""}`}>
                        <div
                            className="tube-fill"
                            style={{ height: `${progress}%` }}
                        ></div>
                        <div className="tube-shine"></div>
                    </div>
                    <div className="remaining-text">
                        Remaining ₹{remaining}
                    </div>
                </div>

                <div className="ai-box">
                    <div className="ai-header">
                        <h3>AI Financial Insight</h3>
                        {loadingAI && <span className="ai-loader"></span>}
                    </div>

                    <div className="ai-content">
                        {loadingAI ? (
                            <p>Analyzing your spending patterns...</p>
                        ) : (
                            aiResponse.split("\n").map((line, index) => {
                                if (line.startsWith("PERSONALITY:"))
                                    return <h4 key={index} className="ai-section">{line}</h4>;

                                if (line.startsWith("RISK:"))
                                    return <h4 key={index} className="ai-section">{line}</h4>;

                                if (line.startsWith("TOP CATEGORY:"))
                                    return <h4 key={index} className="ai-section">{line}</h4>;

                                if (line.startsWith("SUGGESTION:"))
                                    return <h4 key={index} className="ai-section">{line}</h4>;

                                return <p key={index}>{line}</p>;
                            })
                        )}
                    </div>
                </div>
            </div>

            <div className="right-panel">
                <div className="table-header">
                    <h2>Daily Expenses</h2>
                    <button
                        className="add-expense-btn"
                        onClick={() => setShowForm(true)}
                    >
                        + Add Expense
                    </button>
                </div>

                {showForm && (
                    <div style={{ marginBottom: "20px" }}>
                        <input
                            type="number"
                            placeholder="Enter Amount"
                            value={amount}
                            min={1}
                            max={remaining}
                            onChange={(e) =>
                                setAmount(
                                    Math.min(Number(e.target.value), remaining)
                                )
                            }
                        />

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Movies">Movies</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Bills">Bills</option>
                            <option value="Other">Other</option>
                        </select>

                        {error && (
                            <p style={{ color: "red" }}>
                                Invalid amount or category.
                            </p>
                        )}

                        <div style={{ marginTop: "10px" }}>
                            <button onClick={handleAddExpense}>
                                Save Expense
                            </button>
                            <button
                                style={{ marginLeft: "10px" }}
                                onClick={() => {
                                    setShowForm(false);
                                    setError(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((exp: any) => (
                            <tr key={exp.id}>
                                <td>{exp.date}</td>
                                <td>{exp.category}</td>
                                <td>₹{exp.amount}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(exp.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}