// playing with variables

console.log(1+2);
console.log("apple"+"orange");
console.log(1+2+"apple");
console.log("apple"+1+2);
console.log(1+true);
console.log(0==false);
console.log(1===true);
console.log(2=="2");

// play with arrays

cricketerNames=["Sampath","Suraj","Kunal","Jaswinder","Geevarghese","Rajneesh","Anand","Girish","Sanjit","Prasanna","Mahesh"];
console.log(cricketerNames);
cricketerNames.shift();
console.log(cricketerNames);
console.log(cricketerNames.length);
cricketerNames.push("Amitabh");
console.log(cricketerNames);
console.log(cricketerNames.length);
cricketerNames.sort();
console.log(cricketerNames);
jerseyNumbers=[]
var cricketerNamesLength=cricketerNames.length;
for(var i=0;i<cricketerNamesLength;i++){
    jerseyNumbers.push(Math.floor(Math.random() * 100)+1);
}
console.log(jerseyNumbers);
shirtDetails=[]
for(var i=0;i<cricketerNamesLength;i++){
    shirtDetails.push(cricketerNames[i].toUpperCase()+"-"+jerseyNumbers[i]);
}
console.log(shirtDetails);

//play with functions

function displayNumbers(){
    for(var number=1;number<101;number++)
    console.log(number);
}
displayNumbers();

function displayDate(){
    let date=new Date();
    console.log(date.toLocaleDateString());
}
displayDate();

function calculateFarenheit(celsius){
    console.log(celsius * 9 / 5 + 32);
}
calculateFarenheit(0);

function calculateAverage(numbers){
    let sum=0;
    for(number of numbers){
        sum+=number;
    }
    console.log(sum/numbers.length);
}
calculateAverage([1.1,2.2,3.3,4.4,5.5]);

function reverseString(oldString){
    let newString="";
    let oldStringLength=oldString.length;
    for(let i=oldStringLength-1;i>=0;i--){
        newString+=oldString[i];
    }
    console.log(newString);
}
reverseString("javascript");
