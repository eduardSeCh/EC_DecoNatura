//Validar datos formulario
function validateStreet(street) {
    const regStreet = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ. ]{3,50}$/;
    if (regStreet.test(street)) {
        document.querySelector('#inputStreet').setCustomValidity("");
        return true;
    } else {
        document.querySelector('#inputStreet').setCustomValidity("Dato obligatorio");
        return false;
    }
}

function validateStreetNumber(streetNumber) {
    const regStreetNumber = /^\d{1,5}$/;
    if (regStreetNumber.test(streetNumber)) {
        document.querySelector('#inputStreetNumber').setCustomValidity("");
        return true;
    } else {
        document.querySelector('#inputStreetNumber').setCustomValidity("Falta el número");
        return false;
    }
}

function validateZipCode(zipCode) {
    const regZipCode = /^\d{5}$/;
    if (regZipCode.test(zipCode)) {
        document.querySelector('#inputZipCode').setCustomValidity("");
        return true;
    } else {
        document.querySelector('#inputZipCode').setCustomValidity("Falta el C.P");
        return false;
    }
}

function validateProvince(province) {
    const regProvince = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]{3,50}$/;
    if (regProvince.test(province)) {
        document.querySelector('#inputProvince').setCustomValidity("");
        return true;
    } else {
        document.querySelector('#inputProvince').setCustomValidity("Dato obligatorio");
        return false;
    }
}

function validateForm(street, streetNumber, zipCode, province) {
    if (validateStreet(street.value) &&
        validateStreetNumber(streetNumber.value) &&
        validateZipCode(zipCode.value) &&
        validateProvince(province.value)){
            return true;
        }
        else {
            return false;
        }
}

//Traer datos del formulario
street = document.getElementById("inputStreet")
streetNumber = document.getElementById("inputStreetNumber")
zipCode = document.getElementById("inputZipCode")
province = document.getElementById("inputProvince")

//Validar formulario 
const procederPago = document.querySelector('.needs-validation');
//document.querySelector('.needs-validation');
procederPago.addEventListener('keyup', () => {
        validateStreet(street.value) &&
        validateStreetNumber(streetNumber.value) &&
        validateZipCode(zipCode.value) &&
        validateProvince(province.value)

    procederPago.classList.add('was-validated');
});

//Si los datos son inválidos o falta llenar algún campo 
// no puede proceder a pagar
procederPago.addEventListener("submit", (e) => {
    procederPago.classList.add('was-validated');
    if( !validateForm(street, streetNumber, zipCode, province))
        //console.log(street, streetNumber, zipCode, province)
        e.preventDefault();
        //console.log(street);
    
        else{
            //Mostrar ventana de pago
            const pagoVentana = new bootstrap.Modal(document.getElementById("paymentModal"));
            pagoVentana.show();
        }
    }, false 
);


//Formulario 2
//Datos de pago
function validateFullName(fullName) {
    const regFullName =/^[a-zA-ZÁÉÍÓÚáéíóúñÑ. ]{3,50}$/;
    if (regFullName.test(fullName)) {
        document.querySelector('#inputfullName').setCustomValidity("");
        return true;
    } else {
        document.querySelector('#inputfullName').setCustomValidity("Dato obligatorio");
        return false;
    }
}

function validateCardNumber(cardNumber) {
    const regCardNumber = /^\d{16}$/;
    if (regCardNumber.test(cardNumber)) {
        document.querySelector('#inputCardNumber').setCustomValidity("");
        return true;
    } else {
        document.querySelector('#inputCardNumber').setCustomValidity("Número inválido");
        return false;
    }
}

function validateExpDate(expDate){
    const regExpDate=/^[01]\d\/\d{2}$/g;
    if(regExpDate.test(expDate)){
		[month,year] = expDate.split('/');
		if(new Date(2000+parseInt(year),month,0)>new Date()){
            document.querySelector('#inputExpDate').setCustomValidity("");
                return true;
        }
	}
    document.querySelector('#inputExpDate').setCustomValidity("Fecha vencida");
	return false;
}

function validateCvv(cvv) {
    const regCvv = /^\d{3}$/;
    if (regCvv.test(cvv)) {
        document.querySelector('#inputCvv').setCustomValidity("");
        return true;
    } else {
        document.querySelector('#inputCvv').setCustomValidity("Deben ser tres dígitos");
        return false;
    }
}

function validateForm2(fullName, cardNumber, expDate, cvv) {
    pagar.classList.add('was-validated');
    if (validateFullName(fullName.value) &&
        validateCardNumber(cardNumber.value) &&
        validateExpDate(expDate.value) &&
        validateCvv(cvv.value)){
            return true;
        }
        else {
            return false;
        }
        
}

fullName = document.getElementById("inputfullName")
cardNumber = document.getElementById("inputCardNumber")
expDate = document.getElementById("inputExpDate")
cvv = document.getElementById("inputCvv")

const pagar = document.querySelectorAll('.needs-validation')[1]
const botonPagar = document.getElementById("pagar");
pagar.addEventListener('keyup', () => {
        validateFullName(fullName.value) &&
        validateCardNumber(cardNumber.value) &&
        validateExpDate(expDate.value) &&
        validateCvv(cvv.value)

    pagar.classList.add('was-validated');
},false);

botonPagar.addEventListener("click", (e) => {
    if( !validateForm2(fullName, cardNumber, expDate, cvv)){
        e.preventDefault();
    }
        else{
            //Mostrar ventana de pago
            document.getElementById("successMsg").innerHTML="¡Compra realizada con éxito!";
        }
    }, false 
);