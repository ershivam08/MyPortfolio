import "./CompoundInterestCalculator.css";

import { useState, useEffect } from "react";
import { compoundInterest } from "../../utils/calculators/compoundInterest";

const CompoundInterestCalculator = () => {
  const [inputs, setInputs] = useState({
    principal: "",
    rate: "",
    time: "",
    n: "1", // Compounding frequency (annually by default)
  });

  const [result, setResult] = useState({
    amount: null,
    interest: null,
    breakdown: [],
  });

  const [timeUnit, setTimeUnit] = useState("years"); // years, months, days
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [errors, setErrors] = useState({});
  const [calculationHistory, setCalculationHistory] = useState([]);

  // Frequency options
  const frequencyOptions = [
    { value: "1", label: "Annually", periods: 1 },
    { value: "2", label: "Semi-Annually", periods: 2 },
    { value: "4", label: "Quarterly", periods: 4 },
    { value: "12", label: "Monthly", periods: 12 },
    { value: "365", label: "Daily", periods: 365 },
  ];

  // Validate inputs
  const validateInputs = () => {
    const newErrors = {};

    if (
      !inputs.principal ||
      isNaN(inputs.principal) ||
      Number(inputs.principal) <= 0
    ) {
      newErrors.principal = "Please enter a valid principal amount";
    }

    if (!inputs.rate || isNaN(inputs.rate) || Number(inputs.rate) <= 0) {
      newErrors.rate = "Please enter a valid interest rate";
    }

    if (!inputs.time || isNaN(inputs.time) || Number(inputs.time) <= 0) {
      newErrors.time = "Please enter a valid time period";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate compound interest
  const calculate = () => {
    if (!validateInputs()) return;

    // Convert time to years if necessary
    let timeInYears = parseFloat(inputs.time);
    if (timeUnit === "months") {
      timeInYears = timeInYears / 12;
    } else if (timeUnit === "days") {
      timeInYears = timeInYears / 365;
    }

    // Calculate using the utility function
    const principal = parseFloat(inputs.principal);
    const rate = parseFloat(inputs.rate);
    const periods = parseFloat(inputs.n);
    const amount = compoundInterest(principal, rate, timeInYears, periods);
    const interest = amount - principal;

    // Generate yearly/monthly breakdown
    const breakdown = generateBreakdown(principal, rate, timeInYears, periods);

    const newResult = {
      amount: amount.toFixed(2),
      interest: interest.toFixed(2),
      breakdown,
    };

    setResult(newResult);

    // Add to history
    const historyEntry = {
      id: Date.now(),
      principal: inputs.principal,
      rate: inputs.rate,
      time: inputs.time,
      timeUnit,
      frequency:
        frequencyOptions.find((f) => f.value === inputs.n)?.label || "Annually",
      amount: amount.toFixed(2),
      date: new Date().toLocaleString(),
    };

    setCalculationHistory((prev) => [historyEntry, ...prev.slice(0, 4)]);
  };

  // Generate breakdown by year/month
  const generateBreakdown = (principal, rate, time, periods) => {
    const breakdown = [];
    const periodsPerYear = parseFloat(inputs.n);
    const totalPeriods = Math.ceil(time * periodsPerYear);
    let currentAmount = principal;

    for (let i = 1; i <= totalPeriods; i++) {
      const periodInterest = currentAmount * (rate / 100 / periodsPerYear);
      currentAmount += periodInterest;

      if (i % periodsPerYear === 0 || i === totalPeriods) {
        breakdown.push({
          period: `Year ${Math.ceil(i / periodsPerYear)}`,
          principal: principal.toFixed(2),
          interest: (currentAmount - principal).toFixed(2),
          total: currentAmount.toFixed(2),
        });
      }
    }

    return breakdown;
  };

  // Handle input change
  const handleInputChange = (field, value) => {
    setInputs((prev) => ({
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
  };

  // Reset calculator
  const resetCalculator = () => {
    setInputs({
      principal: "",
      rate: "",
      time: "",
      n: "1",
    });
    setResult({ amount: null, interest: null, breakdown: [] });
    setErrors({});
  };

  // Example presets
  const loadExample = (preset) => {
    setInputs(preset.inputs);
    setTimeUnit(preset.timeUnit || "years");
  };

  const examples = [
    {
      name: "Savings Account",
      description: "₹1,00,000 at 6% for 5 years compounded monthly",
      inputs: { principal: "100000", rate: "6", time: "5", n: "12" },
      timeUnit: "years",
    },
    {
      name: "Fixed Deposit",
      description: "₹5,00,000 at 7.5% for 3 years compounded quarterly",
      inputs: { principal: "500000", rate: "7.5", time: "3", n: "4" },
      timeUnit: "years",
    },
    {
      name: "Investment",
      description: "₹50,000 at 12% for 10 years compounded annually",
      inputs: { principal: "50000", rate: "12", time: "10", n: "1" },
      timeUnit: "years",
    },
  ];

  // Auto-calculate when all fields are filled
  useEffect(() => {
    if (inputs.principal && inputs.rate && inputs.time) {
      const timer = setTimeout(() => {
        calculate();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [inputs, timeUnit]);

  return (
    <div className="compound-interest-calculator">
      {/* Header */}
      <div className="calculator-header">
        <div className="header-icon">📈</div>
        <div>
          <h3>Compound Interest Calculator</h3>
          <p className="header-subtitle">
            Calculate how your money grows with compound interest
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="input-section">
        <div className="input-grid">
          {/* Principal Amount */}
          <div className="input-group">
            <label className="input-label">
              <span className="label-icon">💰</span>
              Principal Amount (₹)
            </label>
            <div className="input-wrapper">
              <span className="input-prefix">₹</span>
              <input
                type="number"
                className={`input-field ${errors.principal ? "error" : ""}`}
                placeholder="Enter principal amount"
                value={inputs.principal}
                onChange={(e) => handleInputChange("principal", e.target.value)}
              />
            </div>
            {errors.principal && (
              <span className="error-message">{errors.principal}</span>
            )}
          </div>

          {/* Interest Rate */}
          <div className="input-group">
            <label className="input-label">
              <span className="label-icon">📊</span>
              Annual Interest Rate (%)
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                step="0.01"
                className={`input-field ${errors.rate ? "error" : ""}`}
                placeholder="Enter annual interest rate"
                value={inputs.rate}
                onChange={(e) => handleInputChange("rate", e.target.value)}
              />
              <span className="input-suffix">%</span>
            </div>
            {errors.rate && (
              <span className="error-message">{errors.rate}</span>
            )}
          </div>

          {/* Time Period */}
          <div className="input-group">
            <label className="input-label">
              <span className="label-icon">📅</span>
              Time Period
            </label>
            <div className="time-input-wrapper">
              <input
                type="number"
                className={`input-field ${errors.time ? "error" : ""}`}
                placeholder="Enter time period"
                value={inputs.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
              />
              <select
                className="time-unit-select"
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
                <option value="days">Days</option>
              </select>
            </div>
            {errors.time && (
              <span className="error-message">{errors.time}</span>
            )}
          </div>

          {/* Compounding Frequency */}
          <div className="input-group">
            <label className="input-label">
              <span className="label-icon">🔄</span>
              Compounding Frequency
            </label>
            <select
              className="frequency-select"
              value={inputs.n}
              onChange={(e) => handleInputChange("n", e.target.value)}
            >
              {frequencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="frequency-info">
              <span>ℹ️</span>
              <span>How often interest is added to principal</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="calculate-btn" onClick={calculate}>
            <span>🧮</span> Calculate
          </button>
          <button className="reset-btn" onClick={resetCalculator}>
            Reset
          </button>
        </div>
      </div>

      {/* Result Section */}
      {result.amount && (
        <div className="result-section">
          <h4 className="result-title">Calculation Results</h4>

          <div className="result-cards">
            <div className="result-card total-amount">
              <div className="result-icon">📈</div>
              <div>
                <p className="result-label">Total Amount</p>
                <h3 className="result-value">
                  ₹{parseFloat(result.amount).toLocaleString("en-IN")}
                </h3>
              </div>
            </div>

            <div className="result-card interest-earned">
              <div className="result-icon">💰</div>
              <div>
                <p className="result-label">Interest Earned</p>
                <h3 className="result-value">
                  ₹{parseFloat(result.interest).toLocaleString("en-IN")}
                </h3>
              </div>
            </div>

            <div className="result-card roi">
              <div className="result-icon">📊</div>
              <div>
                <p className="result-label">ROI</p>
                <h3 className="result-value">
                  {(
                    (parseFloat(result.interest) /
                      parseFloat(inputs.principal)) *
                    100
                  ).toFixed(2)}
                  %
                </h3>
              </div>
            </div>
          </div>

          {/* Breakdown Toggle */}
          <button
            className="breakdown-toggle"
            onClick={() => setShowBreakdown(!showBreakdown)}
          >
            {showBreakdown ? "Hide" : "Show"} Yearly Breakdown
          </button>

          {/* Yearly Breakdown */}
          {showBreakdown && result.breakdown.length > 0 && (
            <div className="breakdown-section">
              <h5>📅 Yearly Growth</h5>
              <div className="breakdown-table">
                <div className="table-header">
                  <div>Year</div>
                  <div>Principal</div>
                  <div>Interest</div>
                  <div>Total</div>
                </div>
                {result.breakdown.map((row, index) => (
                  <div key={index} className="table-row">
                    <div>{row.period}</div>
                    <div>
                      ₹{parseFloat(row.principal).toLocaleString("en-IN")}
                    </div>
                    <div>
                      ₹{parseFloat(row.interest).toLocaleString("en-IN")}
                    </div>
                    <div className="total-cell">
                      ₹{parseFloat(row.total).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insights */}
          <div className="insights">
            <h5>💡 Insights</h5>
            <ul>
              <li>
                Your investment of ₹
                {parseFloat(inputs.principal).toLocaleString("en-IN")} grew by{" "}
                {(
                  (parseFloat(result.interest) / parseFloat(inputs.principal)) *
                  100
                ).toFixed(2)}
                % in {inputs.time} {timeUnit}
              </li>
              <li>
                With compound interest, your money grows faster as time
                progresses
              </li>
              <li>
                More frequent compounding (
                {frequencyOptions
                  .find((f) => f.value === inputs.n)
                  ?.label.toLowerCase()}
                ) results in higher returns
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Examples Section */}
      <div className="examples-section">
        <h4 className="examples-title">💡 Quick Examples</h4>
        <div className="examples-grid">
          {examples.map((example, index) => (
            <button
              key={index}
              className="example-card"
              onClick={() => loadExample(example)}
            >
              <h5>{example.name}</h5>
              <p>{example.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Calculation History */}
      {calculationHistory.length > 0 && (
        <div className="history-section">
          <h4 className="history-title">📊 Recent Calculations</h4>
          <div className="history-list">
            {calculationHistory.map((entry) => (
              <div key={entry.id} className="history-item">
                <div className="history-info">
                  <div className="history-amount">
                    ₹{parseFloat(entry.amount).toLocaleString("en-IN")}
                  </div>
                  <div className="history-details">
                    ₹{parseFloat(entry.principal).toLocaleString("en-IN")} @{" "}
                    {entry.rate}% for {entry.time} {entry.timeUnit} (
                    {entry.frequency})
                  </div>
                </div>
                <div className="history-date">{entry.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Note */}
      <div className="info-note">
        <span>ℹ️</span>
        <p>
          <strong>Note:</strong> This calculator uses the compound interest
          formula: A = P(1 + r/n)^(nt). All calculations are performed locally
          in your browser.
        </p>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
