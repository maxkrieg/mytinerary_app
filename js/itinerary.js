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
    return '<h2>' + selectedItineraryName + ' "data-itinerary-id=' + $selectedItineraryId + ' "</h2>';
  };

  // Click Handler for Itinerary List Item
  $itinerariesList.on('click', $itineraryListItem, function(){

    // Clear/Add Active Styling on List Item(s)
    $(this).children().removeClass('active');
    $(event.target).addClass('active');

    // Display Itinerary Editing Buttons
    $('#itinerary-btn-container').show();

    // Itinerary Title Header
      // Set variable to name of selected itinerary
      var selectedItineraryName = ($(event.target).html());

      // Clear Itinerary Main View Header
      $itineraryHeader.html("");

      // Render Itinerary Main View Header with selected Itinerary Name
      $itineraryHeader.append(renderItineraryName(selectedItineraryName, $selectedItineraryId));


    // Itinerary Events
    var $selectedItineraryId = ($(event.target).attr('data-itinerary'));
    var selectedItineraryUrl = 'http://localhost:3000/itineraries/' + $selectedItineraryId + '/events';
    $itineraryEvents.html("");
    getItineraryHandler(selectedItineraryUrl);

  });

////////////////////////////////////////////////////////////////
// USER STORY: Delete itinerary when delete button pressed
////////////////////////////////////////////////////////////////

  var deleteItineraryHandler = function(itineraryUrl){
    $.ajax({
      url: itineraryUrl,
      type: 'DESTROY',
      dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
      data: {param1: 'value1'},
    })
    .done(function() {
      console.log("success: deleted itinerary");
    })
    .fail(function() {
      console.log("error");
    });
  };

  $button.click(function(){
    deleteItineraryHandler(selectedItineraryUrl);
    getItineraryListHandler();
  });
// USER STORY: Rename itinerary when Rename button pressed
// USER STORY: Pull up Create New Event leftbar when Add Event button pressed




