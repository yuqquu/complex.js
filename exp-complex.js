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
class ExpComplex{
	constructor(r, theta){
		this._r = Math.abs(r);
		this._theta = (function mod(a, b){
			const temporaryMod = a % b;
			if(temporaryMod < 0){
				return temporaryMod + Math.abs(b);
			}else{
				return temporaryMod + 0;
			}
		})(theta, Math.PI * 2);
	}
	abs(){
		return this._r;
	}
	arg(){
		return this._theta;
	}
	radius(){
		return this._r;
	}
	theta(){
		return this._theta;
	}
	re(){
		return this._r * Math.cos(this._theta);
	}
	im(){
		return this._r * Math.sin(this._theta);
	}
	add(complex){
		const re = this._r * Math.cos(this._theta) + complex._r * Math.cos(complex._theta);
		const im = this._r * Math.sin(this._theta) + complex._r * Math.sin(complex._theta);
		return new ExpComplex(
			Math.sqrt(re * re + im * im),
			Math.atan2(im, re)
		);
	}
	sub(complex){
		const re = this._r * Math.cos(this._theta) - complex._r * Math.cos(complex._theta);
		const im = this._r * Math.sin(this._theta) - complex._r * Math.sin(complex._theta);
		return new ExpComplex(
			Math.sqrt(re * re + im * im),
			Math.atan2(im, re)
		);
	}
	mul(complex){
		return new ExpComplex(this._r * complex._r, this._theta + complex._theta);
	}
	mulByScalar(scalar){
		return new ExpComplex(this._r * scalar, this._theta);
	}
	inv(){
		return new ExpComplex(1 / this._r, -this._theta);
	}
	div(complex){
		return this.mul(complex.inv());
	}
	pow(exponent){
		return new ExpComplex(this._r ** exponent, this._theta * exponent);
	}
	normalize(){
		return new ExpComplex(1, this._theta);
	}
	toString(){
		return this._r + "e^" + this._theta + "i";
	}
	copy(){
		return new ExpComplex(this._r, this._theta);
	}
}
class Complex extends ExpComplex{
	constructor(real, imaginary){
		super();
		this._r = Math.sqrt(real * real + imaginary * imaginary);
		this._theta = Math.atan2(imaginary, real);
	}
	toString(){
		const sign = this._y < 0 ? "-" : "+";
		return this.re() + sign + Math.abs(this.im()) + "i";
	}
}