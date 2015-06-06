var MyTinerary = MyTinerary || {};
MyTinerary.ItineraryEvents = (function(){

  ///////////////////////////////////////////////////////////////////////////////////
  // DISPLAY EVENTS (As requested by itinerary)
  ///////////////////////////////////////////////////////////////////////////////////

  // Function to format itinerary names correctly (from JSON)
  var _renderEvents = function(response){
    var itineraryEvents = "";
    response.forEach(function(event){
    itineraryEvents +=
      '<section class="list-group-item" data-event="' + event.id + '"><h4 class="list-group-item-heading">'+ event.title + '</h4><div class="media-left">' + event.image_tag + '</div><h5>Date: ' + event.date + '</h5><h5>Start Time: ' + event.start_time + '</h5><h5>End Time: ' + event.end_time + '</h5><h5>Location: ' + event.location + '</h5><h5>Attendees: ' + event.attendees + '</h5><p class="list-group-item-text">' + event.desc + '</p><div class="btn-group btn-group-xs" role="group" aria-label="..." id="event-btns"><button type="button" class="btn btn-default edit-event-btn" data-edit-event="' + event.id + '">Edit Event</button><button type="button" class="btn btn-default delete-event-btn" data-delete-event="' + event.id + '">Delete Event</button></div></section>';

    });
    return itineraryEvents;
  };

  // Handler Function for GETTING events from database
  var _getEventsHandler = function(selectedItineraryUrl, $itineraryEvents){
    $itineraryEvents.html("");
    $.ajax({
      headers: { Authorization: 'Token token=' + localStorage.getItem('token') },
      url: selectedItineraryUrl,
      type: 'GET',
    })
    .done(function(response) {
      console.log("success: got all events");
      var eventsList = _renderEvents(response);
      $itineraryEvents.hide().append(eventsList).fadeIn(800);
    })
    .fail(function() {
      console.log("error getting events");
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////
  // CREATE NEW EVENT (Add to selected itinerary, submit to DB)
  ///////////////////////////////////////////////////////////////////////////////////

  var _createEventHandler = function($eventTitleInput,$eventDateInput,$eventStartInput,$eventEndInput,$eventLocationInput,$eventAttendeesInput,$eventDescInput, $imageInput){
    var fd = new FormData();
    fd.append('title', $eventTitleInput.val());
    fd.append('date', $eventDateInput.val());
    fd.append('start_time', $eventStartInput.val());
    fd.append('end_time', $eventEndInput.val());
    fd.append('location', $eventLocationInput.val());
    fd.append('attendees', $eventAttendeesInput.val());
    fd.append('desc', $eventDescInput.val());
    fd.append('image', $imageInput[0].files[0]);

    var itineraryId = $('#itinerary-header-name').children().attr('data-itinerary-id');
    var selectedItineraryUrl = 'http://localhost:3000/itineraries/' + itineraryId + '/events';
    $.ajax({
      headers: { Authorization: 'Token token=' + localStorage.getItem('token') },
      url: selectedItineraryUrl,
      type: 'POST',
      processData: false,
      cache: false,
      contentType: false,
      data: fd,
    })
    .done(function() {
      console.log('success: POSTed new event');
    })
    .fail(function() {
      console.log("error POSTing new event");
    });
  };

  //////////////////////////////////////////////////////////////////////////////////////
  // GRABBING EVENT AND EVENTS URL
  //////////////////////////////////////////////////////////////////////////////////////
  var _getEventUrl = function(target) {
    var itineraryId = $('#itinerary-header-name').children().attr('data-itinerary-id');
    var eventId = $(target).attr('data-delete-event');
    return 'http://localhost:3000/itineraries/' + itineraryId + '/events/' + eventId;
  };

  var _getEventsUrl = function(target) {
    var itineraryId = $('#itinerary-header-name').children().attr('data-itinerary-id');
    return 'http://localhost:3000/itineraries/' + itineraryId + '/events';
  };

  ///////////////////////////////////////////////////////////////////////////////////
  // DELETE EVENT
  ///////////////////////////////////////////////////////////////////////////////////

  // Handler for deleting event from DB
  var _deleteEventHandler = function(target){
    var eventUrl = _getEventUrl(target);
    $.ajax({
      headers: { Authorization: 'Token token=' + localStorage.getItem('token') },
      url: eventUrl,
      type: 'DELETE',
    })
    .done(function() {
      console.log("success: deleted event");
    })
    .fail(function() {
      console.log("error deleting event");
    });
  };

  return {
    getEvents: _getEventsHandler,
    createEvent: _createEventHandler,
    getEventUrl: _getEventUrl,
    getEventsUrl: _getEventsUrl,
    deleteEvent: _deleteEventHandler
  };
})();

