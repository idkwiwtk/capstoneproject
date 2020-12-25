// router signup.js

var express = require('express');
var router = express.Router();
const mysql = require('mysql');

let db = mysql.createConnection({
	user: "project",
	password: "5101",
	database: "project"
});

router.get('/', (req, res, next) => {
	// 회원가입
	conosle.log('signup request');
});

module.exports = router;
