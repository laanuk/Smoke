var storage = chrome.storage.local

chrome.extension.onMessage.addListener(
  function (request, sender) {
    var url = sender.tab.url
    cull(url)
})

var cull = function (url) {
  storage.get('blackList', function(items) {
    // To avoid checking items.css we could specify storage.get({css: ''}) to
    // return a default value of '' if there is no css value yet.
    if (items.blackList) {
      var cullMe = String(items.blackList);
      if (url.indexOf(cullMe) >= 0) {
        alert('REMOVED ' + url)
        chrome.tabs.query( {active:true}, function(tabs) {
          alert(tabs[0].url)
          chrome.history.deleteUrl({ url: tabs[0].url }, function() {
            alert('team?')
          });
        });
      }
    }
  });
}

var insertUrl = function (keywords) {
  var urlToInsert = "http://www.google.com/search?q=my+keywords+for+search&btnI"
  chrome.history.addUrl({"url": urlToInsert})
}

// $.ajax({
//    url: "http://api.wordnik.com//v4/word.json/cat/definitions?api_key=mykey&includeRelated=false&includeTags=false&limit=1",
//    dataType : 'json',
//    success: function (data) {
//      console.log(data[0].word)
//    },
//    error: function (e) {
//      console.log(e.message)
//    }
// });
