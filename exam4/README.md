# this
자바스크립트의 this는, 여러가지 함수가 호출되는 방식에 따라 다른 객체를 참조하는데, 이것을 this 바인딩이라고 한다.

## 객체의 메서드를 호출할 때 this 바인딩

```html
<script>
var myObject = {
    name : 'foo',
    sayName : function () {
        console.log(this.name);
    }
};

var otherObject = {
    name : 'bar'
};

otherObject.sayName = myObject.sayName;

myObject.sayName();
otherObject.sayName();
</script>
```

## 함수를 호출할 때 this 바인딩
* window 객체에 바인딩

```html
<script>
var test = 'this is test';
console.log(window.test);

var sayFoo = function () {
    console.log(this.test);
};
sayFoo();
</script>
```

* 내부 함수의 this 바인딩

```html
<script>
var value = 100;

var myObject = {
    value : 1,
    func1 : function () {
        this.value += 1;
        console.log(this.value);

        func2 = function () {
            this.value += 1;
            console.log(this.value);

            func3 = function () {
                this.value += 1;
                console.log(this.value);
            }
            func3();
        }
        func2();
    }
};
myObject.func1();
</script>
```

## 생성자 함수를 호출할 때 this 바인딩
1. 빈 객체 생성 및 this 바인딩
2. this를 통한 프로퍼티 생성
3. 생성된 객체 리턴

```html
<script>
var Person = function (name) {
    this.name = name;
};

var foo = new Person('foo');
console.log(foo.name);
</script>
```

## call과 apply 메서드를 이용한 명시적인 this 바인딩

```html
<script>
function Person (name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
};

var foo = {};

Person.apply(foo, ['foo', 30, 'man']);
// Person.call(foo, 'foo', 30, 'man');
</script>
```