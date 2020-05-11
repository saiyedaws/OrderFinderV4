let bg_port = chrome.runtime.connect({ name: "popup" });

document.getElementById("main_form").addEventListener("submit", function(e) 
{
    e.preventDefault();


    document.getElementById("json").value = "";
    var textBox = document.getElementById("json");
    textBox.click();
    textBox.focus();
    document.execCommand('paste');



    var json = document.getElementById("json").value;


    var details = JSON.parse(json);
    console.log(details);
  

    bg_port.postMessage(
        
        {
             type: "from_popup",
             command: "find_on_amazon",
             details: details
    
        });
    
  
});



document.getElementById("paste_address_form").addEventListener("submit", function(e) 
{
    e.preventDefault();


    document.getElementById("json").value = "";
    var textBox = document.getElementById("json");
    textBox.click();
    textBox.focus();
    document.execCommand('paste');



    var json = document.getElementById("json").value;


    var details = JSON.parse(json);
    console.log(details);
  

    bg_port.postMessage(
        
        {
             type: "from_popup",
             command: "paste_address",
             details: details
    
        });
    
  
});


