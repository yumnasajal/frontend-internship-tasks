//prototypes

String.prototype.yell = function () { return 'NOOOOOOOOOOOoo' };
String.prototype.yello = function () { return `OMGGGGG!!! ${this.toUpperCase()} AGHHHH!` };

// overide existing function
Array.prototype.pop = function () { return "AGHHHHHH I WILL NOT POP ANY ELEMENT NOOOO" };

// refrence to the object prototype
const dog = "dog";
// console.log(dog.__proto__);

// factory function
function makeColor(r, g, b) {
    const color = {};
    color.r = r;
    color.g = g;
    color.b = b;
    color.rgb = function () {
        const { r, g, b } = this;
        return `rgb(${r}, ${g}, ${b})`
    }
    color.color = function () {
        return this;
    }
    color.hex = function () {
        const { r, g, b } = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    return color;
}

const first_color = makeColor(45, 45, 45);

// constructor function
function Color(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.rgb = function () {
        const { r, g, b } = this;
        return `rgb(${r}, ${g}, ${b})`
    }
    this.color = function () {
        return this;
    }
}
const second_color = new Color(44, 44, 255);
// created a blanck and plain js obj
// linkes this object to another object
// passes newly created obj from step 1 as the this context
// returns this if the function doesn't return its own object

Color.prototype.hex = function () {
    const { r, g, b } = this;
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
Color.prototype.rgba = function (a = 1.0) {
    const { r, g, b } = this;
    return `rgba(${r}, ${g}, ${b}, ${a})`
}

const third_color = new Color(1, 249, 198);

// class syntax;


class Colors {
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.color_name = name;
        this.calc_hsl();
    }
    inner_rgb() {
        const { r, g, b } = this;
        return `${r}, ${g}, ${b}`;
    }
    rgb() {
        return `rgb(${this.inner_rgb()})`;
    }
    rgba(a = 1.0) {
        return `rgba(${this.inner_rgb()}, ${a})`;
    }
    hex() {
        const { r, g, b } = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    hsl() {
        const { h, s, l } = this;
        return `hsl(${h}, ${s}%, ${l}%)`;
    }
    opp_hsl() {
        const { h, s, l } = this;
        const new_h = (h + 180) % 360;
        return `hsl(${new_h}, ${s}%, ${l}%)`;
    }
    full_saturation() {
        const { h, l } = this;
        return `hsl(${h}, 100%, ${l}%)`;
    }
    calc_hsl() {
        let { r, g, b } = this;
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r, g, b);
        let cmax = Math.max(r, g, b);
        let delta = cmax - cmin;
        let h = 0;
        let s = 0;
        let l = 0;
        if (delta == 0) h = 0;
        else if (cmax == r) h = (g - b / delta) % 6;
        else if (cmax == g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;
        h = Math.round(h * 60);
        if (h < 0) h += 360;

        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        this.h = h;
        this.s = s;
        this.l = l;
    }
}

const color1 = new Colors(1, 234, 189, 'cyan');
const white = new Colors(255, 255, 255, 'white');

// inheritance
class Pet {
    constructor(name, age) {
        this.name = name;
        this.age = age
    }
    eat() {
        return `${this.name} is eating`;
    }
}

class Cat extends Pet{
    constructor(name, age, livesleft = 9){
        this.livesleft = livesleft;
        super(name, age);
    }
    meow() {
        return `Meowww!!`;
    }
}
class Dog extends Pet{
    bark() {
        return 'Woffff !!';
    }
    eat() {
        return `${this.name} is eating dog food`;
    }
}