import {SigFigs} from "/utils/sigFigs.js";

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
    }
}

function unitOneCalc() {
    document.querySelector(".calcBtn").addEventListener("click", ()=> {
        let react = document.getElementById("reactConversion").textContent;
        let prod = document.getElementById("prodConversion").textContent;

        let molarMass = String(document.getElementById("molarMassInput").value);
        let amount = String(document.getElementById("conversionInput").value);

        let sigFigs = new SigFigs(molarMass,amount);

        sigFigs.applySigFigs(molarMass);
        molarMass = String(sigFigs.output);

        sigFigs.applySigFigs(amount);
        amount = String(sigFigs.output);

        let mol = new Moles(0,0);
        let unknownUnit;
        let total;

        let finalString = "In order to find "+ prod + " from "+ react + ", you start with: ";

        if(react != "Starting Unit" 
            && react != "0"
            && prod != "Converted Unit" 
            && prod != "0"
            && molarMass != ""
            && amount != "") {
            
            molarMass = parseFloat(molarMass);
            amount = parseFloat(amount);
            console.log(molarMass,amount)    

            switch(react) {
                case "Moles(mol)" :
                    sigFigs.applySigFigs(amount);
                    finalString = finalString.concat("since we don't  sigFigs.output + ");
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
                    finalString = finalString.concat("convert the Moles into Grams via multiplying by the compound's Molar Mass ("+sigFigs.output+"g/mol) to get the compound's Grams!\n")
                    total = new Grams();
                    break;
                case "Liters(L)" :
                    finalString = finalString.concat("convert the Moles into Liters via multiplying by Liter constant (22.4L) to get the compound's Liters!\n");
                    total = new Litters();
                    break;
                case "Molecules" :
                    finalString = finalString.concat("convert the Moles into Liters via multiplying by Avogadro's constant (6.022 x 10^23 Molecules/mol) to get the element's Molecules!\n");
                    total = new Molecules();
                    break;   
            }
            total.calc(mol);
            sigFigs.applySigFigs(total.amount);
            document.querySelector("#conversionOutput").textContent = finalString.concat("\nFinal Anwser: ", sigFigs.output," ", prod);
        }
    });
}

window.location.pathname == "/html/units/UnitOne.html" ? unitOneCalc() 
    : false;