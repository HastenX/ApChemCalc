

function setNavbarColor() {
    switch(window.location.pathname) {
        case "/html/index.html" :
            changeSelection(".home");
            break;
        case "/html/units/UnitOne.html" :
            changeSelection(".one");
            break;
        case "/html/units/UnitTwo.html" :
            changeSelection(".two");
            break;
        case "/html/units/UnitThree.html" :
            changeSelection(".three");
            break;
        case "/html/units/UnitFour.html" :
            changeSelection(".four");
            break;
        case "/html/units/UnitFive.html" :
            changeSelection(".five");
            break;
        case "/html/units/UnitSix.html" :
            changeSelection(".six");
            break;
        case "/html/units/UnitSeven.html" :
            changeSelection(".seven");
            break;
        case "/html/units/UnitEight.html" :
            changeSelection(".eight");
            break;
        case "/html/units/UnitNine.html" :
            changeSelection(".nine");
            break;
        default:
            console.log("color assignment failed");
    }
}
function changeSelection(newPose) {
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