<!DOCTYPE HTML>
<html>
  <head>
    <style>
      body {
        margin: 0px;
        padding: 0px;
      }
    </style>
  </head>
  <body>
    <canvas id="myCanvas" width="500" height="500" style="border: 1px solid black;"></canvas>
    <script>
      function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
      }
      
      var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');

      var fontSize = (canvas.height / 10) * 0.45;
	    var extraHeight = fontSize + fontSize/2;

      var maxWidth = canvas.width;
      var lineHeight = canvas.height * (70/1500);


      var x = 0;
      var y = fontSize;
      var text = 'All the world \'s a stage, and all the men and women merely players. They have their exits and their entrances; And one man in his time plays many parts.';


      var fontType = "Ariel Unicode MS";
	    var fontColor = "black";

      context.font = fontSize + "px "+fontType;
      context.fillStyle = fontColor;

      wrapText(context, text, x, y, maxWidth, lineHeight);
    </script>
  </body>
</html>      