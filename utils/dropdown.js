function reselect(instance) {
    document.querySelectorAll(String("#selected"+instance))
        .forEach((element) => {
            element.id = "unselected" + instance
        });
    return "selected" + instance;
}

function isElementDisplayed(element, display) {
    return element.textContent == document.getElementById(display).textContent;
}

function enterOneColorListeners(element, dropdownClass, conjugateClass) {
    if(conjugateClass) {
        element.addEventListener("mouseover", (() => {
            if(!isElementDisplayed(element,conjugateClass) && !isElementDisplayed(element,dropdownClass)) {
                element.style.backgroundColor = "lightblue";
            }
            if(isElementDisplayed(element,conjugateClass) || isElementDisplayed(element,dropdownClass)) {
                element.style.backgroundColor = "lightgrey";
            }
        }));
    } else {
        element.addEventListener("mouseover", (() => {
            if(!isElementDisplayed(element,dropdownClass)) {
                element.style.backgroundColor = "lightblue";
            }
            if(isElementDisplayed(element,dropdownClass)) {
                element.style.backgroundColor = "lightgrey";
            }
        }));
    }

    element.addEventListener("mouseout", () => {
        element.style.backgroundColor ="white";
    });
}

function closeIfClickOff(list,match) {
    !match ?  closeUnselectedDropdown(list) : false;
}

function closeUnselectedDropdown(list) {
    list.querySelector(".dropdownContent").querySelectorAll("button").forEach((btn) => btn.style.display = "none")
}

function closeAllDropdowns() {
    document.querySelectorAll(".dropdownContent").forEach((content)=> {
        content.querySelectorAll("button").forEach((btn) => btn.style.display = "none");
    });
}

class dropdown {
    dropdownClass;
    conjugateClass;
    constructor(dropdownClass, conjugateClass) {
        this.dropdownClass = dropdownClass;
        this.conjugateClass = conjugateClass;

        document.querySelectorAll("."+this.dropdownClass+"Btn").forEach((element) => {
            element.addEventListener("click", (() => {
                if(this.conjugateClass) {
                    if(!isElementDisplayed(element,this.conjugateClass)
                        && !isElementDisplayed(element, this.dropdownClass)) {
                        element.id = reselect(this.dropdownClass+"Btn");
                        
                        document.getElementById(this.dropdownClass).textContent = element.textContent;
                        closeAllDropdowns();
                    }
                }
                if(!this.conjugateClass 
                    && !isElementDisplayed(element, this.dropdownClass)) {
                    element.id = reselect(this.dropdownClass+"Btn");
                        
                    document.getElementById(this.dropdownClass).textContent = element.textContent;
                    closeAllDropdowns();
                }
            }));
            enterOneColorListeners(element, this.dropdownClass, this.conjugateClass);
        });
    }
}

function enableDropdowns() {
    document.querySelectorAll(".dropdownList").forEach((list) => {
        let btn = list.querySelector(".dropdownBtn");
        btn.addEventListener("click", (() => {
            document.querySelectorAll("." + String(btn.id) + "Btn").forEach((content) => {
                content.style.display = "block";
            })
        }))

        document.addEventListener("click", (() => {
            closeIfClickOff(list,list.matches(":hover"))
        }));
    });
}

// function unitOneDropdown() {
//     enableDropdowns();

//     new dropdown("reactConversion", "prodConversion");
//     new dropdown("prodConversion", "reactConversion");
// }

// function unitThreeDropdown() {
//     enableDropdowns();

//     new dropdown("solveFor");
// }

// function unitFourDropdown() {
//     enableDropdowns();

//     new dropdown("reactUnit");
//     new dropdown("prodUnit");
// }

// function unitFiveDropdown() {
//     enableDropdowns();

//     new dropdown("solveFor");
// }

// function unitSixDropdown() {
//     enableDropdowns();

//     new dropdown("solveFor");
// }

function pairedDropdown(contentOneName, contentTwoName) {
    enableDropdowns();

    new dropdown(contentOneName, contentTwoName)
    new dropdown(contentTwoName, contentOneName)
}

function singleDropdown(contentName) {
    enableDropdowns();

    new dropdown(contentName);
}

window.location.pathname == "/ApChemCalc/html/units/UnitOne.html" ? pairedDropdown("reactConversion", "prodConversion",true)
    : false;

window.location.pathname == "/ApChemCalc/html/units/UnitThree.html" ? singleDropdown("solveFor")
    : false;

window.location.pathname == "/ApChemCalc/html/units/UnitFour.html" ? (() => {
    singleDropdown("reactUnit");
    singleDropdown("prodUnit");
})() : false

window.location.pathname == "/ApChemCalc/html/units/UnitFive.html" ? singleDropdown("solveFor")
    : false;

window.location.pathname == "/ApChemCalc/html/units/UnitSix.html" ? singleDropdown("solveFor")
    : false;

window.location.pathname == "/ApChemCalc/html/units/UnitSeven.html" ? singleDropdown("solveFor")
    : false;

window.location.pathname == "/ApChemCalc/html/units/UnitEight.html" ? (() => {
        singleDropdown("analyteSolve");
        singleDropdown("titrantSolve");
    })() : false