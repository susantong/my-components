;(function() {
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = 'calender.css';
	document.getElementsByTagName('head')[0].appendChild(link);

	function Calender(obj) {
		this.date = obj ? (obj.date ? obj.date : [2017, 6, 3]) : [2017, 6, 3];
		this.week = ['日', '一', '二', '三', '四', '五', '六'];
		this.dom = obj.dom;
		this.init();
	}

	//原型
	Calender.prototype = {
		constructor: Calender,

		init: function() {
			this.addHtml();
			this.initActive(2);
			this.clickDay();
			this.click();
		},
		//active初始化
		initActive: function(tag) {
			var li, str;
			switch(tag) {
				case 0:
					str = '.calender-year';
					break;
				case 1:
					str = '.calender-month';
					break;
				case 2:
					str = '.calender-num';
					break;
			}
			li = document.querySelector(str).getElementsByTagName('li');
			for (var i = 0; i < li.length; i++) {
				if (tag == 2 && this.date[2] == 30 || this.date[2] == 31) {
					var space = this.getSpace();
					var days = this.getDays();
					li[space + days[this.date[1]-1] - 1].className = 'active';
					break;
				}
				if (li[i].innerHTML == this.date[tag]) {
					li[i].className = 'active';
				}
			}
		},
		//html初始化
		addHtml: function() {
			var html = '<div class="title"><span class="calender-left">&lt</span><i class="year">' + this.date[0] + '</i>&nbsp;年&nbsp;<i class="month">' + this.date[1] + '</i>&nbsp;月' + '<span class="calender-right">&gt</span></div><div class="calender-list"><ul class="calender-week"><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul><div class="calender-num"><ul>';
			
			var sum = 1;
			var space = this.getSpace();
			var days = this.getDays()[this.date[1] - 1];
			for (var i = 0; i < space; i++) {
				html += '<li class="space"></li>';
			}
			for (var i = 0; i < (7 - space); i++) {
				html += '<li>' + (sum++) + '</li>';
			}
			html += '</ul>';
			for (var i = 0; i < 5; i++) {
				html += '<ul>';
				for (var j = 0; j < 7; j++) {
					if (sum <= days) {
						html += '<li>' + (sum++) + '</li>';
					} else {
						html += '<li class="space"></li>'; 
					}
				}
				html += '</ul>';
			}
			html += '</ul></div></div>';
			var div = document.createElement('div');
			div.className = 'wrap';
			div.innerHTML = html;
			this.getPos(div);
		},
		//设置组件位置
		getPos: function(div) {
			var left = this.dom.offsetLeft;
			var top = this.dom.offsetTop + this.dom.offsetHeight;
			document.body.appendChild(div);
			div.style.left = left + 'px';
			div.style.top = top + 'px';
		},
		hide: function() {
			document.querySelector('.wrap').style.display = 'none';
		},
		show: function() {
			document.querySelector('.wrap').style.display = 'block';
		},
		//判断是否为闰年
		getYear: function(year) {
			if (!year%400 || !!(year%4 == 0 && year%100)) {
				return 1;
			} else {
				return 0;
			}
		},
		//获取一年的十二个月
		getDays: function() {
			return [31, 28 + this.getYear(this.date[0]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		},
		//获取这个月1号前面的空格数，即返回本月1号是星期几
		getSpace: function() {
			return (new Date(this.date[0], this.date[1] - 1, this.date[2])).getDay();
		},
		//点击每天的事件处理
		clickDay: function() {
			var list = document.querySelector('.calender-num');
			var lists = document.querySelector('.calender-list');
			var that = this;
			list.addEventListener('click', result, false);

			function result(event) {
				var e = event || window.event;
				var li = list.getElementsByTagName('li');

				if (e.target.nodeName.toLowerCase() == 'li') {
					if (e.target.className == 'space') {
						return;
					}
					for (var i = 0; i < li.length; i++) {
						li[i].className = '';
					}
					if (e.target.innerHTML) {
						e.target.className = 'active';
						if (lists.className == 'calender-list calender-year') {
							that.date[0] = parseInt(e.target.innerHTML);
							that.remove();
							that.init();
							that.show();
						} else if (lists.className == 'calender-list calender-month') {
							that.date[1] = e.target.innerHTML;
							that.remove();
							that.init();
							that.show();
						} else {
							that.date[2] = e.target.innerHTML;
							that.dom.value = that.date[0] + '年' + that.date[1] + '月' + that.date[2] + '日';
							that.hide();
						}
					}
				}

			}
		},
		//其余的事件处理
		click: function() {
			
			var that = this;

			var title = document.querySelector('.title');
			title.addEventListener('click', change, false);
			this.dom.addEventListener('click', this.show, false);

			function change(event) {
				var e = event || window.event;
				var target = e.target.className;
				switch(target) {
					case 'calender-left':
						if (that.date[1] <= 1) {
							that.date[0]--;
							that.date[1] = 12;
						} else {
							that.date[1]--;
						}
						that.remove();
						that.init();
						that.show();
						break;
					case 'calender-right':
						if (that.date[1] >= 12) {
							that.date[0]++;
							that.date[1] = 1;
						} else {
							that.date[1] = that.date[1] + 1;
						}
						that.remove();
						that.init();
						that.show();
						break;
					case 'year':
						that.remove();
						that.chooseYear();
						break;
					case 'year-left':
						that.date[0] -= 9;
						that.remove();
						that.chooseYear();
						break;
					case 'year-right':
						that.date[0] += 9;
						that.remove();
						that.chooseYear();
						break;
					case 'month':
						that.remove();
						that.chooseMonth();
						break;
				}
				
			}
			
		},
		//移除操作
		remove: function() {
			var wrap = document.querySelector('.wrap');
			wrap.parentNode.removeChild(wrap);
		},
		//当切换到year的html转换
		addYear: function() {
			var html = '<div class="title"><span class="year-left">&lt</span><i class="year">' + this.date[0] + '</i>&nbsp;年&nbsp;<i class="month">' + this.date[1] + '</i>&nbsp;月' + '<span class="year-right">&gt</span></div><div class="calender-list calender-year"><div class="calender-num">';

			var start = this.date[0] - 4;
			for (var i = 0; i < 3; i++) {
				html += '<ul>';
				for (var j = 0; j < 3; j++) {
					html += '<li>' + (start++) + '</li>'; 
				}
				html += '</ul>';
			}
			html += '</div></div>';
			var div = document.createElement('div');
			div.className = 'wrap';
			div.innerHTML = html;
			this.getPos(div);
		},
		//当切换到month的html转换
		addMonth: function() {
			var html = '<div class="title"><span>&lt</span><i class="year">' + this.date[0] + '</i>&nbsp;年&nbsp;<i class="month">' + this.date[1] + '</i>&nbsp;月' + '<span>&gt</span></div><div class="calender-list calender-month"><div class="calender-num">';
			var start = 1;

			for (var i = 0; i < 4; i++) {
				html += '<ul>';
				for (var j = 0; j < 3; j++) {
					html += '<li>' + (start++) + '</li>';
				}
				html += '</ul>';
			}
			html += '</div></div>';
			var div = document.createElement('div');
			div.className = 'wrap';
			div.innerHTML = html;
			this.getPos(div);
		},
		chooseYear: function() {
			this.addYear();
			this.show();
			this.initActive(0);
			this.clickDay();
			this.click();
		},
		chooseMonth: function() {
			this.addMonth();
			this.show();
			this.initActive(1);
			this.clickDay();
			this.click();
		}
	};

	window.Calender = Calender;
})();