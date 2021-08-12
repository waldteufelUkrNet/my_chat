var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.status(200);
    // встановлення заголовку-відповіді для коректного відображення кирилиці
    // res.cookie('Content-type', 'text/html; charset=utf-8');

    // заборона браузеру кешувати відповіді сервера
    // res.cookie('Cashe-Control', 'no-cashe no-store must-revalidate');
  res.sendFile('B:/files/work_area/my_chat/app/server/public/html/login.html');
});

module.exports = router;
