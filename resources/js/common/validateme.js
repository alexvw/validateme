(function( $ ) {
 
    $.fn.validateme = function( options ) {
	
		//options
		//failclass = what class to use for failed validation
		//when = when to validate. default onchange, can also be now
		//for each type, perform validation and apply classes as needed
		//tag types:
		/*
			phone
			ssn
			date
			email
			numeric
			alphanumeric
		*/
		
		//also have variables like
		/*
		min-length
		callback
		*/
		
		/*
        this.filter( "a" ).each(function() {
            var link = $( this );
            link.append( " (" + link.attr( "href" ) + ")" );
        });
		*/
		
		// This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            failClass: "validateme-fail",
			passClass: "validateme-pass",
            when: "change"
        }, options );
		
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
					validate(validateType, toValidate, settings);
				}
			}else{
			console.log("No validation code exists for type "+validateType);
			}
			
        });
 
        return this;
    };
	
	//return whether this the input field toValidate is valid according to certain criteria, defined in the data-*
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
		}
		else{
			//passed validation
			console.log(validateType + " passed!");
			toValidate.removeClass(settings.failClass);
			toValidate.addClass(settings.passClass);
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
		var telephoneRegEx = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
		//pull out others
		var numericOnly = valueString.replace(/\D/g, "");
		return (numericOnly.match(telephoneRegEx) !== null);
	};
	
	//SSN type
	//Ignores format, just makes sure there are appropriate 9 digits, ignores dashes or spaces
	$.fn.validateme.ssn = function(valueString) {
		var ssnRegEx = /^\d{3}\d{2}\d{4}$/;
		//pull out others
		var numericOnly = valueString.replace(/\D/g, "");
		return (numericOnly.match(ssnRegEx) !== null);
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
 



/*

telephone

var area_val = $('#attr'+this.RPID+'-inputs').find('#area').val();
			var subscriber_val = $('#attr'+this.RPID+'-inputs').find('#subscriber').val();
			if (area_val != "" && subscriber_val != "")
			{
				if (area_val.length > 2 && subscriber_val.length > 6)
				{
					var areaNum = /^\d+$/.test(area_val);
					var subscriberNum = /^\d+$/.test(subscriber_val);
					if (areaNum && subscriberNum)
					{
						return true;
					}
				}
			}
			alert("Please enter a valid Telephone");
			return false;
			
SSN

case 'new':
			var ssn1_val = $('#attr'+this.RPID+'-inputs').find('#ssn1').val();
			var ssn2_val = $('#attr'+this.RPID+'-inputs').find('#ssn2').val();
			var ssn3_val = $('#attr'+this.RPID+'-inputs').find('#ssn3').val();
			if (ssn1_val != "" && ssn2_val != "" && ssn3_val != ""){
				if (ssn1_val.length > 2 && ssn2_val.length > 1 && ssn3_val.length > 3){
					var ssn1Num = /^\d+$/.test(ssn1_val);
					var ssn2Num = /^\d+$/.test(ssn2_val);
					var ssn3Num = /^\d+$/.test(ssn3_val);
					if (ssn1Num && ssn2Num && ssn3Num)
						return true;
				}
			}
			alert("Please enter a valid SSN");
			return false;
			break;
		}	
			
numeric

case 'new':
				var reg = new RegExp('^[0-9]+$');
				var name_val =  $('#attr'+this.RPID+'-inputs').find('#Numeric').val();
				if (name_val != ""){
					if (name_val.length > 0)
						if (reg.test(name_val))
							return true;
					
				}
				alert("Please enter a valid <c:out value="${RPAttributeField.label}"/>");
				return false;
				break;
				

email

case 'new':
			var email_val =  $('#attr'+this.RPID+'-inputs').find('#email1').val();
			if (email_val != ""){
				if (email_val.length > 3)
					 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_val))  
						return true;
			}
			alert("Please enter a valid Email");
			return false;
			break;
				
				
date

case 'new':
			var dmo_val = $('#attr'+this.RPID+'-inputs').find('#dmo').val();
			var dday_val = $('#attr'+this.RPID+'-inputs').find('#dday').val();
			var dyr_val = $('#attr'+this.RPID+'-inputs').find('#dyr').val();
			if (dmo_val != "" && dday_val != "" && dyr_val != ""){
				if (dmo_val.length > 1 && dday_val.length > 1 && dyr_val.length > 3){
					var dmoNum = /^\d+$/.test(dmo_val);
					var ddayNum = /^\d+$/.test(dday_val);
					var dyrNum = /^\d+$/.test(dyr_val);
					if (dmoNum && ddayNum && dyrNum)
						if (parseInt(dmo_val) < 13)
							if (parseInt(dday_val) < 32)
								if (parseInt(dyr_val) < 9999)
									return true;
				}
			}
			alert("Please enter a valid <c:out value="${RPAttributeField.label}"/>");
			return false;
			break;
			
alphanumeric 

case 'new':
				var name_val =  $('#attr'+this.RPID+'-inputs').find('#Alphanumeric').val();
				if (name_val != ""){
					if (name_val.length > 3)
							return true;
					
				}
				alert("Please enter a valid <c:out value="${RPAttributeField.label}"/>");
				return false;
				break;

*/

