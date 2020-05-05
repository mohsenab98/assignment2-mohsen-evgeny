//dataBase - default value 
var database = [
	{
	username : "p",
	password : "p"
	}
];



//nav bar functions
  $(document).ready(function() {
      
    $('#homeLink').click(function() {
        $(".page").css("visibility","hidden");
        $(".homepage").css("visibility","visible");
    });

    $('#registerLink').click(function() {
        $(".page").css("visibility","hidden");
        $(".homepage").css("visibility","hidden");
        $(".b").css("visibility","visible");
        $(".b").css("position","absolute");

    });

    $('#loginLink').click(function() {
        $(".page").css("visibility","hidden");
        $(".homepage").css("visibility","hidden");
        $(".c").css("visibility","visible");
        $(".c").css("position","absolute");

    });

    $('#aboutLink').click(function() {
        $(".page").css("visibility","hidden");
        $(".homepage").css("visibility","visible");
        $(".d").css("visibility","visible");    
        // $(".d").css("position","absolute");
    });

   
});

// button functions
function regPageFunction() {
    document.getElementById('registerLink').click();
};

function logPageFunction() {
    document.getElementById('loginLink').click();
};

function homePageFunction() {
    document.getElementById('homeLink').click();
};


// --------------------------------------------------------- REGISTER -------------------------------------------------

function registration(){
    document.querySelector('#regForm').onsubmit = function(event) {
        
        event.preventDefault(); // prevent submission of the form’s data

        let isValidForm = true;
        let userName = $('#UserName').val();
        let password = $('#Password').val();
        let fullName = $('#FullName').val();
        let email = $('#Email').val();
        let birthDate = $('#BirthDate').val();
        
        $(".error").remove(); // ensures the form will not have the previous error messages
        
        // user name
        if (userName.length < 1) {
            $('#UserName').after('<span class="error">This field can not be empty</span>');
            isValidForm = false;
        }
        // password
        if (password.length < 6) {
          $('#Password').after('<span class="error">It must be at least 6 chars</span>');
          isValidForm = false;
        }
        else{ 
            let regexNum = /[0-9]/;
            let regexLetter = /[A-Za-z]/;
            if (!regexNum.test(password) || !regexLetter.test(password)) {
                $('#Password').after('<span class="error">Must include letters and numbers together</span>');
                isValidForm = false;
            }
        }
        // full name
        if (fullName.length < 1) {
            $('#FullName').after('<span class="error">This field can not be empty</span>');
            isValidForm = false;
        }
        else{
            let regexNum = /[0-9]/;
            if (regexNum.test(fullName)) {
                $('#FullName').after('<span class="error">Full name can not contain a number</span>');
                isValidForm = false;
            }
        }
        // e-mail
        if (email.length < 1) {
          $('#Email').after('<span class="error">This field can not be empty</span>');
          isValidForm = false;
          isValidForm = false;
        } 
        else {
          let regex = /^.+@.+\..+$/;
          let validEmail = regex.test(email);
          if (!validEmail) {
            $('#Email').after('<span class="error">Enter a valid email</span>');
            isValidForm = false;
          }
        }
        if (birthDate.length < 1) {
          $('#BirthDate').after('<span class="error">This field can not be empty</span>');
          isValidForm = false;
        }

            
        if(isValidForm){
            database.push({
                username: userName,
                password: password
            });

            // redirect to home page (TODO: change to game page)
            homePageFunction();
        }  
    };
}


// --------------------------------------------------------- SIGN_IN-------------------------------------------------
function signIn(){
    document.querySelector('#loginForm').onsubmit = function(event) {
        event.preventDefault(); // prevent submission of the form’s data

        let userName = document.getElementById("loginForm").elements[0].value;
        let password =  document.getElementById("loginForm").elements[1].value;
        let isName = false;
        let isPassword = false;

        $(".error").remove(); // ensures the form will not have the previous error messages
        
        for(let i = 0; i < database.length; i++){
            if(userName === database[i].username ){
                isName = true;
                if(password === database[i].password){
                    isPassword = true;
                    document.getElementById("playerName").innerHTML = database[i].username;
                }
            }
        }

        if(!isName){
            alert("ERROR: Invalid login name");
            $('#un').after('<span class="error">Invalid login name</span>');
        }

        else if(!isPassword){
            alert("ERROR: Invalid password");
            $('#us').after('<span class="error">Invalid password</span>');
        }
        else{
            $(".page").css("visibility","hidden");
            $(".homepage").css("visibility","hidden");
            $(".settings").css("visibility","visible");
            // $(".settings").css("position","relative");
            // homePageFunction();
        }
    }
}

//-------------------------------------------------- Setting Page -----------------------------------------------------------
function circleFunction(input){
    var outputCircle = document.getElementById("rangeCircle");
    outputCircle.innerHTML = input.value;
};

function monsterFunction(input){
    var outputMonster = document.getElementById("rangeMonster");
    outputMonster.innerHTML = input.value;
};

// add | minus for game time
$(function() {
    $('.minus,.add').on('click', function() {
      var $gameTime = $(this).closest('p').find('.time'),
        currentVal = parseInt($gameTime.val()),
        isAdd = $(this).hasClass('add');
      !isNaN(currentVal) && $gameTime.val(
        isAdd ? ++currentVal : (currentVal > 60 ? --currentVal : currentVal)
      );
    });
  });

  // random
  function randomSettings(){
    var outputCircle = document.getElementById("rangeCircle");
    var colorSixty = document.getElementById("sixtyPercent");
    var colorThirty = document.getElementById("thirtyPercent");
    var colorTen = document.getElementById("tenPercent");
    var outputTime = document.getElementById("gameTime");
    var outputMonster = document.getElementById("rangeMonster");

    outputCircle.innerHTML = 60 + Math.floor(Math.random() * 31);
    outputMonster.innerHTML = 1 + Math.floor(Math.random() * 4);
    outputTime.value = 60 + Math.floor(Math.random() * 100); // check for max integer?
    colorSixty.value = getRandomColor();
    colorThirty.value = getRandomColor();
    colorTen.value = getRandomColor();
  };

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  function startGame(){
    $(".page").css("visibility","hidden");
    $(".homepage").css("visibility","hidden");
    $(".game").css("visibility","visible");
    $(".game").css("position","absolute");
    document.getElementById("song").play(); 
    document.getElementsByClassName("balls")[1].innerHTML = document.getElementsByClassName("balls")[0].innerHTML;
    document.getElementsByClassName("time")[1].innerHTML = document.getElementsByClassName("time")[0].value;
    document.getElementsByClassName("monsters")[1].innerHTML = document.getElementsByClassName("monsters")[0].innerHTML;
    document.getElementsByClassName("sixty")[1].value = document.getElementsByClassName("sixty")[0].value;
    document.getElementsByClassName("thirty")[1].value = document.getElementsByClassName("thirty")[0].value;
    document.getElementsByClassName("ten")[1].value = document.getElementsByClassName("ten")[0].value;
};