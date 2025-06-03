import {SigFigs} from "/ApChemCalc/js/lib/sigFigs.js";

let lawAmount;

function logBase(solveFor, base) {
    if(solveFor == base) {
        return 1;
    }
    // MAKES SURE THAT NO ERROR WILL BE THROWN (I.E.: LOG OF 0)
    if(base == 0 || base == 1 || solveFor == 0 || solveFor == 1)  {
        return 0;
    }
    return Math.log(solveFor) / Math.log(base)
}

  function getReactionOrder(reactM, prodM) {
    return logBase(prodM,reactM)
}

function clearLaws() {
    Array(...document.getElementById("rateInputs").getElementsByClassName("visible")).forEach(element => {
        element.classList.replace("visible","invisible")
    });
}

function isVisibleEntered() {
    let returnBoolean = true;
    Array(...document.getElementsByClassName("visible")).forEach(div => {
        // VERIFIES THAT div IS A div
        if(div instanceof HTMLDivElement && div.id != "rateLawResults") {
            Array(...div.querySelectorAll("input")).forEach(input => {
                if(input.value == "") {
                    returnBoolean = false;
                    return;
                }
            });
        }
        if(!returnBoolean) {
            return;
        }
    });
    return returnBoolean;
}

function getReactionUnits(order) {
    return "M^"+String(1-Math.round(Number(order)))+"S^-1"
}

