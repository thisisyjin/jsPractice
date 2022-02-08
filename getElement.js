let el = function(element) {
    if (element.charAt(0) === "#") {      // If passed an ID 
      return document.querySelector(element);     //  returns single element
    }

    return document.querySelectorAll(element);    // Otherwise, returns a nodelist
  };

