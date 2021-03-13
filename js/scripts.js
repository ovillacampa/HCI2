
(function($) {
    "use strict"; 
	
	document.addEventListener("DOMContentLoaded", function() {
	translateInstructions();
	});
		
	var sel = document.getElementById('guestselect');
	sel.addEventListener("change", translateInstructions);
	
	
	$('#thumbsUp').on('click', function(evt) {

	//alert('Thumbs Up');	

	$(this).find(('i')).removeClass('fa fa-thumbs-o-up').addClass('fas fa-thumbs-up');
	$('#thumbsDown').find(('i')).removeClass('fa fa-thumbs-o-down').addClass('fa fa-thumbs-o-down');
	$('#thumbsDown').find(('i')).removeClass('fas fa-thumbs-down').addClass('fa fa-thumbs-o-down');
	
    return false;//Returning false prevents the event from continuing up the chain
	});

	$('#thumbsDown').on('click', function(evt) {

	//alert('Thumbs Down');	

	$(this).find(('i')).removeClass('fa fa-thumbs-o-down').addClass('fas fa-thumbs-down');
	$('#thumbsUp').find(('i')).removeClass('fas fa-thumbs-up').addClass('fa fa-thumbs-o-up');
		
    return false;//Returning false prevents the event from continuing up the chain
	});

	document.getElementById('guestmessage').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
		e.preventDefault();
      guestsubmitForm();
    }
	});
    
		document.getElementById('guidemessage').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
		e.preventDefault();
      guidesubmitForm();
    }
	});
	
	
    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'a', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
        });	
    });
    


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
    });

