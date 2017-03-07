$.support.cors = true

$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
  options.crossDomain ={
    crossDomain: true
  };
  options.xhrFields = {
    withCredentials: true
  };
});

function pushUserInfo(urlEnd) {
    var body = {};
    var name = document.getElementById('user');
    var password = document.getElementById('password');
    var cookie;

    body.name = name.value;
    body.password = password.value;

    $.ajax({

        type: 'POST',
        url: `http://lit-lowlands-87980.herokuapp.com/api/${urlEnd}`,
        //url: `http://localhost:3000/api/${urlEnd}`,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(body),
        success: function(data){
          if(data.success == 1){
            if(data.userToken){
              document.cookie = 'jwt' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
              var now = new Date();
              var time = now.getTime();
              var expireTime = time + 1000*36000; //10 hours
              now.setTime(expireTime);
              cookie = data.userToken;
              document.cookie = `jwt=${cookie};expires=${now.toGMTString()}`;
              document.getElementById("log-in").innerHTML = `Hello, ${name.value}`;
              $("#logout").show();
              $("#createUser").hide();
              $("#login").hide();
              $("#loginInput").hide();
              } else {
                alert(`Created account '${name.value}'`)
              }
          }
          else if(data.success == 0) {
              alert('invalid username/password')
          }
          else{

            alert(`User '${JSON.stringify(data.name)}' Already Exists`)
          }

        },
        failure: function(jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseText || textStatus);
    }
    });
}


function loginUser(urlEnd) {
    var body = {};
    var cookie;

    $.ajax({
        type: 'GET',
        url: `http://lit-lowlands-87980.herokuapp.com/api/${urlEnd}`,
        //url: `http://localhost:3000/api/${urlEnd}`,
        dataType: 'json',
        headers: {"x-access-token": getCookie("jwt")},
        contentType: 'application/json',
        data: JSON.stringify(body),
        success: function(data){

          if(data.success == 1){
            if(data.userToken){
              var now = new Date();
              var time = now.getTime();
              var expireTime = time + 1000*36000; //10 hours
              now.setTime(expireTime);
              cookie = data.userToken;
              document.cookie = `jwt=${cookie};expires=${now.toGMTString()}`;
              document.getElementById("log-in").innerHTML = `Hello, ${data.userName}`;
              $("#logout").show();
              $("#createUser").hide();
              $("#login").hide();
              $("#loginInput").hide();
            }
        }
      },
        failure: function(jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseText || textStatus);
    }
    });
}

function logoutUser(urlEnd) {
  document.cookie = 'jwt' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  location.reload();
}


function pullUserInfo(urlEnd) {
    var body = {};
    var name = document.getElementById('user');
    var password = document.getElementById('password');



    body.name = name.value;
    body.password = password.value;
    console.log('Name', name.value);
    console.log('Password', password.value);
    console.log('Body Name', body.name);
    console.log('Body password', body.password);


    alert(JSON.stringify(body));
    $.ajax({
        type: 'POST',
        url: `http://lit-lowlands-87980.herokuapp.com/api/${urlEnd}`,
        //url: `http://localhost:3000/api/${urlEnd}`,
        crossDomain: true,
        contentType: 'application/json',
        data: JSON.stringify(body),
        success: (res) => {
          //console.log('HERES IS WHAT YOU GET BACK');
          alert(JSON.stringify(res)); //TODO: add stuff here
        }
      }).error(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText || textStatus);
    });
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
