/**
 * Makes sure that the notifications are always on screen.
 */
window.addEventListener("scroll", () => {
    let navBarBounds = document.getElementById("ourNavBar").getBoundingClientRect();

    let newTopMargin = window.scrollY + Math.max(0, navBarBounds.bottom) + 2;
    document.getElementById("notification-container").style.marginTop = newTopMargin + "px";
});