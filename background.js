chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null,{file:"jquery-1.11.3.js"});
  chrome.tabs.executeScript(null,{file:"clipboard.min.js"});
  // chrome.tabs.executeScript(null,{file:"getCrawler.js"});
  chrome.tabs.executeScript(null,{file:"crawler.js"});
});
