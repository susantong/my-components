#封装的利用JSONP跨域的ajax

使用时与jquery的ajax类似，传入的参数

```
{
	url: url,	//提交的地址
	method: 'get'/'post',	//提交方式
	dataType: 'json'/'jsonp',	//数据的返回方式
	data: {},	//提交的数据
	async: true/false,	//同步或者异步
	success: function,	//数据成功返回的回调函数
	error: function	//数据返回失败的回调函数
}
```