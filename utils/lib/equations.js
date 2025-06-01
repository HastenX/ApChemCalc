import {SigFigs} from "/ApChemCalc/utils/lib/sigFigs.js";

const gasConstant = Number(0.08206);
const faradayConstant = Number(96,485);

export class PVnRTClamp {
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
                this.sigFigs = new SigFigs(this.pres,this.mole,this.vol);
                this.solveFor = "temp";
                this.amount = Number(this.pres)*Number(this.vol)/(gasConstant*Number(this.mole))
                break;
            case this.vol:
                this.sigFigs = new SigFigs(this.pres,this.temp,this.mole);
                this.solveFor = "vol";
                this.amount = (gasConstant*Number(this.mole)*Number(this.temp)/Number(this.pres));
                break;
            default:
                console.error("error in switch");
        }
        this.sigFigs.applySigFigs(this.amount);
        this.amount = this.sigFigs.output;
    }
}

export class QMCTClamp {
    heat;
    mass;
    spec;
    temp;

    solveFor;
    amount;
    sigFigs;

    constructor (heat, mass, spec, temp) {

        this.heat = heat;
        this.mass = mass;
        this.spec = spec;
        this.temp = temp;

        this.solveFor = "";
        switch(this.solveFor) {
            case this.heat:
                this.sigFigs = new SigFigs(this.mass,this.temp,this.spec);
                this.solveFor = "heat";
                this.amount = Number(this.mass) * Number(this.temp) * Number(this.spec);
                break;
            case this.mass:
                this.sigFigs = new SigFigs(this.heat,this.temp,this.spec);
                this.solveFor = "mass"
                this.amount = Number(heat)/(Number(this.temp) * Number(this.spec));
                break;
            case this.spec:
                this.sigFigs = new SigFigs(this.heat,this.temp,this.mass);
                this.solveFor = "spec";
                this.amount = Number(heat)/(Number(this.temp) * Number(this.mass));
                break;
            case this.temp:
                this.sigFigs = new SigFigs(this.heat,this.mass,this.spec);
                this.solveFor = "temp";
                this.amount = Number(heat)/(Number(this.spec) * Number(this.mass));
                break;
            default:
                console.error("error in switch");
        }
        this.sigFigs.applySigFigs(this.amount);
        this.amount = this.sigFigs.output;
    }
}


export class GHTSClamp {
    freeEnergy;
    enthapy;
    temp;
    entrophy;

    solveFor;
    amount;
    sigFigs;

    constructor (freeEnergy, enthapy, temp, entrophy) {

        this.freeEnergy = freeEnergy;
        this.enthapy = enthapy;
        this.temp = temp;
        this.entrophy = entrophy;

        this.solveFor = "";
        switch(this.solveFor) {
            case this.freeEnergy:
                this.sigFigs = new SigFigs(this.enthapy,this.temp,this.entrophy);
                this.solveFor = "freeEnergy";
                this.amount = Number(this.enthapy) - (Number(this.temp) * Number(this.entrophy));
                break;
            case this.enthapy:
                this.sigFigs = new SigFigs(this.freeEnergy,this.temp,this.enthapy);
                this.solveFor = "enthapy"
                this.amount = Number(this.freeEnergy)+(Number(this.temp) * Number(this.entrophy));
                break;
            case this.temp:
                this.sigFigs = new SigFigs(this.entrophy,this.enthapy,this.freeEnergy);
                this.solveFor = "temp";
                this.amount = Number(-Number(this.freeEnergy)+this.enthapy)/Number(this.entrophy);
                break;
            case this.entrophy:
                this.sigFigs = new SigFigs(this.enthapy,this.freeEnergy,this.temp);
                this.solveFor = "entrophy";
                this.amount = Number(-Number(this.freeEnergy)+this.enthapy)/Number(this.temp);
                break;
            default:
                console.error("error in switch");
        }
        this.sigFigs.applySigFigs(this.amount);
        this.amount = this.sigFigs.output;
    }
}

export class GnFEClamp {
    freeEnergy;
    mol;
    energy;

    solveFor;
    amount;
    sigFigs;

    constructor (freeEnergy, mol, energy) {
        this.freeEnergy = freeEnergy;
        this.mol = mol;
        this.energy = energy;

        this.solveFor = "";
        switch(this.solveFor) {
            case this.freeEnergy:
                this.sigFigs = new SigFigs(this.mol, this.energy);
                this.solveFor = "freeEnergy";
                this.amount = -Number(this.mol) * faradayConstant * Number(this.energy);
                console.log(this.amount)
                break;
            case this.mol:
                this.sigFigs = new SigFigs(this.freeEnergy, this.energy);
                this.solveFor = "mol"
                this.amount = -Number(this.freeEnergy)/Number(faradayConstant * Number(this.energy));
                break;
            case this.energy:
                this.sigFigs = new SigFigs(this.mol, this.freeEnergy);
                this.solveFor = "energy";
                this.amount = -Number(this.freeEnergy)/Number(faradayConstant * Number(this.mol));
                break;
            default:
                console.error("error in switch");
        }
        this.sigFigs.applySigFigs(this.amount);
        this.amount = this.sigFigs.output;
        console.log(this.amount)
    }
}

