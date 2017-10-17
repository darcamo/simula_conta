"use strict";

var precos_agua = [3.16, 4.09, 4.43, 7.58, 13.39];
var precos_esgoto = [3.49, 4.48, 4.85, 8.33, 14.72];


/**
 * Quebra 'consumo' (em metros cúbicos) nas diversas faixas.
 *
 * @param consumo O consumo em m3.
 * @param minimo O valor do consumo mínimo.
 *
 * @return Um array com o consumo em cada faixa.
 */
function quebra_faixas(consumo, minimo) {
    consumo = Math.floor(consumo);
    minimo = Math.floor(minimo);
    if(consumo < minimo) {
        consumo = minimo;
    }

    let faixas = Array(5).fill(0);
    let limites = [10, 5, 5, 30, 10000000];

    let idx = 0;
    while(consumo > 0) {
        if (consumo > limites[idx]) {
            faixas[idx] = limites[idx];
        }
        else {
            faixas[idx] = consumo;
        }
        consumo = consumo - limites[idx];
        idx++;
    }
    return faixas;
}



/**
 * Calcula o custo de água dado um consumo em m3 e o consumo mínimo de água.
 *
 * @param consumo Consumo de água em metros cúbicos.
 * @param consumo_minimo_agua Consumo mínimo de água.
 *
 * @return Custo em reais de água separado por faixa.
 */
function calcula_custo_agua_por_faixa(consumo, consumo_minimo_agua) {
    let faixas = quebra_faixas(consumo, consumo_minimo_agua);
    return multiplicaArrays(faixas, precos_agua);
}


function calcula_consumo_contingencia_por_faixa(consumo, consumo_minimo_agua, meta) {
    let faixas = quebra_faixas(consumo, consumo_minimo_agua);
    let faixas_meta = quebra_faixas(meta, consumo_minimo_agua);
    let consumo_contingencia_por_faixa = subtraiArrays(faixas, faixas_meta);
    for(let i = 0; i < consumo_contingencia_por_faixa.length; i++) {
        if(consumo_contingencia_por_faixa[i] < 0)
            consumo_contingencia_por_faixa[i] = 0;
    }
    return consumo_contingencia_por_faixa;
}


/**
 * Calcula a taxa de contingência a ser paga.
 *
 * @param consumo Consumo em m3
 * @param consumo_minimo_agua Consumo mínimo em m3.
 * @param meta Meta de consumo para não pagar a tarifa em m3.
 *
 * @return Valor da taxa de contingência separado por faixa de consumo.
 */
function calcula_custo_agua_excedente_por_faixa(consumo, consumo_minimo_agua, meta) {
    let precos_agua_com_contingencia = precos_agua.slice();
    for(let i=0; i < precos_agua_com_contingencia.length; i++){
        precos_agua_com_contingencia[i] = roundToTwoDecimals(1.2 * precos_agua_com_contingencia[i]);
    }

    let faixas_contingencia = calcula_consumo_contingencia_por_faixa(consumo, consumo_minimo_agua, meta);
    let contingencia_por_faixas = multiplicaArrays(faixas_contingencia, precos_agua_com_contingencia);

    return contingencia_por_faixas;
}


/**
 * Calcula o custo de esgoto dado um consumo de água em m3 e o consumo mínimo de
 * esgoto.
 *
 * @param consumo Consumo de água em metros cúbicos.
 * @param consumo_minimo_agua Consumo mínimo de esgoto.
 *
 * @return Custo em reais de esgoto separado por faixa.
 */
function calcula_custo_esgoto_por_faixa(consumo, consumo_minimo_esgoto) {
    let faixas = quebra_faixas(0.8 * consumo, consumo_minimo_esgoto);
    return  multiplicaArrays(faixas, precos_esgoto);
}


/**
 * Calcula o custo total de água em reais.
 *
 * @param consumo Consumo de água em m3.
 * @param consumo_minimo_agua Consumo mínimo de água.
 *
 * @return Custo total de água.
 */
function calcula_custo_agua_somado(consumo, consumo_minimo_agua) {
    let custo_agua_por_faixa = calcula_custo_agua_por_faixa(consumo, consumo_minimo_agua);
    return somaArray(custo_agua_por_faixa);
}


/**
 * Calcula o custo total de esgoto em reais.
 *
 * @param consumo Consumo de água em m3.
 * @param consumo_minimo_agua Consumo mínimo de esgoto.
 *
 * @return Custo total de esgoto.
 */
function calcula_custo_esgoto_somado(consumo, consumo_minimo_esgoto) {
    let custo_esgoto_por_faixa = calcula_custo_esgoto_por_faixa(consumo, consumo_minimo_esgoto);
    return somaArray(custo_esgoto_por_faixa);
}
