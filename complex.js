/*
MIT License

Copyright (c) 2019 yuqquu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
class Complex{
	constructor(real, imaginary = 0){
		this._x = real;
		this._y = imaginary;
	}
	abs(){
		return Math.sqrt(this._x * this._x + this._y * this._y);
	}
	arg(){
		return Math.atan2(this._y, this._x);
	}
	radius(){
		return this.abs();
	}
	theta(){
		return this.arg();
	}
	re(){
		return this._x;
	}
	im(){
		return this._y;
	}
	add(complex){
		return new Complex(this._x + complex._x, this._y + complex._y);
	}
	sub(complex){
		return new Complex(this._x - complex._x, this._y - complex._y);
	}
	mul(complex){
		return new Complex(
			this._x * complex._x - this._y * complex._y,
			this._x * complex._y + this._y * complex._x
		);
	}
	mulByScalar(scalar){
		return new Complex(this._x * scalar, this._y * scalar);
	}
	inv(){
		const radiusSquared = this._x * this._x + this._y * this._y;
		return new Complex(this._x / radiusSquared, -this._y / radiusSquared);
	}
	div(complex){
		return this.mul(complex.inv());
	}
	pow(exponent){
		const r = this.abs() ** exponent;
		const theta = this.arg() * exponent;
		return new Complex(r * Math.cos(theta), r * Math.sin(theta));
	}
	normalize(){
		const r = this.abs();
		return new Complex(this._x / r, this._y / r);
	}
	toString(){
		const sign = this._y < 0 ? "-" : "+";
		return this._x + sign + Math.abs(this._y) + "i";
	}
	copy(){
		return new Complex(this._x, this._y);
	}
}
class ExpComplex extends Complex{
	constructor(r, theta){
		super();
		this._x = r * Math.cos(theta);
		this._y = r * Math.sin(theta);
	}
	toString(){
		return this._r + "e^" + this._theta + "i";
	}
}