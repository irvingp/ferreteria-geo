async function loadProducts() {
    try {
        const response = await fetch('/api/productos/list');
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const products = await response.json();

        
        const list = document.createElement('div')
        list.classList.add('product-list');

        products.forEach(product => {

            
          
            const div = document.createElement('div');
            div.classList.add('product-item')
            console.log(product)
            const h3 = document.createElement('h3')
            
            h3.textContent = `${product.NombreProducto}`
            const p = document.createElement('p')
            p.textContent =`Precio: ${product.Precio}`
            const p2 = document.createElement('p')
            p2.textContent = `Existencias: ${product.Existencias}`
            const buttonSeleccionar = document.createElement('button')
            buttonSeleccionar.textContent = 'Seleccionar';
            buttonSeleccionar.classList.add('btn-select');
            buttonSeleccionar.dataset.productName = product.NombreProducto;
            buttonSeleccionar.dataset.productStock = product.Existencias;
            buttonSeleccionar.dataset.productPrice = product.Precio;
            buttonSeleccionar.dataset.id = product.Id
            buttonSeleccionar.textContent = 'Seleccionar'
            

            div.appendChild(h3);
            div.appendChild(p);
            div.appendChild(p2);
            div.appendChild(buttonSeleccionar);
            

            
            list.appendChild(div);
        });
        const container= document.getElementById('productos')
        container.innerHTML=''; 
        container.appendChild(list);
        
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}


document.querySelector('.agregar-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombreProducto = document.getElementById('NombreProducto').value;
    const existencia = document.getElementById('Existencias').value;
    const precio = document.getElementById('Precio').value;

    const newProduct = {
        NombreProducto: nombreProducto,
        Existencias: existencia,
        Precio: precio
    };

    try {
        const response = await fetch('/api/productos/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        if (!response.ok) {
            throw new Error('Error al guardar el producto');
        }

        const result = await response.json();
        console.log(result.message);

        // Limpiar el formulario
        document.querySelector('.agregar-form').reset();

        // Opcional: Recargar la lista de productos
        loadProducts();
    } catch (error) {
        console.error('Error al guardar el producto:', error);
    }
});


document.addEventListener('click', function(event) {
  

    if (event.target && event.target.matches('button.btn-select')) {
        console.log(event.target.dataset)
        const productName = event.target.dataset.productName;
        const productStock = event.target.dataset.productStock;
        const productPrice = event.target.dataset.productPrice;
        const id = event.target.dataset.id;

        // Llenar el formulario con los datos del producto seleccionado
        document.getElementById('product').value = productName;
        document.getElementById('stock').value = productStock;
        document.getElementById('quantity').value = 0;
        document.getElementById('Id').value = id;
        
        document.getElementById('product').disabled = true;
        document.getElementById('stock').disabled = true;

    }
});


document.querySelector('.transaction-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const id = document.getElementById('Id').value;
    const existencia = document.getElementById('quantity').value;
    const type = document.getElementById('type').value;

    if (type === 'compra') {
        try {
            const response = await fetch(`/api/productos/buy/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Existencias: parseInt(existencia)
                }),
            });

            if (!response.ok) {
                alert
                throw new Error('Error al realizar la compra');
            }
            

            const data = await response.json();
            console.log('Compra registrada:', data);
            // Aquí podrías manejar la respuesta de la compra
            document.querySelector('.transaction-form').reset();
            loadProducts();

        } catch (error) {
            console.error('Error al realizar la compra:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    }else if (type === 'venta') {
        try {
            const response = await fetch(`/api/productos/sell/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Existencias: parseInt(existencia)
                }),
            });

            if (!response.ok) {

                const res = await response.json();
                alert(res.message)
                throw new Error('Error al realizar la venta');
            }

            const data = await response.json();
            console.log('Venta registrada:', data);
            // Aquí podrías manejar la respuesta de la venta 
            document.querySelector('.transaction-form').reset();
            loadProducts();

        } catch (error) {
            console.error('Error al realizar la venta:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    }

    
});


window.onload= loadProducts;