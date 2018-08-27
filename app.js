const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');


app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

// Remember to change the password section to <PASSWORD>
mongoose.connect('mongodb+srv://node-rest-shop:' + process.env.MONGO_ATLAS_PW + '@node-rest-shop-ao2wm.mongodb.net/test?retryWrites=true', {
	useNewUrlParser: true
})

// Routes for requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);


// Error Handling
app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	})
});

module.exports = app;