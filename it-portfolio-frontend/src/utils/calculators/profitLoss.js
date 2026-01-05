// utils/calculators/profitLoss.js
export const profitLoss = (costPrice, sellingPrice) => {
  const cp = parseFloat(costPrice);
  const sp = parseFloat(sellingPrice);

  if (sp > cp) {
    return {
      type: "Profit",
      value: parseFloat((sp - cp).toFixed(2)),
    };
  } else if (cp > sp) {
    return {
      type: "Loss",
      value: parseFloat((cp - sp).toFixed(2)),
    };
  } else {
    return {
      type: "No Profit No Loss",
      value: 0,
    };
  }
};
