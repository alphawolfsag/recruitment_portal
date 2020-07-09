(function($) {

    var form = $("#signup-form");
    form.validate({
        errorPlacement: function errorPlacement(error, element) {
            element.before(error);
        },
        rules: {
            username: {
                required: true,

            },
            email: {
                required: true,
                email : true
            },
            call_phone :{
                required: true,
            }
           
        },
        messages : {
            email: {
                email: 'Not a valid email address <i class="zmdi zmdi-info"></i>'
            },
           

        },
        onfocusout: function(element) {
            $(element).valid();
        },
    });
    form.steps({
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "slideLeft",
        labels: {
            previous: 'Previous',
            next: 'Next',
            finish: 'Submit',
            current: ''
        },
        titleTemplate: '<div class="title"><span class="number">#index#</span>#title#</div>',
        onStepChanging: function(event, currentIndex, newIndex) {
            form.validate().settings.ignore = ":disabled,:hidden";

            return form.valid();
        },
        onFinishing: function(event, currentIndex) {
            form.validate().settings.ignore = ":disabled";

            var url ="/recruitform";
            var msgFrom="";
            var msgTitle="Alert";
            $.confirm({
                content: function () {
                    var self = this;
                    return $.ajax({
                  type: "POST",
                  url: url,
                  data: form.serialize(), // serializes the form's elements.
                  success: function(data)
                  {
                    if(data ===">ok") {
                  //  location.href = "/panapa-login";
                  console.log("about to show the modal");
                  msgFrom = 'Application Form Successfull';
                  msgTitle="Welcome To Panapa";
                    }else{

                      if(data ==='ER_DUP_ENTRY') {
                        msgFrom = 'There is an account Already using the email you registered';
                        msgTitle= "Failed";
                      }else{
                        console.log("about to show the modal");
                        msgFrom = 'Registration Failed';
                        msgTitle="Failed";
                      }


                    }
                  }
                }).done(function (response) {
                        self.setContent(msgFrom);
                      //  self.setContentAppend('<br>Version: ' + response.version);
                        self.setTitle(msgTitle);
                    }).fail(function(){
                        self.setContent('Sorry, Something Went Wrong. Please Try Again');
                        self.setTitle("Failed");
                    });
                },
                //end of content

                buttons: {
                      
                       close: function () {
                       }
                   },
                   backgroundDismiss: false,
                   backgroundDismissAnimation: 'shake',


            });





          //  form.ajaxForm({url: '/registertest', type: 'post'});


            return form.valid();
        },
        onFinished: function(event, currentIndex) {
        console.log("Finished");
       
      



            //alert($('#password').val());

        },
        // onInit : function (event, currentIndex) {
        //     event.append('demo');
        // }
    });

    jQuery.extend(jQuery.validator.messages, {
        required: "",
        remote: "",
        url: "",
        date: "",
        dateISO: "",
        number: "",
        digits: "",
        creditcard: "",
        equalTo: ""
    });


    $.dobPicker({
        daySelector: '#expiry_date',
        monthSelector: '#expiry_month',
        yearSelector: '#expiry_year',
        dayDefault: 'DD',
        yearDefault: 'YYYY',
        minimumAge: 0,
        maximumAge: 120
    });

    $('#password').pwstrength();

    $('#button').click(function () {
        $("input[type='file']").trigger('click');
    })

    $("#Position").change(function () {

      if(this.value == "none"){
        $.confirm({
    title: 'It Seems You Have A Unique Category',
    content: '' +
    '<form action="" class="formName">' +
    '<div class="form-group">' +
    '<label>Please Type In The Postion You Wish To Apply For</label>' +
    '<input type="text" placeholder="Add New Category" class="name form-control" required />' +
    '</div>' +
    '</form>',
    buttons: {
        formSubmit: {
            text: 'Submit',
            btnClass: 'btn-orange',
            action: function () {
                var name = this.$content.find('.name').val();

                $('#Position').append(new Option(name, name));
                 $("#Position").val(name).attr('selected', true);

                if(!name){
                    $.alert('provide a valid name please');
                    return false;
                }
                $.alert({
      title: '<i class="yellow exclamation circle icon"></i> Please Note !',
      content: 'Your Position Will First Need Approval Before It Can Be Officially Added',
  });
            }
        },

    }

});
      }

    });


    $("#education").change(function () {

        if(this.value == "none"){
          $.confirm({
      title: 'It Seems You Have A Unique Category',
      content: '' +
      '<form action="" class="formName">' +
      '<div class="form-group">' +
      '<label>Please Type In Your Qualifications</label>' +
      '<input type="text" placeholder="Add New Category" class="name form-control" required />' +
      '</div>' +
      '</form>',
      buttons: {
          formSubmit: {
              text: 'Submit',
              btnClass: 'btn-orange',
              action: function () {
                  var name = this.$content.find('.name').val();
  
                  $('#education').append(new Option(name, name));
                   $("#education").val(name).attr('selected', true);
  
                  if(!name){
                      $.alert('provide a valid name please');
                      return false;
                  }
                  $.alert({
        title: '<i class="yellow exclamation circle icon"></i> Please Note !',
        content: 'Your Qualifications Will First Need Approval Before They Can Be Officially Added',
    });
              }
          },
  
      }
  
  });
        }
  
      });




})(jQuery);
