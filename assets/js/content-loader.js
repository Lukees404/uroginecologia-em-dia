// components-loader.js
class ComponentLoader {
    constructor() {
        this.components = {};
    }

    // Carregar componente
    async loadComponent(componentName, targetElement) {
        try {
            const response = await fetch(`/components/${componentName}.html`);
            const html = await response.text();
            
            if (targetElement) {
                targetElement.innerHTML = html;
            }
            
            this.components[componentName] = html;
            this.initializeComponent(componentName);
            
            return html;
        } catch (error) {
            console.error(`Erro ao carregar componente ${componentName}:`, error);
            return null;
        }
    }

    // Inicializar componentes (adicionar event listeners, etc)
    initializeComponent(componentName) {
        switch(componentName) {
            case 'header':
                this.initializeHeader();
                break;
            case 'footer':
                this.initializeFooter();
                break;
            // Adicione outros componentes conforme necessário
        }
    }

    initializeHeader() {
        // Inicializar funcionalidades do header se necessário
        console.log('Header inicializado');
    }

    initializeFooter() {
        // Inicializar funcionalidades do footer se necessário
        console.log('Footer inicializado');
    }
}

// Inicializar loader global
window.componentLoader = new ComponentLoader();

// Carregar componentes automaticamente quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Exemplo: carregar header e footer se os elementos existirem
    const headerElement = document.getElementById('header-component');
    const footerElement = document.getElementById('footer-component');
    
    if (headerElement) {
        window.componentLoader.loadComponent('header', headerElement);
    }
    
    if (footerElement) {
        window.componentLoader.loadComponent('footer', footerElement);
    }
});