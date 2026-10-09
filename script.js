// Load saved items
let items = JSON.parse(
    localStorage.getItem("campusItems")
) || [];


// -------------------------
// SHOW SECTION
// -------------------------

function showSection(sectionName) {

    const sections =
        document.querySelectorAll(".section");

    sections.forEach(function(section) {
        section.classList.remove("active");
    });


    document
        .getElementById(sectionName)
        .classList.add("active");


    if (sectionName === "items") {
        displayItems();
    }
}


// -------------------------
// SUBMIT FORM
// -------------------------

document
    .getElementById("itemForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const item = {

            id: Date.now(),

            name:
                document
                .getElementById("itemName")
                .value,

            type:
                document
                .getElementById("itemType")
                .value,

            description:
                document
                .getElementById("description")
                .value,

            location:
                document
                .getElementById("location")
                .value,

            date:
                document
                .getElementById("date")
                .value,

            contact:
                document
                .getElementById("contact")
                .value
        };


        items.push(item);


        localStorage.setItem(
            "campusItems",
            JSON.stringify(items)
        );


        alert(
            "Item reported successfully!"
        );


        document
            .getElementById("itemForm")
            .reset();


        showSection("items");

    });


// -------------------------
// DISPLAY ITEMS
// -------------------------

function displayItems() {

    const list =
        document.getElementById("itemList");


    const search =
        document
        .getElementById("search")
        .value
        .toLowerCase();


    list.innerHTML = "";


    const filteredItems =
        items.filter(function(item) {

            return (
                item.name
                .toLowerCase()
                .includes(search)
            );

        });


    if (filteredItems.length === 0) {

        list.innerHTML =
            "<p>No items found.</p>";

        return;
    }


    filteredItems.forEach(function(item) {

        const div =
            document.createElement("div");


        div.className = "item";


        const typeClass =
            item.type === "Lost"
            ? "lost"
            : "found";


        div.innerHTML = `

            <h3>${item.name}</h3>

            <p class="${typeClass}">
                ${item.type}
            </p>

            <p>
                <strong>Description:</strong>
                ${item.description}
            </p>

            <p>
                <strong>Location:</strong>
                ${item.location}
            </p>

            <p>
                <strong>Date:</strong>
                ${item.date}
            </p>

            <p>
                <strong>Contact:</strong>
                ${item.contact}
            </p>

            <button
                class="delete-btn"
                onclick="deleteItem(${item.id})">

                Delete

            </button>

        `;


        list.appendChild(div);

    });
}


// -------------------------
// DELETE ITEM
// -------------------------

function deleteItem(id) {

    items =
        items.filter(function(item) {

            return item.id !== id;

        });


    localStorage.setItem(
        "campusItems",
        JSON.stringify(items)
    );


    displayItems();
}