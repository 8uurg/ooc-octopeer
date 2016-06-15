window.addEventListener("scroll", () => {
    let navBarBounds = document.getElementById("ourNavBar").getBoundingClientRect();

    let newTopMargin = (navBarBounds.bottom < 0 ? window.scrollY : window.scrollY + navBarBounds.bottom) + 2;
    document.getElementById("notification-container").style.marginTop = newTopMargin + "px";
});