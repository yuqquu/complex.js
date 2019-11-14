# 複素数計算ライブラリー complex.js
 
## ライブラリーの読み込み方
```html
<script src="complex.js"></script>
```

## exp-complex.js について
```html
<script src="exp-complex.js"></script>
```
こちらは内部の計算を極座標で行います。
そのため、complex.js より乗算(`mul`)、除算(`div`)、累乗(`pow`)の計算が少し早くなり、加算(`add`)、減算(`sub`)が少し遅くなります。。


## 使い方
### インスタンスの作成
#### xy座標(実部・虚部)でインスタンス作成
1+2i を作るとき。
```js
let complex = new Complex(1, 2);
```

#### 極座標でインスタンス作成
2(cos45°+isin45°) を作るとき。
```js
let complex = new ExpComplex(2, 45 / 180 * Math.PI);
```

### 値の取り出し
#### 実部を取り出す `complex.re()`
```js
let complex = new Complex(1, 2);
console.log(complex.re());       // -> 1
```
Re(1 + 2i) = 1

#### 虚部を取り出す `complex.im()`
```js
let complex = new Complex(1, 2);
console.log(complex.im());       // -> 2
```
Im(1 + 2i) = 2

#### 絶対値を取り出す `complex.abs()` `complex.radius()`
```js
let complex = new Complex(1, 2);
console.log(complex.abs());      // -> 2.23606797749979 (= sqrt(5))
console.log(complex.radius());   // -> 2.23606797749979
```
|1 + 2i| = 2.23606797749979

#### 角度を取り出す `complex.arg()` `complex.theta()`
```js
let complex = new Complex(1, 2);
console.log(complex.arg());      // -> 1.1071487177940904
console.log(complex.theta());    // -> 1.1071487177940904
```
arg(1 + 2i) = 1.1071487177940904

#### 文字列として出力 `complex.toString()`
```js
let complex = new Complex(1, 2);
console.log(complex.toString()); // -> "1+2i"
```

### 計算
#### 加算 `add(cmp)`
```js
let cmp1 = new Complex(1, 2); // 1 + 2i
let cmp2 = new Complex(3, 4); // 3 + 4i
let add = cmp1.add(cmp2);
console.log(add.toString()); // -> "4+6i"
```
(1 + 2i) + (3 + 4i) = 4 + 6i

#### 減算 `sub(cmp)`
```js
let cmp1 = new Complex(1, 2); // 1 + 2i
let cmp2 = new Complex(3, 4); // 3 + 4i
let sub = cmp1.sub(cmp2);
console.log(sub.toString()); // -> "-2-2i"
```
(1 + 2i) - (3 + 4i) = -2 - 2i

#### 乗算 `mul(cmp)`
```js
let cmp1 = new Complex(1, 2); // 1 + 2i
let cmp2 = new Complex(3, 4); // 3 + 4i
let mul = cmp1.mul(cmp2);
console.log(mul.toString()); // -> "-5+10i"
```
(1 + 2i)(3 + 4i) = -5 + 10i

#### 乗算 (スカラー倍) `mulByScalar(scalar)`
```js
let cmp1 = new Complex(1, 2); // 1 + 2i
let mulByScalar = cmp1.mulByScalar(3);
console.log(mulByScalar.toString()); // -> "3+6i"
```
(1 + 2i) × 3 = 3 + 6i

#### 除算 `div(cmp)`
```js
let cmp1 = new Complex(1, 2); // 1 + 2i
let cmp2 = new Complex(3, 4); // 3 + 4i
let div = cmp1.div(cmp2);
console.log(div.toString()); // -> "0.44+0.07999999999999999i"
```
(1 + 2i) / (3 + 4i) = 0.44 + 0.07999999999999999i

#### 逆数 `inv()`
```js
let cmp1 = new Complex(1, 2); // 1 + 2i
let inv = cmp1.inv();
console.log(inv.toString()); // -> "0.2-0.4i"
```
1 / (1 + 2i) = 0.2 - 0.4i

#### 累乗 `pow(exponent)`
```js
let cmp1 = new Complex(1, 2); // 1 + 2i
let pow = cmp1.pow(0.5);
console.log(pow.toString()); // -> "1.272019649514069+0.7861513777574233i"
```
(1 + 2i) ^ 0.5 = 1.272019649514069 + 0.7861513777574233i

#### 正規化 `normalize()`
```js
let cmp1 = new Complex(1, 2); // 1 + 2i
let normalize = cmp1.normalize();
console.log(normalize.toString()); // -> "0.4472135954999579+0.8944271909999159i"
```
(1 + 2i) / |1 + 2i| = 0.4472135954999579 + 0.8944271909999159i


## 使用例
RLC直列回路のインピーダンスの計算に使ってみましょう。

### 回路の数式
```
    I
 +-->--[ R ]----[ C ]----[ L ]-----+
 |                                 |
 |                                 |
   <------------- V ------------->
```

虚数単位を j 、角周波数を ω = 2πf とします。

- R (抵抗) のインピーダンスは z_R = R
- L (キャパシター) のインピーダンスは z_L = jωL
- C (インダクター) のインピーダンスは z_C = 1 / (jωC)

なので、回路全体のインピーダンス Z は Z = z_R + z_L + z_R となります。

### 100Hz で計算
100Hz の交流を入力したときの回路のインピーダンスは以下のようになります。

```js
let R = 10;   // 10Ω
let L = 1e-3; // 1mH
let C = 1e-6; // 1μF
let omega = 2 * Math.PI * 100; // 100Hz
let zR = new Complex(R, 0);                              // R
let zL = new Complex(0, 1).mulByScalar(omega * L);       // jωL
let zC = new Complex(0, 1).mulByScalar(omega * C).inv(); // 1 / (jωC)
let z = zR.add(zL).add(zC);
let abs = z.abs();
console.log(z.re()); // -> 10
console.log(z.im()); // -> -1590.9211123882355
console.log(abs);    // -> 1590.9525404117562
```

### 共振周波数で計算
また、周波数を LC 共振周波数にするとインピーダンスの虚部が 0 になることが確認できます。
なお、下の例でもそうですが JavaScript の仕様上完全に 0 にならない場合があります。
```js
let R = 10;   // 10Ω
let L = 1e-3; // 1mH
let C = 1e-6; // 1μF
let omega = 1 / Math.sqrt(L * C); // L と C の共振角周波数
let zR = new Complex(R, 0);                              // R
let zL = new Complex(0, 1).mulByScalar(omega * L);       // jωL
let zC = new Complex(0, 1).mulByScalar(omega * C).inv(); // 1 / (jωC)
let z = zR.add(zL).add(zC);
let abs = z.abs();
console.log(z.re()); // -> 10
console.log(z.im()); // -> -3.552713678800501e-15
console.log(abs);    // -> 10
```


## ライセンス
MIT License です。