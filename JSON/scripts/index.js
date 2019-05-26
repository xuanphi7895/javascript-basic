(function() {
    'use strict';
    // find the desired selectors
    var output = document.getElementById('policy-letter');
    // set up a request
    var request = new XMLHttpRequest();
    // keep track of the request
    request.onreadystatechange = function() {
        // check if the response data send back to us 
        if (request.readyState === XMLHttpRequest.DONE  ) {
            // check if the request is successful
            if (request.status === 200) {
                var obj = JSON.parse(request.response);
              loadDataForContent(obj.policy);
              document.onkeypress = function() {
                var j=0;
                var element = document.getElementsByClassName('content');
                
                var element1 = element[0].getElementsByTagName('p');
                
                while(element1[j]!=null){
                                j++;
                           }
              }
                 
            } else {
                // otherwise display an error message
                output.innerHTML = 'An error occurred during your request: ' + request.status + ' ' + request.statusText;
            }
        }
    }
    // specify the type of request
    request.open('Get', './letter.json');
     request.send();
})();

function loadDataForContent(obj) {
    var items = [];
    for (var i in obj) {
        if (i == "content") {
            var j = 0;
            var temp = "";
            while (obj[i][j] != null) {
                temp = temp + "<p>" + obj[i][j] + "</p>";
                j++;
            }
            items.push("<div class='" + i + "'>" + temp + "</div>");
        } else
        if (Array.isArray(obj[i])) {
            var j = 0;
            var temp = "";
          
          for (var y in obj[i]) {
            temp +="<li>"+ obj[i][y] + "</li>";
          }
            // temp += '</ul>';
            // while (obj[i][j] != null) {
            //     temp = temp + "<li>" + obj[i][j] + "</li>";
            //     j++;
            // }
            items.push("<p><ul class='" + i +"'>" + temp + "</ul></p>");
           } else {
            items.push( "<p><ul class='" + i +"'>" + obj[i] +"</ul></p>");
        }
    }
    var node = document.createElement("article");
    node.setAttribute("id","policy_letter");
    document.getElementsByTagName('body')[0].appendChild(node);
    var temp = items.join("");
    node.innerHTML = temp;
}


