
// Setting Global Variable for Handler Accessibility
var itineraryList = MyTinerary.ItineraryList;
var itinerary = MyTinerary.Itinerary;
var itineraryEvents = MyTinerary.ItineraryEvents;


$(document).ready(function(){
  $('#main-page').hide();

  $(function(){
    $('#sign-in').on('click', function(e){
      e.preventDefault();
      $.ajax('http://localhost:3000/login',{
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({
          credentials: {
            email: $('#email').val(),
            password: $('#password').val()
          }
        }),
        dataType: "json",
        method: "POST"
      }).done(function(data, textStatus) {
        localStorage.setItem('token', data.token);
        localStorage.getItem('token');
        $('#loginModal').removeClass('show');
        // Render Itinerary List on Page Load
        itineraryList.getItineraryListHandler($itinerariesList);
        $('#itinerary-btn-container').hide();
        $('#leftbar-create-event').hide();
        $('#rename-itinerary-container').hide();
        $('#main-page').show();
      }).fail(function(jqxhr, textStatus, errorThrown){
        console.log(textStatus);
      });
    });
  });

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
    e.preventDefault();
    $('#itinerary-btns').hide();
    $('#rename-itinerary-container').fadeIn(500);
  });

  // Hide Rename Itinerary Form, Show Other Buttons
  $('#rename-submit-btn, #cancel-rename-btn').click(function(e){
    e.preventDefault();
    $('#rename-itinerary-container').fadeOut(400);
    setTimeout(function(){
      $('#itinerary-btns').fadeIn(500);
    }, 500);
  });

  var $itinerariesList = $('#itinerary-list');
  var $itineraryListItem = $('.itinerary-li');
  var $itineraryHeader = $('#itinerary-header-name');
  var $itineraryEvents = $('#itinerary-body-events');
  var $itineraryNameInput = $('#itinerary-name');
  var $itinerarySubmitBtn = $('#itinerary-create-btn');
  var $deleteItineraryBtn = $('#delete-itinerary-btn');
  var $renameItineraryInput = $('#rename-itinerary-input');
  var $renameSubmitBtn = $('#rename-submit-btn');
  var $eventTitleInput = $('#event-title');
  var $eventDateInput = $('#event-date');
  var $eventStartInput = $('#start-time');
  var $eventEndInput = $('#end-time');
  var $eventLocationInput = $('#location');
  var $eventAttendeesInput = $('#attendees');
  var $eventDescInput = $('#desc');
  var $imageInput = $('#upload-image');
  var $eventSubmitBtn = $('#event-submit-btn');
  var $allInputForms = $('.create-event-input');
  var $deleteEventBtn = $('.delete-event-btn');



  // Show Select Itinerary :: Inserts Itinerary ID into Header
  $itinerariesList.on('click', $itineraryListItem, function(){
    // Clear/Add Active Styling on List Item(s)
      $(this).children().removeClass('active');
      $(event.target).addClass('active');
    // Display Itinerary Editing Buttons
      $('#itinerary-btn-container').show();
    // Get Itinerary ID for Header & Render Header
      var selectedItineraryName = ($(event.target).html());
      var $selectedItineraryId = ($(event.target).attr('data-itinerary'));
      $itineraryHeader.html("").hide().append(itinerary.renderItineraryName(selectedItineraryName, $selectedItineraryId)).fadeIn(500);
      var setItineraryUrl = 'http://localhost:3000/itineraries/' + $selectedItineraryId + '/events';
      $itineraryEvents.html("");

      // Call function to render Events
      itineraryEvents.getEvents(setItineraryUrl, $itineraryEvents);
  });

  // Create New Itinerary
  $itinerarySubmitBtn.click(function(e){
    e.preventDefault();
    itinerary.createItinerary(itineraryList.itinerariesUrl,$itineraryNameInput);
    itineraryList.getItineraryListHandler($itinerariesList);
  });

  // Delete Itinerary
  $deleteItineraryBtn.click(function(e){
    e.preventDefault();
    itinerary.deleteItineraryHandler($itineraryEvents, $itineraryHeader);
    setTimeout(function(){itineraryList.getItineraryListHandler($itinerariesList);}, 500);
  });

  // Rename Itinerary
  $renameSubmitBtn.click(function(e){
    e.preventDefault();
    itinerary.renameItineraryHandler($renameItineraryInput, $itineraryHeader);
    setTimeout(function(){itineraryList.getItineraryListHandler($itinerariesList);}, 500);
  });

  // Submit New Event
  $eventSubmitBtn.click(function(e){
    e.preventDefault();
    itineraryEvents.createEvent($eventTitleInput,$eventDateInput,$eventStartInput,$eventEndInput,$eventLocationInput,$eventAttendeesInput,$eventDescInput, $imageInput);
    itineraryEvents.getEvents(itineraryEvents.getEventsUrl(),$itineraryEvents);
    setTimeout(function(){$allInputForms.val("");}, 1000);
  });

  // Delete Event
  $itineraryEvents.on('click', $deleteEventBtn, function(e){
    e.preventDefault();
    itineraryEvents.deleteEvent(event.target);
    setTimeout(function(){itineraryEvents.getEvents(itineraryEvents.getEventsUrl(),$itineraryEvents);}, 100);
  });
});
