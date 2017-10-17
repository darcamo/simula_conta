
function drawChart(minimoAgua, minimoEsgoto, meta) {
    // let minimoAgua = 10;
    // let minimoEsgoto = 8;
    // let meta = 10;

    let labels = [];
    let custo_agua = [];
    let custo_esgoto = [];
    let custo_taxa_extra = [];

    for(let i=10; i < 50; i++) {
        labels.push(i);
        custo_agua.push(calcula_custo_agua_somado(i, minimoAgua));
        custo_esgoto.push(calcula_custo_esgoto_somado(i, minimoEsgoto));
        let contingencia = somaArray(calcula_custo_agua_excedente_por_faixa(i, minimoAgua, meta));
        if (contingencia < 0) contingencia = 0;
        custo_taxa_extra.push(contingencia);
    }

    var data = {
        // A labels array that can contain any sort of values
        labels: labels,
        // Our series array that contains series objects or in this case series data arrays
        series: [custo_agua,
                 custo_esgoto,
                 custo_taxa_extra]
    };

    var options = {
        width: 400,
        height: 300
    };

    // Create a new line chart object where as first parameter we pass in a selector
    // that is resolving to our chart container element. The Second parameter
    // is the actual data object.
    new Chartist.Line('#myChart', data, options);
}
