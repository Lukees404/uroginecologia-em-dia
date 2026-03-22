/**
 * mode-toggle.js — Sistema de alternância Paciente/Profissional
 * Salva preferência em cookie para próximas visitas.
 * Deve ser carregado DEPOIS do main.js (após header ser inserido no DOM).
 */

(function() {
    'use strict';

    const COOKIE_NAME = 'uro_mode';
    const DEFAULT_MODE = 'paciente';

    function getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
    }

    function getCurrentMode() {
        return getCookie(COOKIE_NAME) || DEFAULT_MODE;
    }

    function applyMode(mode) {
        // Update toggle buttons (desktop + mobile)
        document.querySelectorAll('.mode-btn').forEach(function(btn) {
            if (btn.getAttribute('data-mode') === mode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Show/hide navs
        document.querySelectorAll('.nav-paciente').forEach(function(nav) {
            nav.style.display = mode === 'paciente' ? '' : 'none';
        });
        document.querySelectorAll('.nav-profissional').forEach(function(nav) {
            nav.style.display = mode === 'profissional' ? '' : 'none';
        });

        // Show/hide page content areas
        document.querySelectorAll('.area-paciente').forEach(function(el) {
            el.style.display = mode === 'paciente' ? '' : 'none';
        });
        document.querySelectorAll('.area-profissional').forEach(function(el) {
            el.style.display = mode === 'profissional' ? '' : 'none';
        });

        // Hide search bar in paciente mode on header (optional)
        document.querySelectorAll('.header-search').forEach(function(el) {
            el.style.display = mode === 'profissional' ? '' : 'none';
        });

        // Update body attribute for CSS targeting
        document.body.setAttribute('data-mode', mode);

        // Save preference
        setCookie(COOKIE_NAME, mode, 365);
    }

    function initToggle() {
        var mode = getCurrentMode();
        applyMode(mode);

        // Bind click events to all toggle buttons
        document.querySelectorAll('.mode-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var newMode = this.getAttribute('data-mode');
                applyMode(newMode);

                // If on a page that only exists in one mode, redirect to index
                var path = window.location.pathname;
                var pacientePages = ['/pages/condicoes.html', '/pages/saude-pelvica.html', '/pages/perguntas-frequentes.html'];
                var profissionalPages = ['/pages/protocolos.html', '/pages/artigos.html', '/pages/eventos.html', '/pages/noticias.html'];

                if (newMode === 'paciente' && profissionalPages.some(function(p) { return path.endsWith(p); })) {
                    window.location.href = '/index.html';
                } else if (newMode === 'profissional' && pacientePages.some(function(p) { return path.endsWith(p); })) {
                    window.location.href = '/index.html';
                }
            });
        });
    }

    // Wait for components to be loaded, then init
    // main.js loads header async, so we poll briefly
    var attempts = 0;
    var checkInterval = setInterval(function() {
        attempts++;
        if (document.querySelector('.mode-btn') || attempts > 50) {
            clearInterval(checkInterval);
            if (document.querySelector('.mode-btn')) {
                initToggle();
            }
        }
    }, 100);
})();
