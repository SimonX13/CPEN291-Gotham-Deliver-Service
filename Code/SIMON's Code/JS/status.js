
window.onload = function () {


    var stages = document.getElementById("stage");
    var stageOne = document.getElementById("stageOne");
    var car = document.getElementById("audi");
    var submitBtn2 = document.getElementById("submitTwo");
    submitBtn2.addEventListener("click", function () {
        if (parseInt(stages.value)) {
            if (stages.value == 1) {
                document.getElementById('stageOne').innerText = "Stage 1: right here";
            }
            else {
                console.log("to be done");
            }
        }
        console.log(document.getElementById('subStageOne').value);

    })
    
    
    // function zz(){
    //     console.log(jsonParsedLocation)
    //     if(jsonParsedLocation==="1"){
    //         document.getElementById("bar1").style.width="10%";
    //         //console.log("wowwwwwwwwwwwwwwwwww");
    //     }
    //     else{
    //         console.log("to be done222222222222");
    //     }
    // }
    
    // zz();

    
    function xx(){
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("aa").innerHTML =
            //     this.responseText;
            var jsonParsedLocation = JSON.parse(this.responseText);
            if(jsonParsedLocation.package_delivered==0){
                // document.getElementById("bar1").style.width="20%";
                // document.getElementById("bar1").innerHTML = "20% complete";
                if(jsonParsedLocation.location==1){
                    document.getElementById("bar1").style.width="20%";
                    document.getElementById("bar1").innerHTML = "20% complete";
                    document.getElementById("td11").innerHTML = "Your delivery driver has your order";
                    document.getElementById("td13").innerHTML = "1:00";
                    document.getElementById("td12").innerHTML = jsonParsedLocation.colour;
                    console.log(jsonParsedLocation.colour);
                    
                }
                else if(jsonParsedLocation.location==2){
                    document.getElementById("bar1").style.width="40%";
                    document.getElementById("bar1").innerHTML = "40% complete";
                    document.getElementById("td11").innerHTML = "Your delivery driver is on his/her way";
                    document.getElementById("td13").innerHTML = "00:45";
                    document.getElementById("td12").innerHTML = jsonParsedLocation.colour;
                    
                }
                else if(jsonParsedLocation.location==3){
                    document.getElementById("bar1").style.width="60%";
                    document.getElementById("bar1").innerHTML = "60% complete";
                    document.getElementById("td11").innerHTML = "Your delivery driver is almost arrived";
                    document.getElementById("td13").innerHTML = "00:30";
                    document.getElementById("td12").innerHTML = jsonParsedLocation.colour;
                    
                }
                else if(jsonParsedLocation.location==4){
                    document.getElementById("bar1").style.width="80%";
                    document.getElementById("bar1").innerHTML = "80% complete";
                    document.getElementById("td11").innerHTML = "Please prepare for the arrival";
                    document.getElementById("td13").innerHTML = "00:15";
                    
                }
            }
            else if(jsonParsedLocation.package_delivered==1){
                document.getElementById("bar1").style.width="100%";
                document.getElementById("bar1").innerHTML = "100% complete";
                document.getElementById("td11").innerHTML = "Enjoy your package";
                document.getElementById("td13").innerHTML = "00:00";
                document.getElementById("td12").innerHTML = jsonParsedLocation.colour;
            }
            else{
                console.log("huh?????");}
                console.log(jsonParsedLocation);
                console.log(jsonParsedLocation.location);
        }
        };
        xhttp.open("GET", "status.JSON", true);
        xhttp.send();
   
    }

    xx();
}
