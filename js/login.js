//jquery authenticate and get
$(function(){
  $('#sign-in').on('click', function(){
    $.ajax('http://localhost:3000/login',{
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
    }).done(function(data, textStatus) {
      localStorage.setItem('token', data.token);
      localStorage.getItem('token');
      console.log(localStorage['token']);
      console.log(data);
      $('#container').fadeIn(500);
    }).fail(function(jqxhr, textStatus, errorThrown){
      console.log(textStatus);
    });
  });

  // $('#get-index').on('click', function(){
  //   $.ajax('http://localhost:3000',{
  //     dataType: "json",
  //     method: "GET",
  //     headers: { Authorization: 'Token token=' + localStorage.getItem('token') }
  //     // headers: { Authorization: 'Token token=' + $("#token").val() }
  //   }).done(function(data, textStatus) {
  //     $('#result').val(JSON.stringify(data));
  //     console.log(data);
  //   }).fail(function(jqxhr, textStatus, errorThrown){
  //     console.log(textStatus);
  //   });
  // });

  // $('#get-by-id').on('click', function(){
  //   $.ajax('http://localhost:3000/hello/' +
  //     $('#id').val(), {
  //     dataType: "json",
  //     method: "GET",
  //     headers: { Authorization: 'Token token=' + $("#token").val() }
  //   }).done(function(data, textStatus) {
  //     $('#result').val(JSON.stringify(data));
  //     console.log(data);
  //   }).fail(function(jqxhr, textStatus, errorThrown){
  //     console.log(textStatus);
  //   });
  // });

});
