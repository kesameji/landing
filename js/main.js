const databaseURL = 'https://landing-bab40-default-rtdb.firebaseio.com/landingPage.json';

let getData = async () => {
    try {
        const response = await fetch(databaseURL);
        if (!response.ok) {
            alert("Hemos experimentado un error. !Vuelve pronto!");
        }
        const data = await response.json();
        if (data != null) {
            let countSubs = new Map();
            if (Object.keys(data).length > 0) {
                for (let key in data) {
                    let { email, saved } = data[key]
                    let date = saved.split(",")[0]
                    let count = countSubs.get(date) || 0;
                    countSubs.set(date, count + 1)
                }
            }
            if (countSubs.size > 0) {
                subscribers.innerHTML = '';
                let i = 0;
                for (let [date, count] of countSubs) {
                    let rowTemplate = `
                        <tr>
                            <th scope="row">${++i}</th>
                            <td>${date}</td>
                            <td>${count}</td>
                        </tr>`
                    subscribers.innerHTML += rowTemplate
                }
            }
        }
    }
    catch (error) {
        alert("Hemos experimentado un error. vuelve pronto!");
    }
}



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
            getData();
        })
        .catch(error => {
            alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        });
}

let ready = () => {
    console.log('DOM está listo');
    getData();
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