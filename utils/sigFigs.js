export class SigFigs {
    sigFigs;
    output;
    
    userInputs;
    fixedInputs;

    constructor(...userInputs) {
        this.sigFigs = 999999999;
        this.fixedInputs = [];

        userInputs.forEach((num) => {
            

            // IF SIG FIG HAS DECIMAL
            if (String(num).includes(".")) {

                // IF SIG FIG HAS LEADING ZEROS
                if(String(num).at(0) == "0" || String(num).at(0) == ".") {
                    let fixedNum = num;

                    this.fixedInputs.push(String(num).replace(".","").length);
                    while (true) {
                        // ITERATES TO GET RID OF LEADING ZERO AND MAKES NUMBER TO BE USED
                        if(String(fixedNum).at(0) == "0" || String(fixedNum).at(0) == ".") {
                            fixedNum = fixedNum.slice(1);
                        } else {
                            this.fixedInputs.push(String(fixedNum).replace(".","").length);
                            break;
                        }
                    }
                } else {
                    // IF SIG FIG HAS ZEROS PAST DECIMAL POINT
                    this.fixedInputs.push(String(num).replace(".","").length);
                    return
                }
            } else {
                // IF SIG FIG HAS WHOLE NUMBER (NO DECIMAL), GET RID OF TRAILING ZEROS (USELESS)
                this.fixedInputs.push(String(num).replace(".","").replace("0","").length);
            }
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