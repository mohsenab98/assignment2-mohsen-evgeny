
//nav bar functions
  $(document).ready(function() {
    $('#link1').click(function() {

        $(".page").css("visibility","hidden");
        $(".homepage").css("visibility","visible");
    });

    $('#link2').click(function() {
        $(".page").css("visibility","hidden");
        $(".homepage").css("visibility","hidden");
        $(".b").css("visibility","visible");
        $(".b").css("position","absolute");

    });

    $('#link3').click(function() {
        $(".page").css("visibility","hidden");
        $(".homepage").css("visibility","hidden");
        $(".c").css("visibility","visible");
        $(".c").css("position","absolute");

    });

    $('#link4').click(function() {
        $(".page").css("visibility","hidden");
        $(".homepage").css("visibility","visible");
        $(".d").css("visibility","visible");    
        // $(".d").css("position","absolute");
    });


});

// button functions
function regPageFunction() {
    document.getElementById('link2').click();
};

function logPageFunction() {
    document.getElementById('link3').click();
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

////////////////////
