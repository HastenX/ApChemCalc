export class SigFigs {
    sigFigs;
    userInputs;
    output;

    constructor(...userInputs) {
        this.sigFigs = 999999999;
        userInputs.forEach((num) => {
            let changedNum;
            let exponent = this.getCounterExponent(num);

            // COUNT PRE-DECIMAL ZEROS
            // if (Number(String(num).at(String(num).length)) == ".") {
            //     changedNum = String(num).concat("1");
            //     this.challengeSigFig(Number(String(Number(changedNum) * 10**exponent).replace(".","").length)-1);
            //     return;
            // }
            // COUNT LAST ZERO
            if (String(num).includes(".") && Number(String(num).at(String(num).length-1)) == 0) {
                changedNum = String(num).concat("1");
                console.log(num)
                this.challengeSigFig(Number(String(Number(changedNum) * 10**exponent).replace(".","").length)-1);
                return;
            }
            // COUNT WITH DECIMAL
            // if (String(num).includes(".")) {
            //     this.challengeSigFig(Number(String(Number(num) * 10**exponent).replace(".","").length));
            //     return;
            // }

            // // // COUNT WITHOUT DECIMAL
            // if (!String(num).includes(".")) {
            //     this.challengeSigFig(Number(String(Number(num) * 10**exponent).replace(".","").length));
            //     return;
            // }
            this.challengeSigFig(Number(String(Number(num) * 10**exponent).replace(".","").length));
            console.log(String(Math.floor(Number(num) * 10**(exponent+Number(String(Number(num) * 10**exponent).replace(".","").length-1)))))
        });
    }

    challengeSigFig(challengeNum) {
        if(challengeNum < this.sigFigs) {
            this.sigFigs = challengeNum;
        } else {
            return;
        }
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