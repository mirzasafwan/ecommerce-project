const Razorpay = require('razorpay');

// Create an instance of Razorpay
const instance = new Razorpay({
    key_id: "rzp_test_34RuGdtmXbfWkb",
    key_secret: "c82Qtq5aGX2x3TvBm83Fwwn2"
});

// Checkout function to create an order
const checkout = async (req, res) => {
    try {
        // Ensure amount is valid
        const { amount } = req.body;
        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid amount' });
        }

        // Options for creating an order
        const options = {
            amount: amount * 100, // Amount in paise
            currency: "INR"
        };

        // Create order
        const order = await instance.orders.create(options);

        // Send success response
        res.status(200).json({ success: true, order });
    } catch (error) {
        // Log the error and send error response
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};

// Payment verification function
const paymentVerification = async (req, res) => {
    try {
        const { razorpayOrderId, razorpayPaymentId } = req.body;

        // Ensure required fields are present
        if (!razorpayOrderId || !razorpayPaymentId) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Log the verification data
        console.log("Payment Verification Data:", razorpayOrderId, razorpayPaymentId);

        // Send success response
        res.status(200).json({ success: true, razorpayOrderId, razorpayPaymentId });
    } catch (error) {
        // Log the error and send error response
        console.error("Error during payment verification:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};

// Catch unhandled promise rejections globally
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Promise Rejection:', reason);
    // Application-specific logging, throwing an error, or other logic here
});

module.exports = {
    checkout,
    paymentVerification
};
