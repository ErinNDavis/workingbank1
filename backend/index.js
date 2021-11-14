
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require('./models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const middleware = require('./middlewares')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

//cors-------------------------------------------------------------------------

const cors = require("cors");
app.use(cors());

//connect to mongodb-----------------------------------------------------------

const dbURI = "mongodb://localhost:27017/badbank";
app.use(express.json());

mongoose.connect(dbURI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err)=>{console.error(err)});
db.once("open", () => {console.log("DB started successfully")});

app.use(bodyParser.json())

//login-----------------------------------------------------------------------

app.post('/api/login', async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		
		// the username, password combination is successful
		const token = jwt.sign(
			{
				id: user._id,
				email: user.email
			},
			JWT_SECRET,
			{expiresIn: '24hr'}
		)
		return res.json({ status: 'ok', data: token, user: user })
	}
	
	res.json({ status: 'error', error: 'Invalid email/password' })
})

//signup----------------------------------------------------------------------

app.post('/api/signup', async (req, res) => {
	const { name, email, password: plainTextPassword, balance } = req.body
	const user = await User.findOne({ email }).lean()

	if (!user) {
		if (!email || typeof email !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
		}

		if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
		}

		if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
		}
	}
  else {
		return res.json({ status: 'error', error: 'Email already in use' })
  }

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			name,
      		email,
      		password,
      		balance
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

//token-------------------------------------------------------------------------

app.use('/api/login', (req, res) => {
	res.send({token});
});

//delete Account----------------------------------------------------------------

app.delete('/api/home', async (req, res) => {
  const { email } = req.body
  const doc = await User.findOneAndDelete({email})
  console.log('User account deleted: ', doc)
});

//Change Pwd----------------------------------------------------------------------

app.post('/api/changePwd', async (req, res) => {
	const { email, password: plainTextPassword } = req.body
	const password = await bcrypt.hash(plainTextPassword, 10)
	const doc = await User.findOneAndUpdate(
		{ email: email },
		{ password: password },
	);
	doc.password;
})

//update deposit/withdraw--------------------------------------------------------

app.post('/api/deposit', async (req, res) => {
	const { email, status } = req.body
	const doc = await User.findOneAndUpdate(
		{ email: email },
		{ balance: status }
	);
	doc.balance;
})
app.post('/api/withdraw', async (req, res) => {
	const { email, status } = req.body
	const doc = await User.findOneAndUpdate(
		{ email: email },
		{ balance: status }
	);
	doc.balance;
})

//connect to server-------------------------------------------------------------

const port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log("Server runnning on " + port);
  });

