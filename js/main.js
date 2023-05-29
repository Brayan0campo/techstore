var element = document.querySelector('.products-content');
var windowHeight = window.innerHeight;
var isVisible = false;

function checkVisibility() {
    var position = element.getBoundingClientRect().top;

    if (position - windowHeight <= 0 && !isVisible) {
        element.classList.add('show');
        element.classList.remove('hide');
        isVisible = true;
    } else if (position > windowHeight && isVisible) {
        element.classList.add('hide');
        element.classList.remove('show');
        isVisible = false;
    }
}

window.addEventListener('scroll', checkVisibility);
