// const https = require('https');
// const fs = require('fs');

// // Load the custom CA certificates
// const customCACert = fs.readFileSync('../backend/combined.pem');

// const options = {
//     hostname: 'api.razorpay.com',
//     port: 443,
//     path: '/v1/orders',
//     method: 'GET',
//     agent: new https.Agent({
//         ca: customCACert
//     })
// };

// const req = https.request(options, (res) => {
//     console.log(`Status Code: ${res.statusCode}`);

//     res.on('data', (d) => {
//         process.stdout.write(d);
//     });
// });

// req.on('error', (error) => {
//     console.error('Network Connectivity Test Failed:', error);
// });

// req.end();
