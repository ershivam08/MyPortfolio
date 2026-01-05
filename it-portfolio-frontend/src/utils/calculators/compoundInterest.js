export const compoundInterest = (principal, rate, time, n = 1) => {
  const p = parseFloat(principal);
  const r = parseFloat(rate) / 100; // Convert percentage to decimal
  const t = parseFloat(time);
  const nPeriods = parseFloat(n);

  // Compound interest formula: A = P(1 + r/n)^(nt)
  const amount = p * Math.pow(1 + r / nPeriods, nPeriods * t);
  return parseFloat(amount.toFixed(2));
};
