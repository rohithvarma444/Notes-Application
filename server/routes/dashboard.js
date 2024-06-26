const express = require('express');
const router = express.Router();
const handlers= require('../handlers/dashboard')
const checkAuth= require('../middleware/checkAuth')


router.get('/dashboard', checkAuth.isAuth, handlers.dashboard);
router.get('/dashboard/item/:id',checkAuth.isAuth,handlers.fetchnote);
router.delete('/dashboard/item/:id',checkAuth.isAuth,handlers.deleteNote);
router.post('/dashboard/item/:id',checkAuth.isAuth,handlers.updateNote);
router.get('/add/notes',checkAuth.isAuth,handlers.createNote);
router.post('/add/notes',checkAuth.isAuth,handlers.notes);
router.post('/search/notes',checkAuth.isAuth,handlers.dashboardSearch);
router.get('/search/notes',checkAuth.isAuth,handlers.dashboardSearchSubmit);
module.exports = router;