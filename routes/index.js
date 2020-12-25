// index.js

var express = require('express');
var router = express.Router();
const mysql = require('mysql')
// 데이터베이스 연결을 위한 초기설정
let db = mysql.createConnection({
	user: "project",
	password: "5101",
	database: "project"
});

/* GET home page. */
router.get('/', function(req, res, next) {
	var sess = req.session;
	res.render('index', {session: sess});
});

/* POST login */
router.post('/login', (req, res, next) => {
	var sess;
	sess = req.session;
	sess.login = false;

	console.log('user log in request!!!');
	let reqId = req.body.id;
	let reqPw = req.body.pw;
	console.log(`ID : ${reqId} PW : ${reqPw}`);

	// 아이디 패스워드 유효성 검사
	if (reqId.length == 0 || reqPw.length == 0){
		console.log('invalid input');
		sess.login = false;
		sess.login_isvalid = false;
		res.render('index', {session : sess});
		return;
	}else{
		sess.login_isvalid = true;
	}

	// 데이터베이스에서 사용자 데이터 조회하기
	db.query(`SELECT password FROM user WHERE id = \"${reqId}\"`, (err, result, fields)=> {
		if (err){
			console.log(`데이터베이스 오류 발생`);
			console.log(err);
			res.render('index', {session : sess});
		}else{
			console.log(result);
			console.log('database query complete!!');
			// 아이디 패스워드 조회
			//if (result){
				if (result.length > 0){
					if (result[0].password == reqPw){
						console.log('비밀번호 일치');
						sess.user = reqId;
						sess.login = true;
						res.redirect('main/main');
					}else{
						console.log('비밀번호 불일치');
						sess.login = false;
						res.render('index', {session, sess});
					}
				}
				else{
					console.log('비밀번호 불일치');
					sess.login = false;
					res.render('index', {session: sess});
				}
			//}else{
			//	res.render('index', {inValid:true});
			//	console.log('로그인 정보가 일치 하지 않습니다.');
			//}
		}
	});

});
/* GET signup */
router.get('/signup', (req, res, next)=> {
	res.render('signup');
});
module.exports = router;
