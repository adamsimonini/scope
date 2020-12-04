console.log("%cJavaScript Scope In-depth", 'color: salmon; font-size: 30px;');

console.log('%cLet\'s start with the terms "declaration" and "initialization"', 'color: black; font-size: 14px; background-color: white');

var uninitialized; // this var is declared (it's given a name and a spot in memory), but its value hasn't been initialized, so its logged value is "undefined"
console.log(`Accessing (uninitialized), which is a declared variable that doesn't have an initial value: ${uninitialized}`);

// accessing (p) before I wrote its declaration works due to variable hoisting (see https://www.w3schools.com/js/js_hoisting.asp). Hoisting doesn't set its no initial value, so it's undefined
console.log(`Trying to access (p) before the line of code where it's declared: ${p}`);

console.log('%cThis is all normal stuff we have dealth with', 'color: black; font-size: 14px; background-color: white');
// declaring (p) as a global variable and initializing it to be 1, meaning all code can access and change it; it's global just in virtue of it not being nested within a function or object code block
var p = 1;
console.log(`(p) has been declared, and is value initialized: ${p}`);

// reassigning the value of a (and changing its type from number to string in the process)
p = "hello";
console.log(`(p) has been reassigned: ${p}`);

console.log('%cOur first function is addTwo, which utilizes one argument and one variable of local scope', 'color: black; font-size: 14px; background-color: white');
// declaring a function, which takes in one arguemnt: p. Note that the argument name a has no inherent relation to the variable (p) above.
function addTwo(p) {
    // declaring a locally scoped variable, so it's only accessible from within addTwo
    var b = 3;
    return p + b;
}

console.log(`The result of running addTwo(10): ${addTwo(10)}`); // 13 is returned, as 10 is added to 3

console.log('%cNext I have two commented lines that will break our JavaScript. Read the comments here and try uncommenting one of them at a time', 'color: black; font-size: 14px; background-color: #f9ecf2');
// On the line below, I try to access (b) outside of it's scope (i.e., outside of addTwo). The code will crash due to "Uncaught ReferenceError: b is not defined"
// console.log(`Trying to access b outside of it's scope: ${b}`);

// Here we get "Uncaught ReferenceError: c is not declared". This is because (c) hasn't been declared anywhere in the code.
// console.log(`Trying to access c, which hasn't been declared: ${c}`);

/*
    NOTE: earlier we had variables return "undefined" instead of crashing the code. It was because those variable declarations are "hoisted" to the top of their scope. https://www.w3schools.com/js/js_hoisting.asp
    Hoisting is JavaScript's default behavior of moving all declarations, both variables and functions to the top of the current scope 
    (to the top of the current script or the current function). This means that when (p) is first declared and initialized, the declaration is hoisted to the top while its value is not.
    So, for JavaScript, (p) exist our initial lines of code, but has no value, hence it's returned as undefined. This is different from the line where I call (c), which is neither declared nor given a value.
    In such a case, JavaScript crashes.
*/

console.log('%cOur second function is reassign', 'color: black; font-size: 14px; background-color: white');
function reassign() {
    //  (p) would become a global variable, since "var" isn't used when declaring it. However, (p) already exists in the global scope, so instead (p) is reassigned to 55;
    p = 55;
    console.log(`(p) is a globally scoped variable, the value of which is reassigned when reassign() is invoked: ${p}`);
    // (x) is a new variable. Although it's initialized here (initialized to equal the string "apples"), it's not declared with the "var" keyword. Consequently, JavaScript rips it out of this function's
    // scope and hoists it to the global scope. Very odd!
    x = "apples";
}

// The following line results in "Uncaught ReferenceError: x is not defined". This is because reassign() hasn't been invoked yet
// console.log(x)

reassign(); // this function reassigns the value of (a), and both declairs (x) and initializes (x) to be "apples". 
console.log(`(x) has now become a globally scoped variable due to reassign() being invoked: ${x}`);
console.log(`(p), our global variable, had its value reassigned when reassign() was invoked: ${p}`);

// because the "var" keyword was not used on liune 43, where x was declaired and initialized, it gets declaired as a globally scoped variable
console.log(`Our function reassign() also declared and initialized a new variable (x), which was hoisted into global scope, so it persists beyond the function: ${x}`)

console.log('%cOur third function is scopedVariable', 'color: black; font-size: 14px; background-color: white');
function scopedVariable() {
    // this variable has been explicitly declared within scopedVariable, using the "var" keyword. As such it's only accessible within the confines of this function
    // although the variable (p) within scopedVariable() shares the same name as our global (p), they are two distinct variables, and have two different places in memory partitioned for them
    var p = "I'm local, only!";
    console.log(`A new (p) varialbe has been declared and initialized, and it's local to the function scopedVariable: ${p}`);
}

scopedVariable()
// scopedVariable() did not reassign the value of our global (p) variable
console.log(`Unlike reassign(), scopedVariable() did not reassign the value of (p) because it declared and initialized a new, scoped variable called p: ${p}`)

console.log('%cLexical scoping, or boxes within boxes', 'color: black; font-size: 14px; background-color: white');

var global = 1010;

function parentFunction() {
    var p = 111;
    function childFunction(){
        // note that childFunction() has access to both globally scoped variables, and variables within it's parent function
        console.log(`childFunction() has access to its parent functions variable: ${p}`);
        console.log(`And of course, childFunction() has access to globally scoped variables, too: ${global}`);
        console.log(`We can also explicitly target our global (p), as opposed to our local (p): ${window.p}`);
        var q = 999;
    }
    // the following line will crash our JavaScript, as parentFunction() has zero access to the variables within childFunction()
    // console.log(q); 
    childFunction();
}

parentFunction()

console.log("%cClosures", 'color: red; font-size: 30px;');
console.log("%cClosures refer to functions that when invoked retain access to their parent's and grandparent's scope (even after they have closed)", 'color: black; font-size: 14px; background-color: white');

function printName() {
    var name = "Usain Bolt";
    function logger() {
        // the variable being logged belongs to the scope above logger, which it has access to
        console.log(name)
    }
    return logger;
}
printName(); //nothing happens here because we return printName's child - logger - but never invoke it

// invoking myFunction actually just means invoking logger(), since that is what is returned by printName(). The closure here is just that logger() retains access to it's parent's enviroment, namely the var "name"
var myFunction = printName();
myFunction();

// var apple = 10;
function test(x) {
    return function(y) {
        return function(z) { 
            return x + y + z // this function has access to all parent-scoped and grandparent-scoped arguments
        }
    }
}

console.log(test('a')('b')('c')); // test('a') returns a function which accepts ('b'), which itself returns a function that accepts ('c')

// test("a") -> function("b") -> function (c) -> returns x + y + z, which is then logged to console