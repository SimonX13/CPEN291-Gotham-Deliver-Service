
window.onload = function () {


    // use ajax to read Json file 
    // if package is not delivered then check location then diplay info
    // if package is delivered display corresponding info
    function xx() {
        console.log("11")
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // document.getElementById("aa").innerHTML =
                //     this.responseText;
                var jsonParsedLocation = JSON.parse(this.responseText);
                if (jsonParsedLocation.package_delivered == 0) {
                
                    console.log("12")
                    if (jsonParsedLocation.location == 1) {
                        document.getElementById("bar1").style.width = "20%";
                        document.getElementById("bar1").innerHTML = "20% complete";
                        document.getElementById("td11").innerHTML = "Your delivery driver has your order";
                        document.getElementById("td13").innerHTML = "1:00";
                        document.getElementById("td12").innerHTML = jsonParsedLocation.package_color;
                        console.log(jsonParsedLocation.package_color);
                        console.log("13")
                    }
                    else if (jsonParsedLocation.location == 2) {
                        document.getElementById("bar1").style.width = "40%";
                        document.getElementById("bar1").innerHTML = "40% complete";
                        document.getElementById("td11").innerHTML = "Your delivery driver is on his/her way";
                        document.getElementById("td13").innerHTML = "00:45";
                        document.getElementById("td12").innerHTML = jsonParsedLocation.package_color;

                    }
                    else if (jsonParsedLocation.location == 3) {
                        document.getElementById("bar1").style.width = "60%";
                        document.getElementById("bar1").innerHTML = "60% complete";
                        document.getElementById("td11").innerHTML = "Your delivery driver is almost arrived";
                        document.getElementById("td13").innerHTML = "00:30";
                        document.getElementById("td12").innerHTML = jsonParsedLocation.package_color;

                    }
                    else if (jsonParsedLocation.location == 4) {
                        document.getElementById("bar1").style.width = "80%";
                        document.getElementById("bar1").innerHTML = "80% complete";
                        document.getElementById("td11").innerHTML = "Please prepare for the arrival";
                        document.getElementById("td13").innerHTML = "00:15";
                        document.getElementById("td12").innerHTML = jsonParsedLocation.package_color;
                    }
                }
                else if (jsonParsedLocation.package_delivered == 1) {
                    document.getElementById("bar1").style.width = "100%";
                    document.getElementById("bar1").innerHTML = "100% complete";
                    document.getElementById("td11").innerHTML = "Enjoy your package";
                    document.getElementById("td13").innerHTML = "00:00";
                    document.getElementById("td12").innerHTML = jsonParsedLocation.package_color;
                }
                else {
                    console.log("huh?????");
                }
                console.log(jsonParsedLocation);
                console.log(jsonParsedLocation.location);
            }
        };
        xhttp.open("GET", "status2.json", true);
        xhttp.send();

    }

    xx();
}
