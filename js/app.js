
$(document).ready(function(){
  // var itinerary = MyTinerary.Itinerary

  // Hide Itinerary Edit Buttons Until an Itinerary is Selected
  $('#itinerary-btn-container').hide();

  // Hide Leftbar 1: Create Event Form
  $('#leftbar-create-event').hide();

  // Hide Rename Itinerary Form and Submit Button
  $('#rename-itinerary-container').hide();

  // Click Handler for Add Event button
  // Shows Create Event Form, Hides Itinerary List
  $('#add-event-btn').click(function(){
    $('#leftbar-itineraries-list').hide();
    $('#leftbar-create-event').show();
  });

  // Click Handlers for Submit/Cancel Event Create Buttons
  $('#event-submit-btn').click(function(){
    $('#leftbar-create-event').hide();
    $('#leftbar-itineraries-list').show();
  });

  $('#event-cancel-btn').click(function(){
    $('#leftbar-create-event').hide();
    $('#leftbar-itineraries-list').show();
  });

  // Click Handler for Rename Itinerary Button
  // Shows Rename Form
  $('#edit-name-btn').click(function(){
    $('#rename-itinerary-container').fadeIn(200);
  });

  // Click Handler for Submit Renamed Itinerary Button
  // Hides Rename Form
  $('#rename-submit-btn').click(function(){
    $('#rename-itinerary-container').fadeOut(400);
  });

});
