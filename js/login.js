var MyTinerary = MyTinerary || {};

MyTinerary.Login = (function() {

  var _authenticateUser = function($itinerariesList) {
    $.ajax(coreDomain + '/login', {
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        credentials: {
          email: $('#email').val(),
          password: $('#password').val()
        }
      }),
      dataType: "json",
      method: "POST"
    })
      .done(function(data, textStatus) {
        localStorage.setItem('token', data.token);
        localStorage.getItem('token');
        $('#loginModal').removeClass('show');
        itineraryList.getItineraryListHandler($itinerariesList);
        $('#itinerary-btn-container, #leftbar-create-event, #rename-itinerary-container, #login-nav-btn, .register-btn, #home-page-elements').hide();
        $('#main-page, #itineraries-list-dropdown, #leftbar-itineraries-list').show();
        $('.jumbotron').addClass('shrink');
      })
      .fail(function(jqxhr, textStatus, errorThrown) {
        console.log(textStatus);
        alert('Please check your email and password and try again.');
      });
  };

  var _createUserHandler = function() {
    var registerUrl = coreDomain + '/register';
    var newUser = {
      user: {
        first_name: $('#first-name').val(),
        last_name: $('#last-name').val(),
        email: $('#register-email').val(),
        password: $('#register-password').val()
      }
    };

    $.ajax({
      url: registerUrl,
      type: 'POST',
      dataType: 'json',
      data: newUser,
    })
      .done(function() {
        console.log("success: Create new user.");
      })
      .fail(function() {
        console.log("error creating new user");
      });
  };

  return {
    authenticateUser: _authenticateUser,
    createUser: _createUserHandler
  };

})();
