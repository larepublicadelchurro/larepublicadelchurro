async function getInfo() {
    try {
        const response = await fetch('assets/data/info.json');
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

const btnNosotros = document.querySelectorAll('.btn-nosotros');

btnNosotros.forEach(btn => {
    btn.addEventListener('click', async () => {
        const data = await getInfo();
        const info = data[btn.dataset.info];
        const text = document.getElementById('info-nosotros');

        // Animar salida del contenido actual
        const contenidoActual = text.children;
        if (contenidoActual.length > 0) {
            await Motion.animate(
                contenidoActual,
                { opacity: [1, 0], y: [0, -20] },
                { duration: 0.3 }
            ).finished;
        }

        text.innerHTML = '';

        if (btn.dataset.info === 'valores') {
            const items = info.filter(item => item.nombre);
            const list =
                `<p style="opacity: 0;">${info[0].valores_intro}</p>`
                +
                '<ul class="d-flex flex-column gap-2" style="opacity: 0;">'
                +
                items.map(valor => {
                    return `<li><strong>${valor.nombre}</strong>: ${valor.descripcion}</li>`
                }).join('')
            +   "</ul>";

            text.innerHTML = list;
        } else {
            text.innerHTML = `<p style="opacity: 0;">${info}</p>`;
        }

        // Animar entrada del nuevo contenido
        const nuevoContenido = text.children;
        Array.from(nuevoContenido).forEach((elemento, index) => {
            Motion.animate(
                elemento,
                { opacity: [0, 1], y: [20, 0] },
                { duration: 0.5, delay: index * 0.1 }
            );
        });

        btnNosotros.forEach(btn => {
            btn.classList.remove('nosotros-active');
        })
        btn.classList.toggle('nosotros-active');
    })
})