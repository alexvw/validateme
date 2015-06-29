/*
*	@author avanderwoude
	quick library to automatically do instant or on-change validation of text inputs. built as a jQuery plugin
*/

(function( $ ) {
 
    $.fn.validateme = function( options ) {
	
		//options
		//failclass = what class to use for failed validation
		//when = when to validate. default onchange, can also be now
		
		//also have data options definable as data-* params on the tags themselves
		/*
		min-length
		callback
		*/
		
		//default options.
        var settings = $.extend({
            // These are the defaults.
            failClass: "validateme-fail",
			passClass: "validateme-pass",
            when: "change",
			finalCallback: null
        }, options );
		
		var failed = false;
		
		this.filter( "input" ).each(function() {
            var toValidate = $( this );
			
			//get type of validation
			var validateType = toValidate.data("validateme-type");
			
			// check to see that a function for that type exists. If not, throw console error and return
			if (typeof $.fn.validateme[validateType] === "function") {
				//okay, it's safe to use the function
				//get data-* values
				var minLength = toValidate.data("validateme-min-length");
				var callback =  toValidate.data("validateme-callback");
				
				//onchange or right now?
				if (settings.when === "change"){
				//on change, so set up change handlers
					toValidate.on( "change", function() {
						//do this check only on change
						validate( toValidate, validateType, settings, minLength, callback);
					});
				}else if (settings.when === "now"){
					//I want it validated, and I want it NOW!
					var whereTo = settings.finalCallback;
					if (!validate( toValidate, validateType, settings, minLength, callback)){
						failed = true;
						if (whereTo != null)
							whereTo.call(this,false);
						return false;
					}
				}
			}else{
			console.log("No validation code exists for type "+validateType);
			}
			
        });
		if (settings.when === "now" && !failed)
			settings.finalCallback.call(this,true);
        return this;
    };
	
	//return whether the input field toValidate is valid according to certain criteria, defined in the data-*
	function validate(toValidate, validateType, settings, minLength, callback){
		if (typeof minLength === "undefined")
			var minLength = 0;
		
		var validateValue = toValidate.val();
		//check required, check minimum length
		if (validateValue.length < minLength)
			return false;
			
		if (validateValue === "")
			return true;
		
		if (!$.fn.validateme[validateType](validateValue)){
			//failed validation
			console.log(validateType + " failed!");
			toValidate.removeClass(settings.passClass);
			toValidate.addClass(settings.failClass);
			//optional callback on failures
			if (typeof callback !== "undefined"){
				//callback was defined, call it with the input object as param
				window[callback](toValidate);
			}
			return false;
		}
		else{
			//passed validation
			console.log(validateType + " passed!");
			toValidate.removeClass(settings.failClass);
			toValidate.addClass(settings.passClass);
			return true;
		}
	}
	
	/* 
		validation functions. To add more, just add more objects and they will be dynamically found when classes are assigned
		Could be private, but this allows overriding if needed
	* 
	*/
	
	//Telephone type
	//Ignores format, just makes sure there are appropriate 10 digits
	//TODO: to internationalize, would need something like google's libphonenumber: github.com/googlei18n/libphonenumber
	$.fn.validateme.telephone = function(valueString) {
		var telephoneRegEx = /^((\(?\d{3}\))|(\d{3}))[- ]?\d{3}[ -]?\d{4}$/;
		//pull out others
		//var numericOnly = valueString.replace(/\D/g, "");
		return (telephoneRegEx.test(valueString));
	};
	
	//SSN type
	//Ignores format, just makes sure there are appropriate 9 digits, ignores dashes or spaces
	$.fn.validateme.ssn = function(valueString) {
		var ssnRegEx = /^\d{3}[- ]?\d{2}[ -]?\d{4}$/;
		//pull out others
		//var numericOnly = valueString.replace(/\D/g, "");
		return (ssnRegEx.test(valueString));
	};
	
	// alphanumeric type. Allows characters and numbers and spaces and dashes
	$.fn.validateme.alphanumeric = function(valueString) {
		alphaNumRegEx = /^([a-zA-Z0-9 _-]+)$/;
		return (alphaNumRegEx.test(valueString));
	};
	
	// numeric type. Allows numbers
	$.fn.validateme.numeric = function(valueString) {
		numRegEx = /^([0-9 _-]+)$/;
		return (numRegEx.test(valueString));
	};
	
	// alpha type. Allows letters and spaces and dashes
	$.fn.validateme.alpha = function(valueString) {
		alphaRegEx = /^([a-zA-Z _-]+)$/;
		return (alphaRegEx.test(valueString));
	};
	
	
	// date type. looks for MM/DD/YYYY, validates that it is a proper date with javascript core
	$.fn.validateme.date = function(valueString) {
	dateRegEx = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20|21)\d{2}$/;
		if (dateRegEx.test(valueString))
			return ((new Date(valueString) !== "Invalid Date" && !isNaN(new Date(valueString)) ) ) ? true : false;
		else return false;
	};
	
	// email type. Looks for local@domain.tld
	$.fn.validateme.email = function(valueString) {
	emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return (emailRegEx.test(valueString));
	};
	
}( jQuery ));
 
