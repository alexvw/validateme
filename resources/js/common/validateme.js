(function( $ ) {
 
    $.fn.validateme = function() {
	
		//options
		//failclass = what class to use for failed validation
		//callback = what (if any) class to call on this element if it fails validation
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
		required
		minimum-length
		maximum-length
		*/
        this.filter( "a" ).each(function() {
            var link = $( this );
            link.append( " (" + link.attr( "href" ) + ")" );
        });
 
        return this;
 
    };
 
}( jQuery ));
 
// Usage example:
$('.validate').validateme();


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