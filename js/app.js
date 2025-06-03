

function setNavbarColor() {
    switch(window.location.pathname) {
        case "/ApChemCalc/index.html" :
            setSelection(".home");
            break;
        case "/ApChemCalc/html/units/UnitOne.html" :
            setSelection(".one");
            break;
        case "/ApChemCalc/html/units/UnitTwo.html" :
            setSelection(".two");
            break;
        case "/ApChemCalc/html/units/UnitThree.html" :
            setSelection(".three");
            break;
        case "/ApChemCalc/html/units/UnitFour.html" :
            setSelection(".four");
            break;
        case "/ApChemCalc/html/units/UnitFive.html" :
            setSelection(".five");
            break;
        case "/ApChemCalc/html/units/UnitSix.html" :
            setSelection(".six");
            break;
        case "/ApChemCalc/html/units/UnitSeven.html" :
            setSelection(".seven");
            break;
        case "/ApChemCalc/html/units/UnitEight.html" :
            setSelection(".eight");
            break;
        case "/ApChemCalc/html/units/UnitNine.html" :
            setSelection(".nine");
            break;
        default:
            console.log("color assignment failed");
    }
}

function setSelection(newPose) {
    try {
        document.querySelectorAll("selected").forEach((element) => {
            element.id.replace("selected","unselected");
        });
    } catch(exception) {
        console.log(exception);
    }
    document.querySelector(newPose).setAttribute("id", "selected");
}

setNavbarColor();