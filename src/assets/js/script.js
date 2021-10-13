(function ($) {
  "use strict"; // Start of use strict

  $(document).ready(function () {

    // create teh file request and its callbacks
    var rawFile = new XMLHttpRequest();
    rawFile.onerror = function() {
      console.log("errorororor");
    }
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4)
      {
        if (rawFile.status === 200 || rawFile.status === 0) {
          if (rawFile.responseText.length > 0) {
            var allText = rawFile.responseText;

            let splits = allText.split(/,/);
            $('#leftArmyName').html(splits[0]);
            $('#leftTotal').html(splits[1]);

            $('#rightArmyName').html(splits[2]);
            $('#rightTotal').html(splits[3]);
          }
        }
      }
    }
    
    // create a delegate that we run every second to update the view
    var sendFileRequest = function() { 
      rawFile.open("GET", "http://localhost:8080/assets/data/ScoreSheet.txt", true);
      rawFile.send(null);
    }
    setInterval(sendFileRequest, 1000);
  });
})(jQuery); // End of use strict
