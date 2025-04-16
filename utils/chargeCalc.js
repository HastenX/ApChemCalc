function unitOneCalc () {
    let inputOne;
    let inputTwo;

    let coefficentOne;
    let coefficentTwo;

    let finalString;

    document.querySelector(".ionicEquationBtn").addEventListener("click", () => {
        inputOne = String(document.getElementById("chargeOne").value);
        inputTwo = String(document.getElementById("chargeTwo").value);

        if(
            inputOne != ""
            && inputTwo != ""
            && inputOne* inputTwo < 0
        ) {
            coefficentOne = Math.round(Math.abs(Math.abs(inputOne/inputTwo) != 1 ? inputTwo : 1));
            coefficentTwo = Math.round(Math.abs(Math.abs(inputOne/inputTwo) != 1 ? inputOne : 1));
        
            document.getElementById("amountOfOne").textContent = coefficentOne;
            document.getElementById("amountOfTwo").textContent = coefficentTwo;

            document.getElementById("coefficentOne").textContent = coefficentOne;
            document.getElementById("coefficentTwo").textContent = coefficentTwo;

            document.getElementById("netIonicOutput").textContent = "You would need " + coefficentOne + " Mole(s) of X^"+ String(Math.round(inputOne)>= 1 ? "+" + Math.round(inputOne) : Math.round(inputOne))
                +" and " + coefficentTwo + " Mole(s) of Y^"+ String(Math.round(inputTwo)>= 1 ? "+" + Math.round(inputTwo) : Math.round(inputTwo))
                + " to make one Mole of X" + coefficentOne + "Y" + coefficentTwo;

        } else {
            document.getElementById("netIonicOutput").textContent = "Please enter an anion (negative ion) charge and cation (positive ion) charge above!";
        }
    })
}

window.location.pathname == "/ApChemCalc/html/units/UnitOne.html" ? unitOneCalc() 
    : false;