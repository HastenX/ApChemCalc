

function setNavbarColor() {
    switch(window.location.pathname) {
        case "/html/index.html" :
            setSelection(".home");
            break;
        case "/html/units/UnitOne.html" :
            setSelection(".one");
            break;
        case "/html/units/UnitTwo.html" :
            setSelection(".two");
            break;
        case "/html/units/UnitThree.html" :
            setSelection(".three");
            break;
        case "/html/units/UnitFour.html" :
            setSelection(".four");
            break;
        case "/html/units/UnitFive.html" :
            setSelection(".five");
            break;
        case "/html/units/UnitSix.html" :
            setSelection(".six");
            break;
        case "/html/units/UnitSeven.html" :
            setSelection(".seven");
            break;
        case "/html/units/UnitEight.html" :
            setSelection(".eight");
            break;
        case "/html/units/UnitNine.html" :
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