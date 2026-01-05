import { useState, useEffect } from "react";
import React from "react";

import { profitLoss } from "../../utils/calculators/profitLoss";

const ProfitLossCalculator = () => {
  const [formData, setFormData] = useState({
    costPrice: "",
    sellingPrice: "",
    quantity: "1",
    currency: "₹",
  });

  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("calculator");
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Currency options
  const currencyOptions = [
    { symbol: "₹", name: "Indian Rupee", code: "INR" },
    { symbol: "$", name: "US Dollar", code: "USD" },
    { symbol: "€", name: "Euro", code: "EUR" },
    { symbol: "£", name: "British Pound", code: "GBP" },
    { symbol: "¥", name: "Japanese Yen", code: "JPY" },
  ];

  // Validate inputs
  const validateInputs = () => {
    const newErrors = {};

    if (
      !formData.costPrice ||
      isNaN(formData.costPrice) ||
      Number(formData.costPrice) < 0
    ) {
      newErrors.costPrice = "Please enter a valid cost price";
    }

    if (
      !formData.sellingPrice ||
      isNaN(formData.sellingPrice) ||
      Number(formData.sellingPrice) < 0
    ) {
      newErrors.sellingPrice = "Please enter a valid selling price";
    }

    if (
      !formData.quantity ||
      isNaN(formData.quantity) ||
      Number(formData.quantity) <= 0
    ) {
      newErrors.quantity = "Please enter a valid quantity";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate profit/loss
  const handleCalculate = () => {
    if (!validateInputs()) return;

    const cp = parseFloat(formData.costPrice);
    const sp = parseFloat(formData.sellingPrice);
    const qty = parseFloat(formData.quantity);
    const currency = formData.currency;

    // Calculate for single unit first
    const singleResult = profitLoss(cp, sp);

    // Calculate for total quantity
    const totalCP = cp * qty;
    const totalSP = sp * qty;
    const totalResult = profitLoss(totalCP, totalSP);

    // Calculate percentages
    const profitPercentage = cp > 0 ? ((sp - cp) / cp) * 100 : 0;
    const lossPercentage = cp > 0 ? ((cp - sp) / cp) * 100 : 0;

    // Calculate breakeven
    const breakEvenPrice = cp;
    const profitNeeded = cp * 0.1; // 10% profit margin
    const recommendedPrice = cp + profitNeeded;

    const fullResult = {
      ...singleResult,
      total: totalResult,
      quantity: qty,
      currency,
      costPrice: cp,
      sellingPrice: sp,
      totalCostPrice: totalCP,
      totalSellingPrice: totalSP,
      profitPercentage: profitPercentage.toFixed(2),
      lossPercentage: lossPercentage.toFixed(2),
      breakEvenPrice,
      recommendedPrice: recommendedPrice.toFixed(2),
      profitMargin: profitNeeded,
      date: new Date().toLocaleString(),
    };

    setResult(fullResult);

    // Add to history
    const historyEntry = {
      id: Date.now(),
      cp: cp.toLocaleString("en-IN"),
      sp: sp.toLocaleString("en-IN"),
      qty: qty,
      currency,
      type: singleResult.type,
      amount: singleResult.value.toLocaleString("en-IN"),
      totalAmount: totalResult.value.toLocaleString("en-IN"),
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
      costPrice: "",
      sellingPrice: "",
      quantity: "1",
      currency: "₹",
    });
    setResult(null);
    setErrors({});
    setShowBreakdown(false);
  };

  // Quick fill examples
  const loadExample = (example) => {
    setFormData(example.inputs);
    setErrors({});
  };

  const examples = [
    {
      label: "Stock Trading",
      description: "Bought at ₹100, selling at ₹120",
      inputs: {
        costPrice: "100",
        sellingPrice: "120",
        quantity: "10",
        currency: "₹",
      },
    },
    {
      label: "Business Sale",
      description: "Product cost ₹50, selling at ₹75",
      inputs: {
        costPrice: "50",
        sellingPrice: "75",
        quantity: "100",
        currency: "₹",
      },
    },
    {
      label: "Loss Scenario",
      description: "Bought at ₹200, selling at ₹180",
      inputs: {
        costPrice: "200",
        sellingPrice: "180",
        quantity: "5",
        currency: "₹",
      },
    },
    {
      label: "Break Even",
      description: "Same cost and selling price",
      inputs: {
        costPrice: "150",
        sellingPrice: "150",
        quantity: "1",
        currency: "₹",
      },
    },
  ];

  // Auto-calculate when all required fields are filled
  useEffect(() => {
    if (formData.costPrice && formData.sellingPrice) {
      const timer = setTimeout(() => {
        handleCalculate();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [formData]);

  // Get result color based on type
  const getResultColor = (type) => {
    return type === "Profit"
      ? "var(--success-color)"
      : type === "Loss"
      ? "var(--error-color)"
      : "var(--warning-color)";
  };

  // Get result icon
  const getResultIcon = (type) => {
    return type === "Profit" ? "📈" : type === "Loss" ? "📉" : "⚖️";
  };

  // Get result emoji
  const getResultEmoji = (type) => {
    return type === "Profit" ? "💰" : type === "Loss" ? "😔" : "😐";
  };

  return (
    <div className="profit-loss-calculator">
      {/* Header */}
      <div className="calculator-header">
        <div className="header-icon">💰</div>
        <div>
          <h3>Profit & Loss Calculator</h3>
          <p className="header-subtitle">
            Calculate profit, loss, and margin for business and investments
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
          className={`tab ${activeTab === "analysis" ? "active" : ""}`}
          onClick={() => setActiveTab("analysis")}
        >
          📊 Analysis
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
            {/* Currency Selection */}
            <div className="input-group">
              <label className="input-label">
                <span className="label-icon">🌍</span> Currency
              </label>
              <div className="currency-selector">
                {currencyOptions.map((currency) => (
                  <button
                    key={currency.code}
                    className={`currency-button ${
                      formData.currency === currency.symbol ? "active" : ""
                    }`}
                    onClick={() =>
                      handleInputChange("currency", currency.symbol)
                    }
                  >
                    <span className="currency-symbol">{currency.symbol}</span>
                    <span className="currency-code">{currency.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cost Price */}
            <div className="input-group">
              <label className="input-label">
                <span className="label-icon">🏷️</span> Cost Price (
                {formData.currency})
              </label>
              <div className="input-container">
                <span className="input-prefix">{formData.currency}</span>
                <input
                  type="number"
                  className={`form-input ${errors.costPrice ? "error" : ""}`}
                  placeholder="Enter cost price"
                  value={formData.costPrice}
                  onChange={(e) =>
                    handleInputChange("costPrice", e.target.value)
                  }
                  min="0"
                  step="0.01"
                />
              </div>
              {errors.costPrice && (
                <span className="error-message">{errors.costPrice}</span>
              )}
            </div>

            {/* Selling Price */}
            <div className="input-group">
              <label className="input-label">
                <span className="label-icon">💰</span> Selling Price (
                {formData.currency})
              </label>
              <div className="input-container">
                <span className="input-prefix">{formData.currency}</span>
                <input
                  type="number"
                  className={`form-input ${errors.sellingPrice ? "error" : ""}`}
                  placeholder="Enter selling price"
                  value={formData.sellingPrice}
                  onChange={(e) =>
                    handleInputChange("sellingPrice", e.target.value)
                  }
                  min="0"
                  step="0.01"
                />
              </div>
              {errors.sellingPrice && (
                <span className="error-message">{errors.sellingPrice}</span>
              )}
            </div>

            {/* Quantity */}
            <div className="input-group">
              <label className="input-label">
                <span className="label-icon">📦</span> Quantity
              </label>
              <div className="input-container">
                <input
                  type="number"
                  className={`form-input ${errors.quantity ? "error" : ""}`}
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onChange={(e) =>
                    handleInputChange("quantity", e.target.value)
                  }
                  min="1"
                  step="1"
                />
                <span className="input-suffix">units</span>
              </div>
              {errors.quantity && (
                <span className="error-message">{errors.quantity}</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="calculate-button" onClick={handleCalculate}>
                🧮 Calculate
              </button>
              <button className="reset-button" onClick={resetCalculator}>
                🔄 Reset
              </button>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="result-section">
              <div className="result-header">
                <h4 className="result-title">
                  {getResultIcon(result.type)} {result.type} Analysis
                </h4>
                <div className="result-emoji">
                  {getResultEmoji(result.type)}
                </div>
              </div>

              {/* Main Result */}
              <div
                className="main-result-card"
                style={{ borderLeftColor: getResultColor(result.type) }}
              >
                <div className="main-result-content">
                  <div className="result-type">{result.type}</div>
                  <div
                    className="result-amount"
                    style={{ color: getResultColor(result.type) }}
                  >
                    {result.currency}
                    {result.value.toLocaleString("en-IN")}
                  </div>
                  <div className="result-per-unit">
                    per unit ({result.currency}
                    {result.costPrice.toLocaleString("en-IN")} →{" "}
                    {result.currency}
                    {result.sellingPrice.toLocaleString("en-IN")})
                  </div>
                </div>
              </div>

              {/* Total Result */}
              <div className="total-result-card">
                <div className="total-result-header">
                  <h5>📦 Total for {result.quantity} units</h5>
                </div>
                <div className="total-result-content">
                  <div className="total-item">
                    <div className="total-label">Total Cost</div>
                    <div className="total-value">
                      {result.currency}
                      {result.totalCostPrice.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div className="total-item">
                    <div className="total-label">Total Revenue</div>
                    <div className="total-value">
                      {result.currency}
                      {result.totalSellingPrice.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div className="total-item">
                    <div
                      className="total-label"
                      style={{ color: getResultColor(result.total.type) }}
                    >
                      Total {result.total.type}
                    </div>
                    <div
                      className="total-value"
                      style={{ color: getResultColor(result.total.type) }}
                    >
                      {result.currency}
                      {result.total.value.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Percentage Analysis */}
              <div className="percentage-analysis">
                <h5>📊 Percentage Analysis</h5>
                <div className="percentage-grid">
                  <div className="percentage-card">
                    <div className="percentage-label">Profit %</div>
                    <div
                      className="percentage-value"
                      style={{
                        color:
                          result.profitPercentage > 0
                            ? "var(--success-color)"
                            : "var(--text-light)",
                      }}
                    >
                      {result.profitPercentage}%
                    </div>
                    <div className="percentage-bar">
                      <div
                        className="percentage-fill"
                        style={{
                          width: `${Math.min(
                            Math.abs(result.profitPercentage),
                            100
                          )}%`,
                          backgroundColor:
                            result.profitPercentage > 0
                              ? "var(--success-color)"
                              : "transparent",
                        }}
                      />
                    </div>
                  </div>
                  <div className="percentage-card">
                    <div className="percentage-label">Loss %</div>
                    <div
                      className="percentage-value"
                      style={{
                        color:
                          result.lossPercentage > 0
                            ? "var(--error-color)"
                            : "var(--text-light)",
                      }}
                    >
                      {result.lossPercentage}%
                    </div>
                    <div className="percentage-bar">
                      <div
                        className="percentage-fill"
                        style={{
                          width: `${Math.min(
                            Math.abs(result.lossPercentage),
                            100
                          )}%`,
                          backgroundColor:
                            result.lossPercentage > 0
                              ? "var(--error-color)"
                              : "transparent",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Breakdown Toggle */}
              <button
                className="breakdown-toggle"
                onClick={() => setShowBreakdown(!showBreakdown)}
              >
                {showBreakdown ? "Hide" : "Show"} Detailed Breakdown
              </button>

              {/* Detailed Breakdown */}
              {showBreakdown && (
                <div className="detailed-breakdown">
                  <h5>🔍 Detailed Breakdown</h5>

                  <div className="breakdown-grid">
                    <div className="breakdown-card">
                      <div className="breakdown-icon">⚖️</div>
                      <div className="breakdown-content">
                        <div className="breakdown-label">Break Even Price</div>
                        <div className="breakdown-value">
                          {result.currency}
                          {result.breakEvenPrice.toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>

                    <div className="breakdown-card">
                      <div className="breakdown-icon">🎯</div>
                      <div className="breakdown-content">
                        <div className="breakdown-label">
                          Recommended Price (10% Profit)
                        </div>
                        <div className="breakdown-value">
                          {result.currency}
                          {result.recommendedPrice}
                        </div>
                      </div>
                    </div>

                    <div className="breakdown-card">
                      <div className="breakdown-icon">📈</div>
                      <div className="breakdown-content">
                        <div className="breakdown-label">Profit Margin</div>
                        <div className="breakdown-value">
                          {result.currency}
                          {result.profitMargin.toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comparison */}
                  <div className="comparison-section">
                    <h6>📊 Price Comparison</h6>
                    <div className="comparison-bars">
                      <div className="comparison-item">
                        <div className="comparison-label">Cost Price</div>
                        <div className="comparison-bar">
                          <div
                            className="comparison-fill cost"
                            style={{ width: "100%" }}
                          />
                        </div>
                        <div className="comparison-value">
                          {result.currency}
                          {result.costPrice.toLocaleString("en-IN")}
                        </div>
                      </div>

                      <div className="comparison-item">
                        <div className="comparison-label">Selling Price</div>
                        <div className="comparison-bar">
                          <div
                            className="comparison-fill selling"
                            style={{
                              width: `${
                                (result.sellingPrice / result.costPrice) * 100
                              }%`,
                              backgroundColor:
                                result.sellingPrice > result.costPrice
                                  ? "var(--success-color)"
                                  : "var(--error-color)",
                            }}
                          />
                        </div>
                        <div className="comparison-value">
                          {result.currency}
                          {result.sellingPrice.toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Analysis Tab */}
      {activeTab === "analysis" && (
        <div className="analysis-content">
          <h4>📊 Profit & Loss Insights</h4>

          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-icon">💰</div>
              <div className="insight-content">
                <h5>Profit Formula</h5>
                <div className="insight-formula">
                  Profit = Selling Price - Cost Price
                </div>
                <p>Profit occurs when selling price exceeds cost price.</p>
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-icon">📉</div>
              <div className="insight-content">
                <h5>Loss Formula</h5>
                <div className="insight-formula">
                  Loss = Cost Price - Selling Price
                </div>
                <p>Loss occurs when cost price exceeds selling price.</p>
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-icon">📊</div>
              <div className="insight-content">
                <h5>Profit Percentage</h5>
                <div className="insight-formula">
                  Profit % = (Profit / Cost Price) × 100
                </div>
                <p>Shows profit relative to the cost.</p>
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-icon">🎯</div>
              <div className="insight-content">
                <h5>Break-Even Point</h5>
                <div className="insight-formula">Break-Even = Cost Price</div>
                <p>No profit, no loss scenario.</p>
              </div>
            </div>
          </div>

          <div className="tips-section">
            <h5>💡 Business Tips</h5>
            <ul className="tips-list">
              <li>
                Aim for at least 10-20% profit margin for sustainable business
              </li>
              <li>Consider overhead costs beyond just product cost</li>
              <li>Regularly review pricing based on market trends</li>
              <li>Bulk purchases can reduce per-unit cost</li>
              <li>Track profit/loss for each product category separately</li>
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
                <div
                  key={entry.id}
                  className="history-item"
                  style={{ borderLeftColor: getResultColor(entry.type) }}
                >
                  <div className="history-main">
                    <div
                      className="history-type"
                      style={{ color: getResultColor(entry.type) }}
                    >
                      {getResultIcon(entry.type)} {entry.type}
                    </div>
                    <div className="history-amount">
                      {entry.currency}
                      {entry.amount} per unit
                    </div>
                    <div className="history-details">
                      CP: {entry.currency}
                      {entry.cp} • SP: {entry.currency}
                      {entry.sp} • Qty: {entry.qty}
                    </div>
                  </div>
                  <div className="history-meta">
                    <div className="history-total">
                      Total: {entry.currency}
                      {entry.totalAmount}
                    </div>
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
            Profit = Selling Price - Cost Price | Loss = Cost Price - Selling
            Price
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfitLossCalculator;
