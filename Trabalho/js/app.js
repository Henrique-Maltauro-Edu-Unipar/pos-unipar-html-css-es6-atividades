function allowDrop(ev) {
	ev.preventDefault();
}

function denyDrop(ev) {
	ev.stopPropagation();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function leave(ev){
	ev.preventDefault();
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));

	calculateTotal();
	enabledDisabledQuantity();
}

const calculateTotal = () => {
	var totalPrice = 0;
	var totalQuantity = 0;

	$("#shop-cart").find("article").each(function(index) {
		var quantity = $(this).find("input[name='quantity']").val();
		var price = $(this).find("input[name='price']").val();

		totalPrice += quantity * price;
		totalQuantity += (parseInt(quantity));
	})

	$("#total-price").html(totalPrice);
	$("#total-quantity").html(totalQuantity);
}

const enabledDisabledQuantity = () => {
	$("#products").find("input[name='quantity']").prop("disabled", true);
	$("#shop-cart").find("input[name='quantity']").prop("disabled", false);
}

$("input[name='quantity']").change(function() {
	calculateTotal();
})