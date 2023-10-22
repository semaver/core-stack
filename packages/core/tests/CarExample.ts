export interface ICar {
    model: string;
    fuel: string;
}

export interface IExpensiveCar {
    model: string;
    fuel: string;
    sunroof?: boolean;
    seatHeating?: boolean;
}

export class MyCar implements ICar {
    public fuel: string;
    public model: string;

    public constructor(fuel: string = "gasoline", model: string = "sedan") {
        this.fuel = fuel;
        this.model = model;
    }
}

export class OtherCar implements IExpensiveCar {
    public fuel: string = "electricity";
    public model: string = "coupe";
    public seatHeating: boolean = false;
    public sunroof: boolean = true;

    public drive(): void {
        console.log("drive()");
    }
}

export class TheOtherCar extends OtherCar {

    public static repair(): void {
        console.log("repair()");
    }

    public name: string = "theOtherCar";
}
