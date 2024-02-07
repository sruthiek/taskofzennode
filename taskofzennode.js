
function calculateTotal(cart) {
    let subtotal = 0;
    let totalQuantity = 0;
    let discountAmount = 0;
    let discountApplied = "";
  
    for (const product of cart) {
      const { name, price, quantity, giftWrap } = product;
      const productTotal = price * quantity;
      totalQuantity += quantity;
      subtotal += productTotal;
  
      // Apply bulk discounts
      if (quantity > 10) {
        const bulkDiscount = quantity > 20 ? 0.1 : 0.05;
        discountAmount += productTotal * bulkDiscount;
        discountApplied = quantity > 20 ? "bulk_10_discount" : "bulk_5_discount";
      }
  
      // Apply tiered discount
      if (totalQuantity > 30 && quantity > 15) {
        const tieredDiscount = 0.5;
        discountAmount += productTotal * tieredDiscount;
        discountApplied = "tiered_50_discount";
      }
  
      // Apply flat discount
      if (subtotal > 200) {
        discountAmount += 10;
        discountApplied = "flat_10_discount";
      }
  
      // Add gift wrap fee
      if (giftWrap) {
        subtotal += quantity;
      }
    }
  
    // Calculate shipping fee
    const shippingFee = Math.ceil(totalQuantity / 10) * 5;
  
    const total = subtotal - discountAmount + shippingFee;
  
    return {
      subtotal,
      discountApplied,
      discountAmount,
      shippingFee,
      total,
    };
  }
  
  // Example usage:
  const cart = [
    { name: "Product A", price: 20, quantity: 15, giftWrap: false },
    { name: "Product B", price: 40, quantity: 5, giftWrap: true },
    { name: "Product C", price: 50, quantity: 10, giftWrap: false },
  ];
  
  const result = calculateTotal(cart);
  console.log(result);
  