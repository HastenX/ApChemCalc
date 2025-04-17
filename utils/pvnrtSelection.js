import {SigFigs} from "/ApChemCalc/utils/sigFigs.js";

const gasConstant = 0.08206;

let amount;

let sigFigs
let mole;
let pres;
let temp;
let vol;

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

function localClampSigFigs() {
    sigFigs.applySigFigs(mole);
    mole = sigFigs.output;

    sigFigs.applySigFigs(pres);
    pres = sigFigs.output;

    sigFigs.applySigFigs(temp);
    temp = sigFigs.output;

    sigFigs.applySigFigs(vol);
    vol = sigFigs.output;

    sigFigs.applySigFigs(amount);
    amount = sigFigs.output;    
}

function calc(solveFor) {
    console.log("cool")
    mole = document.getElementById("moleInput").value;
    pres = document.getElementById("presInput").value;
    temp = document.getElementById("tempInput").value;
    vol = document.getElementById("volInput").value;

    sigFigs = new SigFigs(mole,pres,temp,vol);

    switch(solveFor) {
        case "mole":
            amount = (Number(pres)*Number(vol))/(gasConstant*Number(temp));
            localClampSigFigs();
            document.getElementById("pvnrtOutput").textContent = "In order to calculate Moles of an Ideal Gas, we must use PV = nRT. We do this via dividing the equation"
                + " by RT to get n= (PV)/(RT). From there, we do (" +pres+"atm * "+vol +"L)/("+String(gasConstant)+"(atm*L)/(mol*°K)*"+temp+"°K), which equals to " +amount +"mol."
            document.getElementById("pvnrtAnwser").textContent = "Final Anwser: " + String(amount)+"mol";
            break;
        case "pres": 
            amount = (Number(mole)*gasConstant*Number(temp))/vol
            localClampSigFigs();
            document.getElementById("pvnrtOutput").textContent = "In order to calculate Pressure of an Ideal Gas, we must use PV = nRT. We do this via dividing the equation"
                + " by V to get P = (nRT)/V. From there, we do ("+mole+"mol * "+String(gasConstant)+"(atm*L)/(mol*°K) * "+temp+"°K)/("+vol+"L), which equals to " +amount +"atm."
            document.getElementById("pvnrtAnwser").textContent = "Final Anwser: " + String(amount)+"atm";
            break;
        case "vol": 
            amount = (Number(mole)*gasConstant*Number(temp))/pres
            localClampSigFigs();
            document.getElementById("pvnrtOutput").textContent = "In order to calculate Volume of an Ideal Gas, we must use PV = nRT. We do this via dividing the equation"
                + " by P to get V = (nRT)/P. From there, we do ("+mole+"mol * "+String(gasConstant)+"(atm*L)/(mol*°K) * "+temp+"°K)/("+pres+"atm), which equals to " +amount +"L."
            document.getElementById("pvnrtAnwser").textContent = "Final Anwser: " + String(amount)+"L";
            break;
        case "temp":
            amount = (Number(pres)*Number(vol))/(gasConstant*Number(mole));
            localClampSigFigs();
            document.getElementById("pvnrtOutput").textContent = "In order to calculate Tempature of an Ideal Gas, we must use PV = nRT. We do this via dividing the equation"
                + " by RT to get T= (PV)/(Rn). From there, we do (" +pres+"atm * "+vol +"L)/("+String(gasConstant)+"(atm*L)/(mol*°K)*"+mole+"mol), which equals to " +amount +"mol."
            document.getElementById("pvnrtAnwser").textContent = "Final Anwser: " + String(amount)+"°K";
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
                    undisplayed = div.querySelector(".largeText").textContent;
                    console.log(undisplayed);
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
                ) ? calc("mole") : document.getElementById("pvnrtOutput").textContent = "Please select and fill in the required data before pressing calculate!";
                return;
            }
            if(undisplayed == "Pressure(atm, P):") {
                checkIfEntered(
                    document.getElementById("volInput"),
                    document.getElementById("moleInput"),
                    document.getElementById("tempInput")
                ) ? calc("pres") : document.getElementById("pvnrtOutput").textContent = "Please select and fill in the required data before pressing calculate!";
                return;
            }
            console.log("Tempature(°K, T):")
            console.log(undisplayed)
            if(undisplayed == "Tempature(°K, T):") {
                checkIfEntered(
                    document.getElementById("volInput"),
                    document.getElementById("presInput"),
                    document.getElementById("moleInput")
                ) ? calc("temp") : console.log("failed")
                return;
            }
            if(undisplayed == "Volume(L, V):") {
                checkIfEntered(
                    document.getElementById("moleInput"),
                    document.getElementById("presInput"),
                    document.getElementById("tempInput")
                ) ? calc("vol") : document.getElementById("pvnrtOutput").textContent = "Please select and fill in the required data before pressing calculate!";
                return;
            }
        } else {
            document.getElementById("pvnrtOutput").textContent = "Please select and fill in the required data before pressing calculate!";
        }
    }));
}


window.location.pathname == "/ApChemCalc/html/units/UnitThree.html" ? unitThreeSelect() 
    : false;