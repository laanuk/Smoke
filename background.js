chrome.extension.onMessage.addListener(
  function (request, sender) {
    var url = sender.tab.url
    if (needsCulling(url)) {
      chrome.history.search({text: url, maxResults: 1}, function(data) {
        var item = data.pop().url
        chrome.history.deleteUrl({"url": item}, function() {
        })
      })
      insertUrl()
    }
})

var needsCulling = function (url) {
  var cullMe = ["reddit.com", "imgur.com"]
  for (var i = 0; i < cullMe.length; i++) {
    if (url.indexOf(cullMe[i]) >= 0) {
      return true
    }
  }
  return false
}

var insertUrl = function (keywords) {
  var urlToInsert = "http://www.google.com/search?q=my+keywords+for+search&btnI"
  chrome.history.addUrl({"url": urlToInsert})
}

$.ajax({
   url: "http://api.wordnik.com//v4/word.json/cat/definitions?api_key=mykey&includeRelated=false&includeTags=false&limit=1",
   dataType : 'json',
   success: function (data) {
     console.log(data[0].word)
   },
   error: function (e) {
     console.log(e.message)
   }
});
