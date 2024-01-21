function calculateInvoice() {
    const productPrices = {
        A: 20,
        B: 40,
        C: 50
    };

    const discountRules = {
        flat_10_discount: { condition: total_price => total_price > 200, discount: 10 },
        bulk_5_discount: { condition: quantity => quantity > 10, discount: 5 },
        bulk_10_discount: { condition: total_quantity => total_quantity > 20, discount: 10 },
        tiered_50_discount: { condition: total_quantity => total_quantity > 30, discount: 50 }
    };

    const giftWrapFeePerUnit = 1;
    const shippingFeePerPackage = 5;
    const itemsPerPackage = 10;


    const quantityA = parseInt(document.getElementById('quantityA').value) || 0;
    const quantityB = parseInt(document.getElementById('quantityB').value) || 0;
    const quantityC = parseInt(document.getElementById('quantityC').value) || 0;
    const giftWrap = document.getElementById('giftWrap').value;

    
    const totalQuantity = quantityA + quantityB + quantityC;
    let totalAmount = 0;


    totalAmount += productPrices.A * quantityA;
    totalAmount += productPrices.B * quantityB;
    totalAmount += productPrices.C * quantityC;
    if (giftWrap === 'yes') {
        totalAmount += giftWrapFeePerUnit * totalQuantity;
    }
    const subtotal = totalAmount;
    const applicableDiscounts = Object.values(discountRules)
        .filter(rule => rule.condition(totalQuantity))
        .map(rule => rule.discount);
    const discount = applicableDiscounts.length > 0 ? Math.max(...applicableDiscounts) : 0;
    const subtotalAfterDiscount = subtotal - (subtotal * (discount / 100));
    const shippingFee = Math.floor(totalQuantity / itemsPerPackage) * shippingFeePerPackage;
    const total = subtotalAfterDiscount + shippingFee;
    const invoiceElement = document.getElementById('invoice');
    invoiceElement.innerHTML = `
        <h2>Invoice</h2>
        <p>Subtotal: $${subtotal}</p>
        <p>Discount Applied: ${discount}% off, Amount: $${subtotal * (discount / 100)}</p>
        <p>Shipping Fee: $${shippingFee}</p>
        <p>Total: $${total}</p>
        <p>Thank you..!</p>
        <button>Print</button>
    `;
}
