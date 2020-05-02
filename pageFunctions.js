
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
        $(".homepage").css("visibility","hidden");
        $(".d").css("visibility","visible");
        $(".d").css("position","absolute");
    });

/* ------------ Check submit register ------------ */
    $('#regForm').submit(function(event) {
        event.preventDefault(); // prevent submission of the form’s data

        let userName = $('#UserName').val();
        let password = $('#Password').val();
        let fullName = $('#FullName').val();
        let email = $('#Email').val();
        let birthDate = $('#BirthDate').val();
    
        $(".error").remove(); // ensures the form will not have the previous error messages
        
        // user name
        if (userName.length < 1) {
            $('#UserName').after('<span class="error">This field can not be empty</span>');
        }
        // password
        if (password.length < 6) {
          $('#Password').after('<span class="error">It must be at least 6 chars</span>');
        }
        else{ 
            let regexNum = /[0-9]/;
            let regexLetter = /[A-Za-z]/;
            if (!regexNum.test(password) || !regexLetter.test(password)) {
                $('#Password').after('<span class="error">Must include letters and numbers together</span>');
            }
        }
        // full name
        if (fullName.length < 1) {
            $('#FullName').after('<span class="error">This field can not be empty</span>');
        }
        else{
            let regexNum = /[0-9]/;
            if (regexNum.test(fullName)) {
                $('#FullName').after('<span class="error">Full name can not contain a number</span>');
            }
        }
        // e-mail
        if (email.length < 1) {
          $('#Email').after('<span class="error">This field can not be empty</span>');
        } 
        else {
          let regex = /^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/;
          let validEmail = regex.test(email);
          if (!validEmail) {
            $('#Email').after('<span class="error">Enter a valid email</span>');
          }
        }
        if (birthDate.length < 1) {
          $('#BirthDate').after('<span class="error">This field can not be empty</span>');
        }
        
      });


});

// button functions
function regPageFunction() {
    document.getElementById('registerLink').click();
};

function logPageFunction() {
    document.getElementById('loginLink').click();
};





//dataBase - default value 
var database = [
	{
	username : "p",
	password : "p"
	}
];



function signIn(){
    var userName = document.getElementById("loginForm").elements[0].value;
    var password =  document.getElementById("loginForm").elements[1].value;
	if(userName === database[0].username &&
		password === database[0].password){
		alert("SUCCESS");
	}else{
		alert("ERROR");
	}
}

function register(){

}