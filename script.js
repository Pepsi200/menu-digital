// Cargar elementos según la página
const currentPage = location.pathname.split('/').pop();

fetch('menu.json')
    .then(response => response.json())
    .then(menu => {
        let filteredItems = [];

        switch (currentPage) {
            case 'promos.html':
                filteredItems = menu.filter(item =>
                    item.category === 'promos' ||
                    item.name.toLowerCase().includes('promo')
                );
                break;
            case 'bebidas.html':
                filteredItems = menu.filter(item => item.category === 'bebidas');
                break;
            case 'platos.html':
                filteredItems = menu.filter(item => item.category === 'platos');
                break;
            default:
                filteredItems = menu;
        }

        // Resto del código de renderizado
        const menuContainer = document.getElementById('menu');
        if (!menuContainer) return; // Evita error si no existe el contenedor
        menuContainer.innerHTML = ''; // Limpiar contenido previo
        filteredItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            let imgHtml = item.image ? `<img src="${item.image}" alt="${item.name}" class="menu-img">` : '';
            let descHtml = item.description ? `<div class="menu-desc">${item.description}</div>` : '';
            menuItem.innerHTML = `
                <div class="menu-info">
                    ${imgHtml}
                    <div>
                        <strong>${item.name}</strong>
                        ${descHtml}
                    </div>
                </div>
                <span class="price">${item.price}</span>
            `;
            menuContainer.appendChild(menuItem);
        });
    })
    .catch(error => console.error('Error al cargar el menú:', error));
