var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348';

function filterChapter (html) {
	const $ = cheerio.load(html);
	const chapters =$(".chapter");
	const courseData = [];
	// courseData = [
	//  {
	//  chapterTitle:chapterTitle,
	//  videos: [ id,videoTitle]
	//  }
	// ]

	chapters.each(function (item) {
		var chapter = $(this);
		var chapterTitle = chapter.find('strong').text();
		var videos = chapter.find('.video').children('li');
		var chaptersData = {
			chapterTitle: chapterTitle,
			videos: []
		}
		videos.each(function(){
			var video = $(this).find('.J-media-item');
			videoTitle = video.text();
			var id = video.attr('href').split('video/')[1];

			chaptersData.videos.push({
				title: videoTitle,
				id: id
			})
		})
		courseData.push(chaptersData);
	})
	return courseData;
}
function printCourseInfo(courseData) {
	courseData.forEach(function(item) {
		console.log( item.chapterTitle + '\n');
		item.videos.forEach(function(video) {
			console.log(' 【' + video.id + '】' + video.title + '\n');

		})
	})
}
http.get(url,function(res) {
	var html = '';
	var i = 0;
	res.on('data', function(data){
		++i;
		html += data;
		//console.log( i +"hello 竹剑" + html + i +"hello world");
	});
	res.on('end', function() {
		//console.log(html);
		
		printCourseInfo(filterChapter(html));
	});

}).on('error',function (error) {
	console.log('出错啦' + error);
})