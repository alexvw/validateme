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
	
	$('#checkInputs').click(function(){
		$('.validateme').validateme({
		when: "now",
		finalCallback: didNotPass
		});
	});
	
	//example script for how to use the final validation callback, defined in the options of init -->
	function didNotPass(passed){
		 if (!passed)
			alert("Please check your inputs!");
		else alert("Success!");
	}
});