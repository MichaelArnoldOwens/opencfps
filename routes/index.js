var express = require('express');
var router = express.Router();
var GoogleSpreadsheet = require("google-spreadsheet");
var _ = require('underscore');
 





/* GET home page. */
router.get('/', function(req, res, next) {
	// spreadsheet key is the long id in the sheets URL 
	var my_sheet = new GoogleSpreadsheet('1ggKZUjEVoiuiXUXxThM5xMRzEW-V7XtcYckYEBOU8lA');
	 
	// Without auth -- read only 
	// IMPORTANT: See note below on how to make a sheet public-readable! 
	// # is worksheet id - IDs start at 1 
	my_sheet.getRows( 1, function(err, all_dates){
		// get upcoming dates only
		var upcomingProposalDates = _.reject(all_dates, function(row) {
			var submitDate = new Date(row['whensthesubmissiondeadline'])
			return submitDate < new Date();
		});
		// get passed dates only
		var passedProposalDates = _.reject(all_dates, function(row) {
			var submitDate = new Date(row['whensthesubmissiondeadline'])
			return submitDate > new Date();
		});

		//render and send
	    res.render('index', { upcoming_dates: upcomingProposalDates, passed_dates: passedProposalDates });
	});
});

module.exports = router;
