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
	my_sheet.getRows( 1, function(err, row_data){
		// loop through all the rows
		// turn the submit date into a JS date
		// compare with today
		// remove from list if they are not valid
	    res.render('index', { sheet_rows: row_data });
	});
});

module.exports = router;
