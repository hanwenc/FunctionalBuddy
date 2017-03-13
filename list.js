/**
 * Created by hanwencheng on 10/03/2017.
 */
const _ = require("./fun");

const factor = 1000;

function multiple(v){
    return v * factor;
}

function addToBase(v){
    return v + factor
}

function trace(v){
    console.log("trace is", v);
    return v
}

var allocateAddress = _.composeArgs(Math.random, multiple, Math.floor, addToBase);

List.prototype.setterV = function (pointer) {
    var that = this;
    return function(value){
        that[pointer] = value;
        return that;
    }
};

List.prototype.setter = function(key){
    var that = this;
    return function(prop){
        return function(value){
            that[key][prop] = value;
            return that
        }
    }
};

List.prototype.getter = function(key){
    return this[key];
}

var prop = function(key){
    return function(el){
        return el.key;
    }
}

var set = function(key, value){
    return function(el){
        el[key] = value;
        return el;
    }
}

function List(){
    this.first = null;
    this.last = null;
    this.length = 0;
}

List.prototype.create = function(){
    return new List();
};

console.log("allocated is ", allocateAddress());
//check if safe

//return the same element with map

List.prototype.append = function(value){
    var pointer = allocateAddress();
    this.setterV(pointer)({
        _v : value,
        _pointer : pointer,
        _prev : this.last ? this.last : null,
        _last : null
    });
    if(this.last){
        this.setter(this.last)("_next")(pointer)
    }
    this.first = length ? this.first : pointer;
    this.last = pointer;
    this.length ++ ;
    return this;
};

List.prototype.prepend = function(){
    var pointer = allocateAddress();
    this.setterV(pointer)({
        _v : value,
        _pointer : pointer,
        _next : this.first ? this.first : null,
        _prev : null
    });
    if(this.first){
        this.setter(this.first)("_prev")(pointer)
    }
    this.last = length ? this.last : pointer;
    this.first = pointer;
    this.length ++ ;
    return this;
};

List.prototype.head = function(){
    return this.length ? this.getter(this.first) : null
};


List.prototype.tail = function(){
    if(this.length <= 1)
        return List.create();
    var neu = Object.assign({}, this);
    neu.first = prop(this.first.next)(neu);;
    neu.first._prev = null;
    neu.length --;
    return neu;
};

//  next :: Pointer -> Object
List.prototype.next = _.compose(this.getter, prop("_next"), this.getter);

//  next :: Pointer -> Object
List.prototype.prev = _.compose(this.getter, prop("_prev"), this.getter);

List.prototype.nth = function(n){
    if(!this.length)
        return null;

    var pointer = this.first;
    var that = this, i = 0;
    while(i < n){
        i++;
        pointer = that.next(pointer)._pointer;
    }
    return pointer._v;
};

List.prototype.reverse = function(){

    if(!this.length)
        return List.create();

    var neu = Object.assign({}, this);
    var pointer = neu.first;
    this.first = neu.last;
    this.last = pointer;
    for(var i = 0; i <= this.length; i++){
        var el = neu.getter(pointer);
        var _prev = el._prev;
        var _next = el._next;
        el.set("_prev", _next)
            .set("_next", _prev);
        pointer = neu.next(pointer)._pointer
    }
    return neu;
};


