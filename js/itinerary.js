var MyTinerary = MyTinerary || {};
MyTinerary.Itinerary = (function() {

  //////////////////////////////////////////////////////////////////////////////////////
  // CREATE ITINERARY
  //////////////////////////////////////////////////////////////////////////////////////

  // When Submit button pressed, capture value from Create Itinerary form field
  // Create JSON object using create method on Itinerary constructor function
  var _createItineraryHandler = function(itinerariesUrl, $itineraryNameInput, $itinerariesList) {
    var itineraryData = {
      itinerary: {
        name: $itineraryNameInput.val()
      }
    };
    // POST that value to database in itinerary table
    $.ajax({
      headers: {
        Authorization: 'Token token=' + localStorage.getItem('token')
      },
      url: itinerariesUrl,
      type: 'POST',
      dataType: 'json',
      data: itineraryData,
    })
    // Once complete, run the itineraryListHandler function to render updated list of itineraries
    .done(function(response) {
      console.log('success: POSTed new itinerary');
      itineraryList.getItineraryListHandler($itinerariesList);
      $itineraryNameInput.val("");
      var eventsUrl = coreDomain + '/itineraries/' + response.id + '/events'
      var itineraryName = response.name
      var itineraryId = response.id
      console.log(itineraryName + itineraryId);
      $('#itinerary-header-name').html("").hide().append(_renderItineraryName(itineraryName, itineraryId)).fadeIn(2000);
      $('#itinerary-btn-container').fadeIn(1000);
      itineraryEvents.getEvents(eventsUrl, $('#itinerary-body-events'));
    })
      .fail(function() {
        console.log("error");
        alert('Apologies, but it looks like something went wrong. Please reload page and try again.');
      });
  };

  ///////////////////////////////////////////////////////////////////////////////////
  // DISPLAY ITINERARY NAME IN MAIN VIEW
  ///////////////////////////////////////////////////////////////////////////////////

  var _renderItineraryName = function(selectedItineraryName, $selectedItineraryId) {
    var itineraryHeader = '<h2 style="font-weight: bold" data-itinerary-id=' + $selectedItineraryId + '>' + selectedItineraryName + '</h2>';
    return itineraryHeader;
  };

  //////////////////////////////////////////////////////////////////////////////////////
  // GRABBING SELECTED ITINERARY URL (For Delete and Rename Functions)
  //////////////////////////////////////////////////////////////////////////////////////
  var _getItineraryUrl = function() {
    var itineraryId = $('#itinerary-header-name').children().attr('data-itinerary-id');
    return coreDomain + '/itineraries/' + itineraryId;
  };


  ///////////////////////////////////////////////////////////////////////////////////
  // DELETE ITINERARY
  ///////////////////////////////////////////////////////////////////////////////////

  // Handler for deleting itinerary from DB
  var _deleteItineraryHandler = function($itineraryEvents, $itineraryHeader, $itinerariesList) {

    var placeholderHeader = '<h2 style="font-weight: bold; margin-bottom: 350px;">Select an Itinerary to View</h2>';

    $.ajax({
      headers: {
        Authorization: 'Token token=' + localStorage.getItem('token')
      },
      url: _getItineraryUrl(),
      type: 'DELETE',
    })
      .done(function() {
        console.log("success: deleted itinerary");
        $itineraryEvents.html("");
        $itineraryHeader.html("").hide().append(placeholderHeader).fadeIn(400);
        $('#itinerary-btn-container').fadeOut(500);
        itineraryList.getItineraryListHandler($itinerariesList);
      })
      .fail(function() {
        console.log("error");
        alert('Apologies, but it looks like something went wrong. Please reload page and try again.');
      });
  };

  ///////////////////////////////////////////////////////////////////////////////////
  // RENAME ITINERARY
  ///////////////////////////////////////////////////////////////////////////////////

  var _renameItineraryHandler = function($renameItineraryInput, $itineraryHeader, $itinerariesList) {
    var newItineraryName = $renameItineraryInput.val();
    var selectedItineraryId = $('#itinerary-header-name').children().attr('data-itinerary-id');
    $.ajax({
      headers: {
        Authorization: 'Token token=' + localStorage.getItem('token')
      },
      url: _getItineraryUrl(),
      type: 'PUT',
      dataType: 'json',
      data: {
        itinerary: {
          name: newItineraryName
        }
      },
    })
      .done(function() {
        console.log("success");
        $renameItineraryInput.val("");
        $itineraryHeader.html("").hide().append(_renderItineraryName(newItineraryName, selectedItineraryId)).fadeIn(2000);
        itineraryList.getItineraryListHandler($itinerariesList);
      })
      .fail(function() {
        console.log("error");
        alert('Apologies, but it looks like something went wrong. Please reload page and try again.');
      });
  };

  return {
    renderItineraryName: _renderItineraryName,
    renameItineraryHandler: _renameItineraryHandler,
    deleteItineraryHandler: _deleteItineraryHandler,
    getItineraryUrl: _getItineraryUrl,
    createItinerary: _createItineraryHandler
  };
})();
