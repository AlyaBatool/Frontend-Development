//Multi-Step Form using ReactJs
import { useState, useEffect } from "react";
import { User, ShieldCheck, FileText, CheckCircle } from "lucide-react";
import "./App.css";

const LOCAL_STORAGE_KEY = "multistep_form_progress";

export default function MultiStepForm() {
  // 1. Form State
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : {
      fullName: "",
      email: "",
      password: "",
      plan: "basic",
      marketingOptIn: false,
    };
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 2. Synchronize Form Progress to LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  // 3. Handle Input Fields Value Matching
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear validation error when typing resumes
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // 4. Validation 
  const validateStep = () => {
    let activeErrors = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) activeErrors.fullName = "Full name is required.";
      if (!formData.email.trim()) {
        activeErrors.email = "Email address is required.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        activeErrors.email = "Please provide a valid email format.";
      }
    }

    if (currentStep === 2) {
      if (!formData.password) {
        activeErrors.password = "Password field cannot be empty.";
      } else if (formData.password.length < 6) {
        activeErrors.password = "Password must be at least 6 characters.";
      }
    }

    setErrors(activeErrors);
    return Object.keys(activeErrors).length === 0;
  };

  // 5. Navigation Control System
  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setIsSubmitted(true);
      localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear cache upon completion
    }
  };

  return (
    <div className="form-page-layout">
      <div className="form-card">
        
        {/* --- Step Navigation Progress Header --- */}
        <div className="step-navigation-bar">
          <div className={`step-node ${currentStep >= 1 ? "active" : ""} ${currentStep > 1 ? "completed" : ""}`}>
            <span className="node-icon"><User size={18} /></span>
            <span className="node-label">Profile</span>
          </div>
          <div className="step-connector-line">
            <div className="line-fill" style={{ width: currentStep > 1 ? (currentStep === 2 ? "50%" : "100%") : "0%" }}></div>
          </div>
          <div className={`step-node ${currentStep >= 2 ? "active" : ""} ${currentStep > 2 ? "completed" : ""}`}>
            <span className="node-icon"><ShieldCheck size={18} /></span>
            <span className="node-label">Security</span>
          </div>
          <div className="step-connector-line">
            <div className="line-fill" style={{ width: currentStep > 2 ? "100%" : "0%" }}></div>
          </div>
          <div className={`step-node ${currentStep >= 3 ? "active" : ""} ${isSubmitted ? "completed" : ""}`}>
            <span className="node-icon"><FileText size={18} /></span>
            <span className="node-label">Review</span>
          </div>
        </div>

        {/* --- Form Main Area --- */}
        {isSubmitted ? (
          <div className="success-screen text-center">
            <CheckCircle className="success-checkmark" size={64} />
            <h2>Registration Successful!</h2>
            <p>Your account has been created successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            
            {/* Step 1: Profile Information */}
            {currentStep === 1 && (
              <div className="form-step-panel">
                <h2 className="step-heading">Personal Details</h2>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? "input-error" : ""}
                    placeholder="Enter your name"
                  />
                  {errors.fullName && <p className="error-text">{errors.fullName}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "input-error" : ""}
                    placeholder="you@ex.com"
                  />
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Account Security */}
            {currentStep === 2 && (
              <div className="form-step-panel">
                <h2 className="step-heading">Security Configuration</h2>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "input-error" : ""}
                    placeholder="********"
                  />
                  {errors.password && <p className="error-text">{errors.password}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="plan">Account Tier</label>
                  <select id="plan" name="plan" value={formData.plan} onChange={handleChange}>
                    <option value="basic">Basic (Free)</option>
                    <option value="pro">Pro ($14.99/mo)</option>
                    <option value="enterprise">Advance ($59.99/mo)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Review Details & Submission */}
            {currentStep === 3 && (
              <div className="form-step-panel">
                <h2 className="step-heading">Confirm Information</h2>
                <div className="review-summary-box">
                  <p><strong>Full Name:</strong> {formData.fullName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Account Level:</strong> {formData.plan.toUpperCase()}</p>
                </div>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="marketingOptIn"
                      checked={formData.marketingOptIn}
                      onChange={handleChange}
                    />
                    I agree to receive developer platform updates and notifications.
                  </label>
                </div>
              </div>
            )}

            {/* --- Action Interaction Controls Footer --- */}
            <div className="form-actions-footer">
              {currentStep > 1 && (
                <button type="button" onClick={handlePrev} className="btn-secondary">
                  Back
                </button>
              )}
              
              {currentStep < 3 ? (
                <button type="button" onClick={handleNext} className="btn-primary push-right">
                  Continue
                </button>
              ) : (
                <button type="submit" className="btn-submit push-right">
                  Submit & Finish
                </button>
              )}
            </div>

          </form>
        )}
      </div>
    </div>
  );
}


