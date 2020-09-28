var savedPhoneNumber;

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) 
    {
      if (message.type === 'from_amazon' && message.command === 'start_auto_order') 
      {
		console.log('start_auto_order');
        savedPhoneNumber = message.savedPhoneNumber;
        orderItem();
        //page refreshes

      }
    }

  );

  async function orderItem(){

    chrome.runtime.sendMessage(
        { type: "from_amazon", command: "start_auto_order" }
    );

        //wait for original address

        waitUntilElementExists('#address-ui-widgets-original-address-block_id-input', (el) => chooseOriginalAddress());

        waitUntilElementExists('#giftOptions', (el) => saveGiftOptions());
    
        //page refreshes
        waitUntilElementExists('#shipoption-select', (el) => chooseShippingOption());

        waitUntilElementExists('#apx-content', (el) => choosePaymentMethod());


    
    try {
        removeAddressBooks();

    } catch (error) {
        console.log("error",error)
    }
  


    try {
        await autoPasteAddress();
        await waitFor(2000);
        //async begins
        document.getElementById("address-ui-widgets-form-submit-button").click();
    

    } catch (error) {
        console.log("error",error)
    }

  

   




  }

  function choosePaymentMethod(){

    setTimeout(() => {
        var button = document.querySelector(".a-button-input.a-button-text");
        button.click();
    }, 2000);
  
  }

  function chooseShippingOption(){

    var button = document.querySelector(".a-button-text");
    button.click();
  }


  async function chooseOriginalAddress()
  {
    await waitFor(5000);

      var originalAddress = document.getElementById("address-ui-widgets-original-address-block_id-input");
      originalAddress.click();

      await waitFor(3000);

      var saveAddressButton = document.querySelector('input[name="address-ui-widgets-saveOriginalOrSuggestedAddress"]');
      saveAddressButton.click();

   

  }

  function autoPasteAddress(){

    return new Promise((resolve)=>{

        try {
		
            var details = JSON.parse(localStorage.getItem('details'));
            pasteBuyerAddress(details, savedPhoneNumber);
            resolve();
    
    
        } catch (error) {
            console.log("error",error);
        }

    });



  }

  function saveGiftOptions()
  {

     
      document.querySelector(".a-button-input").click();

     
  }

  async function removeAddressBooks()
  {

    var addressbooks = document.getElementsByClassName("address-book-entry a-spacing-double-large ");

    if(addressbooks.length > 1){
        for (let index = 1; index < addressbooks.length; index++) 
        {
            var addressbook = addressbooks[index];
            var deleteButton = addressbook.querySelector(".deletebutton");
            deleteButton.click();
            await waitFor(3000);
            
        }

        await waitFor(5000);
    }

  
  }

  function waitFor(time){
      return new Promise((resolve)=>{


        
        setTimeout(() => {
            resolve();
        }, time);

     
      });
  }