// Business Logic for AddressBook ---------
function AddressBook() {
  (this.contacts = []), (this.currentId = 0);
}

AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
};

AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function (id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  }
  return false;
};

AddressBook.prototype.deleteContact = function (id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  }
  return false;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, email2, address) {
  (this.firstName = firstName),
    (this.lastName = lastName),
    (this.phoneNumber = phoneNumber),
    (this.email = email);
  (this.email2 = email2);
  (this.address = address);
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
};


function Address(street, city, zip, type) {
  this.street = street;
  this.city = city;
  this.zip = zip;
  this.type = type
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function (contact) {
    htmlForContactInfo +=
      "<li id=" +
      contact.id +
      ">" +
      contact.firstName +
      " " +
      contact.lastName +
      "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").fadeToggle();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email + ' ' + contact.email2);
  // $(".email").append( contact.email2 );
  // if (contact.email2 === undefined) {
  //   // $(".email").remove('#email2');
  // }
  $(".address").empty();
  contact.address.forEach(function (address) {
    if (address.street && address.city && address.type && address.zip) {
      $(".address").append(`<p><strong>${address.type} address: </strong>${address.street}, ${address.city}, ${address.zip}</p>`);
    }
  })

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append(
    "<button class='deleteButton' id=" + contact.id + ">Delete</button>"
  );
}

function attachContactListeners() {
  var caw = new Audio('https://freesound.org/data/previews/361/361470_6512973-lq.mp3')
  $("ul#contacts").on("click", "li", function (event) {
    showContact(event.target.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
  $('button').click(function () {
    caw.play();
  })
}

function clearInputs() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input#new-phone-number").val("");
  $("input#new-email").val("");
  $("input#new-email2").val("");
  for (var i = 1; i <= 3; i++) {
    $(`input#street${i}`).val('');
    $(`input#city${i}`).val('');
    $(`input#zip${i}`).val('');
    $(`input#type${i}`).val('');
  }
}

$(document).ready(function () {
  attachContactListeners();
  $("form#new-contact").submit(function (event) {
    event.preventDefault();
    $("#contact-form").fadeToggle();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = $("input#new-email").val();
    var inputtedEmail2 = $("input#new-email2").val();
    var inputtedStreet = $("input#street1").val();
    var inputtedCity = $("input#city1").val();
    var inputtedZip = $("input#zip1").val();
    var inputtedType = $("input#type1").val();
    var inputtedStreet2 = $("input#street2").val();
    var inputtedCity2 = $("input#city2").val();
    var inputtedZip2 = $("input#zip2").val();
    var inputtedType2 = $("input#type2").val();
    var inputtedStreet3 = $("input#street3").val();
    var inputtedCity3 = $("input#city3").val();
    var inputtedZip3 = $("input#zip3").val();
    var inputtedType3 = $("input#type3").val();
    clearInputs()

    var newAddress = new Address(
      inputtedStreet,
      inputtedCity,
      inputtedZip,
      inputtedType,
    );

    var newAddress2 = new Address(
      inputtedStreet2,
      inputtedCity2,
      inputtedZip2,
      inputtedType2
    );
    var newAddress3 = new Address(
      inputtedStreet3,
      inputtedCity3,
      inputtedZip3,
      inputtedType3
    );
    var newContact = new Contact(
      inputtedFirstName,
      inputtedLastName,
      inputtedPhoneNumber,
      inputtedEmail,
      inputtedEmail2,
      [newAddress, newAddress2, newAddress3]
    );
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});
