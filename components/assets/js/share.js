
/* Share Buttons */
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.share-bar').forEach(function(bar) {
        // Copy link button
        var copyBtn = bar.querySelector('.share-btn--copy');
        if (copyBtn) {
            copyBtn.addEventListener('click', function() {
                navigator.clipboard.writeText(window.location.href).then(function() {
                    copyBtn.textContent = 'Copiado ✓';
                    setTimeout(function() { copyBtn.innerHTML = '<img src="/assets/images/icons/share.svg" alt=""> Copiar link'; }, 2000);
                });
            });
        }
    });
});
