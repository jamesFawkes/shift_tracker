function add_job() {
   if($('#job_title').val() === '' || $('#job_wage').val() === '0' || $('#job_start_date').val() === ''){
        $('.input_missing').show().focus();
   }
   
   else {
        $('.input_missing').hide();
        localStorage.job_title = $("#job_title").val();
        localStorage.job_wage = $("#job_wage").val();
        localStorage.job_start_date = $("#job_start_date").val();
        localStorage.shift = JSON.stringify([]);
        localStorage.hours_worked = 0;
     
        $('#job_button').show();
        $('.job_id').text(localStorage.job_title).button('refresh');
        
    }
}

function add_shift() { 
   var hours = 0;
   var calc_length = JSON.parse(localStorage.getItem('shift'));
   var length = calc_length.length;
   if($('#shift_date').val() === '' || $('#shift_start_time').val() === '' || $('#shift_end_time').val() === '' || $('#shift_location').val() === ''){
        $('.input_missing').show().focus();
   } 
   else {
       $('.input_missing').hide();
       
       $('input.time').timepicker({ 'timeFormat': 'H:i' });
       hours = $('#shift_end_time').timepicker('getSecondsFromMidnight') - $('#shift_start_time').timepicker('getSecondsFromMidnight');
        
       if (hours < 0) {
           hours += 86400;
       }

       hours = Math.round((hours / 3600)*100)/100;
       
       var temp_hours = parseFloat(localStorage.getItem('hours_worked'),10);
       var temp_hours1 = temp_hours + hours;
       localStorage.setItem('hours_worked', temp_hours1);  
       
       
       var shift = {'shift_location':$('#shift_location').val(), 'shift_date':$('#shift_date').val(), 'start_time':$('#shift_start_time').val(), 'end_time':$('#shift_end_time').val(), 'duration':hours};
       var shift_list = JSON.parse(localStorage.shift);
       shift_list.push(shift);
       localStorage.shift = JSON.stringify(shift_list);
       
       var shift_pay = hours * parseFloat(localStorage.getItem('job_wage'),10);
       shift_pay = Math.round((shift_pay)*100)/100;

       $('#shifts_to_complete').append('<div id="'+ length +'" class="current_shift" data-role="fieldcontain"></div>');
       
       var result = JSON.parse(localStorage.getItem('shift'));
       var obj = result.pop();
       
       $('#'+ length +'').html('Location: ' + obj.shift_location + '<br>Date: ' + obj.shift_date + '<br>Shift Starts: ' + obj.start_time + '<br>Shift Ends: ' + obj.end_time + '<br>Hours Worked: ' + obj.duration + '<br>Pay for Shift: &pound' + shift_pay + '<br><button class="shift_button ui-btn ui-shadow ui-btn-corner-all ui-btn-up-b" id="btn_'+ length +'">Completed?</button>');
      
       var total_pay = parseFloat(localStorage.getItem('job_wage'),10) * parseFloat(localStorage.getItem('hours_worked'),10);
       total_pay = Math.round((total_pay)*100)/100;
       localStorage.setItem('total_wage', total_pay);
       $('#total_pay').html("Money Earnt So Far:<br>&pound" + localStorage.total_wage);
       
       temp_hours1 = Math.round((temp_hours1)*100)/100;
       $('#total_hours').html("Hours Worked So Far:<br>" + temp_hours1);
   }
   
}

$(document).on('click','.shift_button',function(e) { 
    e.preventDefault(); 
    $(this).parent().remove(); 
});

function delete_stats() {
    localStorage.setItem('hours_worked', 0);
    localStorage.setItem('total_wage', 0);
    $('#total_pay').html("Nothing Earned Yet!");
    $('#total_hours').html("No Hours Worked Yet!"); 
}

function add(){
    var num1 = parseFloat($('#num1').val());
    var check_num1 = isNaN(num1);
    var num2 = parseFloat($('#num2').val());
    var check_num2 = isNaN(num2);
    
    if(check_num1 === true || check_num2 === true) {
        $('#answer').html("Please Enter Numbers!");
    } 
    else {
        $('#answer').html(num1 + num2);
    }
}

function minus(){
    var num1 = parseFloat($('#num1').val());
    var check_num1 = isNaN(num1);
    var num2 = parseFloat($('#num2').val());
    var check_num2 = isNaN(num2);
    
    if(check_num1 === true || check_num2 === true) {
        $('#answer').html("Please Enter Numbers!");
    } 
    else {
        $('#answer').html(num1 - num2);
    }
}

function multiply(){
    var num1 = parseFloat($('#num1').val());
    var check_num1 = isNaN(num1);
    var num2 = parseFloat($('#num2').val());
    var check_num2 = isNaN(num2);
    
    if(check_num1 === true || check_num2 === true) {
        $('#answer').html("Please Enter Numbers!");
    } 
    else {
        $('#answer').html(num1 * num2);
    }
}

function divide(){
    var num1 = parseFloat($('#num1').val());
    var check_num1 = isNaN(num1);
    var num2 = parseFloat($('#num2').val());
    var check_num2 = isNaN(num2);
    
    if(check_num1 === true || check_num2 === true) {
        $('#answer').html("Please Enter Numbers!");
    } 
    else {
        $('#answer').html(num1 / num2);
    }
}

function setup() {
    if($('#job_button').val() === ""){
       $('#job_button').hide();
    }
    $('#job_submit').click(add_job);
    $('#shift_submit').click(add_shift);
    $('.input_missing').hide();
    $('#reset_stats').click(delete_stats);
    $('#add').click(add);
    $('#minus').click(minus);
    $('#multiply').click(multiply);
    $('#divide').click(divide);
   
    $(document).off('pageinit', setup);
}

$(document).on('pageinit', setup);

