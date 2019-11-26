// --------------------------------------------------------------------
// Page Startup Section
// --------------------------------------------------------------------
$('#name').focus();

// --------------------------------------------------------------------
// Job Role Section
// --------------------------------------------------------------------
$('#other-title').hide();

$('#title').change(function(){
    if($(this).val() === 'other') {
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});

// --------------------------------------------------------------------
// T-Shirt Info Section
// --------------------------------------------------------------------
$('#color option').each(function(){$(this).hide()});
$("#color").val("");

$('#design').click(function(){

    if($('#design').val() === 'Select Theme'){
        $('#color option').each(function(){$(this).hide()});
        $('#empty-theme-message').show();
        $("#color").val("");
    }

    if($('#design').val() === 'js puns'){
        $('#empty-theme-message').hide();
        $('#color option').each(function(){
            if($(this).val() === 'cornflowerblue' || $(this).val() === 'darkslategrey' || $(this).val() == 'gold') {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        $("#color").val("cornflowerblue");
    }

    if($('#design').val() === 'heart js'){
        $('#empty-theme-message').hide();
        $('#color option').each(function(){
            if($(this).val() === 'tomato' || $(this).val() === 'steelblue' || $(this).val() === 'dimgrey') {
                $(this).show();
            } else {
                $(this).hide();
            }
        })
        $("#color").val("tomato");
    }
});

// --------------------------------------------------------------------
// Register for Activities Section
// --------------------------------------------------------------------
let runningTotal = 0;
$('.activities :checkbox').click(function(){
    // First, check if this is an allowed date/time
    let selDayTime = $(this).data('day-and-time');
    let selName = $(this).prop('name');
    let selChecked = $(this).prop('checked');
    $('.activities :checkbox').each(function(){
        if($(this).data('day-and-time') === selDayTime && $(this).prop('name') !== selName) {
            if(selChecked) {
                $(this).attr('disabled',true);
                $(this).parent().css('font-style','italic');
            } else {
                $(this).attr('disabled',false);
                $(this).parent().css('font-style','normal');
            }
        }
    })

    // Update our runnning total
    if($(this).prop('checked')) {
        runningTotal += $(this).data('cost');
    } else {
        runningTotal -= $(this).data('cost');
    }

    $('#running-total').html(runningTotal);
});

// --------------------------------------------------------------------
// Payment Info Section
// --------------------------------------------------------------------
$('#payment').change(function(){
    if($(this).val() === 'credit card') {
        $('#paypal').hide();
        $('#bitcoin').hide();
        $('#credit-card').show();
    } else if($(this).val() === 'paypal') {
        $('#paypal').show();
        $('#bitcoin').hide();
        $('#credit-card').hide();
    } else if($(this).val() === 'bitcoin') {
        $('#paypal').hide();
        $('#bitcoin').show();
        $('#credit-card').hide();
    }
});
$('#bitcoin').hide();
$('#paypal').hide();
$('#payment option')[0].disabled = true;

// --------------------------------------------------------------------
// Validation Section
// --------------------------------------------------------------------
$('#submit').click(function(){
    if(!validateForm()) {
        return false;
    }
});

function validateForm() {
    $('.validation').each(function(){
        $(this).hide();
    });

    let isValid = true;

    // Check the name field
    if($('#name').val() === '') {
        $('.validation.name-validation').show();
        isValid = false;
    }

    // Check the email field
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('#email').val()) === false) {
        $('.validation.email-validation').show();
        isValid = false;
    }

    // Check the activity count
    let activityCount = 0;
    $('.activities :checkbox').each(function(){
        if($(this).prop('checked')) {
            activityCount ++;
        }
    });
    if(activityCount === 0) {
        $('.validation.activity-validation').show();
        isValid = false;
    }

    // Check the name field
    if($('#payment').val() === null) {
        $('.validation.payment-validation').show();
        isValid = false;
    }

    // Check the credit card validation
    if($('#payment').val() === 'credit card'){
        // Validate the card number
        let ccNum = $('#cc-num').val();
        if(/^[\d]{13,16}$/.test(ccNum) === false){
            $('.validation.ccnum-validation').show();
            isValid = false;
        }

        // Validate the zip code
        let zipcode = $('#zip').val();
        if (/^[\d]{5}$/.test(zipcode) === false){
           $('.validation.zipcode-validation').show();
           isValid = false;
        }

        // Validate the CVV
        let cvv = $('#cvv').val();
        if (/^[\d]{3}$/.test(cvv) === false){
            $('.validation.cvv-validation').show();
            isValid = false;
        }
    }
    return isValid;
}
