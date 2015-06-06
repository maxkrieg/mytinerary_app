var MyTinerary = MyTinerary || {};
MyTinerary.Itinerary = (function(){

  //////////////////////////////////////////////////////////////////////////////////////
  // CREATE ITINERARY
  //////////////////////////////////////////////////////////////////////////////////////

  // When Submit button pressed, capture value from Create Itinerary form field
  // Create JSON object using create method on Itinerary constructor function
  var _createItineraryHandler = function(itinerariesUrl, $itineraryNameInput){
    var itineraryData = {itinerary: {
      name: $itineraryNameInput.val()
    }};
    // POST that value to database in itinerary table
    $.ajax({
      headers: { Authorization: 'Token token=' + localStorage.getItem('token') },
      url: itinerariesUrl,
      type: 'POST',
      dataType: 'json',
      data: itineraryData,
    })
    // Once complete, run the itineraryListHandler function to render updated list of itineraries
    .done(function() {
      console.log('success: POSTed new itinerary');
      // getItineraryListHandler();
      $itineraryNameInput.val("");
    })
    .fail(function() {
      console.log("error");
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////
  // DISPLAY ITINERARY (Jumps into Events file to grab Events)
  ///////////////////////////////////////////////////////////////////////////////////

  var _renderItineraryName = function (selectedItineraryName, $selectedItineraryId) {
    var itineraryHeader = '<h2 data-itinerary-id=' + $selectedItineraryId + '>' + selectedItineraryName + '</h2>';
    return itineraryHeader;
  };

  //////////////////////////////////////////////////////////////////////////////////////
  // GRABBING SELECTED ITINERARY URL (For Delete and Rename Functions)
  //////////////////////////////////////////////////////////////////////////////////////
  var _getItineraryUrl = function() {
    var itineraryId = $('#itinerary-header-name').children().attr('data-itinerary-id');
    return 'http://localhost:3000/itineraries/' + itineraryId;
  };


  ///////////////////////////////////////////////////////////////////////////////////
  // DELETE ITINERARY
  ///////////////////////////////////////////////////////////////////////////////////

  // Handler for deleting itinerary from DB
  var _deleteItineraryHandler = function($itineraryEvents, $itineraryHeader){

    var placeholderHeader = '<h2>Select an Itinerary to View</h2>';

    $.ajax({
      headers: { Authorization: 'Token token=' + localStorage.getItem('token') },
      url: _getItineraryUrl(),
      type: 'DELETE',
    })
    .done(function() {
      console.log("success: deleted itinerary");
      $itineraryEvents.html("");
      $itineraryHeader.html("").hide().append(placeholderHeader).fadeIn(400);
    })
    .fail(function() {
      console.log("error");
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////
  // RENAME ITINERARY
  ///////////////////////////////////////////////////////////////////////////////////

  var _renameItineraryHandler = function($renameItineraryInput, $itineraryHeader){
    var newItineraryName = $renameItineraryInput.val();
    var selectedItineraryId = $('#itinerary-header-name').children().attr('data-itinerary-id');
    $.ajax({
      headers: { Authorization: 'Token token=' + localStorage.getItem('token') },
      url: _getItineraryUrl(),
      type: 'PUT',
      dataType: 'json',
      data: {itinerary: {name: newItineraryName}},
    })
    .done(function() {
      console.log("success");
      $renameItineraryInput.val("");
      $itineraryHeader.html("").hide().append(_renderItineraryName(newItineraryName, selectedItineraryId)).fadeIn(500);
    })
    .fail(function() {
      console.log("error");
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










