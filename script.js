// =======================
// CARRUSEL (SEGURO)
// =======================
const carousel = document.getElementById("carouselProductos");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let scrollAmount = 0;

// 🔥 Solo ejecutar si existen elementos (evita romper el JS)
if (carousel && nextBtn && prevBtn) {

    function getItemWidth() {
        const item = carousel.querySelector(".carousel-item-custom");
        return item ? item.offsetWidth : 0;
    }

    nextBtn.addEventListener("click", () => {
        scrollAmount += getItemWidth();
        carousel.scrollTo({ left: scrollAmount, behavior: "smooth" });
        updateButtons();
    });

    prevBtn.addEventListener("click", () => {
        scrollAmount -= getItemWidth();
        carousel.scrollTo({ left: scrollAmount, behavior: "smooth" });
        updateButtons();
    });

    function updateButtons() {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;

        prevBtn.style.display = scrollAmount <= 0 ? "none" : "block";
        nextBtn.style.display = scrollAmount >= maxScroll - 5 ? "none" : "block";
    }

    // Inicial
    updateButtons();

    // Ajustar al redimensionar
    window.addEventListener("resize", () => {
        scrollAmount = carousel.scrollLeft;
        updateButtons();
    });
}


// =======================
// FORMULARIOS (VALIDACIÓN CORRECTA)
// =======================
document.addEventListener("DOMContentLoaded", function () {

    const forms = document.querySelectorAll("#form-cotizacion");

    if (!forms.length) return;

    forms.forEach(form => {

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const nombre = form.querySelector("#nombre")?.value.trim();
            const correo = form.querySelector("#correo")?.value.trim();
            const servicio = form.querySelector("#servicio")?.value;
            const mensaje = form.querySelector("#mensaje")?.value.trim();

            // =======================
            // VALIDACIONES
            // =======================

            if (!nombre) {
                alert("Por favor ingresa tu nombre");
                return;
            }

            if (!servicio) {
                alert("Por favor selecciona un servicio");
                return;
            }

            if (!mensaje) {
                alert("Por favor escribe tu mensaje");
                return;
            }

            // =======================
            // MENSAJE WHATSAPP
            // =======================

            let texto = `Hola, quiero cotizar un servicio:\n`;
            texto += `Nombre: ${nombre}\n`;
            texto += `Correo: ${correo || "No proporcionado."}\n`;
            texto += `Servicio: ${servicio}\n`;
            texto += `Mensaje: ${mensaje}.`;

            const telefono = "522221106016";

            const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;

            window.open(url, "_blank");
        });

    });

});