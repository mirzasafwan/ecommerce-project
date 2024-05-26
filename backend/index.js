const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute')
const blogRouter = require('./routes/blogRoute')
const categoryRouter = require('./routes/productCategoryRoute')
const blogcategoryRouter = require('./routes/blogCatRoute')
const brandRouter = require('./routes/brandRoute')
const colorRouter = require('./routes/colorRoute')
const enquiryRouter = require('./routes/enqRoute')
const couponRouter = require('./routes/couponRoutes')
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser')
const path = require('path')
const morgan = require('morgan');
const { checkRazorpayAPIAccess } = require('./testRazorpayAPI');
const cors = require("cors");
const PORT = process.env.PORT || 4000;


dbConnect();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use('/api/user', authRouter)
app.use('/api/product', productRouter)
app.use('/api/blog', blogRouter)
app.use('/api/category', categoryRouter)
app.use('/api/blogcategory', blogcategoryRouter)
app.use('/api/brand', brandRouter)
app.use('/api/coupon', couponRouter)
app.use('/api/color', colorRouter)
app.use('/api/enquiry', enquiryRouter)
// app.use(notFound)
// app.use(errorHandler)

app.get('/',(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"frontend","build")))
  res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
})

app.listen(PORT, () => {
  console.log(`server is ronning on Port ${PORT}`)
})