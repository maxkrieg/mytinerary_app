

$('#leftbar-create-event').hide();

$('#add-event-btn').click(function(){
  $('#leftbar-itineraries-list').hide();
  $('#leftbar-create-event').show();

});

$('#submit-btn').click(function(){
  $('#leftbar-create-event').hide();
  $('#leftbar-itineraries-list').show();
});

