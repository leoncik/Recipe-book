type IWeight = 'g' | 'kg' | 'mg';
type ILength = 'mm' | 'cm' | 'm';
type IQuantity = 'pcs';
type IVolume = 'mL' | 'L' | 'dL' | 'tsp';

type IUnit = IVolume | IWeight | ILength | IQuantity;

export class Ingredient {
    constructor(
        public name: string,
        public amount: number,
        public unit: IUnit
    ) {}
}
