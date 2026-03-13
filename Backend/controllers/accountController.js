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
    console.log('Returning demo accounts');
    // Always return demo data
    const demoAccounts = [
        {
            _id: 'demo1',
            accountHolderName: 'John Doe',
            accountNumber: '1234567890',
            accountType: 'Savings',
            balance: 50000,
            branch: 'Main Branch',
            createdAt: new Date().toISOString()
        },
        {
            _id: 'demo2',
            accountHolderName: 'Jane Smith',
            accountNumber: '0987654321',
            accountType: 'Current',
            balance: 25000,
            branch: 'City Branch',
            createdAt: new Date().toISOString()
        },
        {
            _id: 'demo3',
            accountHolderName: 'Bob Johnson',
            accountNumber: '5555555555',
            accountType: 'Savings',
            balance: 75000,
            branch: 'Downtown Branch',
            createdAt: new Date().toISOString()
        }
    ];
    res.status(200).json(demoAccounts);
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
