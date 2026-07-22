// Constants and helpers for low-stock alerts
export const LOW_STOCK_THRESHOLD = 5;

// Returns inventory valuation for new batteries (price * qty)
export const calcNewBatteryValue = (items) =>
  items.reduce((acc, b) => acc + (b.price || 0) * (b.stockQuantity || 0), 0);

// Returns inventory valuation for old batteries (pricePerKg * weightKg)
export const calcOldBatteryValue = (items) =>
  items.reduce((acc, b) => acc + (b.pricePerKg || 0) * (b.weightKg || 0), 0);
