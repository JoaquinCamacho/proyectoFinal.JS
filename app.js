const buscadorDeAlcohol = async () => {
    let resultado = await fetch("./data.json");
    let data = await resultado.json();

    document.getElementById('comprar-vino').addEventListener('click', () => agregarProductos('Vino', data.find(p => p.nombre === 'Vino').precio));

    document.getElementById('comprar-gin').addEventListener('click', () => agregarProductos('Gin', data.find(p => p.nombre === 'Gin').precio));

    document.getElementById('comprar-fernet').addEventListener('click', () => agregarProductos('Fernet', data.find(p => p.nombre === 'Fernet').precio));

    document.getElementById('comprar-ron').addEventListener('click', () => agregarProductos('Ron', data.find(p => p.nombre === 'Ron').precio));

    document.getElementById('comprar-vodka').addEventListener('click', () => agregarProductos('Vodka', data.find(p => p.nombre === 'Vodka').precio));
    
    document.getElementById('comprar-whisky').addEventListener('click', () => agregarProductos('Whisky', data.find(p => p.nombre === 'Whisky').precio));
};

buscadorDeAlcohol();

let carrito = [];
let total = 0;

cargarCarritoDesdeLocalStorage()

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        total = carrito.reduce((acc, item) => acc + item.precio, 0)
        actualizarCarrito();
    }
}

function agregarProductos(producto, precio) {
    carrito.push({ producto, precio });
    total += precio;
    Swal.fire({
        title: "Se añadio al carrito",
        text: "Sigue comprando",
        imageUrl: "./Imagenes/carrito.png",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "carrito"
    });
    actualizarCarrito();
    guardarCarritoEnLocalStorage()
}

function eliminarDelCarrito(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarCarrito();
    guardarCarritoEnLocalStorage()
}

function actualizarCarrito() {
    const carritoElement = document.getElementById('carrito');
    carritoElement.innerHTML = '';

    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.producto} - $${item.precio}`;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarDelCarrito(index));

        li.appendChild(botonEliminar);
        carritoElement.appendChild(li);
    });

    const totalElement = document.getElementById('total');
    if (totalElement) {
        totalElement.textContent = `Total: $${total}`;
    } else {
        const totalLi = document.createElement('li');
        totalLi.id = 'total';
        totalLi.textContent = `Total: $${total}`;
        carritoElement.appendChild(totalLi);
    }
}

function finalizarCompra() {
    if (total === 0) {
        Swal.fire({
            title: "No tienes nada en el carrito",
            text: "¿Quieres seguir comprando?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si!"
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire({
                title: "",
                text: "",
                icon: "success"
        });
            }
        });
    } else {
        Swal.fire({
            title: "Finalizaste tu compra",
            text: `el total a pagar es de $${total}`,
            imageUrl: ".//Imagenes/festejo.gif",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Festejo"
        });

        carrito = [];
        total = 0;

        guardarCarritoEnLocalStorage()
        actualizarCarrito();
    }
}




document.getElementById("finish").addEventListener("click", finalizarCompra);
