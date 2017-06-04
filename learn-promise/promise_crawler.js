var http = require('http');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var baseUrl = 'http://www.imooc.com/learn/';
var videoIds = [348,75,54];

function filterChapters (html) {

	const $ = cheerio.load(html);
	const chapters =$(".chapter");
  var title = $('.course-infos .hd h2').text();
  var number =$('.meta').text()
	const courseData = {
    videos: [],
    title: title,
    number: number

  };
	// courseData = {
  // title: title,
  // number: number,
	//  videos: [{
	//  chapterTitle:chapterTitle,
	//  videos: [ id,videoTitle]
	//  }]
	// }
console.log(courseData);
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
		courseData.videos.push(chaptersData);
	})
  console.log(courseData)
	return courseData;
}
function printCourseInfo(coursesData) {
  coursesData.forEach(courseData=>console.log(`${courseData.number}  人学过 ${courseData.title}+\n`))
	coursesData.forEach(function(courseData) {
		console.log( `#########  ${courseData.chapterTitle} + \n`);
    courseData.videos.forEach(item => {
      var chapterTitle = item.chapterTitle;
      console.log(chapterTitle+'\n');
      item.videos.forEach(function(video) {
  			console.log(' 【' + video.id + '】' + video.title + '\n');

  		})
    })

	})
}

function getPageAsync(url) {
  return new Promise(function(resolve, reject) {
    console.log(`正在爬取 + ${url}`);

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
        resolve(html);
    	// 	printCourseInfo(filterChapter(html));
    	});

    }).on('error',function (error) {
      reject(error)
    	console.log('出错啦' + error);
    })
  })
}
var fetchCourseArray = [];
videoIds.forEach(function(id) {
  fetchCourseArray.push(getPageAsync(`${baseUrl}${id}`));
})
Promise
  .all(fetchCourseArray)
  .then(function(pages) {
    var coursesData = [];

    pages.forEach(function(html) {
      var courses = filterChapters(html);
      coursesData.push(courses);
    })
  //  coursesData.sort((a,b)=> a.number-b.number);
    printCourseInfo(coursesData);
  })
