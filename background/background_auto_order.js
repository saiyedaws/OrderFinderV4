// Begins to listen messages from popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (
		message.type === "from_amazon" &&
		message.command === "start_auto_order"
	) {
		console.log("start_auto_order");
		console.log("sender", sender);
		console.log("message", message);

		orderAmazonItem(sender.tab.id);
	}
});

function orderAmazonItem(amazonAutoOrderTab) {
	chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
		if (info.status === "complete" && tabId === amazonAutoOrderTab) {
			console.log("AmazonAutoOrderTab");
            chrome.tabs.onUpdated.removeListener(listener);
            
            var savedPhoneNumber = localStorage.getItem("phoneNumber");

			chrome.tabs.sendMessage(amazonAutoOrderTab, {
				type: "from_amazon",
                command: "start_auto_order",
                savedPhoneNumber: savedPhoneNumber
			});
		}
	});
}
