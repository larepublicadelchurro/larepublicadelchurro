async function getProductos() {
    try {
        const response = await fetch('assets/data/productos.json');
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

const btnProductos = document.querySelectorAll('.btn-productos');
const contenedorProductos = document.getElementById('contain-productos');

// Función para renderizar productos
async function renderProductos(categoria) {
    const productos = await getProductos();
    const producto = productos[categoria];
    
    if (!producto) return;

    // Animar salida de productos actuales
    const productosActuales = contenedorProductos.querySelectorAll('article');
    if (productosActuales.length > 0) {
        await Motion.animate(
            productosActuales,
            { opacity: [1, 0], y: [0, -20] },
            { duration: 0.3 }
        ).finished;
    }

    contenedorProductos.innerHTML = '';

    const article = producto.map(item => {
        return `
        <article class="col-12 col-sm-6 col-md-4 col-lg-3" style="opacity: 0;">
                <figure>
                    <div class="box-img">
                        <img src="${item.img}" alt="${item.nombre}" class="img-fluid">
                    </div>
                    <figcaption class="d-flex flex-column gap-2">
                        <h3>${item.nombre}</h3>
                        <p>${item.descripcion}</p>
                    </figcaption>
                </figure>
        </article>
        `
    }).join('');

    contenedorProductos.innerHTML = article;

    // Animar entrada de nuevos productos
    const nuevosProductos = contenedorProductos.querySelectorAll('article');
    nuevosProductos.forEach((articulo, index) => {
        Motion.animate(
            articulo,
            { opacity: [0, 1], y: [20, 0] },
            { duration: 0.5, delay: index * 0.1 }
        );
    });

    // Actualizar clases activas
    btnProductos.forEach(b => b.classList.remove('productos-active'));
    const btnActivo = document.querySelector(`[data-producto="${categoria}"]`);
    if (btnActivo) {
        btnActivo.classList.add('productos-active');
    }
}

// Cargar productos tradicionales al iniciar la página
renderProductos('churro-tradicional');

// Event listeners para los botones
btnProductos.forEach(btn => {
    btn.addEventListener('click', () => {
        renderProductos(btn.dataset.producto);
    });
})


