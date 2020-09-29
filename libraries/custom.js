var waitUntilElementExists = (selector, callback) => {
	var el = document.querySelector(selector);
	console.log("Checking for: " + selector);
	if (el) {
		console.log("Found: " + selector);
		return callback(el);
	}

	setTimeout(() => waitUntilElementExists(selector, callback), 500);
};

var waitUntilElementExistsViaQuerySelectorAll = (selector, callback) => {
	var el = document.querySelectorAll(selector)[0];
	console.log("Checking");
	if (el) {
		console.log("Found");
		return callback(el);
	}

	setTimeout(
		() => waitUntilElementExistsViaQuerySelectorAll(selector, callback),
		500
	);
};

function appendToLocalStorage(newItem, storageName) {


    chrome.storage.local.get(storageName, function (storage) 
    {


        if (!Array.isArray(storage[storageName])) 
        {
            var oldItems = [];
   
            
        } else 
        {
            var oldItems = storage[storageName];

		}

        oldItems.push(newItem);
        
        console.log(storageName, oldItems);

		chrome.storage.local.set({
			[storageName]: oldItems,
        });
        

	});
}

function getFromLocalStorage(storageName){
    
 
    return new Promise((resolve)=>
    {
        chrome.storage.local.get(storageName, function(storage) 
        {
            console.log('storage.storageName',storage[storageName]);
    
            resolve(storage[storageName]);
        });


    });

 
}