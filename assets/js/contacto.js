const form = document.querySelector('.needs-validation');
const button = form[form.length-1];
const button2 = document.getElementById("button-2");
const msg = document.getElementById("msg");
const email2 = document.getElementById("email-2");
form.addEventListener('keyup', event => {validateForm(form)},false);
button.addEventListener("click", e =>{
    if(!validateForm(form)){
      e.preventDefault();
      e.stopPropagation();
    }else if(localStorage.getItem("emailSent")){
      console.log("Ya enviaste un email el "+ localStorage.getItem("emailSent"));
      msg.innerHTML="<br>Mensaje enviado recientemente.";
      setTimeout(()=>{msg.innerHTML="";},8000);
    }else{
    emailjs.send("service_5734ikb","contacto_090600",createObj(form),"z2kTMhuLVgVUjXBgB");
    localStorage.setItem("emailSent",Date());
    console.log("email enviado")
    msg.innerHTML="<br>Mensaje enviado. Gracias.";
    setTimeout(()=>{form.classList.remove('was-validated');
      for(let field of form){field.value=""}},1500);
    setTimeout(()=>{msg.innerHTML="";},6000);
    }
  } , false);

  button2.addEventListener('click',event => {
    if(email2.checkValidity()){
    localStorage.setItem("emailNewsletter",email2.value)
    email2.value="¡Gracias por suscribirte!";
    setTimeout(()=>{email2.value="";},2000);
    }else{
    let tmp=email2.value;
    email2.value +=" no es un email válido.";
    setTimeout(()=>{email2.value=tmp;},1500);
    }
  },false);

function validateForm(form){
  let validForm=true;
  for (let field of form){
    if(!validate(field)){
      validForm=false;
      field.setCustomValidity("falló " +field.id);      
    }else{
      field.setCustomValidity("");
    }
  }  
  form.classList.add('was-validated');
  return validForm;
}

function validate(htmlField){
  switch(htmlField.id){
  
    case "inputName":
      return nombreVal(htmlField.value);
    
    case "inputEmail":
      return emailVal(htmlField.value);

    case "inputPhoneNumber":
      return telVal(htmlField.value);
    
	  case "inputMessage":
      return msjVal(htmlField.value);
	
	  default:
	    return true;
  }
}

function createObj(form){
  return {nombre: form[0].value, 
    email: form[1].value,
    telefono: form[2].value,
    mensaje: form[3].value 
    };
}
