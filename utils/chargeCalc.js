class Attraction {
    chargeOne;
    distanceOne;

    chargeTwo;
    distanceTwo;

    chargeTotal;
    distanceTotal;
    constructor(distanceOne,distanceTwo,chargeOne,chargeTwo) {
        this.chargeOne = Number(chargeOne);
        this.chargeTwo = Number(chargeTwo);

        this.distanceOne = Number(distanceOne);
        this.distanceTwo = Number(distanceTwo);

        this.chargeTotal = Math.abs(this.chargeOne * this.chargeTwo);
        this.distanceTotal = this.distanceOne + this.distanceTwo;
    }
}

function unitOneCalc() {
    let inputOne;
    let inputTwo;

    let coefficentOne;
    let coefficentTwo;

    document.getElementById("ionicEquationBtn").addEventListener("click", () => {
        inputOne = String(document.getElementById("chargeOne").value);
        inputTwo = String(document.getElementById("chargeTwo").value);

        if(
            inputOne != ""
            && inputTwo != ""
            && inputOne* inputTwo < 0
        ) {
            coefficentOne = Math.round(Math.abs(Math.abs(inputOne/inputTwo) != 1 ? inputTwo : 1));
            coefficentTwo = Math.round(Math.abs(Math.abs(inputOne/inputTwo) != 1 ? inputOne : 1));
        
            document.getElementById("amountOfOne").textContent = coefficentOne;
            document.getElementById("amountOfTwo").textContent = coefficentTwo;

            document.getElementById("coefficentOne").textContent = coefficentOne;
            document.getElementById("coefficentTwo").textContent = coefficentTwo;

            document.getElementById("netIonicOutput").textContent = "You would need " + coefficentOne + " Mole(s) of X^"+ String(Math.round(inputOne)>= 1 ? "+" + Math.round(inputOne) : Math.round(inputOne))
                +" and " + coefficentTwo + " Mole(s) of Y^"+ String(Math.round(inputTwo)>= 1 ? "+" + Math.round(inputTwo) : Math.round(inputTwo))
                + " to make one Mole of X" + coefficentOne + "Y" + coefficentTwo;

        } else {
            document.getElementById("netIonicOutput").textContent = "Please enter an anion (negative ion) charge and cation (positive ion) charge above!";
        }
    });
}

function unitTwoCalc() {

    let attractionOne;
    let attractionTwo;

    document.getElementById("comparingChargeBtn").addEventListener("click", () => {
        let finalString;

        attractionOne = new Attraction(
            String(document.getElementById("xDistanceOne").value),
            String(document.getElementById("yDistanceOne").value),
    
            String(document.getElementById("xChargeOne").value),
            String(document.getElementById("yChargeOne").value)
        );

        attractionTwo = new Attraction(
            String(document.getElementById("xDistanceTwo").value),
            String(document.getElementById("yDistanceTwo").value),
    
            String(document.getElementById("xChargeTwo").value),
            String(document.getElementById("yChargeTwo").value)
        );

        if(
            attractionOne.chargeOne * attractionOne.chargeTwo > 0
            || attractionTwo.chargeOne * attractionTwo.chargeTwo > 0
            || String(document.getElementById("xDistanceOne").value) == ""
            || String(document.getElementById("yDistanceOne").value) == ""

            || String(document.getElementById("xChargeOne").value) == ""
            || String(document.getElementById("yChargeOne").value) == ""

            || String(document.getElementById("xDistanceTwo").value) == ""
            || String(document.getElementById("yDistanceTwo").value) == ""

            || String(document.getElementById("xChargeOne").value) == ""
            || String(document.getElementById("yChargeOne").value) == ""
        ) {
            document.getElementById("attractionOutput").textContent = "Please enter opposite charges for X compared to Y, and make sure to insert numbers into the textboxes above"
            return;
        }

        if(attractionOne.chargeTotal > attractionTwo.chargeTotal) {
            document.getElementById("attractionOutput").textContent = "Because the absolute charge of Comparison One is bigger ("+attractionOne.chargeTotal+">"+attractionTwo.chargeTotal+"),"
                + "We can say that the ions in Comparison One have a greater force of attraction."
                finalString = "Final Anwser: Comparison One has a greater Force of Attraction."
        }

        if(attractionOne.chargeTotal < attractionTwo.chargeTotal) {
            document.getElementById("attractionOutput").textContent = "Because the absolute charge of Comparison Two is bigger ("+attractionTwo.chargeTotal+">"+attractionOne.chargeTotal+"),"
                + "We can say that the ions in Comparison Two have a greater force of Attraction."
            finalString = "Final Anwser: Comparison Two has a greater Force of Attraction.."
        }

        if(attractionOne.chargeTotal == attractionTwo.chargeTotal) {
            if(attractionOne.distanceTotal > attractionTwo.distanceTotal) {
                document.getElementById("attractionOutput").textContent = "Because both Comparisons have an equal absolute charge (" +attractionOne.chargeTotal+"), we have to rely on the distance between the two ions."
                    + "As the Distance between elements increases (i.e.: Valence Shell Levels), the Force of Attraction decreases. Because the total Distance of Comparison One is larger ("+attractionOne.distanceTotal+">"+attractionTwo.distanceTotal+")," 
                    + "Comparison Two has a greater force of Attraction."        
                finalString = "Final Anwser: Comparison Two has a greater Force of Attraction."     
            }
            if(attractionTwo.distanceTotal > attractionOne.distanceTotal) {
                document.getElementById("attractionOutput").textContent = "Because both Comparisons have an equal absolute charge (" +attractionOne.chargeTotal+"), we have to rely on the distance between the two ions."
                    + "As the Distance between elements increases (i.e.: Valence Shell Levels), the Force of Attraction decreases. Because the total Distance of Comparison Two is larger ("+attractionTwo.distanceTotal+">"+attractionOne.distanceTotal+")," 
                    + "Comparison One has a greater force of Attraction."    
                finalString = "Final Anwser: Comparison One has a greater Force of Attraction."         
            }
            if(attractionTwo.distanceTotal == attractionOne.distanceTotal) {
                document.getElementById("attractionOutput").textContent = "Because both Comparisons have an equal absolute charge (" +attractionOne.chargeTotal+") and Valence Shell sizes ("+attractionOne.distanceTotal+"), the total force of attraction "
                    + "is equal."
                finalString = "Final Anwser: Comparisons have an equal force of Attraction."
            }
        }
        document.getElementById("attractionAnwser").textContent = finalString
    });
}

window.location.pathname == "/ApChemCalc/html/units/UnitOne.html" ? unitOneCalc() 
    : false;

window.location.pathname == "/ApChemCalc/html/units/UnitTwo.html" ? unitTwoCalc() 
    : false;