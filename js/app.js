// Setting Global Variable for Handler Accessibility
var itineraryList = MyTinerary.ItineraryList;
var itinerary = MyTinerary.Itinerary;
var itineraryEvents = MyTinerary.ItineraryEvents;
var userLogin = MyTinerary.Login;

// Document ready
$(document).ready(function() {

  $('#main-page, #itineraries-list-dropdown').hide();

  $('#login-nav-btn').click(function() {
    $('#nav-btns').children().removeClass('active');
    $(this).addClass('active');
    $('#loginModal').addClass('show');
  });

  $('.register-btn').click(function() {
    $('#nav-btns').children().removeClass('active');
    $(this).addClass('active');
    $('#loginModal').removeClass('show');
    $('#registerModal').addClass('show');
  });

  $('#sign-in').on('click', function(e) {
    e.preventDefault();
    userLogin.authenticateUser($itinerariesList);
    $('#nav-btns').children().removeClass('active');
  });

  $('.cancel-btn, #x-btn').click(function(e) {
    e.preventDefault();
    $('#loginModal, #registerModal').removeClass('show');
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

  // Show Selected Itinerary :: Inserts Itinerary ID into Header
  $itinerariesList.on('click', $itineraryListItem, function(e) {
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
  $addEventBtn.click(function(e) {
    e.preventDefault();
    $leftbarItinerariesList.hide();
    $leftbarCreateEvent.fadeIn(500);
  });

  // Create New Itinerary
  $itinerarySubmitBtn.click(function(e) {
    e.preventDefault();
    itinerary.createItinerary(itineraryList.itinerariesUrl, $itineraryNameInput, $itinerariesList);
  });

  // Delete Itinerary
  $deleteItineraryBtn.click(function(e) {
    e.preventDefault();
    itinerary.deleteItineraryHandler($itineraryEvents, $itineraryHeader, $itinerariesList);
  });

  // Edit Itinerary Name: Reveals Form
  $renameItineraryBtn.click(function(e) {
    e.preventDefault();
    $itineraryBtns.hide();
    $renameItineraryContainer.fadeIn(500);
  });

  // Rename Itinerary SUBMIT
  $renameSubmitBtn.click(function(e) {
    e.preventDefault();
    $renameItineraryContainer.fadeOut(400);
    setTimeout(function() {
      $itineraryBtns.fadeIn(500);
    }, 500);
    itinerary.renameItineraryHandler($renameItineraryInput, $itineraryHeader, $itinerariesList);
  });

  // Rename Itinerary CANCEL
  $renameCancelBtn.click(function(e) {
    e.preventDefault();
    $renameItineraryContainer.fadeOut(400);
    setTimeout(function() {
      $itineraryBtns.fadeIn(500);
    }, 500);
  });

  // Create Event
  $eventSubmitBtn.click(function(e) {
    e.preventDefault();
    $leftbarCreateEvent.hide();
    $leftbarItinerariesList.fadeIn(700);
    itineraryEvents.createEvent($eventTitleInput, $eventDateInput, $eventStartInput, $eventEndInput, $eventLocationInput, $eventAttendeesInput, $eventDescInput, $imageInput, $itineraryEvents);
    setTimeout(function() {
      $allInputForms.val("");
    }, 100);
  });

  // Cancel Event Btn: Show itineraries-list, hide create event form
  $eventCancelBtn.click(function(e) {
    e.preventDefault();
    $leftbarCreateEvent.hide();
    $leftbarItinerariesList.fadeIn(700);
  });

  // Delete Event
  $itineraryEvents.on('click', $deleteEventBtn, function(e) {
    e.preventDefault();
    itineraryEvents.deleteEvent(event.target, $itineraryEvents);
  });

});
