document.addEventListener("DOMContentLoaded", function () {

    const productImages =
        document.querySelectorAll(".product-image");

    const categoryCards =
        document.querySelectorAll(".category-card");

    const productCards =
        document.querySelectorAll("#product-grid .card");

    const productsSection =
        document.getElementById("products-section");

    const selectedCategoryTitle =
        document.getElementById("selected-category-title");

    const closeCategoryButton =
        document.getElementById("close-category");

    let activeCategory = null;


    /* =====================================================
       IMÁGENES FALTANTES
       ===================================================== */

    productImages.forEach(function (image) {

        /*
            Si el archivo de imagen no existe,
            se elimina completamente la imagen
            de la tarjeta.

            No se utiliza ningún placeholder.
        */

        image.addEventListener("error", function () {
            image.remove();
        });

    });


    /* =====================================================
       APERTURA DE CATEGORÍAS
       ===================================================== */

    function openCategory(category) {

        activeCategory = category;

        categoryCards.forEach(function (button) {

            const isActive =
                button.dataset.category === category;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-expanded", String(isActive));

        });


        productCards.forEach(function (card) {

            const categoryBadge =
                card.querySelector(".badge-category");

            const cardCategory =
                categoryBadge ? categoryBadge.textContent.trim() : "";

            card.hidden = cardCategory !== category;

        });


        selectedCategoryTitle.textContent = category;
        productsSection.hidden = false;


        requestAnimationFrame(function () {
            productsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });

    }


    function closeCategory() {

        activeCategory = null;

        categoryCards.forEach(function (button) {
            button.classList.remove("active");
            button.setAttribute("aria-expanded", "false");
        });

        productCards.forEach(function (card) {
            card.hidden = true;
        });

        productsSection.hidden = true;
        selectedCategoryTitle.textContent = "";

    }


    categoryCards.forEach(function (button) {

        button.addEventListener("click", function () {

            const category = button.dataset.category;

            if (activeCategory === category) {
                closeCategory();
            } else {
                openCategory(category);
            }

        });

    });


    closeCategoryButton.addEventListener("click", function () {
        closeCategory();

        document.querySelector(".category-section").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });


    /*
        Al cargar la página no se muestra ningún producto.
        Solo aparecen las tarjetas de categorías.
    */

    closeCategory();

});
