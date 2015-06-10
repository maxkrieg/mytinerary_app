
// Setting Global Variable for Handler Accessibility
var itineraryList = MyTinerary.ItineraryList;
var itinerary = MyTinerary.Itinerary;
var itineraryEvents = MyTinerary.ItineraryEvents;

// Document ready
$(document).ready(function(){
  $('#main-page').hide();

  $(function(){
    $('#sign-in').on('click', function(e){
      e.preventDefault();
      $.ajax(coreDomain + '/login',{
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
        itineraryList.getItineraryListHandler($itinerariesList);
        $('#itinerary-btn-container, #leftbar-create-event, #rename-itinerary-container').hide();
        $('#main-page').show();
      }).fail(function(jqxhr, textStatus, errorThrown){
        console.log(textStatus);
        alert('Please check your email and password and try again.');
      });
    });
    $('#cancel-btn, #x-btn').click(function(e){
      e.preventDefault();
      $('#loginModal').removeClass('show');
    });
  });

  ////////////////////////////////////////////////////////////////////////////
  // NAMING DOM ELEMENTS FOR EASE OF USE
  ////////////////////////////////////////////////////////////////////////////

  // Leftbar: Itinerary List
  var $leftbarItinerariesList = $('#leftbar-itineraries-list'),
  $itinerariesList = $('#itinerary-list'),
  $itineraryListItem = $('.itinerary-li'),

  // Leftbar: Itinerary List :: Add Itinerary
  $itineraryNameInput = $('#itinerary-name'),
  $itinerarySubmitBtn = $('#itinerary-create-btn'),

  // Leftbar: Create Event
  $leftbarCreateEvent = $('#leftbar-create-event'),

  // Leftbar: Create Event :: Form Fields
  $eventTitleInput = $('#event-title'),
  $eventDateInput = $('#event-date'),
  $eventStartInput = $('#start-time'),
  $eventEndInput = $('#end-time'),
  $eventLocationInput = $('#location'),
  $eventAttendeesInput = $('#attendees'),
  $eventDescInput = $('#desc'),
  $imageInput = $('#upload-image'),
  $eventSubmitBtn = $('#event-submit-btn'),
  $eventCancelBtn = $('#event-cancel-btn'),
  $allInputForms = $('.create-event-input'),

  // Itinerary Main View
  $addEventBtn = $('#add-event-btn'),
  $itineraryHeader = $('#itinerary-header-name'),
  $itineraryEvents = $('#itinerary-body-events'),

  // Itinerary Main View :: Default Itinerary Buttons
  $itineraryBtnContainer = $('#itinerary-btn-container'),
  $itineraryBtns = $('#itinerary-btns'),
  $deleteItineraryBtn = $('#delete-itinerary-btn'),
  $renameItineraryBtn = $('#edit-name-btn'),

  // Itinerary Main View :: Rename Itinerary Buttons
  $renameItineraryContainer = $('#rename-itinerary-container'),
  $renameSubmitBtn = $('#rename-submit-btn'),
  $renameCancelBtn = $('#cancel-rename-btn'),
  $renameItineraryInput = $('#rename-itinerary-input'),

  // Itinerary Main View :: Event buttons
  $deleteEventBtn = $('.delete-event-btn');


  ////////////////////////////////////////////////////////////////////////////
  // CLICK HANDLERS
  ////////////////////////////////////////////////////////////////////////////

  // Hide certains elements on page load:
  ($itineraryBtnContainer, $leftbarCreateEvent, $renameItineraryContainer).hide();

  // Navbar dropdown
  // $('.dropdown-toggle').toggle();

  // Show Selected Itinerary :: Inserts Itinerary ID into Header
  $itinerariesList.on('click', $itineraryListItem, function(e){
    e.preventDefault();
    // Clear/Add Active Styling on List Item(s)
      $(this).children().removeClass('active');
      $(event.target).addClass('active');
    // Display Itinerary Editing Buttons
      $itineraryBtnContainer.show();
    // Get Itinerary ID for Header & Render Header
      var selectedItineraryName = ($(event.target).html());
      var $selectedItineraryId = ($(event.target).attr('data-itinerary'));
      $itineraryHeader.html("").hide().append(itinerary.renderItineraryName(selectedItineraryName, $selectedItineraryId)).fadeIn(500);
      var setItineraryUrl = coreDomain + '/itineraries/' + $selectedItineraryId + '/events';
      $itineraryEvents.html("");

      // Call function to render Events
      itineraryEvents.getEvents(setItineraryUrl, $itineraryEvents);
  });

  // Add Event Btn: Shows Create Event Form, Hides Itinerary List
  $addEventBtn.click(function(e){
    e.preventDefault();
    $leftbarItinerariesList.hide();
    $leftbarCreateEvent.fadeIn(500);
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

  // Edit Itinerary Name
  $renameItineraryBtn.click(function(e){
    e.preventDefault();
    $itineraryBtns.hide();
    $renameItineraryContainer.fadeIn(500);
  });

  // Rename Itinerary SUBMIT
  $renameSubmitBtn.click(function(e){
    e.preventDefault();
    $renameItineraryContainer.fadeOut(400);
    setTimeout(function(){$itineraryBtns.fadeIn(500);}, 500);
    itinerary.renameItineraryHandler($renameItineraryInput, $itineraryHeader);
    setTimeout(function(){itineraryList.getItineraryListHandler($itinerariesList);}, 500);
  });

  // Rename Itinerary CANCEL
  $renameCancelBtn.click(function(e){
    e.preventDefault();
    $renameItineraryContainer.fadeOut(400);
    setTimeout(function(){
      $itineraryBtns.fadeIn(500);
    }, 500);
  });

  // Create Event
  $eventSubmitBtn.click(function(e){
    e.preventDefault();
    $leftbarCreateEvent.hide();
    $leftbarItinerariesList.fadeIn(700);
    itineraryEvents.createEvent($eventTitleInput,$eventDateInput,$eventStartInput,$eventEndInput,$eventLocationInput,$eventAttendeesInput,$eventDescInput,$imageInput);
    setTimeout(function(){itineraryEvents.getEvents(itineraryEvents.getEventsUrl(),$itineraryEvents);}, 100);
    setTimeout(function(){$allInputForms.val("");}, 100);
  });

  // Cancel Event Btn: Show itineraries-list, hide create event form
  $eventCancelBtn.click(function(e){
    e.preventDefault();
    $leftbarCreateEvent.hide();
    $leftbarItinerariesList.fadeIn(700);
  });

  // Delete Event
  $itineraryEvents.on('click', $deleteEventBtn, function(e){
    e.preventDefault();
    itineraryEvents.deleteEvent(event.target);
    setTimeout(function(){itineraryEvents.getEvents(itineraryEvents.getEventsUrl(),$itineraryEvents);}, 100);
  });

});
