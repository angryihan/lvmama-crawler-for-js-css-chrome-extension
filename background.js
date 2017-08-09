chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null,{file:"assets/js/jquery-1.11.3.js"});
  chrome.tabs.executeScript(null,{file:"assets/js/clipboard.min.js"});
  chrome.tabs.executeScript(null,{file:"assets/js/crawler.js"});
  // chrome.tabs.executeScript(null,{file:"assets/js/getCrawler.js"});
});
