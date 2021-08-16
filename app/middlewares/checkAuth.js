const loadSignedPage = require('../libs/loadSignedPage.js');

module.exports = function(req,res,next){
  if(!req.session.user) {
    // авторизації нема
    next();
  } else {
    // авторизація є
  }
}