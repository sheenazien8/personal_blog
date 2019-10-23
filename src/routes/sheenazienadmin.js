import SheenaZienBlog from "./../controllers/SheenaZienBlog"
import SheenaZienPortfolio from "./../controllers/SheenaZienPortfolio"
import SheenaZienAuth from "./../controllers/SheenaZienAuth"
import SheenaZienDiary from "./../controllers/SheenaZienDiary"
import express from 'express';
const app = express()
const router = express.Router()
// This middleware will check if user's cookie is still saved in browser and user is not set,
// then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

// middleware function to check for logged-in users
let sessionChecker = (req, res, next) => {
  if (req.path == '/login' && req.session.user && req.cookies.user_sid) {
      res.redirect('/sheenazienadmin/');
  } else if (req.path == '/' && !req.session.user && !req.session.logedIn) {
    res.redirect('/sheenazienadmin/login');
  } else if (req.path != '/login' && !req.session.user && !req.session.logedIn) {
    res.redirect('/sheenazienadmin/login');
  } else {
    next();
  }
};

router.get('/blog', sessionChecker, SheenaZienBlog.index)
      .post('/blog', sessionChecker, SheenaZienBlog.create)
      .get('/blog/:id', sessionChecker, SheenaZienBlog.detail)
      .put('/blog/:id', sessionChecker, SheenaZienBlog.update)
      .put('/blog/status/:id', sessionChecker, SheenaZienBlog.updateStatus)
      .delete('/blog/:id', sessionChecker, SheenaZienBlog.delete)

router.get('/portfolio', sessionChecker, SheenaZienPortfolio.index)
      .post('/portfolio', sessionChecker, SheenaZienPortfolio.create)
      .get('/portfolio/:id', sessionChecker, SheenaZienPortfolio.detail)
      .put('/portfolio/:id', sessionChecker, SheenaZienPortfolio.update)
      .put('/portfolio/status/:id', sessionChecker, SheenaZienPortfolio.updateStatus)
      .delete('/portfolio/:id', sessionChecker, SheenaZienPortfolio.delete)

router.get('/diary', sessionChecker, SheenaZienDiary.index)
      .post('/diary', sessionChecker, SheenaZienDiary.create)
      .get('/diary/:id', sessionChecker, SheenaZienDiary.detail)
      .put('/diary/:id', sessionChecker, SheenaZienDiary.update)
      .put('/diary/status/:id', sessionChecker, SheenaZienDiary.updateStatus)
      .delete('/diary/:id', sessionChecker, SheenaZienDiary.delete)

router.get('/', sessionChecker, (req, res, next) => {
  return res.render('sheenazienadmin/index', {
    title: 'Admin'
  })
})

router.get('/login', sessionChecker, SheenaZienAuth.login)
router.post('/login/action', SheenaZienAuth.loginAction)
router.delete('/logout', SheenaZienAuth.logout)

export default router