//Guide Side
    $("#GuideInput").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            guideformError();
            guidesubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            guidesubmitForm();
        }
    });
	
	
	function thumbsClick(){
		
	alert("aaa");	
		
	}
	
	function translateInstructions(){
		var instructtext = "Let us help you find what your looking for. Chat with our guide using our multilanguge chat system.";
		var translatemsg = "HOW WAS THE TRANSLATION?";
		var guestmsglabel = "Your message";
		
            var url = "https://translation.googleapis.com/language/translate/v2";
            //Strings requiring translation
            url += "?q=" + escape(instructtext);
			url += "&q=" + escape(translatemsg);
			url += "&q=" + escape(guestmsglabel);
            //Target language
            url += "&target=" + $("#guestselect").val();
            //Replace with your API key
            url += "&key=AIzaSyCkI_rq-VBOqxVsJKSLaDXrDhhaPCohUxA";

			$.get(url, function (data, status) {
            //Results are returned in an array following the order they were passed. 
            //$("#textField").text(data.data.translations[0].translatedText);
				var translatedmessage = data.data.translations[0].translatedText;
				document.getElementById('instruct').value = translatedmessage + '\n';
				var translatedmessage = data.data.translations[1].translatedText;
				document.getElementById('guesttranslabel').innerHTML = translatedmessage;
				var translatedmessage = data.data.translations[2].translatedText;
				document.getElementById('guestmsglabel').innerHTML = translatedmessage;


            });  
		
	}

    function guidesubmitForm() {
        // initiate variables with form content
		var translatedmessage='';
		var name = $("#guidename").val();
		
		if (name == null || name == '') {
		name = 'Guide';
		}
		
		var select = $("#guideselect").val();
        var message = $("#guidemessage").val();
		var guestchat = document.getElementById('guestchat').value;
		var guidechat = document.getElementById('guidechat').value;


		document.getElementById('guidechat').value = guidechat + 'Guide: ' + message + '\n';

//Translate text
//Call Google Translate API with message and guestselect
//alert($("#guidemessage").val());
//alert($("#guestselect").val());

            var url = "https://translation.googleapis.com/language/translate/v2";
            //Strings requiring translation
            url += "?q=" + escape($("#guidemessage").val());
            //Target language
            url += "&target=" + $("#guestselect").val();
            //Replace with your API key
            url += "&key=AIzaSyCkI_rq-VBOqxVsJKSLaDXrDhhaPCohUxA";
            $.get(url, function (data, status) {
                //Results are returned in an array following the order they were passed. 
            //$("#textField").text(data.data.translations[0].translatedText);
				translatedmessage = data.data.translations[0].translatedText;
				document.getElementById('guestchat').value = guestchat + 'Guide: ' + translatedmessage + '\n';
            });       

		//    guideformSuccess();
		document.getElementById("guidemessage").value = "";
		
		var textarea = document.getElementById('guidechat');
		textarea.scrollTop = textarea.scrollHeight;
	
		var textarea = document.getElementById('guestchat');
		textarea.scrollTop = textarea.scrollHeight;
/*
    //    $.ajax({
            //type: "POST",
            //url: "php/contactform-process.php",
            //data: "name=" + name + "&email=" + email + "&message=" + message + "&select=" + select + "&terms=" + terms + "&recaptcha=" + recaptcha, 
            success: function(text) {
                if (text == "success") {
                    guideformSuccess();
                } else {
                    guideformError();
                    guidesubmitMSG(false, text);
                }
            }
   //     });
	*/
	}

    function guideformSuccess() {
        $("#GuideInput")[0].reset();
        guidesubmitMSG(true, "Message Submitted!");
    //    $("input").removeClass('notEmpty'); // resets the field label after submission
        $("guidemessage").removeClass('notEmpty'); // resets the field label after submission
    }

    function guideformError() {
        $("#GuideInput").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function guidesubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#guidemsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

//Guest Side

    $("#GuestInput").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            guestformError();
            guestsubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            guestsubmitForm();
        }
    });

    function guestsubmitForm() {
        // initiate variables with form content
		
		//reset rating
		$('#thumbsUp').find(('i')).removeClass('fa fa-thumbs-o-up').addClass('fas fa-thumbs-up');
		$('#thumbsDown').find(('i')).removeClass('fa fa-thumbs-o-down').addClass('fa fa-thumbs-o-down');
		$('#thumbsDown').find(('i')).removeClass('fas fa-thumbs-down').addClass('fa fa-thumbs-o-down');
	
	
		var translatedmessage = '';
		var name = $("#guestname").val();
		
		if (name == null || name == '') {
		name = 'Guest';
		}
		
		var select = $("#guestelect").val();		
        var message = $("#guestmessage").val();
		var guestchat = document.getElementById('guestchat').value;
		
		var guidechat = document.getElementById('guidechat').value;

		document.getElementById('guestchat').value = guestchat + name + ': ' + message + '\n';


//Translate text
//Call Google Translate API with message and guideselect

            var url = "https://translation.googleapis.com/language/translate/v2";
            //Strings requiring translation
            url += "?q=" + escape($("#guestmessage").val());
            //Target language
            url += "&target=" + $("#guideselect").val();
            //Replace with your API key
            url += "&key=AIzaSyCkI_rq-VBOqxVsJKSLaDXrDhhaPCohUxA";
            $.get(url, function (data, status) {
                //Results are returned in an array following the order they were passed. 
            //$("#textField").text(data.data.translations[0].translatedText);
				translatedmessage = data.data.translations[0].translatedText;
				
			document.getElementById('guidechat').value = guidechat + name + ': ' + translatedmessage + '\n';
            });       




	document.getElementById("guestmessage").value = "";
	
	document.querySelector("guestmessage").focus();
	document.querySelector("guestmessage").setSelectionRange(0,0); //place cursor at start
	
	
	var textarea = document.getElementById('guestchat');
	textarea.scrollTop = textarea.scrollHeight;
	
	var textarea = document.getElementById('guidechat');
	textarea.scrollTop = textarea.scrollHeight;

//alert("Guest");

        $.ajax({
           // type: "POST",
            //url: "php/contactform-process.php",
            //data: "name=" + name + "&email=" + email + "&message=" + message + "&select=" + select + "&terms=" + terms + "&recaptcha=" + recaptcha, 
            success: function(text) {
                if (text == "success") {
                    guestformSuccess();
                } else {
                    guestformError();
                    guestsubmitMSG(false, text);
                }
            }
        });
	}

    function guestformSuccess() {
        $("#GuestInput")[0].reset();
        guestsubmitMSG(true, "Message Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
        $("textarea").removeClass('notEmpty'); // resets the field label after submission
    }

    function guestformError() {
        $("#GuestInput").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function guestsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#guidemsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

//	function googleTranslateElementInit() {
//		new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
  
  

	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);