const express = require ('express');
const { back, test, registerUser, loginUser,profile } = require('../controllers/authControllers');
const authMiddleware = require('../middlewhare/authMiddleware');

const router = express.Router();

router.get("/",back);
router.get("/test",test);
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",authMiddleware,profile);

module.exports = router ;