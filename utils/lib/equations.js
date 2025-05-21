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