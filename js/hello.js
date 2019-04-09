var time = new Date().getHours();

function getTime() {
	var text;
	if (time < 7) {
		text="该休息了！ 早睡早起身体好！"
	} else if (time < 10) {
		text = "早上好！新的一天开始了！ ";
	} else if (time < 12) {
		text = "中午好！午餐想好了吗？ ";
	}else if (time < 14) {
		text = "中午好！ 睡个午觉休息下吧！";
	} else if (time < 18) {
		text = "下午好！ 抵抗困意ing (o-ωｑ)).oO ";
	} else if (time < 24) {
		text = "晚上好！ 开启业余生活啦！ ";
	} else {
		text = "GOOD DAY";
	}
	return text;
}

$(document).ready(function() {
	var text = getTime();
	$("#hello").html(text).fadeOut(5000);
	})