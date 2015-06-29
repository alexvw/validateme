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

## Details:

Initialized via jQuery selector, on whatever input objects you want validated (class "`validateme`" in this case):

`$('.validateme').validateme();`

Or with options:

`$('.validateme').validateme({
		when: "now",
		finalCallback: "submitAfterValidation",
		failClass: "fail-style",
		passClass: "looksOkay"
	});`
	
- **When**: whether you want to validate just right "`now`" or when the field "`change`"es. Defaults to on change.
- **finalCallback**: only valid when `when = 'now'`, this function will be called with a true/false of whether everything passed validation. Useful for stopping submit on false. When in onchange mode, use individual callbacks (see below) or css classes for status
- **failClass**: override the standard class with your own to be applied to the input on fail
- **passClass**: same as above, but for pass

To assign validation, use data-* attributes like this:

`<input type="text" id="middle" class="sm validateme" data-validateme-callback="customFunction" data-validateme-type="alpha" data-validateme-min-length="1"  placeholder="A"/>`

- **data-validateme-callback**: this javascript function (global scope only for now) will be called, with the input object as a parameter, whenever this input fails validation. 
- **data-validateme-min-length**: will fail validation if below this length. Set to 1 to make field required.
- **data-validateme-validationtype**: the type of validation. Currently includes:
  - `alpha`
  - `numeric`
  - `alphanumeric`
  - `date`
  - `email`
  - `ssn`
  - `telephone`
  
##TODO: 
- testing, this has only been through very basic testing.
- optimization/minification
- expansion of validation types and tags
  