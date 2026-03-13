const express = require('express');
const router = express.Router();
const {
    createAccount,
    getAllAccounts,
    getAccountById,
    updateAccount,
    deleteAccount,
    depositMoney,
    withdrawMoney
} = require('../controllers/accountController');

// Create Account
router.post('/', createAccount);

// Get All Accounts
router.get('/', getAllAccounts);

// Get Account By ID
router.get('/:id', getAccountById);

// Update Account
router.put('/:id', updateAccount);

// Delete Account
router.delete('/:id', deleteAccount);

// Deposit Money
router.put('/deposit/:id', depositMoney);

// Withdraw Money
router.put('/withdraw/:id', withdrawMoney);

module.exports = router;
