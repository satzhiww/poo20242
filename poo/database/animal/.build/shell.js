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
class Animal {
  especie;
  estagio;
  barulho;
  constructor(especie, barulho) {
    this.especie = especie;
    this.barulho = barulho;
    this.estagio = 0;
  }
  fazerBarulho() {
    if (this.estagio == 0) {
      return "---";
    }
    if (this.estagio == 4) {
      return "RIP";
    }
    return this.barulho;
  }
  envelhecer(qtd) {
    this.estagio += qtd;
    if (this.estagio >= 4) {
      console.log(`warning: ${this.especie} morreu`);
      this.estagio = 4;
    }
  }
  toString() {
    return `${this.especie}:${this.estagio}:${this.barulho}`;
  }
}
class Adapter {
  animal = new Animal("", "");
  init(especie, barulho) {
    this.animal = new Animal(especie, barulho);
  }
  grow(qtd) {
    this.animal.envelhecer(qtd);
  }
  noise() {
    console.log(this.animal.fazerBarulho());
  }
  // mostra a representação do animal como texto
  // no formato "{especie}:{estagio}:{barulho}"
  show() {
    console.log(this.animal.toString());
  }
}
function main() {
  let adp = new Adapter();
  while (true) {
    write("$", "");
    const line = input();
    const args = line.split(" ");
    write(line);
    if (args[0] === "end") {
      break;
    } else if (args[0] === "init") {
      adp.init(args[1], args[2]);
    } else if (args[0] === "grow") {
      adp.grow(parseInt(args[1]));
    } else if (args[0] === "noise") {
      adp.noise();
    } else if (args[0] === "show") {
      adp.show();
    } else {
      write("fail: comando invalido");
    }
  }
}
main();
