//$(document).ready(function() {
    $('#datepicker').datepicker({
        format: 'mm/dd/yyyy',
        startDate: '+1d',
        endDate: '+14d'
    });
  /*  $('#datepicker').datepicker().on('changeDate', function (ev) {
        $('#datepicker').val(ev.date)
        console.log('Input changed');
      });*/
//});