"use strict";

function drawChart(minimoAgua, minimoEsgoto, meta) {
    // Remove the the canvas in case there is already a chart there
    document.getElementById("myChartCanvas").remove();

    // Add a new canvas to the div container for our chart
    var canvas = document.createElement("canvas");
    canvas.id = "myChartCanvas";
    canvas.width = 500;
    canvas.height = 300;
    document.getElementById("myChartContainer").appendChild(canvas);

    var ctx = document.getElementById("myChartCanvas").getContext('2d');

    let labels = [];
    let custo_agua = [];
    let custo_esgoto = [];
    let custo_taxa_extra = [];

    for(let i=10; i < 40; i++) {
        labels.push(i);
        custo_agua.push(roundToTwoDecimals(calcula_custo_agua_somado(i, minimoAgua)));
        custo_esgoto.push(roundToTwoDecimals(calcula_custo_esgoto_somado(i, minimoEsgoto)));
        let contingencia = roundToTwoDecimals(somaArray(calcula_custo_agua_excedente_por_faixa(i, minimoAgua, meta)));
        if (contingencia < 0) contingencia = 0;
        custo_taxa_extra.push(contingencia);
    }

    var options = {
        title: {
            display: true,
            text: "Valor Em reais para diferentes consumos em m3"
        },
        tooltips: {
            mode: 'label',
            callbacks: {
                afterTitle: function() {
                    window.total = 0;
                },
                label: function(tooltipItem, data) {
                    var tipo = data.datasets[tooltipItem.datasetIndex].label;
                    var valor = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

                    //THIS ONE:
                    valor=parseFloat(valor);

                    window.total += valor;
                    return tipo + ": " + valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                },
                footer: function() {
                    return "TOTAL: " + roundToTwoDecimals(window.total).toString();

                }
            }
        },
        scales: {
            yAxes: [{
                position: 'left',
                ticks: {
                    beginAtZero:true
                },
                stacked: true
            }]
        },
        responsive: false,
        animation: {
            duration: 0 // general animation time
        }
    };

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Água',
                    data: custo_agua,
                    backgroundColor: 'rgba(132, 99, 255, 0.2)',
                    borderColor: 'rgba(132, 99, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Esgoto',
                    data: custo_esgoto,
                    backgroundColor: 'rgba(99, 255, 132, 0.2)',
                    borderColor: 'rgba(99, 255, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Contingência',
                    data: custo_taxa_extra,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1
                }
            ]
        },
        options: options
    });
}


function updateChart(myChart, minimoAgua, minimoEsgoto, meta) {

}
