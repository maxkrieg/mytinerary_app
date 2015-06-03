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

    // Itinerary Title Header
      // Set variable to name of selected itinerary
      var selectedItineraryName = ($(event.target).html());

      // Clear Itinerary Main View Header
      $itineraryHeader.html("");

    // Getting and Rendering Events: Jumps into event file

    // Grab the ID value of selected Itinerary
    var $selectedItineraryId = ($(event.target).attr('data-itinerary'));

    // Render Itinerary Main View Header with selected Itinerary Name
    $itineraryHeader.append(renderItineraryName(selectedItineraryName, $selectedItineraryId));

    console.log($selectedItineraryId);
    // Insert that ID into the URL
    var selectedItineraryUrl = 'http://localhost:3000/itineraries/' + $selectedItineraryId + '/events';
    // Clear the div element
    $itineraryEvents.html("");
    // Insert events: Jump to Event file to render events
    getEventsHandler(selectedItineraryUrl);

  });

// USER STORY: Delete itinerary when delete button pressed
// USER STORY: Rename itinerary when Rename button pressed
// USER STORY: Pull up Create New Event leftbar when Add Event button pressed




