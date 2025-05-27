import {EqualibriumRxn} from "/ApChemCalc/utils/lib/equations.js";

let reactEntered = false;
let prodEntered = false;

/**Note: Only checks for visiblility toggable input elements*/
function checkUserInputs() {
    let returnValue = true;
    Array(...document.getElementsByClassName("visible")).forEach((div) => {
        Array(...div.getElementsByClassName("molarityInput")).forEach((div) => {
            if(div.classList.contains("visible") && div.querySelector("input").value == "") {
                returnValue = false;
                return;
            }
        });
        
        div.querySelectorAll("div").forEach((div) => {
            try {
                if(!div.classList.contains("molarityInput") && div.getElementsByTagName("input") && div.querySelector("input").value == "") {
                    returnValue = false;
                    return;
                }
            } catch(e) {}
        });
        if(!returnValue) {
            return
        }
    });
    return returnValue;
}

function forceChildVisible(elementId, className, toVisible) {
    document.getElementById(elementId).querySelectorAll(className).forEach((element) => {
        try {
            if(toVisible) {
                element.classList.replace("invisible", "visible");
            } else {
                element.classList.replace("visible", "invisible");
            }
        } catch (e) {}
    });
}

function unitSevenCalc() {
    let display = document.getElementById("equationDisplay");
    let reactInput = document.getElementById("amountReactantInput");
    let prodInput = document.getElementById("amountProductInput");

    Array(...document.getElementsByClassName("solveForBtn")).forEach((btn) => 
        btn.addEventListener("click",() => {
            switch(document.getElementById("solveFor").innerText) {
                case "Reactants":
                    forceChildVisible("reactInput", ".molarityInput", false)
                    forceChildVisible("prodInput", ".molarityInput", true)
                    forceChildVisible("kcInput", ".verticalAlign", true)
                    break;
                case "Products":
                    forceChildVisible("reactInput", ".molarityInput", true)
                    forceChildVisible("prodInput", ".molarityInput", false)
                    forceChildVisible("kcInput", ".verticalAlign", true)
                    break;
                case "Kc":
                    forceChildVisible("reactInput", ".molarityInput", true)
                    forceChildVisible("prodInput", ".molarityInput", true)
                    forceChildVisible("kcInput", ".verticalAlign", false)
                    break;
            } 
        })
    );

    document.getElementById("amountReactantInput").addEventListener("input", () => {
        if(reactInput.value == "") {
            return;
        }
        if(Number(reactInput.value) > 3) {
            reactInput.value = 3;
        }
        if(Number(reactInput.value) < 1) {
            reactInput.value = 1;
        }
    });

    document.getElementById("amountProductInput").addEventListener("input", () => {
        if(prodInput.value == "") {
            return;
        }
        if(Number(prodInput.value) > 3) {
            prodInput.value = 3;
        }
        if(Number(prodInput.value) < 1) {
            prodInput.value = 1;
        }
    });

    document.getElementById("amountReactantInput").addEventListener("keydown", (event) => {

        let inputs = Array(...document.getElementById("reactInput").getElementsByClassName("verticalAlign"));

        let reactList = ["[U]^a","[V]^b","[W]^c"]
        let toAddReact = "";
        if(event.key == "Enter") {
            reactEntered = true;
            forceChildVisible("reactInput",".verticalAlign", false);

            for(let i =0; i < Number(reactInput.value); i++) {
                toAddReact = toAddReact + reactList[i];
                inputs[i].classList.replace("invisible", "visible");
            }
            display.querySelector("#reactDisplay").innerText = "("+toAddReact+")";
        }
    });

    document.getElementById("amountProductInput").addEventListener("keydown", (event) => {

        let inputs = Array(...document.getElementById("prodInput").getElementsByClassName("verticalAlign"));

        let prodList = ["[X]^d","[Y]^e","[Z]^f"]
        let toAddProd = "";
        if(event.key == "Enter") {
            prodEntered = true;
            forceChildVisible("prodInput",".verticalAlign", false);

            for(let i =0; i < Number(prodInput.value); i++) {
                toAddProd = toAddProd + prodList[i];
                inputs[i].classList.replace("invisible", "visible");
            }
            display.querySelector("#prodDisplay").innerText = "("+toAddProd+")";
        }
    });

    document.getElementById("calcEqual").addEventListener("click", () => {

        if(checkUserInputs() 
            && document.getElementById("solveFor").textContent != "Unknown"
            && document.getElementById("amountReactantInput").value != ""
            && document.getElementById("amountProductInput").value != ""
            && reactEntered && prodEntered
        ) {

            let equalibriumRxn = new EqualibriumRxn(
                document.getElementById("amountReactantInput").value, 
                document.getElementById("amountProductInput").value, 
                document.getElementById("amountKcInput").value, 
                document.getElementById("solveFor").textContent
            );
            equalibriumRxn.setReactants(
                document.getElementById("amountUInput").value,
                document.getElementById("orderUInput").value,
                document.getElementById("amountVInput").value,
                document.getElementById("orderVInput").value,
                document.getElementById("amountWInput").value,
                document.getElementById("orderWInput").value
            )
            equalibriumRxn.setProducts(
                document.getElementById("amountXInput").value,
                document.getElementById("orderXInput").value,
                document.getElementById("amountYInput").value,
                document.getElementById("orderYInput").value,
                document.getElementById("amountZInput").value,
                document.getElementById("orderZInput").value
            )
            equalibriumRxn.calc();

            let finalString;
            let finalAnwser;
            switch(equalibriumRxn.solveFor) {
                case "Kc":
                    finalString = "In order to calculate Kc from the Reactants and Products of an "
                        + "Equalibrium Reaction, we must multiply the Products and divide by the "
                        + "Reactants (each put to their respective orders before being multiplied). "
                        + 'We will take the equation "' + display.querySelector("#prodDisplay").innerText 
                        + "/" + display.querySelector("#reactDisplay").innerText
                        + '"and substitute in the inputted values, giving us the equation: "Kc='
                        + String(display.querySelector("#prodDisplay").innerText)
                            .replace("X",equalibriumRxn.prodX).replace("Y",equalibriumRxn.prodY).replace("Z",equalibriumRxn.prodZ)
                            .replace("d",equalibriumRxn.prodXOrder).replace("e",equalibriumRxn.prodYOrder).replace("f",equalibriumRxn.prodZOrder)
                        + "/"
                        + String(display.querySelector("#reactDisplay").innerText)
                            .replace("a",equalibriumRxn.reactUOrder).replace("b",equalibriumRxn.reactVOrder).replace("c",equalibriumRxn.reactWOrder)
                            .replace("U",equalibriumRxn.reactU).replace("V",equalibriumRxn.reactV).replace("W",equalibriumRxn.reactW)
                        + '", which gives us ' + equalibriumRxn.kc + " for Kc.";
                    finalAnwser = equalibriumRxn.kc
                    break;
                case "Reactants":
                    finalString = 'In order to calculate the Molarity of the Reactants, we will use the equation: "' 
                        + display.querySelector("#prodDisplay").innerText + "/" + display.querySelector("#reactDisplay").innerText 
                        + '" to calculate the value of the Unknown molairty of Reactants at Equalibrium.'
                        + " Because we know the value of Kc, order of Reactants and Products, and the Molarity of Products at Equalibrium,"
                        + ' We can solve for the left half of the equation. Therefore, we get the equation: "' 
                        + String(display.querySelector("#prodDisplay").innerText)
                            .replace("X",equalibriumRxn.prodX).replace("Y",equalibriumRxn.prodY).replace("Z",equalibriumRxn.prodZ)
                            .replace("d",equalibriumRxn.prodXOrder).replace("e",equalibriumRxn.prodYOrder).replace("f",equalibriumRxn.prodZOrder)
                        + "="                         
                        + String(display.querySelector("#reactDisplay").innerText)
                        + '", which we then multiply and divide out the lefthand portion of the equation-- to then we put the whole equation to the'
                        + " root of the order of Reactants (due to Reactents Molarities being preportional to eachother). Thus, we get a value of "+ equalibriumRxn.x 
                        + ", that we can simply multiply by a specific Reactant order to get its molarity at equalibrium."
                    finalAnwser = "\n[U] = "+ equalibriumRxn.reactU + "M"  
                        + (equalibriumRxn.reactAmount >= 2 ? "\n[V] = " + equalibriumRxn.reactV +"M" : "")
                        + (equalibriumRxn.reactAmount >= 3 ? "\n[W] = " + equalibriumRxn.reactW +"M" : "");
                    break;
                case "Products":
                    finalString = 'In order to calculate the Molarity of the Products, we will use the equation: "' 
                        + display.querySelector("#prodDisplay").innerText + "/" + display.querySelector("#reactDisplay").innerText 
                        + '" to calculate the value of the Unknown molairty of Products at Equalibrium.'
                        + " Because we know the value of Kc, order of Reactants and Products, and the Molarity of Reactants at Equalibrium,"
                        + ' We can solve for the left half of the equation. Therefore, we get the equation: "kc * ' 
                        + String(display.querySelector("#reactDisplay").innerText)
                            .replace("a",equalibriumRxn.reactUOrder).replace("b",equalibriumRxn.reactVOrder).replace("c",equalibriumRxn.reactWOrder)
                            .replace("U",equalibriumRxn.reactU).replace("V",equalibriumRxn.reactV).replace("W",equalibriumRxn.reactW)
                        + "="                         
                        + String(display.querySelector("#prodDisplay").innerText)
                        + '", which we then multiply out the lefthand portion of the equation-- to then we put the whole equation to the'
                        + " root of the order of Products (due to Product Molarities being preportional to eachother). Thus, we get a value of "+ equalibriumRxn.x 
                        + ", that we can simply multiply by a specific Reactant order to get its molarity at equalibrium."
                    finalAnwser = "\n[X] = "+ equalibriumRxn.prodX + "M"  
                        + (equalibriumRxn.prodAmount >= 2 ? "\n[Y] = " + equalibriumRxn.prodY +"M" : "")
                        + (equalibriumRxn.prodAmount >= 3 ? "\n[Z] = " + equalibriumRxn.prodZ +"M" : "");
                    break;
                default:
                    console.error("Error in aligning switch to solveFor");
            }
            document.getElementById("equalOutput").innerText = finalString;
            document.getElementById("equalFinalAnwser").innerText = "Final Anwser: "+ finalAnwser;
        }
    })
}

window.location.pathname ==  "/ApChemCalc/html/units/UnitSeven.html" ? unitSevenCalc() 
    : false;