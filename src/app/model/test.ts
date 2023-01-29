export class Test {
    private _val : number = (new Date()).getFullYear()

    constructor () {
    }

    public set val (val : number) {
        this._val = val
    }

    public get val () {
        return this._val
    }
}