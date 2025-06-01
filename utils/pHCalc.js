import {pHCalc} from "/ApChemCalc/utils/lib/equations.js";

let visibleDiv;
let phCalc;

function setVisibility(inputType) {
    Array(...document.getElementsByClassName("visible")).forEach((div) => {
        div.classList.replace("visible","invisible");
    });
    document.getElementById(inputType).classList.replace("invisible","visible");
}

function getSelectionClicked() {
    switch(document.getElementById("solveForpH").innerText) {
        case "pH":
            visibleDiv = document.getElementById("pHInputs");

            setVisibility("pHInputs");
            try{
                document.getElementById("solution").innerText = "pOH, and Concentration of [H+] and [OH-]";
            } catch(e) {}
            break;
        case "pOH":
            visibleDiv = document.getElementById("pOHInputs");

            setVisibility("pOHInputs");
            try{
            document.getElementById("solution").innerText = "pH, and Concentration of [H+] and [OH-]";
            } catch(e) {}
            break;
        case "Molarity(M)":
            visibleDiv = document.getElementById("molarityInputs");

            setVisibility("molarityInputs");
            try {
            document.getElementById("solution").innerText = "pOH, and pH";
            } catch(e) {}

            Array(...document.getElementsByClassName("solveForMolarityBtn")).forEach((btn) => {
                btn.addEventListener("click", () => {
                    document.getElementById("baseAcid").innerText = document.getElementById("solveForMolarity").innerText;
                });
            });
            break;
        default:
            console.error("error in switch");
    }
}

function calcpH() {
    try{
        document.getElementById("solution").textContent = "";
    } catch(e) {}

    let pH = document.getElementById("pHInput").value;
    let pOH = document.getElementById("pOHInput").value;
    let molarity = document.getElementById("amountMolarityInput").value;

    let molarityType = document.getElementById("solveForMolarity").innerText;

    switch(visibleDiv.id) {
        case "pHInputs": 
            phCalc = new pHCalc(pH, undefined, undefined, undefined);

            try{
                document.getElementById("solution").textContent = "";
            } catch (e) {}

            document.getElementById("pHOutput").textContent = "In order to calculate pOH from pH, we must subtract 14 (as it is pKw, and pKw = pH + pOH) by pH)." 
                + "To calculate [H+], we must put 10^-pH to rearrange the equation pH = -log([H+]). To calculate [OH-], we must put 10^-pOH to rearrenge the equation pOH = -log([OH-]).";
            document.getElementById("pHAnwser").textContent = "Final Anwser: \npH = " + phCalc.pH +",\npOH = " + phCalc.pOH +",\n[OH-] = " + phCalc.molarityOH +",\n[H+] = " + phCalc.molarityH;
            break;
        case "pOHInputs":
            phCalc = new pHCalc(undefined, pOH, undefined, undefined);

            try{
                document.getElementById("solution").textContent = "";
            } catch (e) {}

            document.getElementById("pHOutput").textContent = "In order to calculate pH from pOH, we must subtract 14 (as it is pKw, and pKw = pH + pOH) by pH) by pOH." 
                + "To calculate [H+], we must put 10^-pH to rearrange the equation pH = -log([H+]). To calculate [OH-], we must put 10^-pOH to rearrenge the equation pOH = -log([OH-]).";
            document.getElementById("pHAnwser").textContent = "Final Anwser: \npH = " + phCalc.pH +",\npOH = " + phCalc.pOH +",\n[OH-] = " + phCalc.molarityOH +",\n[H+] = " + phCalc.molarityH;
            break;
        case "molarityInputs": 
            phCalc = new pHCalc(undefined, undefined, molarity, molarityType);

            try{
                document.getElementById("solution").textContent = "";
            } catch (e) {}

            if(molarityType == "Strong Base") {
                document.getElementById("pHOutput").textContent = "In order to calculate pOH from [OH-] (as the Strong Base completely dissolves), we must take the -log([OH-]), giving us pOH. To calculate pH, we must subtract 14 (as it is pKw, and pKw = pH + pOH) by pOH"
                    + ", giving us pH. In order to calculate [H+] from pH, we must put 10^-pH to rearrange the equation pH = -log([H+])."
                document.getElementById("pHAnwser").textContent = "Final Anwser: \npH = " + phCalc.pH +",\npOH = " + phCalc.pOH +",\n[OH-] = " + phCalc.molarityOH +",\n[H+] = " + phCalc.molarityH;
            }
            if(molarityType == "Strong Acid") {
                document.getElementById("pHOutput").textContent = "In order to calculate pOH from [H+] (as the Strong Acid completely dissolves), we must take the -log([H+]), giving us pH. To calculate pOH, we must subtract 14 (as it is pKw, and pKw = pH + pOH) by pH"
                    + ", giving us pOH. In order to calculate [OH-] from pOH, we must put 10^-pH to rearrange the equation pH = -log([H+])."
                document.getElementById("pHAnwser").textContent = "Final Anwser: \npH = "+ phCalc.pH +",\npOH = " + phCalc.pOH + ",\n[OH-] = " + phCalc.molarityOH+",\n[H+] = " + phCalc.molarityH;
            }
            break;
    }
}

function unitEightCalc() {
    Array(...document.getElementsByClassName("solveForpHBtn")).forEach((btn) => {
        btn.addEventListener("click", () => getSelectionClicked());
    });

    document.getElementById("calcpH").addEventListener("click", () => {
        if(visibleDiv) {
            if(visibleDiv.id == "molarityInputs") {
                visibleDiv.querySelector("input").value != "" && visibleDiv.querySelector("#solveForMolarity").innerText != "Strong Acid or Base" 
                    ? calcpH() : false;
            } else {
                visibleDiv.querySelector("input").value != "" ? calcpH() : false;
            }
        }
    });
}

window.location.pathname == "/ApChemCalc/html/units/UnitEight.html" ? unitEightCalc() 
    : false;