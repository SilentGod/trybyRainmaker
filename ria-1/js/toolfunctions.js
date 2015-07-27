// 对象成员排序，用于 顺序显示任务列表
function sortObjectMember (objectargument) {
	var tempobject = {};
	var memberlist = [];
	for(var member in objectargument){
		memberlist.push(member);
	}
	memberlist.sort();
	for (var i = 0; i < memberlist.length; i++) {
		tempobject[memberlist[i]] = objectargument[memberlist[i]];
	};
	return tempobject;
}


//阻止事件冒泡函数
function stopBubble(e) {
    e = e || window.event;
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

//生成随机字符串
function randomString(length) {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

	if (!length) {
		length = Math.floor(Math.random() * chars.length);
	}
	var str = '';
	for (var i = 0; i < length; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}

//删除子节点
function clearChildElements(element) {
    var childs = element.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {
        // alert(childs[i].nodeName);
        element.removeChild(childs[i]);
    }
}

//去除字符串首尾空格
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}


/**
    判断输入框中输入的日期格式是否为 yyyy-mm-dd   或yyyy-m-d
*/
function isDate(dateString) {
	if (dateString.trim() == "") return true;
	//年月日正则表达式
	var r = dateString.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	if (r == null) {
		// alert("请输入格式正确的日期\n\r日期格式：yyyy-mm-dd\n\r例    如：2008-08-08\n\r");
		return false;
	}
	var d = new Date(r[1], r[3] - 1, r[4]);
	var num = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
	if (num == 0) {
		// alert("请输入格式正确的日期\n\r日期格式：yyyy-mm-dd\n\r例    如：2008-08-08\n\r");
		return false;
	}
	return (num != 0);

}