import {SigFigs} from "/ApChemCalc/utils/sigFigs.js";

const gasConstant = Number(0.08206);

let pvnrt

class pvnrtClamp {
    mole;
    pres;
    temp;
    vol;

    solveFor;
    amount;
    sigFigs;

    constructor (mole, pres, temp, vol) {

        this.mole = mole;
        this.pres = pres;
        this.temp = temp;
        this.vol = vol;

        this.solveFor = "";
        switch(this.solveFor) {
            case this.mole:
                this.sigFigs = new SigFigs(this.pres,this.temp,this.vol);
                this.solveFor = "mole";
                this.amount = (Number(this.pres)*Number(this.vol))/(gasConstant*Number(this.temp));
                break;
            case this.pres:
                this.sigFigs = new SigFigs(this.mole,this.temp,this.vol);
                this.solveFor = "pres"
                this.amount = (Number(this.mole)*gasConstant*Number(this.temp))/this.vol
                break;
            case this.temp:
                this.sigFigs = new SigFigs(this.pres,this.pres,this.vol);
                this.solveFor = "temp";
                this.amount = Number(this.pres)*Number(this.vol)/(gasConstant*Number(this.mole))
                break;
            case this.vol:
                this.sigFigs = new SigFigs(this.pres,this.temp,this.mole);
                this.solveFor = "vol";
                this.amount = (gasConstant*Number(this.mole)*Number(this.temp)/Number(this.pres));
                break;
            default:
                console.log("error in switch");
        }
        this.sigFigs.applySigFigs(this.amount);
        this.amount = this.sigFigs.output;
    }
}

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

function calc() {
    let mole = document.getElementById("moleInput").value;
    let pres = document.getElementById("presInput").value;
    let temp = document.getElementById("tempInput").value;
    let vol = document.getElementById("volInput").value;

    pvnrt = new pvnrtClamp(mole,pres,temp,vol);

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
                ) ? calc() : document.getElementById("pvnrtOutput").textContent = "Please select and fill in the required data before pressing calculate!";
                return;
            }
            if(undisplayed == "Pressure(atm, P):") {
                checkIfEntered(
                    document.getElementById("volInput"),
                    document.getElementById("moleInput"),
                    document.getElementById("tempInput")
                ) ? calc() : document.getElementById("pvnrtOutput").textContent = "Please select and fill in the required data before pressing calculate!";
                return;
            }
            if(undisplayed == "Tempature(°K, T):") {
                checkIfEntered(
                    document.getElementById("volInput"),
                    document.getElementById("presInput"),
                    document.getElementById("moleInput")
                ) ? calc() : document.getElementById("pvnrtOutput").textContent = "Please select and fill in the required data before pressing calculate!";
                return;
            }
            if(undisplayed == "Volume(L, V):") {
                checkIfEntered(
                    document.getElementById("moleInput"),
                    document.getElementById("presInput"),
                    document.getElementById("tempInput")
                ) ? calc() : document.getElementById("pvnrtOutput").textContent = "Please select and fill in the required data before pressing calculate!";
                return;
            }
        } else {
            document.getElementById("pvnrtOutput").textContent = "Please select and fill in the required data before pressing calculate!";
        }
    }));
}


window.location.pathname == "/ApChemCalc/html/units/UnitThree.html" ? unitThreeSelect() 
    : false;