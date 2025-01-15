const addItemBtn = document.getElementById('addItemBtn');
const itemForm = document.getElementById('itemForm');

function showForm() {
    itemForm.style.display = 'block';
    addItemBtn.style.display = 'none';
}

function hideForm() {
    itemForm.style.display = 'none';
    addItemBtn.style.display = 'block';
}

function addItem() {
    const itemList = document.getElementById('itemList');
    const itemImage = document.getElementById('itemImage').files[0];
    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemQuantity = document.getElementById('itemQuantity').value;
    const itemDescription = document.getElementById('itemDescription').value;

    // Validation
    if (!itemName || !itemPrice || !itemQuantity || !itemDescription) {
        alert('All fields must be filled out.');
        return;
    }

    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';

    if (itemImage) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(itemImage);
        img.className = 'item-img';
        itemDiv.appendChild(img);
        img.onload = () => URL.revokeObjectURL(img.src);
    }

    const infoDiv = document.createElement('div');
    infoDiv.className = 'item-info';

    const nameP = document.createElement('p');
    nameP.textContent = `Name: ${itemName}`;
    infoDiv.appendChild(nameP);

    const priceP = document.createElement('p');
    priceP.textContent = `Price: $${itemPrice}`;
    infoDiv.appendChild(priceP);

    const quantityP = document.createElement('p');
    quantityP.textContent = `Quantity: ${itemQuantity}`;
    infoDiv.appendChild(quantityP);

    const descriptionP = document.createElement('p');
    descriptionP.textContent = `Description: ${itemDescription}`;
    infoDiv.appendChild(descriptionP);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    infoDiv.appendChild(editBtn);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    const hr = document.createElement('hr');
    removeBtn.onclick = function () {
        itemList.removeChild(itemDiv);
        itemList.removeChild(hr);
    };
    infoDiv.appendChild(removeBtn);

    itemDiv.appendChild(infoDiv);
    itemList.insertBefore(itemDiv, itemList.firstChild);
    itemList.insertBefore(hr, itemDiv.nextSibling);

    // Clear file input manually
    hideForm();
    document.getElementById('itemImage').value = '';

    // Ensure "Add Item" button stays part of the list
    // if (!itemList.contains(document.getElementById('addItemBtn'))) {
    //     itemList.appendChild(document.getElementById('addItemBtn'));
    // }

    // Local Storage
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.push({
        itemImage: itemImage,
        itemName: itemName,
        itemPrice: itemPrice,
        itemQuantity: itemQuantity,
        itemDescription: itemDescription
    });
    localStorage.setItem('items', JSON.stringify(items));
}

    // localStorage items counter 
    let counter = 0;
    items.forEach(item => {
        const itemList = document.getElementById('itemList');
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        if (item.itemImage) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(item.itemImage);
            img.className = 'item-img';
            itemDiv.appendChild(img);
            img.onload = () => URL.revokeObjectURL(img.src);
        }

        const infoDiv = document.createElement('div');
        infoDiv.className = 'item-info';

        const nameP = document.createElement('p');
        nameP.textContent = `Name: ${item.itemName}`;
        infoDiv.appendChild(nameP);

        const priceP = document.createElement('p');
        priceP.textContent = `Price: $${item.itemPrice}`;
        infoDiv.appendChild(priceP);

        const quantityP = document.createElement('p');
        quantityP.textContent = `Quantity: ${item.itemQuantity}`;
        infoDiv.appendChild(quantityP);

        const descriptionP = document.createElement('p');
        descriptionP.textContent = `Description: ${item.itemDescription}`;
        infoDiv.appendChild(descriptionP);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        infoDiv.appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        const hr = document.createElement('hr');
        removeBtn.onclick = function () {
            itemList.removeChild(itemDiv);
            itemList.removeChild(hr);
        };
        infoDiv.appendChild(removeBtn);

        itemDiv.appendChild(infoDiv);
        itemList.insertBefore(itemDiv, itemList.firstChild);
        itemList.insertBefore(hr, itemDiv.nextSibling);
        counter++;
        console.log(counter);
    });