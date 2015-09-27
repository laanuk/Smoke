chrome.extension.onMessage.addListener(
  function (request, sender) {
    var url = sender.tab.url
    if (needsCulling(url)) {
      chrome.history.search({text: url, maxResults: 1}, function(data) {
        var item = data.pop().url
        chrome.history.deleteUrl({"url": item}, function() {
        })
      })
    }
})

var needsCulling = function (url) {
  console.log("url " + url)
  var cullMe = ["reddit.com", "imgur.com"]
  for (var i = 0; i < cullMe.length; i++) {
    if (url.indexOf(cullMe[i]) >= 0) {
      console.log("cull " + url)
      return true
    }
  }
  console.log("gucci " + url)
  return false
}