function unitFiveCalc() {
    // FOR RATELAW REACTENTS
    document.getElementById("amountInput").addEventListener("input", () => {
        if(Number(document.getElementById("amountInput").value) < 1 && document.getElementById("amountInput").value != "") {
            document.getElementById("amountInput").value = 1;
        }
        if(Number(document.getElementById("amountInput").value) > 4) {
            document.getElementById("amountInput").value = 4;
        }
    });
    document.getElementById("amountInput").addEventListener("keydown", (event) => {
        if(event.key == "Enter"
            && document.getElementById("amountInput").value != "") {
            clearLaws();
                
            let toAddLaws = String("k");
            if(Number(document.getElementById("amountInput").value) >= 1 
                && Number(document.getElementById("amountInput").value) <= 4
                && document.getElementById("amountInput").value != "") {
                
                const allAdds = ["[W]^a", "[X]^b", "[Y]^c", "[Z]^d"];
                for(let i=0; i<= Number(document.getElementById("amountInput").value)-1; i++) {
                    toAddLaws = toAddLaws.concat(allAdds[i]);
                    switch(i) {
                        case 0:
                            document.getElementById("wDiv").classList.replace("invisible", "visible");
                            lawAmount =1;
                            break;
                        case 1:
                            document.getElementById("xDiv").classList.replace("invisible", "visible");
                            lawAmount =2;
                            break;
                        case 2:
                            document.getElementById("yDiv").classList.replace("invisible", "visible");
                            lawAmount =3;
                            break;
                        case 3:
                            document.getElementById("zDiv").classList.replace("invisible", "visible");
                            lawAmount =4;
                            break;
                    }
                }
                document.getElementById("rateLawResults").classList.replace("invisible","visible");

                document.getElementById("pointInput").classList.replace("invisible","visible");

                document.getElementById("rateReactents").innerText = toAddLaws;
            }
        }
    });

    document.getElementById("calcRateLaws").addEventListener("click", ()=> {
        let finalEquation = "Inital Rate (M/s)=";

        let rateOrder = 0;
        let finalString = "";
        let rateConstant;

        if(isVisibleEntered()) {
            let wReact = document.getElementById("wInput").value;
            let wInitalRate = document.getElementById("wChangeInput").value;
            let wRateSolve = document.getElementById("wFinalInput").value;
            let wOrder;

            let xReact = document.getElementById("xInput").value;
            let xInitalRate = document.getElementById("xChangeInput").value;
            let xRateSolve = document.getElementById("xFinalInput").value;
            let xOrder;

            let yReact = document.getElementById("yInput").value;
            let yInitalRate = document.getElementById("yChangeInput").value;
            let yRateSolve = document.getElementById("yFinalInput").value;
            let yOrder;
            
            let zReact = document.getElementById("zInput").value;
            let zInitalRate = document.getElementById("zChangeInput").value;
            let zRateSolve = document.getElementById("zFinalInput").value;
            let zOrder;

            let rateAtPoint = document.getElementById("pointFinalInput").value;

            let sigFigs = new SigFigs(
                wReact, wInitalRate, wRateSolve,
                xReact, xInitalRate, xRateSolve,
                yReact, yInitalRate, yRateSolve,
                zReact, zInitalRate, zRateSolve,
                rateAtPoint
            )

            if(lawAmount >= 1) {
                sigFigs.applySigFigs(getReactionOrder(wReact,wInitalRate));
                finalEquation = finalEquation + "k[W]^("+ String(sigFigs.output)+ ")";
                finalString = finalString + "\tTo determine the order of the reactent W, we must find the effect that W has on the Inital Rate of Reaction. "
                    + "Because when the amount of reactent increases by "+ wReact + "M, the inital rate of reaction increases by " + wInitalRate
                    + "M/s, we can take the logbase"+ wReact + " of " + wInitalRate + " to get a order of " + sigFigs.output + " for W.";
                rateOrder += getReactionOrder(wReact,wInitalRate);
                console.log(rateOrder)
                wOrder = (String(sigFigs.output).split("."))[0];
                rateConstant = Number(rateAtPoint)/(Number(wRateSolve)**Number(wOrder))
            } else {
                console.error("error in lawAmount")
            }

            if(lawAmount >= 2) {
                sigFigs.applySigFigs(getReactionOrder(xReact,xInitalRate));
                finalEquation = finalEquation + "[X]^("+ String(sigFigs.output)+ ")";
                finalString = finalString + "\n\tTo determine the order of the reactent X, we must find the effect that X has on the Inital Rate of Reaction. "
                    + "Because when the amount of reactent increases by "+ xReact + "M, the inital rate of reaction increases by " + xInitalRate
                    + "M/s, we can take the logbase"+ xReact + " of " + xInitalRate + " to get a order of " + sigFigs.output + " for X.";
                rateOrder += getReactionOrder(xReact,xInitalRate);
                console.log(rateOrder)
                xOrder = (String(sigFigs.output).split("."))[0];
                rateConstant = rateConstant * (1/(Number(wRateSolve)**Number(xOrder)))
            }

            if(lawAmount >= 3) {
                sigFigs.applySigFigs(getReactionOrder(yReact,yInitalRate));
                finalEquation = finalEquation + "[Y]^("+ String(sigFigs.output)+ ")";
                finalString = finalString + "\n\tTo determine the order of the reactent Y, we must find the effect that W has on the Inital Rate of Reaction. "
                    + "Because when the amount of reactent increases by "+ yReact + "M, the inital rate of reaction increases by " + yInitalRate
                    + "M/s, we can take the logbase"+ yReact + " of " + yInitalRate + " to get a order of " + sigFigs.output + " for Y.";
                rateOrder += getReactionOrder(yReact,yInitalRate);
                console.log(rateOrder)
                yOrder = (String(sigFigs.output).split("."))[0];
                rateConstant = rateConstant * (1/(Number(wRateSolve)**Number(yOrder)))
            }

            if(lawAmount >= 4) {
                sigFigs.applySigFigs(getReactionOrder(zReact,zInitalRate));
                finalEquation = finalEquation + "[Z]^("+ String(sigFigs.output)+ ")";
                finalString = finalString + "\n\tTo determine the order of the reactent Z, we must find the effect that Z has on the Inital Rate of Reaction. "
                    + "Because when the amount of reactent increases by "+ zReact + "M, the inital rate of reaction increases by " + zInitalRate
                    + "M/s, we can take the logbase"+ zReact + " of " + zInitalRate + " to get a order of " + sigFigs.output + " for Z.";
                rateOrder += getReactionOrder(zReact,zInitalRate);  
                console.log(rateOrder)
                zOrder = (String(sigFigs.output).split("."))[0];
                rateConstant = rateConstant * (1/(Number(zRateSolve)**Number(wOrder)))           
            }
            sigFigs.applySigFigs(rateConstant);
            rateConstant = sigFigs.output;

            finalString = finalString + '\n\t To solve for k, we will use the equation "' + finalEquation + '" and plug in values based on the known values at a given point.'
                + "This gives us the equation: " + String(finalEquation)
                    .replace("Inital Rate ",String(rateAtPoint))
                    .replace("W",wRateSolve)
                    .replace("X",xRateSolve)
                    .replace("Y",yRateSolve)
                    .replace("Z",zRateSolve)
                + ". simply dividing the inital rate by "+ String(finalEquation).split("= ")[1] +" Gives us a k-value of " + rateConstant +".";

            document.getElementById("rateLawOutput").innerText = finalString;

            document.getElementById("rateLawFinalAnwser").innerText = "Final Anwser: "+finalEquation 
                + "\nk= "+ String(rateConstant) + getReactionUnits(rateOrder);
        }
    });
}

window.location.pathname ==  "/ApChemCalc/html/units/UnitFive.html" ? unitFiveCalc() 
    : false;