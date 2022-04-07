window.onload = function () {
    
    var inn = document.getElementById("searchinput");
    var cf1 = document.getElementById("cf1")
    var cf2 = document.getElementById("cf2")
    var cf3 = document.getElementById("cf3")
    var gr1 = document.getElementById("gr1")
    var gr2 = document.getElementById("gr2")
    var gr3 = document.getElementById("gr3")
    var ess1 = document.getElementById("ess1")
    var ess2 = document.getElementById("ess2")
    var ess3 = document.getElementById("ess3")
    var dr1 = document.getElementById("dr1")
    var dr2 = document.getElementById("dr2")
    var dr3 = document.getElementById("dr3")
    

    // house1234 are four images listening to an onclick event
    var tempHouse = "bad"; 
    var house1 =document.getElementById("house1");
    house1.addEventListener("click", function(){
        document.getElementById("House").innerHTML= "House 1 is shopping now";
        tempHouse = "House 1 ordered: "; 
    })
    var house2 =document.getElementById("house2");
    house2.addEventListener("click", function(){
        document.getElementById("House").innerHTML= "House 2 is shopping now";
        tempHouse = "House 2 ordered: ";
    })
    var house3 =document.getElementById("house3");
    house3.addEventListener("click", function(){
        document.getElementById("House").innerHTML= "House 3 is shopping now";
        tempHouse = "House 3 ordered: ";
    })
    var house4 =document.getElementById("house4");
    house4.addEventListener("click", function(){
        document.getElementById("House").innerHTML= "House 4 is shopping now";
        tempHouse = "House 4 ordered: ";
    })

    var submitBtn = document.getElementById("submit");
    var inputElement = document.getElementById("input");
    var notesElement = document.getElementById("notes");
    var removElement = document.getElementById("remove");
    
    // if a submit btn is clicked, a reminder to display for the user to pick a house
    // after picking a house by clicking the imgs, input will add to the div list
    submitBtn.addEventListener("click", function () {
       
        var div = document.createElement("div");
        div.setAttribute("class", "note");
        if(tempHouse === "bad"){
            document.getElementById("errormess").innerHTML="Please choose a house first";
            inputElement.value = "";
        }
        else{
            document.getElementById("errormess").innerHTML="";
            div.innerText = tempHouse + inputElement.value;
            notesElement.appendChild(div);
            inputElement.value = "";
            tempHouse="bad"
        }
        
    })

    // if removeElement is clicked, the child of the div list will be removed
    removElement.addEventListener("click", function () {
        //notesElement.removeChild();
        if (notesElement.hasChildNodes()) {
            notesElement.removeChild(notesElement.children[0]);
        }
    })
    
    if(document.getElementById("food").innerHTML == "Daily Essentials"){
        document.getElementById("testing1").innerHTML = " is changing";
    }
    else{
        document.getElementById("testing1").innerHTML = "";
    }
    // select list
    const btn2 = document.querySelector('#ss');
    const sb2 = document.querySelector('#food');
    var historyElement = document.getElementById("History");
    
    // btn to add text to list
    btn2.onclick = (event) => {
        event.preventDefault();
        var div = document.createElement("div");
        div.setAttribute("class", "note");
        var divHistory = document.createElement("div");
        divHistory.setAttribute("class", "History");
        if(tempHouse === "bad"){
            document.getElementById("testing1").innerHTML="Please choose a house first";
        }
        else{
            document.getElementById("testing1").innerHTML="";
            if (sb2.selectedIndex == 0) {
                document.getElementById("testing1").innerHTML =  tempHouse + "cooked food";
                cf1.style.width= "200px";
                cf2.style.width= "200px";
                cf3.style.width= "200px";
                
                dr1.style.width= "0px";
                dr2.style.width= "0px";
                dr3.style.width= "0px";
                gr1.style.width= "0px";
                gr2.style.width= "0px";
                gr3.style.width= "0px";
                ess1.style.width= "0px";
                ess2.style.width= "0px";
                ess3.style.width= "0px";
            }
            else if (sb2.selectedIndex == 1) {
                document.getElementById("testing1").innerHTML = tempHouse + "grocery";
                cf1.style.width= "0px";
                cf2.style.width= "0px";
                cf3.style.width= "0px";
                dr1.style.width= "0px";
                dr2.style.width= "0px";
                dr3.style.width= "0px";
                gr1.style.width= "200px";
                gr2.style.width= "200px";
                gr3.style.width= "200px";
                ess1.style.width= "0px";
                ess2.style.width= "0px";
                ess3.style.width= "0px";
            }
            else if (sb2.selectedIndex == 2) {
                document.getElementById("testing1").innerHTML = tempHouse +  "daily essentials";
                cf1.style.width= "0px";
                cf2.style.width= "0px";
                cf3.style.width= "0px";
                dr1.style.width= "0px";
                dr2.style.width= "0px";
                dr3.style.width= "0px";
                gr1.style.width= "0px";
                gr2.style.width= "0px";
                gr3.style.width= "0px";
                ess1.style.width= "200px";
                ess2.style.width= "200px";
                ess3.style.width= "200px";
            }
            else if (sb2.selectedIndex == 3) {
                document.getElementById("testing1").innerHTML = tempHouse + "drinks";
                cf1.style.width= "0px";
                cf2.style.width= "0px";
                cf3.style.width= "0px";
                dr1.style.width= "200px";
                dr2.style.width= "200px";
                dr3.style.width= "200px";
                gr1.style.width= "0px";
                gr2.style.width= "0px";
                gr3.style.width= "0px";
                ess1.style.width= "0px";
                ess2.style.width= "0px";
                ess3.style.width= "0px";
            }
            // notes
            div.innerText = document.getElementById("testing1").innerHTML;
            notesElement.appendChild(div);
            // history 
            divHistory.innerText = document.getElementById("testing1").innerHTML;
            historyElement.appendChild(divHistory);
            tempHouse="bad";
        }
        
    };  

    
    
}

