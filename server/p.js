// let name1 ={name:"Brajesh"} ;
// let name2 = {name:"Brajesh"};
// let name3 = name1;

// console.log(name1 == name2);
// console.log(name1 === name2);

// console.log(name3 == name2);
// console.log(name1 === name3);

// (function(){
//     var objA = {
//         foo: 'foo',
//         bar: 'bar'
//     };
//     var objB = {
//         foo: 'foo',
//         bar : 'bar'
//     };
//     console.log(objA==objB);
//     console.log(objA===objB);
// }())

// (function(){
//     var greet = 'Hello World';
//     var toGreet =[].filter.call(greet, function(element,index){
//         return index > 5;
//     });
//     console.log(toGreet);
// }());

// (function(){
//     var array= [1,2,3,4,5];
//     console.log(array.indexOf(2));
//     console.log([{name:'john'},{name:'john'}].indexOf({name:'john'}));
//     console.log([[1],[2],[3],[4]].indexOf([3]));
//     console.log('abcdefgh'.indexOf('e'));
// })();

// var Employee = {
//     company: 'CB Emp'
// }
// var employee1 = Object.create(Employee);
// delete employee1.company
// console.log(employee1.company);
// var objA={prop1:42};
// var objB=objA;
// objB.prop1=90;
// console.log(objA)
function validatePalin(str) {  
  
    // get the total length of the words  
    const len = string.length;  
  
    // Use for loop to divide the words into 2 half  
    for (let i = 0; i < len / 2; i++) {  
  
        // validate the first and last characters are same  
        if (string[i] !== string[len - 1 - i]) {  
          return  console.log( 'It is not a palindrome');  
        }  
    }  
    return console.log( 'It is a palindrome');  
}  
  
// accept the string or number from the prompt  
const string = "racecar";  
  
const value = validatePalin(string);  
  
console.log(value);  


