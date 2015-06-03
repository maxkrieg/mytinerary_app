// var MyTinerary = MyTinerary || {}
// MyTinerary.Event = (function(){})();

///////////////////////////////////////////////////////////////////////////////////
// USER STORY: Get events for specific itinerary and display in itinerary main view
///////////////////////////////////////////////////////////////////////////////////

  // Set Event template DOM element to variable
  var $itineraryEvents = $('#itinerary-body-events');

  // Function to format itinerary names correctly (from JSON)
  var renderItineraryEvents = function (response){
    var itineraryEvents = "";
    response.forEach(function(event){
    itineraryEvents +=
      '<a href="#" class="list-group-item" data-event="' + event.id + '"><h4 class="list-group-item-heading">'+ event.title + '</h4><div class="media-left"><img class="media-object" src="' + event.image + '" alt="..."></div><h5>Date: ' + event.date + '</h5><h5>Start Time: ' + event.start_time + '</h5><h5>End Time: ' + event.end_time + '</h5><h5>Location: ' + event.location + '</h5><h5>Attendees: ' + event.attendees + '</h5><p class="list-group-item-text">' + event.desc + '</p><div class="btn-group" role="group" aria-label="..." id="event-btns"><button type="button" class="btn btn-default" id="edit-event-btn" data-edit-event="' + event.id + '">Edit Event</button><button type="button" class="btn btn-default" id="delete-event-btn" data-delete-event="' + event.id + '">Delete Event</button></div></a>';

    });
    return itineraryEvents;
  };

  // Handler Function for GETTING events from database
  var getItineraryHandler = function(selectedEventsUrl){
    $.ajax({
      url: selectedEventsUrl,
      type: 'GET',
    })
    .done(function(response) {
      console.log("success: got all events");
      var eventsList = renderItineraryEvents(response);
      $itineraryEvents.append(eventsList);
    })
    .fail(function() {
      console.log("error");
    });
  };

///////////////////////////////////////////////////////////////////////////////////
// USER STORY: Create New Event and add to selected itinerary
///////////////////////////////////////////////////////////////////////////////////


  // Set DOM elements of input fields to internal variables for recurring use
  var $eventTitleInput = $('#event-title'),
      $eventDateInput = $('#event-date'),
      $eventStartInput = $('#start-time'),
      $eventEndInput = $('#end-time'),
      $eventLocationInput = $('#location'),
      $eventAttendeesInput = $('#attendees'),
      $eventDescInput = $('#desc'),
      $eventSubmitBtn = $('#event-submit-btn'),
      $allInputForms = $('.create-event-input');

  /// constructor function for an event
  var Event = function (title, date, start, end, location, attendees, desc){
    this.title = title;
    this.date = date;
    this.start = start;
    this.end = end;
    this.location = location;
    this.attendees = attendees;
    this.desc = desc;
  };

  // When Submit button pressed, capture value from Create Event form fields
  // Create JSON object using Create method on Event object
  Event.create = function(){
    var eventData = {event: {
      title: $eventTitleInput.val(),
      date: $eventDateInput.val(),
      start: $eventStartInput.val(),
      end: $eventEndInput.val(),
      location: $eventLocationInput.val(),
      attendees: $eventAttendeesInput.val(),
      desc: $eventDescInput.val()
    }};
    // POST that value to database in events table
    $.ajax({
      url: selectedItineraryUrl,
      type: 'POST',
      dataType: 'json',
      data: eventData,
    })
    // Once complete, run the itineraryListHandler function to render updated list of itineraries
    .done(function() {
      console.log('success: POSTed new event');
      getItineraryHandler();
      $allInputForms.val("");
    })
    .fail(function() {
      console.log("error");
    });
  };

  // Click handler for submit button
  $eventSubmitBtn.click(function(e){
    e.preventDefault();
    Event.create();
  });


