var express = require('express');
var router = express.Router();

// router.get('/', (req, res) => {
//   res.render('webcontent/landingPage_homePage_example', 
//   {
//     env: process.env
//   })
// })

/* GET initial dashboard.  This is an example of an .ejs file containing the react-app mount */
router.get('/', (req, res) => {
  res.render('pages/initialDashboard', 
  {
    env: process.env
  })
})

module.exports = router;