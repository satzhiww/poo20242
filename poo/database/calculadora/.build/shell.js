class Calculator {
  battery;
  batteryMax;
  display;
  constructor(batteryMax) {
    this.battery = 0;
    this.batteryMax = batteryMax;
    this.display = 0;
  }
  chargeBattery(value) {
    this.battery += value;
    if (this.battery > this.batteryMax) {
      this.battery = this.batteryMax;
    }
  }
  useBattery() {
    if (this.battery > 0) {
      this.battery -= 1;
      return true;
    }
    console.log("fail: bateria insuficiente");
    return false;
  }
  sum(a, b) {
    if (this.useBattery()) {
      this.display = a + b;
    }
  }
  division(a, b) {
    if (!this.useBattery()) {
      return;
    }
    if (b === 0) {
      console.log("fail: divisao por zero");
    } else {
      this.display = a / b;
    }
  }
  toString() {
    return `display = ${this.display.toFixed(2)}, battery = ${this.battery}`;
  }
}
class Adapter {
  calc = new Calculator(0);
  init(batteryMax) {
    this.calc = new Calculator(batteryMax);
  }
  show() {
    console.log(this.calc.toString());
  }
  charge(value) {
    this.calc.chargeBattery(value);
  }
  sum(a, b) {
    this.calc.sum(a, b);
  }
  div(a, b) {
    this.calc.division(a, b);
  }
}
function input() {
  let X = input;
  X.L = X.L || require("fs").readFileSync(0).toString().split(/\r?\n/);
  return X.L.shift();
}
function write(text, endl = "\n") {
  process.stdout.write("" + text + endl);
}
function main() {
  let adp = new Adapter();
  while (true) {
    write("$", "");
    let line = input();
    write(line);
    let args = line.split(" ");
    if (args[0] == "show") {
      adp.show();
    } else if (args[0] == "init") {
      adp.init(+args[1]);
    } else if (args[0] == "charge") {
      adp.charge(+args[1]);
    } else if (args[0] == "sum") {
      adp.sum(+args[1], +args[2]);
    } else if (args[0] == "div") {
      adp.div(+args[1], +args[2]);
    } else if (args[0] == "end") {
      break;
    } else {
      console.log("fail: comando nao encontrado");
    }
  }
}
main();
