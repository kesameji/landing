const databaseURL = 'https://landing-bab40-default-rtdb.firebaseio.com/landingPage.json';

let sendData = () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' })

    fetch(databaseURL, {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Especifica que los datos están en formato JSON
        },
        body: JSON.stringify(data) // Convierte los datos a JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json(); // Procesa la respuesta como JSON
        })
        .then(result => {
            alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
            form.reset()
        })
        .catch(error => {
            alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        });


}

let ready = () => {
    console.log('DOM está listo');
}

let loaded = () => {
    console.log('Iframes e Images cargadas');
    let myform = document.getElementById('form');
    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault();

        var emailElement = document.querySelector('.form-control-lg');
        var emailText = emailElement.value;
        if (emailText.length == 0) {
            emailElement.focus();
            emailElement.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(50px)" },
                    { transform: "translateX(-50px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 500,
                    easing: "linear",
                }
            )
            return;
        }
        sendData();


    });
}

window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded);