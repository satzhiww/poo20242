function input(): string { let X: any = input; X.L = X.L || require("fs").readFileSync(0).toString().split(/\r?\n/); return X.L.shift(); } // _TEST_ONLY_
// function input(): string { let X: any = input; X.P = X.P || require("readline-sync"); return X.P.question() } // _FREE_ONLY_
function write(text: any, endl="\n") { process.stdout.write("" + text + endl); }
export {};

class Car {
    gas : number;
    km : number;
    pass : number;

    constructor(){
        this.gas = 0;
        this.km = 0;
        this.pass = 0;
    }

    enter(): void{
        if(this.pass < 2){
            this.pass +=1;
        }else{
            console.log("fail: limite de pessoas atingido")
        }
    }
    
    leave(): void{
        if(this.pass > 0){
            this.pass -=1;
        } else {
            console.log("fail: nao ha ninguem no carro")
        }
    }
    fuel(gas:number): void{
        if((this.gas + gas) < 100){
            this.gas += gas;
        } else {
            this.gas = 100;
        }
    }
    drive(km: number): void{
        if(this.gas <= 0){
            console.log("fail: tanque vazio")
        } else if(this.pass <=0){
            console.log("fail: nao ha ninguem no carro")
        } else {
            if((this.gas-km)<=0){
                var kmT:number = this.gas;
                console.log(`fail: tanque vazio apos andar ${kmT} km`);
                this.km += this.gas;
                this.gas = 0;
            } else{
                this.km += km;
                this.gas -= km;
            }
        }

        }
        toString(): string{
        return `pass: ${this.pass}, gas: ${this.gas}, km: ${this.km}`
    }
}










class Adapter {
    car: Car = new Car();

    enter(): void {
        this.car.enter();
    }

    leave(): void {
        this.car.leave();
    }

    fuel(gas: number): void {
        this.car.fuel(gas);
    }

    drive(km: number): void {
        this.car.drive(km);
    }

    show(): void {
        console.log(this.car.toString());
    }
}

function main() {
    let adp = new Adapter();

    while (true) {
        write("$", "");
        let line = input();
        write(line); // _TEST_ONLY_
        let args = line.split(" ");

        if      (args[0] === "show")  { adp.show();                     }
        else if (args[0] === "enter") { adp.enter();                    }
        else if (args[0] === "leave") { adp.leave();                    }
        else if (args[0] === "fuel")  { adp.fuel(+args[1]);             }
        else if (args[0] === "drive") { adp.drive(+args[1]);            }
        
        else if (args[0] === "end")   { break;                          }
        else                          { write("fail: comando invalido");}
    }
}

main()
