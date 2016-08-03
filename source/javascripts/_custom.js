function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function checkCookie(){
  var clearedGate = getCookie('clearedGate');
  if(clearedGate === "false"){
    $('#age-gate').remove();
    $('.col-xs-12.col-sm-8.col-sm-offset-2.pad-top').html('<h2 style="color: white;">You are not eligible.</h2>')
    $('.col-xs-12.col-sm-8.col-sm-offset-2.pad-top').addClass('text-center');
  }
}

$(function(){
  checkCookie();
});



var x ='o',
z = 'e',
u = 'm',
r = 't';

function calculate_age(birth_month, birth_day, birth_year) {
    today_date = new Date();
    today_year = today_date.getFullYear();
    today_month = today_date.getMonth();
    today_day = today_date.getDate();
    age = today_year - birth_year;

    if (today_month < (birth_month - 1)) {
        age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day)) {
        age--;
    }
    return age;
}

// word gate
$(function(){

  $('#word-gate button').on('click', function(e){
    e.preventDefault();
    var codeWord = $('#code-word').val();
    if(codeWord === ""){
      $.growl.error({ message: "Please enter the code word." });
    } else {
      codeWord = codeWord.toString().toLowerCase().trim();
      if(codeWord == (u+z+" "+r+x+x) || codeWord == (u+z+r+x+x)){
        $.growl.notice({ message: "Success! Please enter your birthday." });
        $('#word-gate').parent().remove();
        $('#age-gate').removeClass('hidden');
      } else {
        $.growl.error({ message: "Sorry, that code word is incorrect!" });
      }
    }
  });
});


// Datepicker
$(document).ready(function(){
  $("#dtBox").DateTimePicker({
    dateFormat: "mm-dd-yyyy"
  });
});

// iterate through errors and growl them
function growlz(){
  setTimeout(function(){
    $('label.error').each(function(){
      if($(this).html() != ""){
        var errorText = $(this).text();
        $.growl.error({ message: errorText });
      }
    });
  }, 100);
}


// successMsg Constructor
var successMsg = "<div id=\"thankyou\" class=\"col-xs-12 text-center\"><h2 class=\"thanks\">Thank you for entering!</h2><p>Would you like to enter again?</p><button class=\"again-button\">Enter Again</div></div>"

// dateparse for safari compatibility
function parseDate(input, format) {
  format = format || 'yyyy-mm-dd'; // default format
  var parts = input.match(/(\d+)/g),
      i = 0, fmt = {};
  // extract date-part indexes from the format
  format.replace(/(yyyy|dd|mm)/g, function(part) { fmt[part] = i++; });

  return new Date(parts[fmt['yyyy']], parts[fmt['mm']]-1, parts[fmt['dd']]);
}

// Add age validation method
$.validator.addMethod("minAge", function(value, element, min) {
    var today = new Date();
    var birthDate = new Date(parseDate(value, 'mm-dd-yyyy'));
    var age = today.getFullYear() - birthDate.getFullYear();
    if (age > min+1) {
        return true;
    }
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= min;
}, "You are not old enough!");


$("#contest").validate({
  focusInvalid: false,
  rules: {
    // first name
    'entry.1862104037': {
      //checks for whitespace
      required: {
        depends:function(){
          $(this).val($.trim($(this).val()));
          return true;
        }
      },
      lettersonly: true,
      minlength: 2
    },
    // last name
    'entry.2059930985': {
      //checks for whitespace
      required: {
        depends:function(){
          $(this).val($.trim($(this).val()));
          return true;
        }
      },
      lettersonly: true,
      minlength: 2
    },
    // email
    'entry.322932457': {
      //checks for whitespace
      required: {
        depends:function(){
          $(this).val($.trim($(this).val()));
          return true;
        }
      },
      email: true
    },
    'entry.328909515': {
        required: true
        // minAge: 13
    },
    'entry.1685083969': {
        number: true,
        minlength: 10,
        maxlength: 11
    }
  },
  messages: {
    // first name
    'entry.1862104037': {
      required: "Please give your first name.",
      lettersonly: "Letters only in the name fields please.",
      minlength: jQuery.validator.format("At least {0} characters required!"),
    },
    // last name
    'entry.2059930985': {
      required: "Please give your last name.",
      lettersonly: "Letters only in the name fields please.",
      minlength: jQuery.validator.format("At least {0} characters required!"),
    },
    // email
    'entry.322932457': {
      required: "Please give your e-mail address.",
      email: "Please give a valid e-mail address."
    },
    // birthday
    'entry.328909515': {
      required: "You must enter your date of birth"
      // minAge: "You must be at least 13 years old."
    },
    'entry.1685083969': {
      number: "Phone number must be numbers only.",
      minlength: "Phone numbers must be at least 10 digits.",
      maxlength: "Phone numbers can be no longer than 11 digits."
    }
  },
  invalidHandler: function(form, validator) {
    growlz();
  },
  success: "valid",
  submitHandler: function(form) {
    formH = $('#contest').height();
    form.submit();
    $.growl.notice({ message: "Thanks! We've received your entry." });
    setTimeout(function(){
      $('#contest').parent().html(successMsg).css('min-height', formH);
    }, 500);
    setTimeout(function(){
      $.scrollTo('#thankyou', 1000, { offset: 0, 'axis': 'y' });
    }, 600);
  }
});

