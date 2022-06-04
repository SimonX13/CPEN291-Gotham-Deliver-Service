
window.onload = function () {
    console.log("zzz");
    var submitBtn = document.getElementById("submit");
    var inputElement = document.getElementById("input");
    var notesElement = document.getElementById("notes");
    var removElement = document.getElementById("remove");
    
    submitBtn.addEventListener("click", function () {
        
        var div = document.createElement("div");
        div.setAttribute("class", "note");
        div.innerText = inputElement.value;
        notesElement.appendChild(div);
        inputElement.value = "";
    })
    removElement.addEventListener("click", function () {
        //notesElement.removeChild();
        if (notesElement.hasChildNodes()) {
            notesElement.removeChild(notesElement.children[0]);
        }
    })


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



}
