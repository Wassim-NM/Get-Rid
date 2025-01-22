// Display items
function displayItems(category = 'all') {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const itemContainer = document.getElementById('itemContainer');
    itemContainer.innerHTML = '';

    items.forEach((item) => {
        if (category === 'all' || item.category === category) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item'; // Add class to item div

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = 'Item Image';
            itemDiv.appendChild(img);

            const infoDiv = document.createElement('div');
            infoDiv.className = 'itemInfo';

            infoDiv.innerHTML = `
                <h2>${item.name}</h2>
                <p>Price: $<span>${item.price}</span></p>
                <p>Quantity: <span>${item.quantity}</span></p>
                <p>Category: <span>${item.category}</span></p>
                <p>Description: <span>${item.description}</span></p>
            `;
            itemDiv.appendChild(infoDiv);
            itemContainer.appendChild(itemDiv);
        }
    });
}

// Handle category selection
document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.category');
    categories.forEach((category) => {
        category.addEventListener('click', () => {
            const selectedCategory = category.getAttribute('data-category');
            displayItems(selectedCategory);
        });
    });

    // Load all items by default
    displayItems('all');
});