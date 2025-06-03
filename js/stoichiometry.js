import {SigFigs} from "/ApChemCalc/js/lib/sigFigs.js";

const avogradoConstant = 6.022 * 10**23;
const litterConstant = 22.4;

class Grams {
    molarMass;
    amount;
    constructor (molarMass, amount) {
        this.molarMass = molarMass;
        this.amount = amount;
    }

    calc(object) {
        this.amount = object.amount * object.molarMass;
    }
}

class Litters {
    molarMass;
    amount;
    constructor (molarMass, amount) {
        this.molarMass = molarMass;
        this.amount = amount;
    }

    calc(object) {
        this.amount = object.amount * litterConstant
    }
}

class Molecules {
    molarMass;
    amount;
    constructor (molarMass, amount) {
        this.molarMass = molarMass;
        this.amount = amount;
    }

    calc(object) {
        this.amount = object.amount * avogradoConstant;
    }
}

class Molarity {
    // MOLARITY = MOLES/LITERS
    liters;
    moles;
    amount;
    // TODO: ALWAYS USE UNDEFINED FOR UNKNOWN THING (AS PARAMETER)
    constructor (liters, moles, amount) {
        this.liters = liters;
        this.moles = moles;
        this.amount = amount;
        this.setUnknownUnit();
    }

    setUnknownUnit () {
        if (this.liters == undefined) {
            this.liters = this.moles/this.amount;
            return;
        }
        if (this.moles == undefined) {
            this.moles = this.amount*this.liters
            return;
        }
        if (this.amount == undefined) {
            this.amount = this.moles/this.liters
            return;
        }
    }

    calc(object, liters) {
        this.amount = object.amount/liters;
    }
}

class Moles {
    molarMass;
    amount;
    constructor (molarMass, amount) {
        this.molarMass = molarMass;
        this.amount = amount;
    }

    calc(object) {
        this.molarMass = object.molarMass;
        if(object instanceof Grams) {
            this.amount = object.amount/object.molarMass;
        }
        if (object instanceof Litters) {
            this.amount = object.amount/litterConstant;
        }
        if(object instanceof Molecules) {
            this.amount = object.amount/avogradoConstant;
        }
        if(object instanceof Molarity) {
            this.amount = object.amount * object.liters;
        }
    }
}

function resetSpecInputVisibilty(rid) {
    document.querySelectorAll("#visible").forEach((div) => {
        if(div.className.includes(rid)) {
            div.id = "invisible";
        }
    });
}

function isVisibleEntered() {
    let finalBoolean;
    document.querySelectorAll("#visible").forEach((div)=> {
        if(String(div.querySelector(".largeNumberInput").value) == "") {
            finalBoolean = false;
        }
    });
    if(finalBoolean == undefined) {
        return true;
    }
    return false
}

function setInputVisibilty(btnType) {
    // SIGNS FOR PRESENT: mol, M & g
    document.querySelectorAll(btnType).forEach((btn) => 
        btn.addEventListener("click", ()=> {

            if(btnType == ".reactUnitBtn") {
                resetSpecInputVisibilty("react");
            }
            if(btnType == ".prodUnitBtn") {
                resetSpecInputVisibilty("prod");
            }

            if(btn.textContent == "Moles(mol)") {
                document.querySelectorAll("#invisible").forEach((div)=> {
                    if(div.querySelector("#moleInput") && btnType == ".reactUnitBtn") {
                        div.id = "visible";
                    }
                });
            }

            if(btn.textContent == "Molarity(M)") {
                document.querySelectorAll("#invisible").forEach((div)=> {

                    if(div.querySelector("#molarityInput") && btnType == ".reactUnitBtn") {
                        div.id = "visible";
                    }

                    if(div.querySelector("#literReactInput") && btnType == ".reactUnitBtn") {
                        div.id = "visible";
                    }

                    if(div.querySelector("#literProdInput") && btnType == ".prodUnitBtn") {
                        div.id = "visible";
                    }
                });
            }

            if(btn.textContent == "Grams(g)") {
                document.querySelectorAll("#invisible").forEach((div)=> {
                    if(div.querySelector("#gramInput") && btnType == ".reactUnitBtn") {
                        div.id = "visible"
                    }
                    if(div.querySelector("#molarMassReactInput") && btnType == ".reactUnitBtn") {
                        div.id = "visible"
                    }
                    if(div.querySelector("#molarMassProdInput") && btnType == ".prodUnitBtn") {
                        div.id = "visible"
                    }
                });     
            }
        })
    );
}

