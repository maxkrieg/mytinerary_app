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
        $('#itinerary-btn-container, #leftbar-create-event, #rename-itinerary-container, #login-nav-btn, #register-nav-btn').hide();
        $('#main-page, #itineraries-list-dropdown').show();
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
        first_name: $firstName.val(),
        last_name: $lastName.val(),
        email: $email.val(),
        password: $password.val()
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

  var _renderUserName = function() {

  };

  return {
    authenticateUser: _authenticateUser
  };

})();
