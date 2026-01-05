// utils/calculators/gst.js
export const calculateGST = (amount, rate, type = "exclusive") => {
  const amt = parseFloat(amount);
  const r = parseFloat(rate) / 100;

  if (type === "exclusive") {
    const gst = amt * r;
    const total = amt + gst;
    return {
      baseAmount: amt,
      gst: parseFloat(gst.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
    };
  } else {
    // GST inclusive
    const baseAmount = amt / (1 + r);
    const gst = amt - baseAmount;
    return {
      baseAmount: parseFloat(baseAmount.toFixed(2)),
      gst: parseFloat(gst.toFixed(2)),
      total: amt,
    };
  }
};