function unitOneCalc() {
    document.getElementById("calcBtn").addEventListener("click", ()=> {
        let react = document.getElementById("reactConversion").textContent;
        let prod = document.getElementById("prodConversion").textContent;

        let molarMass = String(document.getElementById("molarMassInput").value);
        let amount = String(document.getElementById("conversionInput").value);
        
        let sigFigs = new SigFigs(molarMass,amount);

        let mol = new Moles(0,0);
        let unknownUnit;
        let total;

        let finalString = "In order to find "+ prod + " from "+ react + ", you start with converting to Moles. ";

        if(react != "Starting Unit" 
            && react != "0"
            && prod != "Converted Unit" 
            && prod != "0"
            && molarMass != ""
            && amount != ""
            && !String(molarMass).includes("NaN")
            && !String(amount).includes("NaN")
        ) {

            switch(react) {
                case "Moles(mol)" :
                    sigFigs.applySigFigs(amount);
                    finalString = finalString.concat("Because we don't have to convert to Moles (as we start off with " + sigFigs.output+"Moles(mol)), we directly ");
                    mol = new Moles(molarMass,amount)
                    break;
                case "Grams(g)" :
                    sigFigs.applySigFigs(amount);
                    finalString = finalString.concat("dividing the Grams (" + sigFigs.output + "g) by the Molar Mass (")

                    sigFigs.applySigFigs(molarMass);
                    finalString = finalString.concat(sigFigs.output +"g/mol) to convert to Moles. Then, ");

                    unknownUnit = new Grams(molarMass,amount);
                    mol.calc(unknownUnit);
                    break;
                case "Liters(L)" :
                    sigFigs.applySigFigs(amount);
                    finalString = finalString.concat("dividing the Liters (" + sigFigs.output+ "L) by the Liter constant (22.4L) to convert to Moles. Then, ");
                    unknownUnit = new Litters(molarMass,amount);
                    mol.calc(unknownUnit);
                    break;
                case "Molecules" :
                    sigFigs.applySigFigs(amount);
                    finalString = finalString.concat("dividing the Molecules (" + sigFigs.output+ " Molecules) by Avogradro's constant (6.022 x 10^23 Molecules/mol) to convert to moles. Then, ");
                    unknownUnit = new Molecules(molarMass,amount);
                    mol.calc(unknownUnit);
                    break;           
            }

            switch(prod) {
                case "Moles(mol)" :
                    finalString = finalString.concat("you have your awnser in moles!\n")
                    total = mol;
                    break;
                case "Grams(g)" :
                    sigFigs.applySigFigs(molarMass);
                    finalString = finalString.concat("convert the Moles into Grams via multiplying the compound's Moles by its Molar Mass ("+sigFigs.output+"g/mol) to get the compound's Grams!\n")
                    total = new Grams();
                    break;
                case "Liters(L)" :
                    finalString = finalString.concat("convert the Moles into Liters via multiplying the compound's Moles by the Liter constant (22.4L) to get the compound's Liters!\n");
                    total = new Litters();
                    break;
                case "Molecules" :
                    finalString = finalString.concat("convert the Moles into Liters via multiplying the compound's Moles by Avogadro's constant (6.022 x 10^23 Molecules/mol) to get the element's Molecules!\n");
                    total = new Molecules();
                    break;   
            }
            total.calc(mol);
            sigFigs.applySigFigs(total.amount);
            document.querySelector("#conversionOutput").textContent = finalString.concat("\nFinal Anwser: ", sigFigs.output," ", prod);
        }

        if (
            String(molarMass).includes("NaN")
            || String(amount).includes("NaN")
        )   {
            document.querySelector("#conversionOutput").textContent = "Enter conversion data above!";
        }
    });
}

