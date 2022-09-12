function Validation() {
  //check null
  this.nullCheck = function (value, errorID, message) {
    if (value === "") {
      document.getElementById(errorID).style.display = "block";
      document.getElementById(errorID).innerHTML = message;
      return false;
    }

    document.getElementById(errorID).style.display = "none";
    document.getElementById(errorID).innerHTML = null;
    return true;
  };

  //check text
  this.textCheck = function (value, errorID, message) {
    var letters = /^[a-zA-Z\s]*$/;
    if (value.match(letters)) {
      document.getElementById(errorID).style.display = "none";
      document.getElementById(errorID).innerHTML = null;
      return true;
    }

    document.getElementById(errorID).style.display = "block";
    document.getElementById(errorID).innerHTML = message;
    return false;
  };

  //check length
  this.lengthCheck = function (value, errorID, message, min, max) {
    if (value.trim().length >= min && value.trim().length <= max) {
      document.getElementById(errorID).style.display = "none";
      document.getElementById(errorID).innerHTML = null;
      return true;
    }

    document.getElementById(errorID).style.display = "block";
    document.getElementById(errorID).innerHTML = message;
    return false;
  };

  //check Email
  this.emailCheck = function (value, errorID, message) {
    var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (value.match(emailPattern)) {
      document.getElementById(errorID).style.display = "none";
      document.getElementById(errorID).innerHTML = null;
      return true;
    }

    document.getElementById(errorID).style.display = "block";
    document.getElementById(errorID).innerHTML = message;
    return false;
  };

  //check Password
  this.passwordCheck = function (value, errorID, message) {
    var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

    if (value.match(passwordPattern)) {
      document.getElementById(errorID).style.display = "none";
      document.getElementById(errorID).innerHTML = null;
      return true;
    }

    document.getElementById(errorID).style.display = "block";
    document.getElementById(errorID).innerHTML = message;
    return false;
  };

  //check 'required select'
  this.selectCheck = function (value, select, errorID, message) {
    if (value === select) {
      document.getElementById(errorID).style.display = "block";
      document.getElementById(errorID).innerHTML = message;
      return false;
    }

    document.getElementById(errorID).style.display = "none";
    document.getElementById(errorID).innerHTML = null;
    return true;
  };

  //check already exist
  this.existCheck = function (value, accountList, errorID, message) {
    for (var i = 0; i < accountList.length; i++) {
      if (value === accountList[i]) {
        document.getElementById(errorID).style.display = "block";
        document.getElementById(errorID).innerHTML = message;
        return false;
      }
    }

    document.getElementById(errorID).style.display = "none";
    document.getElementById(errorID).innerHTML = null;
    return true;
  };
}
