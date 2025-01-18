// Show the form
function showForm() {
    document.getElementById('itemForm').style.display = 'block';
    document.getElementById('addItemBtn').style.display = 'none';
}

// Hide the form
function hideForm() {
    document.getElementById('itemForm').style.display = 'none';
    document.getElementById('addItemBtn').style.display = 'block';
}

// Add item to localStorage
function addItem() {
    const itemImage = document.getElementById('itemImage').files[0];
    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemQuantity = document.getElementById('itemQuantity').value;
    const itemCategory = document.getElementById('itemCategory').value;
    const itemDescription = document.getElementById('itemDescription').value;

    if (!itemName || !itemPrice || !itemQuantity || !itemDescription || !itemImage || !itemCategory) {
        alert('All fields must be filled out.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const newItem = {
            image: reader.result,
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity,
            category: itemCategory,
            description: itemDescription
        };

        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.push(newItem);
        localStorage.setItem('items', JSON.stringify(items));

        alert('Item added successfully!');
        hideForm();
    };
    reader.readAsDataURL(itemImage);
}

// Display items
function displayItems(category = 'all') {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const itemContainer = document.getElementById('itemContainer');
    itemContainer.innerHTML = '';

    items.forEach((item) => {
        if (category === 'all' || item.category === category) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';

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

// Handle form submission

document.getElementById('itemForm').addEventListener('submit', (e) => {
    e.preventDefault();
    addItem();
});

// Handle form cancellation
document.getElementById('cancelBtn').addEventListener('click', (e) => {
    e.preventDefault();
    hideForm();
});

// Handle form display
document.getElementById('addItemBtn').addEventListener('click', (e) => {
    e.preventDefault();
    showForm();
});

// Handle form hiding
document.getElementById('closeBtn').addEventListener('click', (e) => {
    e.preventDefault();
    hideForm();
});


