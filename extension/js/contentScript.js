/**
 * @file The content script that run in the context of web pages.
 */
var currentUrl = window.location.href
console.log("URL: " + currentUrl)

var log = console.log.bind(console)

// @refs: https://developer.chrome.com/extensions/match_patterns
var ALL_SITES = { urls: ['<all_urls>'] }

// Mozilla doesn't use tlsInfo in extraInfoSpec.
var extraInfoSpec = ['blocking'];

// @refs: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webRequest/onHeadersReceived
if (typeof browser !== "undefined") {
    log('TLS browser extension loaded.')
    // @refs: https://stackoverflow.com/q/6566545/55075
    browser.webRequest.onHeadersReceived.addListener(async function(details){
        log('Got a request for ${details.url} with ID ${details.requestId}.')

        // Yeah this is a String, even though the content is a Number
        var requestId = details.requestId

        var securityInfo = await browser.webRequest.getSecurityInfo(requestId, {
            certificateChain: true,
            rawDER: false
        });

        log('securityInfo: ${JSON.stringify(securityInfo, null, 2)}')

    }, ALL_SITES, extraInfoSpec)
    console.log('Added listener.')
}

document.addEventListener('keydown', function(event) {
  if (event.code == 'KeyQ') {
    alert('Undo!')
  }
});
document.addEventListener("keydown", function(event) {
  console.log(event.which);
}