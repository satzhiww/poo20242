var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var shell_exports = {};
module.exports = __toCommonJS(shell_exports);
function input() {
  let X = input;
  X.L = X.L || require("fs").readFileSync(0).toString().split(/\r?\n/);
  return X.L.shift();
}
function write(text, endl = "\n") {
  process.stdout.write("" + text + endl);
}
class Car {
  gas;
  km;
  pass;
  constructor() {
    this.gas = 0;
    this.km = 0;
    this.pass = 0;
  }
  enter() {
    if (this.pass < 2) {
      this.pass += 1;
    } else {
      console.log("fail: limite de pessoas atingido");
    }
  }
  leave() {
    if (this.pass > 0) {
      this.pass -= 1;
    } else {
      console.log("fail: nao ha ninguem no carro");
    }
  }
  fuel(gas) {
    if (this.gas + gas < 100) {
      this.gas += gas;
    } else {
      this.gas = 100;
    }
  }
  drive(km) {
    if (this.gas <= 0) {
      console.log("fail: tanque vazio");
    } else if (this.pass <= 0) {
      console.log("fail: nao ha ninguem no carro");
    } else {
      if (this.gas - km <= 0) {
        var kmT = this.gas;
        console.log(`fail: tanque vazio apos andar ${kmT} km`);
        this.km += this.gas;
        this.gas = 0;
      } else {
        this.km += km;
        this.gas -= km;
      }
    }
  }
  toString() {
    return `pass: ${this.pass}, gas: ${this.gas}, km: ${this.km}`;
  }
}
class Adapter {
  car = new Car();
  enter() {
    this.car.enter();
  }
  leave() {
    this.car.leave();
  }
  fuel(gas) {
    this.car.fuel(gas);
  }
  drive(km) {
    this.car.drive(km);
  }
  show() {
    console.log(this.car.toString());
  }
}
function main() {
  let adp = new Adapter();
  while (true) {
    write("$", "");
    let line = input();
    write(line);
    let args = line.split(" ");
    if (args[0] === "show") {
      adp.show();
    } else if (args[0] === "enter") {
      adp.enter();
    } else if (args[0] === "leave") {
      adp.leave();
    } else if (args[0] === "fuel") {
      adp.fuel(+args[1]);
    } else if (args[0] === "drive") {
      adp.drive(+args[1]);
    } else if (args[0] === "end") {
      break;
    } else {
      write("fail: comando invalido");
    }
  }
}
main();
