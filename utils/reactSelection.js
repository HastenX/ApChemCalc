import {PVnRTClamp} from "/ApChemCalc/utils/lib/equations.js";
import {QMCTClamp} from "/ApChemCalc/utils/lib/equations.js";

const gasConstant = Number(0.08206);

let pvnrt;
let qmct;

function resetDiv() {
    document.querySelectorAll(".horizontalAlignBody").forEach((div) => {
        div.style.display = "flex";
    })
}

function checkIfEntered(... selectedContent) {
    selectedContent.forEach((content)=> {
        if(content.value == "") {
            return false;
        }
    })
    return true;
}

function pvnrtCalc() {
    let mole = document.getElementById("moleInput").value;
    let pres = document.getElementById("presInput").value;
    let temp = document.getElementById("tempInput").value;
    let vol = document.getElementById("volInput").value;

    pvnrt = new PVnRTClamp(mole,pres,temp,vol);

    switch(pvnrt.solveFor) {
        case "mole":
            document.getElementById("pvnrtOutput").textContent = "In order to calculate Moles of an Ideal Gas, we must use PV = nRT. We do this via dividing the equation"
                + " by RT to get n= (PV)/(RT). From there, we do (" +pvnrt.pres+"atm * "+pvnrt.vol +"L)/("+String(gasConstant)+"(atm*L)/(mol*°K)*"+pvnrt.temp+"°K), which equals to " +pvnrt.amount +"mol."
            document.getElementById("pvnrtAnwser").textContent = "Final Anwser: " + String(pvnrt.amount)+"mol";
            break;
        case "pres": 
            document.getElementById("pvnrtOutput").textContent = "In order to calculate Pressure of an Ideal Gas, we must use PV = nRT. We do this via dividing the equation"
                + " by V to get P = (nRT)/V. From there, we do ("+pvnrt.mole+"mol * "+String(gasConstant)+"(atm*L)/(mol*°K) * "+pvnrt.temp+"°K)/("+pvnrt.vol+"L), which equals to " + pvnrt.amount +"atm."
            document.getElementById("pvnrtAnwser").textContent = "Final Anwser: " + String(pvnrt.amount)+"atm";
            break;
        case "vol":
            document.getElementById("pvnrtOutput").textContent = "In order to calculate Volume of an Ideal Gas, we must use PV = nRT. We do this via dividing the equation"
                + " by P to get V = (nRT)/P. From there, we do ("+pvnrt.mole+"mol * "+String(gasConstant)+"(atm*L)/(mol*°K) * "+pvnrt.temp+"°K)/("+pvnrt.pres+"atm), which equals to " +pvnrt.amount +"L."
            document.getElementById("pvnrtAnwser").textContent = "Final Anwser: " + String(pvnrt.amount)+"L";
            break;
        case "temp":
            document.getElementById("pvnrtOutput").textContent = "In order to calculate Tempature of an Ideal Gas, we must use PV = nRT. We do this via dividing the equation"
                + " by RT to get T= (PV)/(Rn). From there, we do (" +pvnrt.pres+"atm * "+pvnrt.vol +"L)/("+String(gasConstant)+"(atm*L)/(mol*°K)*"+pvnrt.mole+"mol), which equals to " +pvnrt.amount +"°K."
            document.getElementById("pvnrtAnwser").textContent = "Final Anwser: " + String(pvnrt.amount)+"°K";
            break;
    }
}

function qmctCalc() {
    let heat = document.getElementById("heatInput").value;
    let mass = document.getElementById("massInput").value;
    let spec = document.getElementById("specInput").value;
    let temp = document.getElementById("tempInput").value;

    qmct = new QMCTClamp(heat, mass, spec, temp);

    switch(qmct.solveFor) {
        case "heat":
            document.getElementById("qmctOutput").textContent = "In order to calculate the Heat (J, Q) of a heat transfer (via Q=MC𝚫T), we must multiply"
                + "Mass * Specific Heat * Change in Tempature (" + String(qmct.mass) + "g * " + String(qmct.spec) + "J/(g*°C) * " + String(qmct.temp) + "°C), which equals "
                + String(qmct.amount) + "J";
                document.getElementById("qmctAnwser").textContent = "Final Anwser: " + String(qmct.amount)+"J";
            break;
        case "mass": 
            document.getElementById("qmctOutput").textContent = "In order to calculate the Mass (g, M) of a heat transfer (via Q=MC𝚫T), we must divide"
                + "Heat by Specific Heat and Change in Tempature (" + String(qmct.heat) + "J / (" + String(qmct.spec) + "J/(g*°C) * " + String(qmct.temp) + "°C)), which equals "
                + String(qmct.amount) + "g";
            document.getElementById("qmctAnwser").textContent = "Final Anwser: " + String(qmct.amount)+"g";
            break;
        case "spec":
            document.getElementById("qmctOutput").textContent = "In order to calculate the Specific Heat (J/(g*°C), C) of a heat transfer (via Q=MC𝚫T), we must divide"
                + "Heat by Mass and Change in Tempature (" + String(qmct.heat) + "J / (" + String(qmct.mass) + "g * " + String(qmct.temp) + "°C)), which equals "
                + String(qmct.amount) + "J/(g*°C)";
            document.getElementById("qmctAnwser").textContent = "Final Anwser: " + String(qmct.amount)+"J/(g*°C)";
            break;
        case "temp":
            document.getElementById("qmctOutput").textContent = "In order to calculate the Change in Tempature (°C, 𝚫T) of a heat transfer (via Q=MC𝚫T), we must divide"
                + "Heat by Mass and Specific Heat (" + String(qmct.heat) + "J / (" + String(qmct.mass) + "g * " + String(qmct.spec) + "J/(g*°C)), which equals "
                + String(qmct.amount) + "°C";
            document.getElementById("qmctAnwser").textContent = "Final Anwser: " + String(qmct.amount)+"°C";
    }
}

