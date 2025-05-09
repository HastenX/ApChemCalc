export class SigFigs {
    sigFigs;
    output;
    
    userInputs;
    fixedInputs;

    constructor(...userInputs) {
        this.sigFigs = 999999999;
        this.fixedInputs = [];

        userInputs.forEach((num) => {
            let changedNum;
            let exponent = this.getCounterExponent(num);

            // COUNT LAST ZERO
            if (String(num).includes(".") 
                && Number(String(num).at(String(num).length-1)) == 0 
                && Number(Number(String(Number(num) * 10**exponent).replace(".","").length) <10)) {
                changedNum = String(num).concat("1");
                this.fixedInputs.push(Number(String(Number(changedNum) * 10**exponent).replace(".","").length-1));
                return;
            }

            // DEFAULT SET FOR SIG FIGS, PREENTS 17 FROM MAKING CODE NOT WORK
            // TODO: SET CORRECT AMOUNT IF SIG FIGS ARE LESS/ MORE THAN 2
            console.log(String(Number(num) * 10**exponent).replace(".","")> 10);
            this.fixedInputs.push(Number(Number(String(Number(num) * 10**exponent).replace(".","").length)) > 10 ? 
                String(num).replace(".","").length
                : Number(Number(String(Number(num) * 10**exponent).replace(".","").length)));
            console.log(this.fixedInputs)
        });
        this.sigFigs = Math.min(...this.fixedInputs);
    }

    getCounterExponent(clampNum) {
        let rawExponent = Math.log10(clampNum);
        let exponent;
        if (rawExponent == 0) {
            exponent = 0;
        }
        else {
            exponent = Math.floor(rawExponent) * -1;
        } 
        return exponent;
    }

    clamp(num) {
        return Math.round(num * Math.pow(10,this.sigFigs-1))/ Math.pow(10, this.sigFigs-1);
    }

    applySigFigs(clampNum) {
        let exponent = this.getCounterExponent(clampNum);
        this.output = this.clamp(clampNum*10**exponent);
        if (Number(String(this.output).length)-1 < this.sigFigs && !String(this.output).includes(".")) {
            this.output = String(this.output).concat(".");
        }
        while (Number(String(this.output).length)-1 < this.sigFigs) {
            this.output = String(this.output).concat("0");
        }

        this.output = String(this.output).concat("x10^" + String(-exponent));
    }
}