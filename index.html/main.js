const collectionGroups = [
    {
        label: "Brands",
        icon: "fa-solid fa-flag-checkered",
        collections: [
            {
                name: "3T Bikes",
                productCount: 27,
                url: "#3t-bikes",
                image: "pogacar.webp",
                summary: "Performance-driven machines from the Italian innovators."
            },
            {
                name: "BMC Switzerland",
                productCount: 18,
                url: "#bmc-switzerland",
                image: "bikebg.jpg",
                summary: "Precision Swiss engineering for the ultimate ride quality."
            },
            {
                name: "Pinarello",
                productCount: 22,
                url: "#pinarello",
                image: "colagi.avif",
                summary: "Legendary road bikes ridden to grand tour victories."
            },
            {
                name: "Fuji Bikes",
                productCount: 16,
                url: "#fuji",
                image: "image/M4.jpg",
                summary: "Reliability and value for riders of every discipline."
            },
            
        ]
    },
    {
        label: "Categories",
        icon: "fa-solid fa-layer-group",
        collections: [
            {
                name: "Road Bikes",
                productCount: 35,
                url: "#road-bikes",
                image: "image/c2.jpg",
                summary: "Lightweight builds designed for speed and efficiency."
            },
            {
                name: "Components",
                productCount: 41,
                url: "#components",
                image: "image/desert.png",
                summary: "Upgrade drivetrains, cockpits, and finishing kits."
            },
            {
                name: "Gear & Apparel",
                productCount: 32,
                url: "#gear-apparel",
                image: "image/M4.jpg",
                summary: "Ride-ready kits, helmets, and essentials for every season."
            },
            {
                name: "Accessories",
                productCount: 28,
                url: "#accessories",
                image: "image/ak.jpg",
                summary: "Pedals, lights, trainers, and on-bike storage solutions."
            }
        ]
    }
];

/**
 * Enhance the Collections page with dynamic cards similar to the JB Multisports layout.
 */
function initCollectionsPage() {
    const groupsContainer = document.querySelector("[data-collection-groups]");
    const breadcrumbs = document.querySelector("[data-breadcrumbs] ol");

    if (!groupsContainer) {
        return;
    }

    // Append breadcrumbs if deeper navigation is added later.
    if (breadcrumbs) {
        const groupNames = collectionGroups.map((group) => group.label);
        breadcrumbs.dataset.availableGroups = groupNames.join(", ");
    }

    collectionGroups.forEach((group) => {
        const section = document.createElement("section");
        section.className = "collection-group";
        section.setAttribute("data-group", group.label.toLowerCase());

        const header = document.createElement("header");
        header.className = "collection-group__header";
        header.innerHTML = `
            <h2>
                <i class="${group.icon}" aria-hidden="true"></i>
                ${group.label}
            </h2>
        `;

        const grid = document.createElement("div");
        grid.className = "collections-grid";

        group.collections
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach((collection) => {
                const card = document.createElement("a");
                card.className = "collection-card";
                card.href = collection.url;
                card.setAttribute("data-collection", collection.name.toLowerCase());
                card.setAttribute("aria-label", `${collection.name} – ${collection.productCount} products`);

                const imageSrc = collection.image ? collection.image : "bikebg.jpg";

                card.innerHTML = `
                    <div class="collection-card__media" style="background-image: url('${imageSrc}')"></div>
                    <div class="collection-card__body">
                        <span class="collection-card__eyebrow">${collection.productCount} products</span>
                        <h3>${collection.name}</h3>
                        <p>${collection.summary}</p>
                    </div>
                    <span class="collection-card__cta">Shop collection <i class="fa-solid fa-chevron-right" aria-hidden="true"></i></span>
                `;

                card.addEventListener("keyup", (event) => {
                    if (event.key === "Enter") {
                        card.click();
                    }
                });

                grid.appendChild(card);
            });

        section.appendChild(header);
        section.appendChild(grid);
        groupsContainer.appendChild(section);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initCollectionsPage();
});