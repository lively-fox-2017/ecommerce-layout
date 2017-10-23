$('#show-shopping-cart').click(function (event) {
  event.preventDefault();
  $('#shopping-cart-modal').modal('show');
});

$('#show-login').click(function (event) {
  event.preventDefault();
  $('#login-modal').modal('show');
});

$('#show-register').click(function (event) {
  event.preventDefault();
  $('#login-modal').modal('hide');
  $('#register-modal').modal('show');
});

$('#register-modal').on('hidden.bs.modal', function (event) {

  $('#login-modal').modal('show');

});

$('.quantity-field').bootstrapNumber({
  upClass: 'primary',
  downClass: 'primary'
});
