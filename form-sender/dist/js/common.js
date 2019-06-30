function Form(form) {
    var currentForm, formData;

    var setForm = function() {
      if( !document.getElementById(form.id) && document.getElementById(form.id) == null ) {
        throw new Error('Error form id');
      } else {
        currentForm = document.getElementById(form.id);
        console.log('Catch form: ' + currentForm);
      }
    }

    var catchSubmit = function() {
      currentForm.addEventListener('submit', function (e) {
        e.preventDefault();
         
        alert('onSubmit handler called'); 
        setFormData();
        sendForm();
      }, false);  
    }

    function setFormData() {
      formData = new FormData(currentForm);
      console.log(formData);
    }

    function sendForm () {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "../send.php");
      xhr.send(formData);
    }

    function init() {
      setForm();
      catchSubmit();
    };
    init();
} 

//calling plugin
var newForm = new Form({
  id: 'subscribe',
});