function unitFourCalc() {
    let visibleList = [];
    let moleTransfer = new Moles(0,0);
    let unknownUnit;

    let coefficentOne;
    let coefficentTwo;
    let coefficentThree;
    let coefficentFour;

    let moles;
    let molarity;
    let grams;

    let reactMolarMass;
    let reactLiters;

    let prodMolarMass;
    let prodLiters;

    let sigFigs;

    let excess;
    let limit;

    setInputVisibilty(".reactUnitBtn");
    setInputVisibilty(".prodUnitBtn");

    let react;
    let prod;

    let finalString;

    document.getElementById("calcConversion").addEventListener("click", ()=> {
        react =  document.getElementById("reactUnit").textContent;
        prod =  document.getElementById("prodUnit").textContent;

        finalString = "In order to find "+ prod + " from "+ react + ", from the reactents a + b to the products c + d, you start with converting the reactents to Moles. ";
        coefficentOne = Number(document.getElementById("coefficentOne").value);
        coefficentTwo = Number(document.getElementById("coefficentTwo").value);
        coefficentThree =Number(document.getElementById("coefficentThree").value);
        coefficentFour = Number(document.getElementById("coefficentFour").value);

        moles = document.getElementById("moleInput").value;
        molarity = document.getElementById("molarityInput").value;
        grams = document.getElementById("gramInput").value;
        reactLiters = document.getElementById("literReactInput").value;
        reactMolarMass = document.getElementById("molarMassReactInput").value;

        prodLiters = document.getElementById("literProdInput").value;
        prodMolarMass = document.getElementById("molarMassProdInput").value;

        excess = coefficentOne > coefficentTwo ? "B" : "A";
        limit = coefficentOne > coefficentTwo ? "A" : "B";
        
        if(isVisibleEntered()
            && coefficentOne >0
            && coefficentTwo >0
            && coefficentThree >0
            && coefficentFour >0
            && document.getElementById("reactUnit").textContent != "Starting Unit"
            && document.getElementById("prodUnit").textContent != "Product Unit"
        ) {
            document.querySelectorAll("#visible").forEach((div) => {
                visibleList.push(div.querySelector("input").value);
            });
            sigFigs = new SigFigs(...visibleList);

            switch(react) {
                case "Moles(mol)":
                    sigFigs.applySigFigs(moles);
                    finalString = finalString.concat("Due to already being in Moles ("+sigFigs.output+"mol), we simpy just multiply by the mole ratio.");
                    moleTransfer = new Moles(reactMolarMass,moles);
                    break;
                case "Grams(g)":
                    unknownUnit = new Grams(reactMolarMass,grams);
                    moleTransfer.calc(unknownUnit);
                    sigFigs.applySigFigs(moleTransfer.amount);
                    finalString = finalString.concat("To calculate from grams to moles, we simply just divide the grams by the molar mass ("+grams+"g/"+reactMolarMass+"(g/mol)), giving us "+sigFigs.output+"mol. We simply then multiply by the mole ratio.");
                    break;
                case "Molarity(M)":
                    unknownUnit = new Molarity(reactLiters,moles,molarity);
                    moleTransfer.calc(unknownUnit);
                    sigFigs.applySigFigs(moleTransfer.amount);
                    finalString = finalString.concat("To calculate from Molarity to moles, we simply just multiple the moles by the liters ("+unknownUnit.moles+"mol*"+unknownUnit.liters+"l), giving us "+sigFigs.output+"mol. We simply then multiply by the mole ratio.");
                    break;
            }
            if(coefficentOne == coefficentTwo) {
                finalString = finalString.concat(" Since both A and B have equal coefficents (" + String(coefficentOne) + "=" + String(coefficentTwo) + "), there will be no limiting or excess reactents (as they will both be completely used).");
            }
            if(coefficentOne > coefficentTwo) {
                finalString = finalString.concat(" Since "+ limit+" has a greater coefficent (" + String(coefficentOne) + ">" + String(coefficentTwo) + "), "+limit +" will be the limiting reactactent and "+excess+" will be in excess.");
            }
            if(coefficentOne < coefficentTwo) {
                finalString = finalString.concat(" Since "+ limit+" has a greater coefficent (" + String(coefficentTwo)+ ">" + String(coefficentOne) + "), "+limit +" will be the limiting reactactent and "+excess+" will be in excess.");
            }
            finalString = finalString.concat("This means that we will divide by the coeffiecent of "+limit+ " (" + String(limit == "A" ? coefficentOne : coefficentTwo)+"). We will then multiple by " +String(coefficentThree) + " and " +String(coefficentFour) + " to get C and B respectivly. ");
            if(coefficentOne!= coefficentTwo) {
                sigFigs.applySigFigs((coefficentOne > coefficentTwo ? String(Math.abs((moleTransfer.amount * (coefficentTwo/coefficentOne))-moleTransfer.amount)) : String(Math.abs((moleTransfer.amount * (coefficentOne/coefficentTwo))-moleTransfer.amount))))
                finalString = finalString.concat("Please not that there will be " + sigFigs.output  + "mol leftover of "+excess+" (calulating via subtracting the moles that didn't react v. the moles that did). ")
            }
            sigFigs.applySigFigs(moleTransfer.amount)
            finalString = finalString.concat("Multiplying the calculated moles ("+sigFigs.output+"mol) by the coefficents of C and D gets us ");
            sigFigs.applySigFigs((moleTransfer.amount* coefficentThree));
            finalString = finalString.concat(String(sigFigs.output) + "mol and "); 
            sigFigs.applySigFigs((moleTransfer.amount* coefficentFour));
            finalString = finalString.concat((String(sigFigs.output)+"mol."));

            switch(prod) {
                case "Moles(mol)":
                    unknownUnit = moleTransfer;
                    break;
                case "Grams(g)":
                    sigFigs.applySigFigs(moleTransfer.amount*coefficentThree);
                    finalString = finalString.concat("To calculate from moles to grams, we simply just multiply the moles by the molar mass ("+String(sigFigs.output)+"mol or ")
                    
                    sigFigs.applySigFigs(moleTransfer.amount*coefficentFour);
                    finalString = finalString.concat(String(sigFigs.output) +"mol/"+String(prodMolarMass)+"(g/mol)), giving us ");
                    
                    sigFigs.applySigFigs((moleTransfer.amount*coefficentThree)/prodMolarMass);
                    finalString = finalString.concat(String(sigFigs.output)+"g for C or ");
                    
                    sigFigs.applySigFigs((moleTransfer.amount*coefficentFour)/prodMolarMass);
                    finalString = finalString.concat(String(sigFigs.output)+"g for D.");
                    break;
                case "Molarity(M)":
                    sigFigs.applySigFigs(moleTransfer.amount*coefficentThree);
                    finalString = finalString.concat("To calculate from moles to molarity, we simply just divide the moles by the volume ("+String(sigFigs.output)+"mol/"+prodLiters+"L or ")
                    
                    sigFigs.applySigFigs(moleTransfer.amount*coefficentFour)
                    finalString = finalString.concat(String(sigFigs.output) +"mol/"+prodLiters+"L), giving us ");

                    sigFigs.applySigFigs((moleTransfer.amount*coefficentThree)/prodLiters);
                    finalString = finalString.concat(String(sigFigs.output)+"M for C or ");
                    
                    sigFigs.applySigFigs((moleTransfer.amount*coefficentFour)/prodLiters);
                    finalString = finalString.concat(String(sigFigs.output)+"M for D.");
                    break;
            }

            document.getElementById("conversion").textContent = finalString;
            visibleList = [];
        }
    });
}

window.location.pathname == "/ApChemCalc/html/units/UnitOne.html" ? unitOneCalc() 
    : false;

window.location.pathname == "/ApChemCalc/html/units/UnitFour.html" ? unitFourCalc() 
    : false;