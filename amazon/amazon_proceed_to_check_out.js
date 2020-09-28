console.log('start');

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) 
    {
      if (message.type === 'from_amazon' && message.command === 'start_auto_order') 
      {
        console.log('start_auto_order');
        proceedToCheck();

      }
    }

  );


  function proceedToCheck()
  {
    
    document.getElementById("hlb-ptc-btn-native").click();
    chrome.runtime.sendMessage({ type: 'from_amazon', command: 'start_auto_order' }, tabId => {
      console.log('My tabId is', tabId);
   });
  }