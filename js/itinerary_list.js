var MyTinerary = MyTinerary || {};
MyTinerary.ItineraryList = (function(){
  //////////////////////////////////////////////////////////////////////////////////////
  // USER STORY : Display list of user's itineraries in leftbar
  //////////////////////////////////////////////////////////////////////////////////////

  // Set DOM element and resource to variables
  var _allItinerariesUrl = 'http://localhost:3000/itineraries';

  // Function to format itinerary names correctly (from JSON)
  var renderItineraryList = function(response){
    var itineraryTitles = "";
    response.forEach(function(itinerary){
    itineraryTitles += '<a href="#" class="list-group-item itinerary-li" data-itinerary="' + itinerary.id + '">' + itinerary.name + '</a>';
    });
    return itineraryTitles;
  };

  // Handler function for GETTING itinerary names from database
  var _getItineraryListHandler = function($itinerariesList) {
    $itinerariesList.html("");
    $.ajax({
      headers: { Authorization: 'Token token=' + localStorage.getItem('token') },
      url: _allItinerariesUrl,
      type: 'GET',
    })
    .done(function(response) {
      console.log('success: got all Itinerary Names for Leftbar');
      var itineraryList = renderItineraryList(response);
      $itinerariesList.append(itineraryList);
    })
    .fail(function() {
      console.log("error getting Itinerary names");
    });
  };

  return {
    getItineraryListHandler: _getItineraryListHandler,
    itinerariesUrl: _allItinerariesUrl
  };
})();


