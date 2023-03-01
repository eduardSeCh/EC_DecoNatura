function nombreVal(nombre){
    let muyLargo;
    let valido;
    const regNombre = /^[a-zA-ZÁÉÍÓÚáéíóú\u00f1\u00d1 ]{3,}$/g;
    if(nombre.length > 50)
        muyLargo = true;
    if(regNombre.test(nombre))
        valido = true;
    if(valido && !muyLargo)
        return true;
    else
        return false;
}

function emailVal(email){
    const regEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regEmail.test(email);
}

function telVal(tel){
    const regTel=/^\s*\d{10}\s*/g;
    return regTel.test(tel);
}

function msjVal(msj){
    if(10 < msj.length && msj.length < 500)
        return true;
    else
        return false;
}

function pwdVal(pwd){
    const regPwd=/[\w\W]{8,}/;
    return regPwd.test(pwd);
}

function precioVal(num){
    const regPrecio=/^[\d]+(\.?[\d]{2})*$/g;
    return regPrecio.test(num);
}

function catVal(text){
    const regCategoria=/^[a-zA-ZÁÉÍÓÚáéíóú\u00f1\u00d1]{4,}$/g;
    return regCategoria.test(text);
}

function imgUrlVal(url){
    const regImgUrl=/^https:\/\/res\.cloudinary\.com\/.*/;
    return regImgUrl.test(url);
}