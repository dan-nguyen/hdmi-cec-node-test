var express = require('express');
var router = express.Router();
var exec = require('child_process').exec, child;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Remote JS' });
});

router.get('/on', function(req, res) {
    child = exec('echo "on 0" | cec-client -s',
		 function (error, stdout, stderr) {
		     console.log("Turned on TV successfully");
		     if (error !== null) {
			 console.log('exec error: ' + error);
		     }
		 });

    res.render('on', { title: 'Turned TV On' })
});

router.get('/off', function(req, res) {
    child = exec('echo "standby 0" | cec-client -s',
                 function (error, stdout, stderr) {
		     console.log("stdout: " + stdout);
                     console.log("Turned off TV successfully");
                     if (error !== null) {
                         console.log('exec error: ' + error);
                     }
                 });

    res.render('off', { title: 'Turned TV Off' })
});

router.get('/status', function(req, res) {
    var status;
    child = exec('echo "pow 0" | cec-client -s',
                 function (error, stdout, stderr) {
                     var n = stdout.indexOf("power status:");
		     status_temp = stdout.substring(n+13, n+28);
		     console.log(status_temp.indexOf(" "));
		     status = status_temp.substring(0, status_temp.indexOf("D")-1);
                     console.log("Status: " + status);
                     if (error !== null) {
                         console.log('exec error: ' + error);
                     }
		     res.render('status', {theStatus: status})
                 });
});

module.exports = router;
