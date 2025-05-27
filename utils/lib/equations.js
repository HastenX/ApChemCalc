import {SigFigs} from "/ApChemCalc/utils/lib/sigFigs.js";

const gasConstant = Number(0.08206);

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
                console.log("error in switch");
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
                console.log("error in switch");
        }
        this.sigFigs.applySigFigs(this.amount);
        this.amount = this.sigFigs.output;
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
            Math.pow(((this.kc*(this.reactU**this.reactUOrder)*(this.reactV**this.reactVOrder)*(this.reactU**this.reactUOrder))
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