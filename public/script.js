document.addEventListener('DOMContentLoaded', function() {
    // Manejar la lógica de las transacciones
    const transactionForm = document.querySelector('.transaction-form');
    
    transactionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const product = document.getElementById('product').value;
        const quantity = document.getElementById('quantity').value;
        const type = document.getElementById('type').value;

        if (product && quantity && type) {
            alert(`Transacción registrada: ${type} de ${quantity} ${product}(s).`);
            transactionForm.reset();
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });

    // Manejar los botones de compra y venta
    const buyButtons = document.querySelectorAll('.buy-button');
    const sellButtons = document.querySelectorAll('.sell-button');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Producto comprado!');
        });
    });

    sellButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Producto vendido!');
        });
    });

    // Manejar el formulario de contacto
    const contactForm = document.querySelector('.contact-form');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            alert(`Gracias por contactarnos, ${name}. Hemos recibido su mensaje.`);
            contactForm.reset();
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });

    // Navegación entre secciones
    const navigationLinks = document.querySelectorAll('.navigation a');
    const sections = document.querySelectorAll('.section');

    navigationLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            sections.forEach(section => {
                if (section.id === targetId) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    });
});
