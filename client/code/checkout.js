$(document).ready(function() {

  var arrayStorage = localStorage.getItem('items');
  var storage = JSON.parse(arrayStorage);
  var connected = localStorage.getItem('user');
  var storageUser;
  var itemsInCart = 0;
  var firstName;
  var lastName;
  var deliveryAdress;
  var billingAdress;
  var company;
  var country;
  var city;
  var state;
  var zipCode;
  var phoneNumber;

  var boughtProd;
  var whoBought;
  var quantity;
  var total;

 init();

 function init() {
  emptyLocalStorage()
  openCloseOrdeInfo();
  renderSummary();
  totalSummary();
  userAuth();
}


  function emptyLocalStorage() {

      if(!storage) {
       storage = [];
     }
  }

  /**
   *  Open/close section.
   */
   function openCloseOrdeInfo() {
    $('.form-title a').click(function () {
      let open = $(this).attr('href');
      event.preventDefault();
      $( open).slideToggle( 500 );
    });

    $('input.btn').click(function () {
      let open = $(this).parent().parent('ul');
      let next = $(this).attr('data-id');
      event.preventDefault();  
      $( open ).slideUp( 500, function(){
        $( '#' + next ).slideDown(500, function() {
          $('html,body').animate({
            scrollTop:  $( '#' + next ).offset().top
          }, 1000);
        });
      });
    });
  }
  

  /**
   *  Render the summary section 
   */

   function renderSummary() {
    for (let i = 0; i < storage.length; i++ ) {
      $("#receiptOrder").append(`
        <li class="items odd ch-completed">
          <div class="info-wrap">
            <img class="order-image" id="${storage[i]._id}" src="${window.location.origin}/${storage[i].img}"/">
            <div class="order title">${storage[i].title}</div> 
            <div id="quantity" class="order order-quantity">${storage[i].quantity}</div>
            <span class="order operator">x</span>
            <div class="order order-price">${storage[i].price} RON</div>
          </div>
        </li>`)
    }

    $("#subtotalOrder").append(`
      <li class="totalRow">
        <span class="label">Subtotal</span>
        <span class="value" id="orderTotal"></span>
      </li>

      <li class="totalRow">
        <span class="label">TVA</span>
        <span class="value">24%</span>
      </li>

      <li class="totalRow">
        <span class="label">Livrare</span>
        <span class="value">Gratuit</span>
      </li>

      <li class="totalRow final">
        <span class="label">Total</span>
        <span class="value" id="TVATotal"></span>
      </li>
      <li class="totalRow">
        <span class="label">Modalitate plata</span>
        <span>Ramburs</span>
      </li>`)
  } 
  
  /**
   * Calculates the command summary
  */

   function totalSummary() {
    let sum = 0;
    $('.order-price').each(function() {
      let price = parseInt($(this).html());
      let quantity = $('.order-quantity').html();
      let subtotal = price * quantity;
      sum+= Number(subtotal);
      $('#orderTotal').text(sum + " RON");
      let TVA = (24/100) * sum;
      let total = sum + TVA;
      $('#TVATotal').text(total + " RON");

    });
  }

  /**
   * Request for add new order
  */

   function addOrder() {
    $.ajax({
      type: 'POST',
      url: './api/order',
      data: JSON.stringify({ 
        firstName, 
        lastName, 
        company, 
        deliveryAdress, 
        billingAdress, 
        country, 
        city, 
        state, 
        zipCode, 
        phoneNumber}),
      dataType: 'JSON',
      contentType: 'application/json',
      success: handleSuccess
    });
  }



  /**
   * Successful function to save the order
  */
   function handleSuccess(data) {
    console.log(data)
    if (data) { 
      alert ('Comanda a fost efectuata, mail confirmare')
    } 
  } 


  /**
   * Retrieve the values entered in the order fields
  */

   function readOrderInput() {
    firstName = $("#firstName").val();
    lastName  = $("#lastName").val();
    deliveryAdress = $("#deliveryAdress").val();
    billingAdress = $("#billingAdress").val();
    company = $("#company").val();
    country = $("#country").val();
    city = $("#city").val();
    state = $("#state").val();
    zipCode = $("#zipCode").val();
    phoneNumber = $("#phoneNumber").val();
    console.log (firstName, lastName, deliveryAdress, billingAdress, company, country, city, state, zipCode, phoneNumber);
  }


  function collectShoppingCart() {

    let products = [];
    let qua = [];
    let receiptImage = $('.order-image');
   
    for(var i = 0; i < receiptImage.length; i++) {
       let purchased = receiptImage[i].id;
       products.push(purchased)
    }

    boughtProd = products;

    if (connected) {
      storageUser = JSON.parse(connected);
      whoBought = storageUser._id;
    } else {
      validationAuthFields();
    }
    
    for(var i = 0; i < storage.length; i++) {
      let purchased = storage[i].quantity;
      qua.push(purchased);

    }    
    quantity = qua;

    total = $("#TVATotal").html(); 
  }


  /**
   * Validation for mandatory order fields
  */

   function validationFields() {

    if (!firstName|| !firstName.length) {

      $("#firstName").focus();
      $("#firstName").css('border', '1px solid rgb(210, 20, 20)');

    } else if (!lastName || !lastName.length) {

      $("#lastName").focus();
      $("#firstName").css('border', '1px solid #D0D0D0');
      $("#lastName").css('border', '1px solid rgb(210, 20, 20)');

    } else if (!deliveryAdress || !deliveryAdress.length) {

      $( "#deliveryAdress").focus();
      $("#lastName").css('border', '1px solid #D0D0D0');
      $("#deliveryAdress").css('border', '1px solid rgb(210, 20, 20)');

    } else if (!billingAdress || !billingAdress.length) {

      $("#billingAdress").focus();
      $("#deliveryAdress").css('border', '1px solid #D0D0D0');
      $("#billingAdress").css('border', '1px solid rgb(210, 20, 20)');

    } else if (!country || !country.length) {
      $("#county").focus();
      $("#billingAdress").css('border', '1px solid #D0D0D0');
      $("#country").css('border', '1px solid rgb(210, 20, 20)');

    } else if (!state || !state.length) {

      $("#state").focus();
      $("#country").css('border', '1px solid #D0D0D0');
      $("#state").css('border', '1px solid rgb(210, 20, 20)');

    } else if (!city || !city.length) {

      $("#city").focus();
      $("#state").css('border', '1px solid #D0D0D0');
      $("#city").css('border', '1px solid rgb(210, 20, 20)');

    } else if (!phoneNumber || !phoneNumber.length) {

      $("#phoneNumber").focus();
      $("#city").css('border', '1px solid #D0D0D0');
      $("#phoneNumber").css('border', '1px solid rgb(210, 20, 20)');
    } 

    return firstName && lastName && deliveryAdress && billingAdress && country && city && state && phoneNumber && firstName.length && lastName.length && deliveryAdress.length && billingAdress.length && country.length && city.length && state.length && phoneNumber.length;

  }

  /**
   * Validation for authentification fields
  */

  function validationAuthFields() {

      username = $("#username").val();
      password = $("#password").val();

      if (!username || !username.length) {
      
      $("#username").focus();
      $("#username").css('border', '1px solid rgb(210, 20, 20)');

    } else if (!password || !password.length) {

      $("#password").focus();
      $("#password").css('border', '1px solid rgb(210, 20, 20)');
    }

    return username && password && username.length && password.length;

  }


  /**
   * The user is logged in, pass the first step of the order
  */

  function userAuth() {

    if (connected) {
      $("#orderAuth").html('');
      $('#orderAuth').html('Sunteți autentificat și puteți plasa comanda');
    }

  }

  /**
   *  Event initiated when placing the order
  */

   $("#sendOrder").on("click", function() {
     readOrderInput();
     collectShoppingCart();

    if (validationFields() && validatePhone()) {
      addOrder();
      saveCart();  
    } else {
      console.log("The order can't be operated")
    }
  });


   /**
   * Request save cart
  */

   function saveCart() {
    $.ajax({
      type: 'POST',
      url: './api/cart',
      data: JSON.stringify({ boughtProd, whoBought, quantity, total }),
      dataType: 'JSON',
      contentType: 'application/json',
      success: saveSuccess
    });
  }

  /**
   * Successful saved
  */
  function saveSuccess(data) {
    console.log(data)
    if (data) {
      console.log('Salvare detalii din cos')

    } 
  } 

     
  function validatePhone(phoneNumber) {
    let number =  $("#phoneNumber").val();
    let filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    if (filter.test(number)) {
      return true;
    }
    else {
      return false;
    }
  }


  $('#phoneNumber').blur(function(e) {
    if (validatePhone('phoneNumber')) {
      $('#phoneStatus').html('✓');
      $('#phoneStatus').css('color', 'green');
      $('#phoneStatus').css('position','absolute');
      $('#phoneStatus').css('right','20px');
      $('#phoneStatus').css('top','26px');
    }
    else {
      $('#phoneStatus').html('✗');
      $('#phoneStatus').css('color', 'red');
      $('#phoneStatus').css('position','absolute');
      $('#phoneStatus').css('right','20px');
      $('#phoneStatus').css('top','26px');
    }
  });

});