import { useState, useEffect } from "react";
import { calculateGST } from "../../utils/calculators/gst";

const GSTCalculator = () => {
  const [formData, setFormData] = useState({
    amount: "",
    rate: "",
    type: "exclusive", // exclusive or inclusive
  });

  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("calculator");

  // Predefined GST rates for India
  const gstRates = [
    {
      value: "0",
      label: "0% - Nil Rated",
      description: "Essential commodities",
    },
    {
      value: "5",
      label: "5% - Low Rate",
      description: "Mass consumption items",
    },
    {
      value: "12",
      label: "12% - Standard Rate",
      description: "Processed foods, computers",
    },
    {
      value: "18",
      label: "18% - General Rate",
      description: "Most goods and services",
    },
    {
      value: "28",
      label: "28% - Luxury Rate",
      description: "Luxury items, sin goods",
    },
  ];

  // Validate inputs
  const validateInputs = () => {
    const newErrors = {};

    if (
      !formData.amount ||
      isNaN(formData.amount) ||
      Number(formData.amount) <= 0
    ) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (
      !formData.rate ||
      isNaN(formData.rate) ||
      Number(formData.rate) < 0 ||
      Number(formData.rate) > 100
    ) {
      newErrors.rate = "Please enter a valid GST rate (0-100%)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate GST
  const handleCalculate = () => {
    if (!validateInputs()) return;

    const amount = parseFloat(formData.amount);
    const rate = parseFloat(formData.rate);
    const result = calculateGST(amount, rate);

    // Add breakdown
    const breakdown = {
      exclusive: formData.type === "exclusive",
      baseAmount: amount,
      gstRate: rate,
      cgst: result.gst / 2,
      sgst: result.gst / 2,
      igst: formData.type === "exclusive" ? 0 : result.gst,
    };

    const fullResult = {
      ...result,
      ...breakdown,
      date: new Date().toLocaleString(),
    };

    setResult(fullResult);

    // Add to history
    const historyEntry = {
      id: Date.now(),
      amount: amount.toLocaleString("en-IN"),
      rate: `${rate}%`,
      type: formData.type === "exclusive" ? "Exclusive" : "Inclusive",
      gst: result.gst.toLocaleString("en-IN"),
      total: result.total.toLocaleString("en-IN"),
      date: new Date().toLocaleString(),
    };

    setCalculationHistory((prev) => [historyEntry, ...prev.slice(0, 4)]);
  };

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    // Clear result
    setResult(null);
  };

  // Reset calculator
  const resetCalculator = () => {
    setFormData({
      amount: "",
      rate: "",
      type: "exclusive",
    });
    setResult(null);
    setErrors({});
  };

  // Quick fill examples
  const loadExample = (example) => {
    setFormData(example);
    setErrors({});
  };

  const examples = [
    {
      amount: "10000",
      rate: "18",
      type: "exclusive",
      label: "Laptop Purchase",
      description: "₹10,000 laptop at 18% GST",
    },
    {
      amount: "5000",
      rate: "12",
      type: "exclusive",
      label: "Mobile Phone",
      description: "₹5,000 phone at 12% GST",
    },
    {
      amount: "2500",
      rate: "5",
      type: "exclusive",
      label: "Restaurant Bill",
      description: "₹2,500 bill at 5% GST",
    },
    {
      amount: "11800",
      rate: "18",
      type: "inclusive",
      label: "GST Inclusive",
      description: "₹11,800 inclusive of 18% GST",
    },
  ];

  // Auto-calculate when all fields are filled
  useEffect(() => {
    if (formData.amount && formData.rate) {
      const timer = setTimeout(() => {
        handleCalculate();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [formData]);

  return (
    <div className="gst-calculator">
      {/* Header */}
      <div className="calculator-header">
        <div className="header-icon">🧾</div>
        <div>
          <h3>GST Calculator</h3>
          <p className="header-subtitle">
            Calculate Goods and Services Tax (GST) for Indian businesses
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="calculator-tabs">
        <button
          className={`tab ${activeTab === "calculator" ? "active" : ""}`}
          onClick={() => setActiveTab("calculator")}
        >
          🧮 Calculator
        </button>
        <button
          className={`tab ${activeTab === "rates" ? "active" : ""}`}
          onClick={() => setActiveTab("rates")}
        >
          📊 GST Rates
        </button>
        <button
          className={`tab ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          📜 History
        </button>
      </div>

      {/* Calculator Tab */}
      {activeTab === "calculator" && (
        <div className="calculator-content">
          {/* Quick Examples */}
          <div className="quick-examples">
            <h4>💡 Quick Examples</h4>
            <div className="examples-grid">
              {examples.map((example, index) => (
                <button
                  key={index}
                  className="example-card"
                  onClick={() => loadExample(example)}
                >
                  <div className="example-label">{example.label}</div>
                  <div className="example-description">
                    {example.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <div className="input-section">
            {/* Amount Input */}
            <div className="input-group">
              <label className="input-label">
                <span className="label-icon">💰</span> Amount (₹)
              </label>
              <div className="input-container">
                <span className="input-prefix">₹</span>
                <input
                  type="number"
                  className={`form-input ${errors.amount ? "error" : ""}`}
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
              {errors.amount && (
                <span className="error-message">{errors.amount}</span>
              )}
            </div>

            {/* GST Rate Input */}
            <div className="input-group">
              <label className="input-label">
                <span className="label-icon">📊</span> GST Rate (%)
              </label>
              <div className="input-container">
                <input
                  type="number"
                  className={`form-input ${errors.rate ? "error" : ""}`}
                  placeholder="Enter GST rate"
                  value={formData.rate}
                  onChange={(e) => handleInputChange("rate", e.target.value)}
                  min="0"
                  max="100"
                  step="0.1"
                />
                <span className="input-suffix">%</span>
              </div>
              {errors.rate && (
                <span className="error-message">{errors.rate}</span>
              )}

              {/* Quick Rate Buttons */}
              <div className="quick-rates">
                {gstRates.slice(1).map((rate) => (
                  <button
                    key={rate.value}
                    className="rate-button"
                    onClick={() => handleInputChange("rate", rate.value)}
                  >
                    {rate.value}%
                  </button>
                ))}
              </div>
            </div>

            {/* GST Type Selection */}
            <div className="input-group">
              <label className="input-label">
                <span className="label-icon">🔄</span> GST Calculation Type
              </label>
              <div className="type-selector">
                <button
                  className={`type-button ${
                    formData.type === "exclusive" ? "active" : ""
                  }`}
                  onClick={() => handleInputChange("type", "exclusive")}
                >
                  <span className="type-icon">➕</span>
                  <div className="type-info">
                    <div className="type-label">Exclusive</div>
                    <div className="type-description">GST added to amount</div>
                  </div>
                </button>
                <button
                  className={`type-button ${
                    formData.type === "inclusive" ? "active" : ""
                  }`}
                  onClick={() => handleInputChange("type", "inclusive")}
                >
                  <span className="type-icon">➖</span>
                  <div className="type-info">
                    <div className="type-label">Inclusive</div>
                    <div className="type-description">
                      GST included in amount
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="calculate-button" onClick={handleCalculate}>
                🧮 Calculate GST
              </button>
              <button className="reset-button" onClick={resetCalculator}>
                🔄 Reset
              </button>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="result-section">
              <h4 className="result-title">📋 Calculation Results</h4>

              {/* Main Results */}
              <div className="main-results">
                <div className="result-card total-amount">
                  <div className="result-icon">💰</div>
                  <div>
                    <div className="result-label">Total Amount</div>
                    <div className="result-value">
                      ₹{result.total.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
                <div className="result-card gst-amount">
                  <div className="result-icon">🧾</div>
                  <div>
                    <div className="result-label">GST Amount</div>
                    <div className="result-value">
                      ₹{result.gst.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="breakdown-section">
                <h5>🔍 Detailed Breakdown</h5>
                <div className="breakdown-grid">
                  <div className="breakdown-item">
                    <div className="breakdown-label">Base Amount</div>
                    <div className="breakdown-value">
                      ₹{result.baseAmount.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div className="breakdown-item">
                    <div className="breakdown-label">GST Rate</div>
                    <div className="breakdown-value">{result.gstRate}%</div>
                  </div>
                  <div className="breakdown-item">
                    <div className="breakdown-label">Calculation Type</div>
                    <div className="breakdown-value">
                      {result.exclusive ? "Exclusive" : "Inclusive"}
                    </div>
                  </div>
                </div>

                {/* GST Components */}
                <div className="gst-components">
                  <h6>📊 GST Components (if applicable)</h6>
                  <div className="components-grid">
                    <div className="component-card">
                      <div className="component-label">CGST</div>
                      <div className="component-value">
                        {result.cgst.toLocaleString("en-IN")}
                      </div>
                      <div className="component-percentage">
                        {(result.gstRate / 2).toFixed(1)}%
                      </div>
                    </div>
                    <div className="component-card">
                      <div className="component-label">SGST</div>
                      <div className="component-value">
                        {result.sgst.toLocaleString("en-IN")}
                      </div>
                      <div className="component-percentage">
                        {(result.gstRate / 2).toFixed(1)}%
                      </div>
                    </div>
                    <div className="component-card">
                      <div className="component-label">IGST</div>
                      <div className="component-value">
                        {result.igst.toLocaleString("en-IN")}
                      </div>
                      <div className="component-percentage">
                        {result.gstRate.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formula */}
              <div className="formula-section">
                <h5>📝 Calculation Formula</h5>
                <div className="formula">
                  {result.exclusive ? (
                    <>
                      <div>Total = Base Amount × (1 + GST%)</div>
                      <div>
                        = ₹{result.baseAmount.toLocaleString("en-IN")} × (1 +{" "}
                        {result.gstRate}%)
                      </div>
                      <div>= ₹{result.total.toLocaleString("en-IN")}</div>
                    </>
                  ) : (
                    <>
                      <div>Base Amount = Total ÷ (1 + GST%)</div>
                      <div>
                        = ₹{result.total.toLocaleString("en-IN")} ÷ (1 +{" "}
                        {result.gstRate}%)
                      </div>
                      <div>= ₹{result.baseAmount.toLocaleString("en-IN")}</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GST Rates Tab */}
      {activeTab === "rates" && (
        <div className="rates-content">
          <h4>🇮🇳 Indian GST Rate Structure</h4>
          <p className="rates-description">
            The Goods and Services Tax (GST) in India is categorized into
            different slabs based on the type of goods and services.
          </p>

          <div className="rates-table">
            <div className="table-header">
              <div>Rate</div>
              <div>Category</div>
              <div>Examples</div>
            </div>
            {gstRates.map((rate) => (
              <div key={rate.value} className="table-row">
                <div className="rate-value">
                  <span className="rate-badge">{rate.value}%</span>
                </div>
                <div className="rate-category">{rate.label}</div>
                <div className="rate-examples">{rate.description}</div>
              </div>
            ))}
          </div>

          <div className="gst-info">
            <h5>💡 Important Information</h5>
            <ul>
              <li>CGST and SGST are levied on intra-state supplies</li>
              <li>IGST is levied on inter-state supplies</li>
              <li>Some items are exempted from GST (0% rate)</li>
              <li>Composition scheme available for small businesses</li>
              <li>GST is collected at each stage of the supply chain</li>
            </ul>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div className="history-content">
          <div className="history-header">
            <h4>📜 Calculation History</h4>
            <button
              className="clear-history"
              onClick={() => setCalculationHistory([])}
              disabled={calculationHistory.length === 0}
            >
              Clear All
            </button>
          </div>

          {calculationHistory.length > 0 ? (
            <div className="history-list">
              {calculationHistory.map((entry) => (
                <div key={entry.id} className="history-item">
                  <div className="history-main">
                    <div className="history-amount">₹{entry.total}</div>
                    <div className="history-details">
                      Base: ₹{entry.amount} • {entry.rate} • {entry.type}
                    </div>
                  </div>
                  <div className="history-meta">
                    <div className="history-gst">GST: ₹{entry.gst}</div>
                    <div className="history-date">{entry.date}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-history">
              <div className="empty-icon">📊</div>
              <div className="empty-text">No calculations yet</div>
              <div className="empty-description">
                Start calculating to see your history here
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer Info */}
      <div className="calculator-footer">
        <div className="footer-info">
          <span className="info-icon">ℹ️</span>
          <p>
            GST is an indirect tax levied on the supply of goods and services in
            India. Rates are subject to change as per government notifications.
          </p>
        </div>
        <div className="footer-date">
          Last updated: {new Date().toLocaleDateString("en-IN")}
        </div>
      </div>
    </div>
  );
};

export default GSTCalculator;
