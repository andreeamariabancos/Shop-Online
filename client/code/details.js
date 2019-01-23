$(document).ready(function() {

	init();

	function init() {
		$.ajax({
			url:renderProductDetails(),
			success:function(){
			requestRelated(),
			requestComplementary(),
			incrementQuantity()

			}
		})	
	}

	/**
	 * Request a page by product id.
	*/

	function renderProductDetails() {
		const url = window.location.pathname;
		const id = url.substring(url.lastIndexOf('/') + 1);
			
			$.ajax({
				type: 'GET',
				url: "http://localhost:4002/api/products/" + id,
				contentType :'application/json',
				success: handlePage
			});
	}

	/**
	 * Handle the success result of the page request.
	*/
	function handlePage(data) {	
		renderDetails(data);	
		saveInLocalStorage(data);
	}

	/**
	 * Render details section.
	*/

	function renderDetails(prod) {	

		let exhibit = prod.exhibit;
		let colors = prod.colors;
		let full = $("#full");
		let small =$("#small");


		for(var i = 0; i < exhibit.length; i++) {
			small.append(`
			<a href="#" data-full="${window.location.origin}/${exhibit[i]}">
				<img value="${prod.complementary}" src="${window.location.origin}/${exhibit[i]}"> 
			</a> `)		
		}

		small.children().first().addClass('selected');

		full.append(`
			<img value="${prod.related}" src="${window.location.origin}/${prod.img}"> 
		`);


		$('a').click(function() {
			var largeImage = $(this).attr('data-full');
			$('.selected').removeClass();
			$(this).addClass('selected');
			$('.full img').hide();
			$('.full img').attr('src', largeImage);
			$('.full img').fadeIn();
		}); 

		$("#containerDetails").append(`
	
			<div class="product-name">${prod.title}</div>
				<div class="product-price">
					<span >Preț:</span>
					<span class="price">${prod.price}</span>
				</div>
			<div class="product-colors">
				<p>Culoare</p>
				<ul class="colors-selector">
				</ul>
			</div>
			<div class="product-quantity">
				<div class="quantity">
		          <div class="text">
		            <div class="title-quant">Cantitate:</div>
		          </div>     
				<div class="minus"> - </div>
				<div class="quantity-input">
					<input type="text"  value="1">
				</div>
				<div class="plus"> + </div>
		    </div>
				<button id="addCart" class="add-cart red">
					<span>Adaugă în coș</span>
					<i class="fas fa-cart-plus"></i>
				</button>
			</div>`)
		
		for(let i = 0; i<colors.length; i++) {
			$(".colors-selector").append(`
			<li  class="colors ${colors[i].toLowerCase()}"></li>`)		
		}

	}

	/**
	 *Increment quantity
	*/

	function incrementQuantity() {

		$('.plus').on('click', function() {
			let oldValue = $('input').val();
			let newValue = parseInt(oldValue) + 1;
			$('input').val(newValue);
		});

		$('.minus').on('click', function() {
			let oldValue = $('input').val();
			if (oldValue > 0){
				let newValue = parseInt(oldValue) - 1;
				$('input').val(newValue);
			}	
		});

	}
	

	/**
	 * Request related products.
	*/

    function requestRelated() {
			
	 	const related = $('#full img').attr("value");

	 	$.ajax({
			type : "POST",
			url : `/api/products`,
			contentType : "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({
				related : related,
			}),
			success: successProductsRelated
		});
	}

	
	/**
	 * Handle the success result for related.
	*/
	function successProductsRelated(related) {
		renderRelatedCarousel(related.result)	
	}

	/**
	 * Rander the related carousel.
	*/

	function renderRelatedCarousel(related) {
		for (var i = 0; i < related.length; i++) {
			$("#related").append(`
				<div class="item">
                    <div id = "similar" class="tile" >                     
                           <img src="${window.location.origin}/${related[i].img}" id = "${related[i]._id}" >
                    </div>
                </div>`)
		} 

		$("#similar img").click(function() {
			var id = $(this).attr("id");
			window.location = '/details/' + id
		});	
		
	}

	/**
	 * Request complementary products.
	*/

	function requestComplementary() {
		
	 	const complementary = $('#small img').attr("value");

	 	$.ajax({
			type : "POST",
			url : `/api/products`,
			contentType : "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({
				complementary : complementary,
			}),
			success: successProductsComplementary
		});
	}

	/**
	 * Handle the success result for coplementary products.
	*/
	function successProductsComplementary(complementary) {
		renderComplementaryCarousel(complementary.result)	
	}

	/**
	 * Rander the complementary carousel.
	*/
	function renderComplementaryCarousel(complementary) {
		for (var i = 0; i < complementary.length; i++) {
			$("#complementary").append(`
				<div class="item">
                    <div id = "similar" class="tile" >                     
                           <img src="${window.location.origin}/${complementary[i].img}" id = "${complementary[i]._id}" >
                    </div>
                </div>`)

		} 

		$("#similar img").click(function() {
			var id = $(this).attr("id");
			window.location = '/details/' + id
		});	
	}

	/**
	 * Save products in localstorage and add to cart.
	*/
	function saveInLocalStorage(data) {
			$('#addCart').on('click',function() {
				
				let quantity = $('.quantity-input input').val();
				data.quantity = quantity;
				let arrayProduct = localStorage.getItem('items');
				let storage = JSON.parse(arrayProduct);

				if(!storage) {
					storage = [];
					storage.push(data);
					localStorage.setItem('items', JSON.stringify(storage));
					location.reload();	
				} else {
					var exista = 0;
					for (var i = 0; i< storage.length; i++) {
						console.log(storage[i])
						if (storage[i]._id === data._id) {
							exista++;

						}
					}
					if (exista == 0) {
						storage.push(data);
						localStorage.setItem('items', JSON.stringify(storage));
					} else {
						for (var i = 0; i< storage.length; i++) {
							if (storage[i]._id === data._id) {
								storage[i].quantity = parseInt(storage[i].quantity)+parseInt(quantity);
								localStorage.setItem('items', JSON.stringify(storage));
							}
						}
					}
				location.reload();
				}
				
			});
		}		
});