
"use strict";


function roundToTwoDecimals(number) {
    return Math.floor(100* number) / 100;
}


/**
 * Soma os elementos de um array.
 *
 * @param inputArray Um array de números.
 *
 * @return A soma dos elementos de inputArray.
 */
function somaArray(inputArray) {
    return inputArray.reduce(function(a,b){return a+b;}, 0);
}


/**
 * Multiplica dois arrays elemento a elemento.
 *
 * @param array1 O primeiro array.
 * @param array2 O segundo array.
 *
 * @return Array com o resultado da multiplicação elemento-a-elemento.
 */
function multiplicaArrays(array1, array2) {
    console.assert(array1.length === array1.length, "Os dois arrays devem ter o mesmo tamanho");
    let total = Array(array1.length).fill(0);
    for(let i=0; i < array1.length; i++) {
        total[i] += array1[i] * array2[i];
    }
    return total;
}


/**
 * Subtrai dois arrays.
 *
 * @param array1 O primeiro array.
 * @param array2 O segundo array que será subtraído do primeiro.
 *
 * @return array1 - array2 computado elemento a elemento
 */
function subtraiArrays(array1, array2) {
    let resultado = Array(array1.length).fill(0);
    for(let i = 0; i < array1.length; i++) {
        resultado[i] = array1[i] - array2[i];
    }
    return resultado;
}


/**
 * Retorna a representação do número como moeda em reais.
 *
 * @param numero O valor em reais.
 *
 * @return Uma string com R$ antes e duas casas decimais.
 */
function emReais(numero) {
    return numero.toLocaleString(undefined, {style:"currency", currency:"BRL"});
}
