document.addEventListener("DOMContentLoaded", function () {
    // PRIMER METRICA
    const operadores = ["Operador1", "Operador2", "Operador3", "Operador4", "Operador5"];
    const tiempos = [6, 8, 5, 4, 9];
    const ctx = document.getElementById("barChart").getContext("2d");

    new Chart(ctx, {
        type: "bar", 
        data: {
            labels: operadores,
            datasets: [{
                label: "Tiempo promedio (min)",
                data: tiempos,
                backgroundColor: "rgba(0, 100, 255, 0.5)",
                borderColor: "rgba(0, 50, 200, 1)",
                borderWidth: 1
            }]
        },
        options: { 
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: "Minutos" }
                },
                x: {
                    title: { display: true, text: "Operadores" }
                }
            }
        }
    });

    // TERCERA METRICA
    const cardConLoader = document.querySelectorAll(".card")[2];
    cardConLoader.classList.add("loading");
    setTimeout(() => {
        cardConLoader.classList.remove("loading");
        cardConLoader.classList.add("loaded");
    }, 4000);

    // (Actualización de números)

    const numeroAbandonos = document.getElementById("numero-abandonos");

    function ajustarTamanioFuente(elemento) {
        const numero = elemento.textContent;
        const longitudNumero = numero.length;
        if (longitudNumero > 4) {
            elemento.classList.add('ajustado');
        } else {
            elemento.classList.remove('ajustado');
        }
    }

    function actualizarNumero(elemento, nuevoNumero) {
        elemento.textContent = nuevoNumero;
        ajustarTamanioFuente(elemento);
    }

    // Función para ajustar el tamaño de la fuente
    function ajustarTamanioFuente(elemento) {
        const numero = elemento.textContent;
        const longitudNumero = numero.length;

        // Si el número tiene más de 4 dígitos, reducimos el tamaño de la fuente
        if (longitudNumero > 4) {
            elemento.classList.add('ajustado');
        } else {
            elemento.classList.remove('ajustado');
        }
    }

    // Función para actualizar el número de operadores activos o abandonos
    function actualizarNumero(elemento, nuevoNumero) {
        elemento.textContent = nuevoNumero;
        ajustarTamanioFuente(elemento); // Ajusta el tamaño de la fuente después de actualizar el número
    }

    // Función para comparar los abandonos y actualizar la flecha y el texto
    function compararAbandonos(abandonosHoy, abandonosAyer) {
        let diferencia = abandonosHoy - abandonosAyer;
        let flecha = document.getElementById("flecha");
        let diferenciaTexto = document.getElementById("diferencia");

        // Eliminar clases anteriores
        flecha.classList.remove("flecha-arriba", "flecha-abajo");
        diferenciaTexto.classList.remove("diferencia-positiva", "diferencia-negativa");

        // Asignar nuevas clases según la diferencia
        if (diferencia >= 0) {
            flecha.classList.add("flecha-arriba");
            diferenciaTexto.classList.add("diferencia-positiva");
            diferenciaTexto.textContent = `+${diferencia}`;
        } else {
            flecha.classList.add("flecha-abajo");
            diferenciaTexto.classList.add("diferencia-negativa");
            diferenciaTexto.textContent = `${diferencia}`;
        }
    }


    console.log("Script cargado correctamente");

    // Simulación de actualización en tiempo real

    let contadorAbandonos = 1;  // Valor inicial para los abandonos
    setInterval(() => {
        // Generar valores más pequeños y diferenciados para ambos
        contadorAbandonos += Math.floor(Math.random() * 2); // Incremento pequeño y diferente para abandonos

        // Actualiza el número de abandonos
        actualizarNumero(numeroAbandonos, contadorAbandonos);

        // Obtener el valor actualizado de abandonosHoy
        let abandonosHoy = parseInt(numeroAbandonos.textContent);
        let abandonosAyer = 4

        // Comparar los abandonos y actualizar la flecha y el texto
        compararAbandonos(abandonosHoy, abandonosAyer);
    }, 1000); // Actualiza cada 2 segundos
});


//Metrica Cuatro
const datosEspera = [
    {hora: "9:00 AM", tiempoEspera:1},
    {hora: "9:30 AM", tiempoEspera:2},
    {hora: "10:00 AM", tiempoEspera:2},
    {hora: "10:30 AM", tiempoEspera:3},
    {hora: "11:10 AM", tiempoEspera:6},
    {hora: "11:20 AM", tiempoEspera:7},
    {hora: "11:30 AM", tiempoEspera:9},
    {hora: "12:00 PM", tiempoEspera:7},
    {hora: "12:30 PM", tiempoEspera:4},
    {hora: "1:00 PM", tiempoEspera:4},
    {hora: "1:30 PM", tiempoEspera:3},
]

document.addEventListener("DOMContentLoaded", function(){
    console.log(Chart.version);
    const ctx = document.getElementById("graficaEspera").getContext("2d");

    //Extraer etiquetas (horas) y valores (tiempos de espera)
    const etiquetas = datosEspera.map(d => d.hora);
    const valores = datosEspera.map(d => d.tiempoEspera);

    //Crear la gráfica 
    new Chart(ctx,{

        type:"line",
        data: {
            labels:etiquetas,
            datasets: [{
                label: "Tiempo en fila",
                data:valores,
                borderColor:"blue",
                backgroundColor:"rgba(0, 0, 255, 0.2)",
                borderWidth:2,
                fill: true
             }]
        },
        options: {
            responsive:true,
            maintainAspectRatio:false,
            scales: {
                y: {
                    beginAtZero:true,
                    title: {display: true, text: "Minutos de Espera"}
                },
                x: {
                    title: {display: true, text: "Hora"}
                }
            }
        }
    });
});