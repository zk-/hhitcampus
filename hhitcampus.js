Date.prototype.nextDay = function() {
	var d = new Date(this.getTime());
	d.setTime(this.getTime() + 1000 * 60 * 60 * 24);
	return d;
}

$(document).on("pageinit", "#calendar", function(evt) {
	var startDate = new Date("2014/2/17");
	var endDate = new Date("2014/7/6");

	var oneDayInMilliSeconds = 1000 * 60 * 60 * 24;
	var semesterInMilliSeconds = endDate.getTime() - startDate.getTime();
	var weeks =  Math.ceil(semesterInMilliSeconds / oneDayInMilliSeconds / 7);
	
	var semesterMonths = new Array();
	var semesterWeeks = new Array(weeks);
	var calendarDate = startDate;
	
	var daysByMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var monthNames = ["一月", "二月", "三月", "四月", "五月", "六月",
		"七月", "八月", "九月", "十月", "十一月", "十二月"];
	var currentMonthWeeks = {};
	for (var i = 0; i < weeks; i++) {
		var monthOfWeek = calendarDate.getMonth();
		if (monthOfWeek != currentMonthWeeks.month) {
			currentMonthWeeks = {
					month: monthOfWeek, 
					weeks: [i]
			};
			semesterMonths.push(currentMonthWeeks);
		}
		else {
			currentMonthWeeks.weeks.push(i);
		}
		semesterWeeks[i] = new Array(7);
		for (j = 0; j < 7; j++) {
			semesterWeeks[i][j] = calendarDate;
			console.log(calendarDate.toLocaleString());
			calendarDate = calendarDate.nextDay();
		}
	}
	
	calendarEl = document.getElementById("calendar-table");
	for (var i = 0; i < semesterMonths.length; i++) {
		createMonthHtml(semesterMonths[i]);
	}
	
	function createMonthHtml(monthWeeks) {
		var rows = monthWeeks.weeks.length;
		var monthEl = document.createElement("td");
		monthEl.innerText = monthNames[monthWeeks.month];
		monthEl.className = "monthname month-" + (monthWeeks.month + 1);
		if (rows > 1) {
			monthEl.rowSpan = rows;
		}
		for (var i = 0; i < rows; i++) {
			var el = createWeekRowEl(monthWeeks.weeks[i], i == 0, monthEl);
			calendarEl.appendChild(el);
		}
	}
	
	function createWeekRowEl(week, firstWeekOfMonth, monthEl) {
		var dates = semesterWeeks[week];
		var rowEl = document.createElement("tr");
		if (firstWeekOfMonth) {
			rowEl.appendChild(monthEl);
		}
		var weekEl = document.createElement("td");
		weekEl.innerText = "第" + (week + 1) + "周";
		weekEl.className = "weekname month-" + (dates[0].getMonth() + 1);
		rowEl.appendChild(weekEl);
		for (var i = 0; i < dates.length; i++) {
			var weekdayEl = document.createElement("td");
			weekdayEl.innerText = dates[i].getDate();
			weekdayEl.className = "month-" + (dates[i].getMonth() + 1);
			rowEl.appendChild(weekdayEl);
		}
		return rowEl;
	}	
});