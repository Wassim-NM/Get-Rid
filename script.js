// Show the form in add.html
function showForm() {
    const itemForm = document.getElementById('itemForm');
    const addItemBtn = document.getElementById('addItemBtn');
    itemForm.style.display = 'block';
    addItemBtn.style.display = 'none';
}

// Hide the form in add.html
function hideForm() {
    const itemForm = document.getElementById('itemForm');
    const addItemBtn = document.getElementById('addItemBtn');
    itemForm.style.display = 'none';
    addItemBtn.style.display = 'block';
}

// Add item to localStorage in add.html
function addItem() {
    const itemImage = document.getElementById('itemImage').files[0];
    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemQuantity = document.getElementById('itemQuantity').value;
    const itemDescription = document.getElementById('itemDescription').value;

    // Validation
    if (!itemName || !itemPrice || !itemQuantity || !itemDescription || !itemImage) {
        alert('All fields must be filled out.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const newItem = {
            image: reader.result, // Base64 image string
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity,
            description: itemDescription
        };

        // Save to localStorage
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.push(newItem);
        localStorage.setItem('items', JSON.stringify(items));

        alert('Item added successfully!');
        hideForm();
    };

    reader.readAsDataURL(itemImage); // Convert image to base64
}

// Load and display items in index.html
window.onload = function () {
    const itemContainer = document.querySelector('.itemContainer');
    const items = JSON.parse(localStorage.getItem('items')) || [];

    items.forEach((item) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = 'Item Image';
        itemDiv.appendChild(img);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'itemInfo';

        const name = document.createElement('h2');
        name.textContent = item.name;
        infoDiv.appendChild(name);

        const price = document.createElement('p');
        price.innerHTML = `Price: $<span>${item.price}</span>`;
        infoDiv.appendChild(price);

        const quantity = document.createElement('p');
        quantity.innerHTML = `Quantity: <span>${item.quantity}</span>`;
        infoDiv.appendChild(quantity);

        const description = document.createElement('p');
        description.innerHTML = `Description: <span>${item.description}</span>`;
        infoDiv.appendChild(description);

        itemDiv.appendChild(infoDiv);
        itemContainer.appendChild(itemDiv);
    });
};
