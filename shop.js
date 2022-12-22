$('document').ready(function () {
    const carousel = new bootstrap.Carousel('#myCarousel', {
        interval: 5000
    });
})

let inputPrecoTotal = document.getElementById("total");
let inputQtdTotal = document.getElementById("quantidades");
let precoTotal = 0;
let qtdTotal = 0;


function addProduct(number) {
    let quantidadeProdutoSelecionado = document.getElementById("qty" + number);
    quantidadeProdutoSelecionado.value++;
    calculate();
}

function calculate() {
    let precAtual, qtdAtual;
    precoTotal = 0;
    qtdTotal = 0;

    for (let i = 1; i <= 6; i++) {
        precAtual = parseFloat(document.getElementById('price' + i).value);
        qtdAtual = parseFloat(document.getElementById('qty' + i).value);
        precoTotal += precAtual * qtdAtual;
        qtdTotal += qtdAtual;
    }

    inputQtdTotal.innerText = qtdTotal;
    inputPrecoTotal.innerText = precoTotal.toFixed(2);
}

function valid() {
    if (precoTotal <= 0 && qtdTotal <= 0) {
        alert("Erro! O carrinho está vazio");
        return false;
    } else {
        return true
    }
}

function clean() {
    for (let i = 1; i <= 6; i++) {
        qtdAtual = document.getElementById('qty' + i).value = 0;
    }
    precoTotal = 0;
    qtdTotal = 0;
    inputPrecoTotal.innerText = "0.00";
    inputQtdTotal.innerText = 0;
}

function validate() {
    var retVal = true;
    if ($('#Nome').val().trim().length < 3) {
        retVal = false;
        $('#NomeError').show();
    } else {
        $('#NomeError').hide();
    }
    var re = /\S+@\S+\.\S+/;
    var email = $('#Email').val().trim()
    if (!re.test(email)) {
        $('#EmailError').show();
        retVal = false;
    }
    else $('#EmailError').hide();

    if ($("#datepicker").val() + 1 == 1) {
        $('#DateError').show();
        retVal = false;
    } else {
        $('#DateError').hide();
    }


    console.log($('input[type="checkbox"]:checked').length);
    if ($('input[type="checkbox"]:checked').length == 0) {
        $('#VehicleError').show();
        retVal = false;
    } else {
        $('#VehicleError').hide();
    }

    if ($('input[type="radio"]:checked').length == 0) {
        $('#CorError').show();
        retVal = false;
    } else {
        $('#CorError').hide();
    }

    if ($('#Morada').val().trim().length < 3) {
        retVal = false;
        $('#MoradaError').show();
    } else {
        $('#MoradaError').hide();
    }
    return retVal;
}