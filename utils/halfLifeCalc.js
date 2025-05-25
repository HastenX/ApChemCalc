import {SigFigs} from "/ApChemCalc/utils/lib/sigFigs.js";

function unitFiveCalc() {
    let orderInput = document.getElementById("orderInput");
    let aInput = document.getElementById("aInput");
    let unitInput = document.getElementById("unitInput");
    let dropdownBtn = document.getElementById("solveFor")

    let sigFigs;
    let finalString;
    let anwser;

    document.querySelectorAll(".solveForBtn").forEach((btn) => {
        btn.addEventListener("click", () => {
            document.getElementById("selectedUnit").textContent = btn.textContent;
        });
    })

    orderInput.addEventListener("input", ()=> {
        try {
            Math.round(orderInput.value) == 1 ? document.getElementById("visible").id = "invisible"
                : document.getElementById("invisible").id = "visible";
        } catch(e) {}
        if(orderInput.value > 2) {
            orderInput.value = 2
        }
        if(orderInput.value < 0 && orderInput.value !="") {
            orderInput.value = 0
        }
    });

    document.getElementById("calcHalfLife").addEventListener("click", ()=> {
        if(
            document.getElementById("visible") ? aInput.value > 0 : true
            && orderInput.value > 0
            && unitInput.value > 0
            && dropdownBtn.textContent != "Select k or t1/2"
        ) {
            sigFigs = new SigFigs(unitInput.value, (Math.round(orderInput.value) == 1 ? 999999999999 : aInput.value));
            switch(Math.round(orderInput.value)) {
                case 0:
                    if(dropdownBtn.textContent != "k") {
                        sigFigs.applySigFigs((aInput.value/unitInput.value)/2);
                        anwser = String(sigFigs.output);
                        finalString  = "To find the k of a zeroth order reaction, we must use the equation t1/2 = [A]0/(2k)."
                            + "If we multiply the whole equation by k/(t1/2), we get the equation k = [A]0/(2t1/2). ("
                            + String(aInput.value) + "M)/2(" + String(unitInput.value) + "S^-1), which equals "+ String(anwser) +"M/S^-1";
                    } else{
                        sigFigs.applySigFigs(aInput.value/(2*unitInput.value));
                        anwser = String(sigFigs.output);
                        finalString  = "To find the t1/2 of a zeroth order reaction, we must use the equation t1/2 = [A]0/(2k)."
                            + "If we plug the given numbers into the equation, we get ("
                            + String(aInput.value) + "M)/2(" + String(unitInput.value) + "M/S^-1), which equals "+ String(anwser) +"S^-1";
                    }
                    break;
                case 1:
                    if(dropdownBtn.textContent != "k") {
                        sigFigs.applySigFigs(0.693/unitInput.value);
                        anwser = String(sigFigs.output);
                        finalString  = "To find the k of a first order reaction, we must use the equation t1/2 = 0.693/k."
                            + "If we multiply the whole equation by k/(t1/2), we get the equation k = 0.693/t1/2. ("
                            + String(0.693) + ")/(" + String(unitInput.value) + "S^-1), which equals "+ String(anwser) +"M^0/S^-1";
                    } else{
                        sigFigs.applySigFigs(0.693/unitInput.value);
                        anwser = String(sigFigs.output);
                        finalString  = "To find the t1/2 of a first order reaction, we must use the equation t1/2 = 0.693/k."
                            + "If we plug the given numbers into the equation, we get ("
                            + String(0.693) + ")/2(" + String(unitInput.value) + "M/S^-1), which equals "+ String(anwser) +"S^-1";
                    }
                    break;
                case 2:
                    if(dropdownBtn.textContent != "k") {
                        sigFigs.applySigFigs(1/(unitInput.value*aInput.value));
                        anwser = String(sigFigs.output);
                        finalString  = "To find the k of a second order reaction, we must use the equation t1/2 = 1/(k*[A]0)."
                            + "If we multiply the whole equation by k/(t1/2), we get the equation k = 1/((t1/2)*[A]0). "
                            + String(1) + "/(" + String(aInput.value) +"M)*(" + String(unitInput.value) + "S^-1), which equals "+ String(anwser) +"M^-1/S^-1";
                    } else{
                        sigFigs.applySigFigs(1/(unitInput.value*aInput.value));
                        anwser = String(sigFigs.output);
                        finalString  = "To find the t1/2 of a second order reaction, we must use the equation t1/2 = 1/(k*[A]0)."
                            + "We can directly plug the known values into the equation, "
                            + String(1) + "/(" + String(aInput.value) +"M)*(" + String(unitInput.value) + "M^-1*S^-1), which equals "+ String(anwser) +"S^-1";
                    }
                    break;
            }


            document.getElementById("halfLifeOutput").textContent = finalString;
            document.getElementById("halfLifeFinalAnwser").textContent = "Final Anwser: " + String(dropdownBtn.textContent != "k" ? String(anwser) +"*M^"+String(1-orderInput.value)+"/S^-1" 
                : String(anwser) +"*S^-1");
        }
    });
}

window.location.pathname == "/ApChemCalc/html/units/UnitFive.html" ? unitFiveCalc() 
    : false;