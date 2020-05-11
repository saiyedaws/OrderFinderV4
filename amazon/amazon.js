let bg_port = chrome.runtime.connect({ name: "amazon" });
bg_port.postMessage({ type: 'from_amazon_order', amazonItemUrl: getCurrentUrl()});



bg_port.onMessage.addListener((request) => 
{



});





function getCurrentUrl(){

    return window.location.href;
}


