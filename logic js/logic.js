// loader
window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");

    setTimeout(function () {
        preloader.classList.add("hidden");

        document.body.classList.add("loaded");

        setTimeout(function () {
            preloader.remove();
        }, 500);
        
    }, 2500);
});

