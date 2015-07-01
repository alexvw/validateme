# validate-me

Quick jQuery library I whipped up to help with client-side validation.

## Overview:

This library uses html markup (classes and data-* parameters) to establish validation rules for HTML input tags. With the appropriate data-validateme-validationtype parameter, it can validate the following types of data:

- 10 Digit telephone. With or without spaces/parenthesis/dashes
- Social Security Numbers. 9 Digits, with or without dashes/spaces/parenthesis/dashes
- Dates. MM/DD/YYYY, then validated against javscript's native Date() object to make sure it's a real date
- Emails. local@domain.tld
- Alphanumeric only
- Alpha only
- Numeric only

The library is set up so that the validation code is dynamically extensible, so adding new validation types is easy to do on your end. Details below.

## Details:

Initialized via jQuery selector, on whatever input objects you want validated (class "`validateme`" in this case):

`$('.validateme').validateme();`

Or with options, if you want to override the defaults. 

`$('.validateme').validateme({
		when: "now",
		finalCallback: "submitAfterValidation",
		failClass: "fail-style",
		passClass: "looksOkay"
	});`
	
- **When**: whether you want to validate right "`now`" or when the field "`change`"es. Defaults to on change. If `now`, the finalCallback will be sent true/false for valid status 
- **finalCallback**: only valid when `when = 'now'`, this function will be called with a true/false of whether everything passed validation. Useful for stopping submit on false. When in onchange mode, use individual callbacks (see below) or css classes for status
- **failClass**: override the standard class with your own to be applied to the input on fail. Defaults to `validateme-fail`
- **passClass**: same as above, but for pass defaults to `validateme-pass`

To assign validation, use data-* attributes like this:

`<input type="text" id="middle" class="sm validateme" data-validateme-callback="customFunction" data-validateme-type="alpha" data-validateme-min-length="1"  placeholder="A"/>`

- **data-validateme-callback**: this javascript function (global scope only for now) will be called, with the input object as a parameter, whenever this input fails validation. 
- **data-validateme-min-length**: will fail validation if below this length. Set to 1 to make field required.
- **data-validateme-validationtype**: the type of data being validated. Currently includes:
  - `alpha`
  - `numeric`
  - `alphanumeric`
  - `date`
  - `email`
  - `ssn`
  - `telephone`
- **data-validateme-req-group**: A number or string group that needs at least one member to have non-empty value. For example, if you set `data-validateme-req-group="names"` on three fields, all three would fail validation until at least one had a value.


###Comparators
The ability to set a greater-than (gt) parameter on an input, and it would validate only if greater-than a field or value. Same for less-than (lt). Can be combined to create complex ranges of allowed values. Works on dates, numerics, alphanumerics, alphas. Not recommended on email, ssn or telephone fields. Syntax is a little more complex than the rest, but it works like this:
- **data-validateme-gte-field**: Pass in the id of another input, and it will only validate if the value is greater than or equal to the other field
- **data-validateme-lt-field**: Same as above, but less than.
- **data-validateme-gte-value**: Same as above, but pass in a hardcoded value rather than a pointer to another field.
- **data-validateme-lt-value**: Same as above, but less than. 
  
  
##Extending validation types / Overriding Comparators:

The list of validation types is defined only when referenced - so, if you need to add more types, it's easy to do. Just define another function with the same name as the type, and add it to the validateme jQuery object. For example, this is how Date is defined: 

`// date type. looks for MM/- DD/- YYYY, validates that it is a proper date with javascript core
	$.fn.validateme.date = function(valueString) {
	dateRegEx = /^(0[1-9]|1[0-2])[ /-](0[1-9]|1\d|2\d|3[01])[ /-](19|20|21)\d{2}$/;
		if (dateRegEx.test(valueString))
			return ((new Date(valueString) !== "Invalid Date" && !isNaN(new Date(valueString)) ) ) ? true : false;
		else return false;
	};
	$.fn.validateme.date.compare = function(a,b) {
		return (new Date(a) < new Date(b));  
	};`
	
Nowhere are types hardcoded, so adding new functions to the validateme object immediately makes them available as data-validateme-type parameters. Just make sure the function name matches the type, takes in a string, and returns true/false for validity. Also, if you try to validate a type that doesn't exist, it quietly ignores that type rather than erroring.

##Example page:

Included is a self-contained static example page.
See /example/test.html to see an example of the plugin in action.
  
##TODO: 
- testing, this has only been through very basic testing.
- optimization/minification
- expansion of validation types and tags. Currently works only on input tags.
  