$(function() {
  $('#search').change(function() {
      var keyword = $('#search').val()
      // chrome.storage.sync.get('blackList', function (result) {
      //   keywords = result.keywords
      //   alert(result.keywords)
      //   console.log(result)
      // })
      chrome.storage.sync.set({'blackList2': keyword}, function() {
          // Notify that we saved.
          alert('setting saved')
          console.log('jew')
      })
  });
});
