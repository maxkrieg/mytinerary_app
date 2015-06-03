
//////////////////////////////////////////////////////////////////////////////////////
// USER STORY : Display list of user's itineraries in leftbar
//////////////////////////////////////////////////////////////////////////////////////

  // Set DOM element and resource to variables
  var itinerariesUrl = 'http://localhost:3000/itineraries';
  var $itinerariesList = $('#itinerary-list');

  // Function to format itinerary names correctly (from JSON)
  var renderItineraryList = function(response){
    var itineraryTitles = "";
    response.forEach(function(itinerary){
    itineraryTitles += '<a href="#" class="list-group-item itinerary-li" data-itinerary="' + itinerary.id + '">' + itinerary.name + '</a>';
    });
    return itineraryTitles;
  };

  // Handler function for GETTING itinerary names from database
  var getItineraryListHandler = function() {
      // clear all itineraries in list
      $itinerariesList.html("");

      // make ajax GET request
      $.ajax({
        url: itinerariesUrl,
        type: 'GET',
      })
      .done(function(response) {
        console.log('success: got all Itinerary Names for Leftbar');
        // Render itinerary names in list in leftbar
        var itineraryList = renderItineraryList(response);
        $itinerariesList.append(itineraryList);
      })
      .fail(function() {
        console.log("error");
      });


  };

  getItineraryListHandler();





