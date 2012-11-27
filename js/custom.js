$(document).ready(function() {
	$('.change').live('blur', function() { 
		var style = '<style type="text/css">' + $('.change').text() + "</style>";
		$("head").append(style);
	});
});