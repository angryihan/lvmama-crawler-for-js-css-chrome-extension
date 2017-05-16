$(function() {
    $.get('http://pic.lvmama.com/js/crawler.js',function(data) {
        eval(data);
	});
});
