function compose(f,g){
    return function(x){
        return g(f(x));
    }
}

function composeArr(arr){
    return function(x){

        if (arr.length === 0)
            return x;
        var result = x;
        for(var i = 0; i < arr.length; i++){
            result = arr[i](result)
        }
        return result;
    }
}

function composeMany(arr){
    return function(x){
         return arr.reduce((a, b)=>{ return compose(a,b)}, function(a){return a})(x)
    }
}

function composeArgs(){
    var args = arguments;
    return function(x){

        if (args.length === 0)
            return x;

        var result = x;
        for(var i = 0; i < args.length; i++){
            result = args[i](result)
        }
        return result;
    }
}

function toUpperCase(x){
    return x.toUpperCase();
}
function increase(x){
    return x + "1";
}
function toLowerCase(x){
    return x.toLowerCase();
}

var array = [
    // increase,
    // increase,
    // increase
]

var fun = compose(toUpperCase, increase);

var toMany = composeMany(array);

var toSmall = composeArr(array);

var toBig = composeArgs(
    toLowerCase,
    increase,
    toUpperCase
)


console.log(fun("fun"), toSmall("toSmall"));

console.log(toMany("toMany"), toBig("toBig"));

module.exports = {
    compose : compose,
    composeArgs : composeArgs
}