export class EqualibriumRxn {
    reactAmount;
    prodAmount;

    reactU;
    reactV;
    reactW;

    reactUOrder;
    reactVOrder;
    reactWOrder;

    prodX;
    prodY;
    prodZ;

    prodXOrder;
    prodYOrder;
    prodZOrder;

    kc;
    solveFor;

    sigFigs;
    x; 

    constructor(reactAmount, prodAmount, kc, solveFor) {
        this.reactAmount = reactAmount;
        this.prodAmount = prodAmount;

        this.kc = kc;
        this.solveFor = solveFor;
    }

    setReactants(reactU, reactUOrder, reactV, reactVOrder, reactW, reactWOrder) {
        this.reactU = reactU;
        this.reactUOrder = reactUOrder;

        this.reactV != "" ? this.reactV = reactV : this.reactV = 1; 
        this.reactVOrder != "" ? this.reactVOrder = reactVOrder : this.reactVOrder = 0; 

        this.reactW != "" ? this.reactW = reactW : this.reactW = 1; 
        this.reactWOrder != "" ? this.reactWOrder = reactWOrder : this.reactWOrder = 0;  
    }

    setProducts(prodX, prodXOrder, prodY, prodYOrder, prodZ, prodZOrder) {
        this.prodX = prodX;
        this.prodXOrder = prodXOrder;

        this.prodY != "" ? this.prodY = prodY : this.prodY = 1; 
        this.prodYOrder != "" ? this.prodYOrder = prodYOrder : this.prodYOrder = 0; 

        this.prodZ != "" ? this.prodZ = prodZ : this.prodZ = 1; 
        this.prodZOrder != "" ? this.prodZOrder = prodZOrder : this.prodZOrder = 0; 
    }

    getX(isReactent) {
        return isReactent ? (
            Math.pow((((this.prodX**this.prodXOrder)*(this.prodY**this.prodYOrder)*(this.prodZ**this.prodZOrder))
                /(this.kc*(
                    (this.reactUOrder == 0 ? 1 : this.reactUOrder**this.reactUOrder) *
                    (this.reactVOrder == 0 ? 1 : this.reactVOrder**this.reactVOrder) *
                    (this.reactWOrder == 0 ? 1 : this.reactWOrder**this.reactWOrder)
                )))
                ,1/(Number(this.reactUOrder)+Number(this.reactVOrder)+Number(this.reactWOrder)))
            ) :
            Math.pow(((this.kc*(this.reactU**this.reactUOrder)*(this.reactV**this.reactVOrder)*(this.reactW**this.reactWOrder))
                /((
                    (this.prodXOrder == 0 ? 1 : this.prodXOrder**this.prodXOrder) *
                    (this.prodYOrder == 0 ? 1 : this.prodYOrder**this.prodYOrder) *
                    (this.prodZOrder == 0 ? 1 : this.prodZOrder**this.prodZOrder)
                )))
                ,1/(Number(this.prodXOrder)+Number(this.prodYOrder)+Number(this.prodZOrder)))
    }

    calc() {
        this.sigFigs = new SigFigs(
            this.reactU, this.reactV, this.reactW,
            this.prodX, this.prodY, this.prodZ,
            this.kc
        )

        switch(this.solveFor) {
            case "Kc":
                this.sigFigs.applySigFigs(((this.prodX**this.prodXOrder)*(this.prodY**this.prodYOrder)*(this.prodZ**this.prodZOrder))
                    /((this.reactU**this.reactUOrder)*(this.reactV**this.reactVOrder)*(this.reactW**this.reactWOrder)));
                this.kc = this.sigFigs.output;
                break; 
            case "Reactants":
                this.x= this.getX(true);
                if(this.reactAmount >= 1) {
                    this.sigFigs.applySigFigs((this.reactUOrder)*this.x);
                    this.reactU = this.sigFigs.output;
                } else {
                    console.error("Error in reactAmount")
                }
                if(this.reactAmount >= 2) {
                    this.sigFigs.applySigFigs((this.reactVOrder)*this.x);
                    this.reactV = this.sigFigs.output;
                }
                if(this.reactAmount >= 3) {
                    this.sigFigs.applySigFigs((this.reactWOrder)*this.x);
                    this.reactW = this.sigFigs.output;
                }
                break;
            case "Products":
                this.x= this.getX(false);
                if(this.prodAmount >= 1) {
                    this.sigFigs.applySigFigs((this.prodXOrder)*this.x);
                    this.prodX = this.sigFigs.output;
                } else {
                    console.error("Error in prodAmount")
                }
                if(this.prodAmount >= 2) {
                    this.sigFigs.applySigFigs((this.prodYOrder)*this.x);
                    this.prodY = this.sigFigs.output;
                }
                if(this.prodAmount >= 3) {
                    this.sigFigs.applySigFigs((this.prodZOrder)*this.x);
                    this.prodZ = this.sigFigs.output;
                }
                break;
            default:
                console.error("Error in aligning switch to solveFor");
                break;
        }
    }
}