$("#youngform").validate({
  focusInvalid: false,
  rules: {
    // first name
    'entry.1862104037': {
      //checks for whitespace
      required: {
        depends:function(){
          $(this).val($.trim($(this).val()));
          return true;
        }
      },
      lettersonly: true,
      minlength: 2
    },
    // email
    'entry.322932457': {
      //checks for whitespace
      required: {
        depends:function(){
          $(this).val($.trim($(this).val()));
          return true;
        }
      },
      email: true
    }
  },
  messages: {
    // first name
    'entry.1862104037': {
      required: "Please give your first name.",
      lettersonly: "Letters only in the name fields please.",
      minlength: jQuery.validator.format("At least {0} characters required!"),
    },
    // email
    'entry.322932457': {
      required: "Please give your parent's e-mail address.",
      email: "Please give a valid e-mail address."
    }
  },
  invalidHandler: function(form, validator) {
    growlz();
  },
  success: "valid",
  submitHandler: function(form) {
    formH = $('#youngform').height();
    form.submit();
    $.growl.notice({ message: "Thanks! We've received your entry." });
    setTimeout(function(){
      $('#youngform').parent().html(successMsg).css('min-height', formH);
    }, 500);
    setTimeout(function(){
      $.scrollTo('#thankyou', 1000, { offset: 0, 'axis': 'y' });
    }, 600);
  }
});

$("#age-gate").validate({
  focusInvalid: false,
  rules: {
    birthday: {
      required: true,
      minAge: 6
    }
  },
  messages: {
    birthday: {
      required: "You must enter your date of birth",
      minAge: "Sorry, you are not eligible."
    }
  },
  invalidHandler: function(form, validator) {
    growlz();
    setTimeout(function(){
     if($('.growl-message:contains("You are not eligible")').length > 0){
       setCookie('clearedGate', false, 7);
       checkCookie();
     }
    }, 100);
  },
  success: "valid",
  submitHandler: function() {
    $('#gate').fadeOut( 500 );
    var birthdate = $('input[name="birthday"]').val().split('-'),
    age = calculate_age(birthdate[0], birthdate[1], birthdate[2]);
    $('input[name="entry.1880840989"]').val(age);
    if(age >= 13){
      $('#youngform').remove();
    } else {
      $('#contest').remove();
    }
    setTimeout(function(){
      $('.content').fadeIn();
      $('#footer').fadeIn();
    }, 500);
  }
});

// reload the page

$(document).on('click','.again-button', function(e){
  e.preventDefault();
  location.reload();
});

// form fixer
$('.datepicker').on('focus', function(){
  if($('#dtBox').is(':visible')){
    $('.datepicker').blur();
    // enable touch events on datepicker
    // $(".increment, .decrement").hammer({domEvents: true}).on("tap", function(event){
    //     this.click();
    //     event.stopPropagation();
    //     event.preventDefault();
    //     event.gesture.preventDefault();
    //     event.gesture.stopDetect();
    // });
    $("#contest :input").prop("disabled", true);
  } else {
    $("#contest :input").prop("disabled", false);
  }
});

$('.datepicker').on('blur', function(){
  $("#contest :input").prop("disabled", false);
});
