/*
 * @author avanderwoude
 * Script that handles code for page specific content
 */
$(document).ready(function(){

	//init datepicker
	$('.input-group.date').datepicker({
			autoclose: true
		});
		
	//custom validation library
	$('.validateme').validateme({
		when: "change"
	});
	
});