export class pHCalc {
    pH;
    pOH;
    molarityType;

    molarityH;
    molarityOH;

    constructor(pH, pOH, molarity, molarityType) {
        this.pH = pH;
        this.pOH = pOH
        this.molarity = molarity;
        this.molarityType = molarityType;

        let pHSigFigs = new SigFigs(pH, pOH, molarity, molarityType);
        let molarityFig = new SigFigs(pH, pOH, molarity, molarityType);

        let pOHSigFigs = new SigFigs(pH, pOH, molarity, molarityType);;

        if(this.pH != undefined) {
            for(let i=1; i<= String(this.pH).split(".")[0].length; i++) {
                molarityFig.removeSigFig();
            }

            pOHSigFigs.sigFigs = (String(14-this.pH).split(".")[0] +String(this.pH).split(".")[1]).length;

            molarityFig.applySigFigs(Number(10**(-Number(this.pH))));
            this.molarityH = molarityFig.output;

            molarityFig.applySigFigs(Number(10**(-Number(14-Number(this.pH)))));
            this.molarityOH = molarityFig.output;

            pOHSigFigs.applySigFigs(Number(14-Number(this.pH)))
            this.pOH = pOHSigFigs.output

            pHSigFigs.applySigFigs(this.pH)
            this.pH = pHSigFigs.output
            return;
        }
        if(this.pOH != undefined) {
            for(let i=1; i<= String(this.pOH).split(".")[0].length; i++) {
                molarityFig.removeSigFig();
            }
            pHSigFigs.sigFigs = (String(14-this.pOH).split(".")[0] +String(this.pOH).split(".")[1]).length;

            molarityFig.applySigFigs(Number(10**(-Number(this.pOH))));
            this.molarityOH = molarityFig.output;

            molarityFig.applySigFigs(Number(10**(-Number(14-Number(this.pOH)))));
            this.molarityH = molarityFig.output;

            pHSigFigs.applySigFigs(Number(14-Number(this.pOH)))
            this.pH = pHSigFigs.output

            pOHSigFigs.applySigFigs(this.pOH)
            this.pOH = pOHSigFigs.output
            return;
        }
        if(String(this.molarityType) == ("Strong Base")) {
            let temppH = Number(14-Number(-Math.log10(Number(this.molarity))));
            let temppOH = Number(Number(-Math.log10(Number(this.molarity))));
            for(let i=1; i<= String(temppOH).split(".")[0].length; i++) {
                pOHSigFigs.removeSigFig();
            }

            pHSigFigs.sigFigs = Number(String(temppH).split(".")[0].length +molarityFig.sigFigs);
            pOHSigFigs.sigFigs = Number(String(temppOH).split(".")[0].length +molarityFig.sigFigs);

            pHSigFigs.applySigFigs(Number(14-Number(-Math.log10(Number(this.molarity)))));
            this.pH = pHSigFigs.output;

            pOHSigFigs.applySigFigs(Number(Number(-Math.log10(Number(this.molarity)))));
            this.pOH = pOHSigFigs.output;

            molarityFig.applySigFigs(Number(10**(-Number(14-Number(Number(-Math.log10(Number(this.molarity))))))));
            this.molarityH = molarityFig.output;

            molarityFig.applySigFigs(Number(10**(-Number(Number(Number(-Math.log10(Number(this.molarity))))))));
            this.molarityOH = molarityFig.output;
            return;
        }
        if(String(this.molarityType) == ("Strong Acid")) {
            let temppOH = Number(14-Number(-Math.log10(Number(this.molarity))));
            let temppH = Number(Number(-Math.log10(Number(this.molarity))));
            for(let i=1; i<= String(temppOH).split(".")[0].length; i++) {
                pOHSigFigs.removeSigFig();
            }

            pHSigFigs.sigFigs = Number(String(temppH).split(".")[0].length +molarityFig.sigFigs);
            pOHSigFigs.sigFigs = Number(String(temppOH).split(".")[0].length +molarityFig.sigFigs);

            pOHSigFigs.applySigFigs(Number(14-Number(-Math.log10(Number(this.molarity)))));
            this.pOH = pOHSigFigs.output;

            pHSigFigs.applySigFigs(Number(Number(-Math.log10(Number(this.molarity)))));
            this.pH = pHSigFigs.output;

            molarityFig.applySigFigs(Number(10**(-Number(14-Number(Number(-Math.log10(Number(this.molarity))))))));
            this.molarityOH = molarityFig.output;

            molarityFig.applySigFigs(Number(10**(-Number(Number(Number(-Math.log10(Number(this.molarity))))))));
            this.molarityH = molarityFig.output;
            return;
        }
        console.log("Error in calc pH");
    }
}