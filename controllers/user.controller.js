const userSchema = require('../models/userSchema');
const { Encrypt, Decrypt } = require('../security/bcrypt');
const { getToken } = require('../security/jwt');

const signup = async (req, res) => {
    const { name, email, password, phone } = req.body;

    const encryptedPassword = await Encrypt(password);
    const user = new userSchema({
        name: name,
        email: email,
        password: encryptedPassword,
        phone: phone
    });
    try {
        const result = await user.save();
        res.status(201).json({
            message: 'User created successfully',
            userId: result._id,
            name: result.name,
            email: result.email,
            phone: result.phone
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email });
    console.log(user);
    if (!user) {
        return res.status(401).send({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await Decrypt(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({ message: 'Invalid email or password' });
    }
    const token = getToken({ _id: user._id });
    res.status(200).json({
        message: 'User logged in successfully',
        token: token
    });
}

module.exports = { signup, login };
