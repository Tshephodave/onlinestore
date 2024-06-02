const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

async function register(req, res) {
  try {
    const { username, email,phone, password, passwordConfirm,location, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
      passwordConfirm,
      location,
      role, 
    });

    await newUser.save();
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'www.tshepodavid@gmail.com',
        pass: 'kjvl nttf knhr zrqy',
      },
    });

    const mailOptions = {
      from: 'www.tshepodavid@gmail.com',
      to: newUser.email,
      subject: 'Registration Successful',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="text-align: center;">
            <img src="https://www.cnet.com/a/img/resize/f92ae43457ac52e0b761737181264a82aa0765bb/hub/2019/02/04/8311b046-6f2b-4b98-8036-e765f572efad/msft-microsoft-logo-2-3.jpg?auto=webp&fit=crop&height=675&width=1200" alt="Logo" style="max-width: 100px; margin-bottom: 20px;" />
          </div>
          <h2 style="text-align: center;">Welcome to Ap online store, ${newUser.username}!</h2>
          <p>Dear ${newUser.username},</p>
          <p>Thank you for registering with us. Below are your login details:</p>
          <p><strong>Email:</strong> ${newUser.email}</p>
          <p><strong>Password:</strong> ${passwordConfirm}</p>
          <p>To access your account, please log in using your email and password.</p>
          <p>If you have any questions, feel free to contact our support team.</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'User registered but email not sent' });
      } else {
        res.status(201).json({ message: 'User registered successfully and email sent' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'order_web_2024'); 
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



module.exports = { register, login };
