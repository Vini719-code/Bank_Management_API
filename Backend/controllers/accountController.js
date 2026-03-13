const Account = require('../models/Account');

// Create Account
const createAccount = async (req, res) => {
    try {
        const { accountHolderName, accountNumber, accountType, balance, branch } = req.body;

        // Check if account number already exists
        const existingAccount = await Account.findOne({ accountNumber });
        if (existingAccount) {
            return res.status(400).json({ message: 'Account number already exists' });
        }

        const account = new Account({
            accountHolderName,
            accountNumber,
            accountType,
            balance,
            branch
        });

        const savedAccount = await account.save();
        res.status(201).json(savedAccount);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Accounts
const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find().sort({ createdAt: -1 });
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Account By ID
const getAccountById = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Account
const updateAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Account
const deleteAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndDelete(req.params.id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Deposit Money
const depositMoney = async (req, res) => {
    try {
        const { amount } = req.query;
        const depositAmount = parseFloat(amount);

        if (!depositAmount || depositAmount <= 0) {
            return res.status(400).json({ message: 'Invalid deposit amount' });
        }

        const account = await Account.findByIdAndUpdate(
            req.params.id,
            { $inc: { balance: depositAmount } },
            { new: true }
        );

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.status(200).json(account);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Withdraw Money
const withdrawMoney = async (req, res) => {
    try {
        const { amount } = req.query;
        const withdrawAmount = parseFloat(amount);

        if (!withdrawAmount || withdrawAmount <= 0) {
            return res.status(400).json({ message: 'Invalid withdrawal amount' });
        }

        const account = await Account.findById(req.params.id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if (account.balance < withdrawAmount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        const updatedAccount = await Account.findByIdAndUpdate(
            req.params.id,
            { $inc: { balance: -withdrawAmount } },
            { new: true }
        );

        res.status(200).json(updatedAccount);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createAccount,
    getAllAccounts,
    getAccountById,
    updateAccount,
    deleteAccount,
    depositMoney,
    withdrawMoney
};
