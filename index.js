// Mock data for demonstration
let addresses = [
    { id: 1, street: "123 Main St", city: "Cityville", state: "ST", zip: "12345" },
    { id: 2, street: "456 Elm St", city: "Townsville", state: "TS", zip: "67890" }
];

// Function to display addresses
function displayAddresses() {
    const addressesList = document.getElementById("addresses");
    addressesList.innerHTML = "";
    addresses.forEach(address => {
        const li = document.createElement("li");
        li.textContent = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
        
        // Container for delete and edit buttons
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("buttons-container");

        // Add delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn"); // Add class for styling
        deleteBtn.addEventListener("click", () => deleteAddress(address.id));
        buttonsContainer.appendChild(deleteBtn);
        
        // Add edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn"); // Add class for styling
        editBtn.addEventListener("click", () => editAddress(address.id));
        buttonsContainer.appendChild(editBtn);

        // Append buttons container to list item
        li.appendChild(buttonsContainer);
        
        addressesList.appendChild(li);
    });
}
function deleteAddress(id) {
    addresses = addresses.filter(address => address.id !== id);
    displayAddresses();

    // Reset form
    document.getElementById("add-address-form").reset();
}

// Function to add new address
function addAddress(event) {
    event.preventDefault();
    const street = document.getElementById("street").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    let zip = document.getElementById("zip").value;

    // Validate input
    if (street && city && state && zip) {
        if (!/^\d{6}$/.test(zip)) {
            alert("Please enter a valid 6-digit numeric zip code.");
            zip = ''; // Reset zip to empty string
        } 
        else if (zip.length !== 6) {
            alert("Please enter a valid zip code with 6 characters.");
            
        } else {
            const id = addresses.length > 0 ? addresses[addresses.length - 1].id + 1 : 1;
            addresses.push({ id, street, city, state, zip });
            displayAddresses();
            // Reset form
            document.getElementById("add-address-form").reset();
        }
    } else {
        alert("Please fill out all address fields.");
    }
}

// Function to edit address
function editAddress(id) {
    const address = addresses.find(address => address.id === id);
    // Populate form with existing address data for editing
    document.getElementById("street").value = address.street;
    document.getElementById("city").value = address.city;
    document.getElementById("state").value = address.state;
    document.getElementById("zip").value = address.zip;
    // Remove address from list temporarily during editing
    addresses = addresses.filter(address => address.id !== id);
}

// Event listener for form submission
document.getElementById("add-address-form").addEventListener("submit", addAddress);

// Initial display of addresses
displayAddresses();