function unitThreeSelect() {
    let undisplayed;
    document.querySelectorAll(".solveForBtn").forEach((btn) => 
        btn.addEventListener("click", ()=> {
            document.querySelectorAll("#toggle").forEach((div)=> {
                if(div.querySelector(".largeText").textContent.includes(btn.textContent)) {
                    resetDiv();
                    div.style.display = "none";
                    div.querySelector("input").value = "";
                    undisplayed = div.querySelector(".largeText").textContent;
                }
            });
        })
    );

    document.getElementById("calcPVnRT").addEventListener("click",(() => {
        if(undisplayed) {
            if(undisplayed == "Moles(mol, n):") {
                checkIfEntered(
                    document.getElementById("volInput"),
                    document.getElementById("presInput"),
                    document.getElementById("tempInput")
                ) ? pvnrtCalc() : document.getElementById("pvnrtOutput").textContent = "Please select and fill in the required data before pressing calculate!";
                return;
            }
            if(undisplayed == "Pressure(atm, P):") {
                checkIfEntered(
                    document.getElementById("volInput"),
                    document.getElementById("moleInput"),
                    document.getElementById("tempInput")
                ) ? pvnrtCalc() : document.getElementById("pvnrtOutput").textContent = "Please select and fill in the required data before pressing calculate!";
                return;
            }
            if(undisplayed == "Tempature(°K, T):") {
                checkIfEntered(
                    document.getElementById("volInput"),
                    document.getElementById("presInput"),
                    document.getElementById("moleInput")
                ) ? pvnrtCalc() : document.getElementById("pvnrtOutput").textContent = "Please select and fill in the required data before pressing calculate!";
                return;
            }
            if(undisplayed == "Volume(L, V):") {
                checkIfEntered(
                    document.getElementById("moleInput"),
                    document.getElementById("presInput"),
                    document.getElementById("tempInput")
                ) ? pvnrtCalc() : document.getElementById("pvnrtOutput").textContent = "Please select and fill in the required data before pressing calculate!";
                return;
            }
        } else {
            document.getElementById("pvnrtOutput").textContent = "Please select and fill in the required data before pressing calculate!";
        }
    }));
}

function unitSixSelect() {
    let undisplayed;
    document.querySelectorAll(".solveForBtn").forEach((btn) => 
        btn.addEventListener("click", ()=> {
            document.querySelectorAll("#toggle").forEach((div)=> {
                if(div.querySelector(".largeText").textContent.includes(btn.textContent)) {
                    resetDiv();
                    div.style.display = "none";
                    div.querySelector("input").value = "";
                    undisplayed = div.querySelector(".largeText").textContent;
                }
            });
        })
    );

    document.getElementById("calcQMCT").addEventListener("click",(() => {
        if(undisplayed) {
            if(undisplayed == "Heat(J, Q):") {
                checkIfEntered(
                    document.getElementById("specInput"),
                    document.getElementById("massInput"),
                    document.getElementById("tempInput")
                ) ? qmctCalc() : document.getElementById("qmctOutput").textContent = "Please select and fill in the required data before pressing calculate!";
                return;
            }
            if(undisplayed == "Mass(g, m):") {
                checkIfEntered(
                    document.getElementById("specInput"),
                    document.getElementById("heatInput"),
                    document.getElementById("tempInput")
                ) ? qmctCalc() : document.getElementById("qmctOutput").textContent = "Please select and fill in the required data before pressing calculate!";
                return;
            }
            if(undisplayed == "Specific Heat(J/g*°C, c):") {
                checkIfEntered(
                    document.getElementById("specInput"),
                    document.getElementById("massInput"),
                    document.getElementById("heatInput")
                ) ? qmctCalc() : document.getElementById("qmctOutput").textContent = "Please select and fill in the required data before pressing calculate!";
                return;
            }
            if(undisplayed == "Tempature(°C, 𝚫T):") {
                checkIfEntered(
                    document.getElementById("specInput"),
                    document.getElementById("massInput"),
                    document.getElementById("heatInput")
                ) ? qmctCalc() : document.getElementById("qmctOutput").textContent = "Please select and fill in the required data before pressing calculate!";
                return;
            }
        } else {
            document.getElementById("pvnrtOutput").textContent = "Please select and fill in the required data before pressing calculate!";
        }
    }));
}


window.location.pathname == "/ApChemCalc/html/units/UnitThree.html" ? unitThreeSelect() 
    : false;

window.location.pathname == "/ApChemCalc/html/units/UnitSix.html" ? unitSixSelect() 
    : false;