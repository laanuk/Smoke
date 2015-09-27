var storage = chrome.storage.local

// Get at the DOM controls used in the sample.
var resetButton = document.querySelector('button.reset');
var submitButton = document.querySelector('button.submit');
var textarea = document.querySelector('textarea');

submitButton.addEventListener('click', saveChanges);
resetButton.addEventListener('click', reset);

loadChanges()

function loadChanges() {
  storage.get('blackList', function(items) {
    // To avoid checking items.css we could specify storage.get({css: ''}) to
    // return a default value of '' if there is no css value yet.
    if (items.blackList) {
      textarea.value = items.blackList;
      message('Loaded saved Blacklist.');
    }
  });
}

function saveChanges() {
  // Get the current CSS snippet from the form.
  var list = textarea.value;
  // Check that there's some code there.
  if (!list) {
    message('Error: No Blacklist specified');
    return;
  }
  // Save it using the Chrome extension storage API.
  storage.set({'blackList': list}, function() {
    // Notify that we saved.
    message('Blacklist saved');
  });
}

function reset() {
  // Remove the saved value from storage. storage.clear would achieve the same
  // thing.
  storage.remove('blackList', function(items) {
    message('Reset stored CSS');
  });
  // Refresh the text area.
  textarea.value = '';
}

function message(msg) {
  var message = document.querySelector('.message');
  message.innerText = msg;
  setTimeout(function() {
    message.innerText = '';
  }, 3000);
}
