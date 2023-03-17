const calculator={
    // validation
    isValid:function(number1,number2) {
        if(typeof(number1)=="number" && typeof(number2)=="number")
            return true;
        else
            return false;
    },
    // addition
    add: function(number1,number2) {
        if(this.isValid(number1,number2))
            return "Addition: "+(number1+number2);
        else
            return "invalid input!!!";
    },
    // subtraction
    subtract: function(number1,number2) {
        if(this.isValid(number1,number2))
            return "Subtraction: "+(number1-number2);
        else
            return "invalid input!!!";
    },
    // multiplication
    multiply: function(number1,number2) {
        if(this.isValid(number1,number2))
            return "Multiplication: "+(number1*number2);
        else
            return "invalid input!!!";
    },
    // division
    divide: function(number1,number2) {
        if(this.isValid(number1,number2))
            return "Division: "+(number1/number2).toFixed(2);
        else
            return "invalid input!!!";
    }
}

let number1=10
let number2=9

console.log(calculator.add(number1,number2));
console.log(calculator.subtract(number1,number2));
console.log(calculator.multiply(number1,number2));
console.log(calculator.divide(number1,number2));
