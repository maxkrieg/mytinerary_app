
$(document).ready(function(){

  // Hide certains elements on page load:
  $('#itinerary-btn-container').hide();
  $('#leftbar-create-event').hide();
  $('#rename-itinerary-container').hide();

  // Shows Create Event Form, Hides Itinerary List
  $('#add-event-btn').click(function(e){
    e.preventDefault();
    $('#leftbar-itineraries-list').hide();
    $('#leftbar-create-event').fadeIn(500);
  });

  // Show itineraries-list, hide create event form
  $('#event-submit-btn, #event-cancel-btn').click(function(e){
    e.preventDefault();
    $('#leftbar-create-event').hide();
    $('#leftbar-itineraries-list').fadeIn(700);
  });

  // Show Rename Itinerary Form, Hide Other Buttons
  $('#edit-name-btn').click(function(e){
    e.preventDefault;
    $('#itinerary-btns').hide();
    $('#rename-itinerary-container').fadeIn(200);
  });

  // Hide Rename Itinerary Form, Show Other Buttons
  $('#rename-submit-btn').click(function(e){
    e.preventDefault();
    $('#rename-itinerary-container').hide();
    $('#itinerary-btns').fadeIn(400);
  });

});
