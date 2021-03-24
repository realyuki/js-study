## 콜백 함수
* 어떤 이벤트가 발생했거나 특정 시점에 도달했을때 시스템에서 호출되는 함수
* 특정 함수의 인자로 넘겨서, 코드 내부에서 호출되는 함수

```html
<script>
var obj = {
    init : function () {
        this.bindEvents();
    },
    bindEvents : function () {
        $(window).on('load', $.proxy(this.onLoadFunc, this));
    },
    onLoadFunc : function (callback) {
        if (callback) {
            this.callbackFunc();
        }
    },
    callbackFunc : function () {
        console.log(2);
    }
}
obj.init();
</script>
```
