var Foo = /** @class */ (function () {
  function Foo(size) {
    this.size = size
  }
  Foo.prototype[Symbol.toPrimitive] = function (type) {
    if (type === 'number') return this.size
  }
  return Foo
})()
var a = new Foo(3)
var b = new Foo(5)
var c = new Foo(7)
console.log(b >a)
console.log(b >a)
