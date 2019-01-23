$(document).ready(function() {

	let arrayStorage = localStorage.getItem('items');
	let storage = JSON.parse(arrayStorage);
	let itemsInCart = 0;

	if(!storage) {
		storage = [];
	}

	init();
	
	function init() {
		openCloseCart();
		renderCart();
		numberofItemsCart();
		removeItems();
		totalCart();
		goCheckout()
	}

	/**
	 *  Open/close cart.
	*/
	 function openCloseCart() {
	 	$('#cancelCart, .checkout').click(function() {
	 		$('#cart').css({'display': 'none'});
	 	}); 

	 	$('#cartIcon').click(function() {
	 		$('#cart').css({'display': 'flex'});		
	 	});
	 } 

	 function renderCart() {

	 	for (let i = 0; i < storage.length; i++ ) {
	 		
	 		itemsInCart += parseInt(storage[i].quantity, 10);

	 		$("#itemsCart").append(`
	 			<li id="specificItems"> 
		 			<div class="desc"> 
		 				<div class="cart-img">
		 					<img src="${window.location.origin}/${storage[i].img}"/">
		 				</div>
		 			</div> 
		 			<div class="cart-name"  >${storage[i].title}</div>
		 			<div class="cart-color">${storage[i].colors}</div> 
		 			<div class="cart-quantity">${storage[i].quantity}</div>
		 			<span class="cart-operator">x</span> 
		 			<div class="cart-price" value="${storage[i].price}">${storage[i].price}</div>
		 			<a id="removeSpecificItem" class="btn-clear">X</a> 
	 			</li>`)
	 	}
	 } 


	 function numberofItemsCart() {
	 	$("#itemCount").html(itemsInCart);
	 }

	 function removeItems() {

		//remove all items from the cart
		$('#removeItems').click(function() {
			localStorage.clear();
			$('#itemsCart').html('');
			$('#cartTotal').html('');
			$("#itemCount").html('');
		});

		//remove specific items from the cart  REMEDIERE STERGEREEEEEEE
		$('#removeSpecificItem').click(function() {
			let items = localStorage.getItem('items');
			let products = JSON.parse(items);
			let id = $(this).attr('id');
			let exit =  $('.cart-quantity').html();
			let counter = $("#itemCount").html();
			let left = counter - exit;

			$( this ).parent().remove();
			products.splice(id,1);
			$('#itemsCart').children().remove();
			renderCart(products);
			localStorage.setItem('items', JSON.stringify(products));
			$('#specificItems').html('');
			$("#itemCount").html(left);
			$('#cartTotal').html('');
			totalCart();	
		})
	}


	function totalCart() {
		let sum = 0;
    	$('.cart-price').each(function() {
    		let price = parseInt($(this).html());
    		let quantity = $('.cart-quantity').html();
    		let subtotal = price * quantity;
    		$('#orderSubtotal').text(subtotal + " RON");
        	sum += Number(subtotal);
        	$('#cartTotal').text(sum + ' RON');
    	});
	}

	function goCheckout() {
		$('#checkoutButton').click(function () {
			window.location = '/checkout'		
		});
	}
    
});