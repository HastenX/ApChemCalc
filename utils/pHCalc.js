// TODO: MAKE BUTTONS W/ ACID OR BASE INVISIBLE WHEN OTHER BUTTON SELECTS OTHER

function makeButtonInvisible(className) {
    Array(...document.getElementsByClassName(className)).forEach(element => {
        element.classList.replace("visible", "invisible");
        element.style.display = "none";
    });
}

function makeButtonVisible(className) {
    Array(...document.getElementsByClassName(className)).forEach(element => {
        element.classList.replace("invisible", "visible");
        element.style.display = "block";
    });
}

function unitEightCalc() {
    // TODO: MAKE THIS RUN ONLY WHEN PRESSING ACID/BASE BUTTON
    // document.getElementById("analyteSolve").addEventListener("click", () => {   
    //     Array(...document.getElementsByClassName("titrantSolveBtn")).forEach(element => {
    //         if(element.classList.contains("acid")) {
    //             makeButtonInvisible("acid");
    //             makeButtonVisible("base");
    //         }
    //         if(element.classList.contains("base")) {
    //             makeButtonInvisible("base");
    //             makeButtonVisible("acid");
    //         }
    //     });
    // });
}

window.location.pathname == "/ApChemCalc/html/units/UnitEight.html" ? unitEightCalc() 
    : false;