/* eslint-disable  */

function backTop() {
  var dom = document.querySelector('.back-top');

  dom.addEventListener('click', function () {
    window.scroll(0, 0);
  });
}

backTop();

var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

var popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

function getVerCode() {
  return fetch('/api/captcha').then(res => res.text());
}

function setVerCode() {
  var vercodeSlot = document.getElementById('vercode');
  getVerCode().then(res => {
    vercodeSlot.innerHTML = res;
  });
}

function resetVerCode() {
  $('#vercode').click(() => {
    setVerCode();
  });
}

function make() {
  var myModalEl = document.getElementById('shop_modal');
  myModalEl.addEventListener('show.bs.modal', function (event) {
    setVerCode();
  });
}

function saveOrder() {
  var subBtn = $('#shop_modal_submit');
  subBtn.click(function (event) {
    var form = $('#shop_modal_form');
    var formData = form.serialize();

    if (!form[0].checkValidity()) {
      form.addClass('was-validated');
      return;
    }

    fetch('/api/createorder', {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'application/x-www-form-urlencoded ',
      },
    })
      .then(res => res.json())
      .then(res => {
        $('#toast .slot').text(res.message);
        const toastIns = new bootstrap.Toast($('#toast').get(0), {
          delay: 1000,
        });
        toastIns.show();
        if (res.code === 200) {
          var modalIns = bootstrap.Modal.getInstance($('#shop_modal').get(0));
          modalIns.hide();
        }
      });
  });
}

make();
saveOrder();
resetVerCode();
