// var MyTinerary = MyTinerary || {};
// MyTinerary.Itinerary = (function(){})();

//////////////////////////////////////////////////////////////////////////////////////
// USER STORY: Create new itinerary and add to itineraries list on front-end
//////////////////////////////////////////////////////////////////////////////////////

  // Set DOM elements to internal variables for recurring use
  var $itineraryNameInput = $('#itinerary-name');
  var $itinerarySubmitBtn = $('#itinerary-create-btn');

  /// constructor function for an itinerary
  var Itinerary = function (name){
    this.name = name;
  };

  // When Submit button pressed, capture value from Create Itinerary form field
  // Create JSON object using create method on Itinerary constructor function
  Itinerary.create = function(){
    var itineraryData = {itinerary: {
      name: $itineraryNameInput.val()
    }};
    // POST that value to database in itinerary table
    $.ajax({
      url: itinerariesUrl,
      type: 'POST',
      dataType: 'json',
      data: itineraryData,
    })
    // Once complete, run the itineraryListHandler function to render updated list of itineraries
    .done(function() {
      console.log('success: POSTed new itinerary')
      getItineraryListHandler();
      $itineraryNameInput.val("");
    })
    .fail(function() {
      console.log("error");
    });
  };

  // Click handler for submit button
  $itinerarySubmitBtn.click(function(e){
    e.preventDefault();
    Itinerary.create();
  });


///////////////////////////////////////////////////////////////////////////////////
// USER STORY: Display selected itinerary (from leftbar) in main itinerary view
///////////////////////////////////////////////////////////////////////////////////

  // Setting DOM elements to variables
  var $itineraryListItem = $('.itinerary-li');
  var $itineraryHeader = $('#itinerary-header-name');


  var renderItineraryName = function (selectedItineraryName, $selectedItineraryId) {
    var itineraryHeader = '<h2 data-itinerary-id=' + $selectedItineraryId + '>' + selectedItineraryName + '</h2>';
    return itineraryHeader;
  };

  // Click Handler for Itinerary List Item
  $itinerariesList.on('click', $itineraryListItem, function(){

    // Clear/Add Active Styling on List Item(s)
    $(this).children().removeClass('active');
    $(event.target).addClass('active');

    // Display Itinerary Editing Buttons
    $('#itinerary-btn-container').show();

    // ITINERARY TITLE //
      // Set variable to name of selected itinerary
      var selectedItineraryName = ($(event.target).html());

      // Clear Itinerary Main View Header
      $itineraryHeader.html("");

    // ITINERARY EVENTS //
      // Grab the ID value of selected Itinerary
      var $selectedItineraryId = ($(event.target).attr('data-itinerary'));

      // Render Itinerary Main View Header with selected Itinerary Name
      $itineraryHeader.hide().append(renderItineraryName(selectedItineraryName, $selectedItineraryId)).fadeIn(500);

      // Insert that ID into the URL
      var initialItineraryUrl = 'http://localhost:3000/itineraries/' + $selectedItineraryId + '/events';
      // Clear the div element
      $itineraryEvents.html("");

      ////// Insert events: Jumps to Event file to GET and Render Events
      getEventsHandler(initialItineraryUrl);
  });


//////////////////////////////////////////////////////////////////////////////////////
  var getItineraryUrl = function() {
    var itineraryId = $('#itinerary-header-name').children().attr('data-itinerary-id');
    return 'http://localhost:3000/itineraries/' + itineraryId;
  }
//////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////
// USER STORY: Delete itinerary when delete button pressed
///////////////////////////////////////////////////////////////////////////////////
  var $deleteItineraryBtn = $('#delete-itinerary-btn');

  // var itineraryId = $('#itinerary-header-name').children().attr('data-itinerary-id');
  // var selectedItineraryUrl = 'http://localhost:3000/itineraries/' + itineraryId + '/events';

  // Handler for deleting itinerary from DB
  var deleteItineraryHandler = function(){
    var $itineraryEvents = $('#itinerary-body-events');
    var placeholderHeader = '<h2>Select an Itinerary from Left to View</h2>';

    $.ajax({
      url: getItineraryUrl(),
      type: 'DELETE',
    })
    .done(function() {
      console.log("success: deleted itinerary");
      $itineraryEvents.html("");
      $itineraryHeader.html("").hide().append(placeholderHeader).fadeIn(400);
      getItineraryListHandler();
    })
    .fail(function() {
      console.log("error");
    });
  };


  $deleteItineraryBtn.click(function(e){
    e.preventDefault();
    deleteItineraryHandler();
  });

///////////////////////////////////////////////////////////////////////////////////
// USER STORY: Rename itinerary when Rename button pressed
///////////////////////////////////////////////////////////////////////////////////
  var $renameItineraryInput = $('#rename-itinerary-input');
  var $renameSubmitBtn = $('#rename-submit-btn');

  var renameItineraryHandler = function(){
    var newItineraryName = $renameItineraryInput.val();
    var selectedItineraryId = $('#itinerary-header-name').children().attr('data-itinerary-id');
    $.ajax({
      url: getItineraryUrl(),
      type: 'PUT',
      dataType: 'json',
      data: {itinerary: {name: newItineraryName}},
    })
    .done(function() {
      console.log("success");
      $renameItineraryInput.val("");
      $itineraryHeader.html("").append(renderItineraryName(newItineraryName, selectedItineraryId));
      getItineraryListHandler();
    })
    .fail(function() {
      console.log("error");
    });
  }

  $renameSubmitBtn.click(function(e){
    e.preventDefault();
    renameItineraryHandler();
  });












