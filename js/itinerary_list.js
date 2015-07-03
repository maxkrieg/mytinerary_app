var coreDomain = 'https://afternoon-shore-8644.herokuapp.com/';

var MyTinerary = MyTinerary || {};
MyTinerary.ItineraryList = (function() {
  //////////////////////////////////////////////////////////////////////////////////////
  // USER STORY : Display list of user's itineraries in leftbar
  //////////////////////////////////////////////////////////////////////////////////////

  // Set DOM element and resource to variables
  var _allItinerariesUrl = coreDomain + '/itineraries';

  // Function to format itinerary names correctly (from JSON)
  var renderItineraryList = function(response) {
    var itineraryTitles = "";
    response.forEach(function(itinerary) {
      itineraryTitles += '<li><a href="#" id="itinerary-item" class="itinerary-li" data-itinerary="' + itinerary.id + '">' + itinerary.name + '</a></li>';
    });
    return itineraryTitles;
  };

  // Handler function for GETTING itinerary names from database
  var _getItineraryListHandler = function($itinerariesList) {
    $itinerariesList.html("");
    $.ajax({
      headers: {
        Authorization: 'Token token=' + localStorage.getItem('token')
      },
      url: _allItinerariesUrl,
      type: 'GET',
    })
      .done(function(response) {
        console.log('success: got all Itinerary Names for Leftbar');
        var itineraryList = renderItineraryList(response);
        $itinerariesList.html("").append(itineraryList);
      })
      .fail(function() {
        console.log("error getting Itinerary names");
        alert('Apologies, but it looks like something went wrong. Please reload page and try again.');
      });
  };

  return {
    getItineraryListHandler: _getItineraryListHandler,
    itinerariesUrl: _allItinerariesUrl
  };
})();
