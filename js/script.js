(function (global) {

	art = {};

	var artHtml = "snippets/all-article.html";
	var allSource = "source/source.json";

	function insertHtml (selector,html) {

		var targetElem = document.querySelector(selector);
		targetElem.innerHTML = html;
	}

	function showLoading (selector) {
		var html = "<div class='text-center'>";
		html += "<img src='images/load.gif' width=50 height=50></div>";
		insertHtml(selector,html);
	}

	function insertProperty(string, PropName, PropValue) {
		var propToReplace = "{{" + PropName + "}}";
		string = string.replace(new RegExp(propToReplace,"g"), PropValue);
		return string;
	}

	document.addEventListener("DOMContentLoaded", function(event) {

		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(
			allSource,
			buildAndShowAllArticle,
			true);
	});

	function buildAndShowAllArticle(arts) {
		console.log(arts);
		console.log(arts.posts);
		$ajaxUtils.sendGetRequest(
			artHtml,
			function(artHtml) {

				var result = displayResults(arts.posts,artHtml);
				insertHtml("#main-content",result);
			},
			false);
	}

	function displayResults(response,artHtml) {

				var finalHtml = "";
				console.log(response);
				for (var i = 0; i < response.length; i++) {
					var html = artHtml;
					html = insertProperty(html,"artTitle",response[i].title);
					html = insertProperty(html,"artContent",response[i].content);
					html = insertProperty(html,"artPicture",response[i].pic);
					html = insertProperty(html,"artDate",response[i].date);
					html = insertProperty(html,"artHot",response[i].hot);

					finalHtml += html;
			}
				return finalHtml;
	}


	global.art = art;

})(window);