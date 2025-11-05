/**
 * pdf-generator.js - Gerador de PDF para Artigos e Protocolos
 * Autor: Uroginecologia Em Dia
 * Descrição: Converte conteúdo HTML em PDF bem formatado
 */

class PDFGenerator {
    constructor() {
        this.jsPDFLoaded = false;
        this.html2canvasLoaded = false;
        this.loadingPromise = null;
    }

    /**
     * Carrega as bibliotecas necessárias
     */
    async loadLibraries() {
        if (this.jsPDFLoaded && this.html2canvasLoaded) {
            return Promise.resolve();
        }

        if (this.loadingPromise) {
            return this.loadingPromise;
        }

        this.loadingPromise = new Promise((resolve, reject) => {
            // Carregar html2canvas
            if (!window.html2canvas) {
                const html2canvasScript = document.createElement('script');
                html2canvasScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
                html2canvasScript.onload = () => {
                    this.html2canvasLoaded = true;
                    this.checkAllLoaded(resolve);
                };
                html2canvasScript.onerror = reject;
                document.head.appendChild(html2canvasScript);
            } else {
                this.html2canvasLoaded = true;
            }

            // Carregar jsPDF
            if (!window.jspdf) {
                const jsPDFScript = document.createElement('script');
                jsPDFScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
                jsPDFScript.onload = () => {
                    this.jsPDFLoaded = true;
                    this.checkAllLoaded(resolve);
                };
                jsPDFScript.onerror = reject;
                document.head.appendChild(jsPDFScript);
            } else {
                this.jsPDFLoaded = true;
            }

            this.checkAllLoaded(resolve);
        });

        return this.loadingPromise;
    }

    /**
     * Verifica se todas as bibliotecas foram carregadas
     */
    checkAllLoaded(resolve) {
        if (this.jsPDFLoaded && this.html2canvasLoaded) {
            resolve();
        }
    }

    /**
     * Prepara o conteúdo para PDF (remove elementos indesejados)
     */
    prepareContent(contentSelector) {
        const content = document.querySelector(contentSelector);
        if (!content) {
            throw new Error('Conteúdo não encontrado');
        }

        // Criar clone do conteúdo
        const clone = content.cloneNode(true);

        // Remover elementos indesejados
        const elementsToRemove = [
            'header',
            'footer',
            '#header-component',
            '#footer-component',
            'button',
            '.no-print',
            'nav.breadcrumb',
            '.action-buttons'
        ];

        elementsToRemove.forEach(selector => {
            const elements = clone.querySelectorAll(selector);
            elements.forEach(el => el.remove());
        });

        // Ajustar estilos para impressão
        clone.style.background = 'white';
        clone.style.padding = '20px';
        clone.style.maxWidth = '800px';
        clone.style.margin = '0 auto';

        // Ajustar imagens para não quebrar
        const images = clone.querySelectorAll('img');
        images.forEach(img => {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        });

        return clone;
    }

    /**
     * Gera o PDF
     */
    async generatePDF(options = {}) {
        try {
            // Mostrar loading
            this.showLoading();

            // Carregar bibliotecas
            await this.loadLibraries();

            const {
                contentSelector = 'main',
                filename = 'documento.pdf',
                title = 'Documento',
                subtitle = '',
                author = 'Ana Paula de Oliveira Pinto',
                date = new Date().toLocaleDateString('pt-BR')
            } = options;

            // Preparar conteúdo
            const contentClone = this.prepareContent(contentSelector);

            // Criar container temporário
            const tempContainer = document.createElement('div');
            tempContainer.style.position = 'absolute';
            tempContainer.style.left = '-9999px';
            tempContainer.style.top = '0';
            tempContainer.style.width = '210mm'; // A4 width
            tempContainer.style.background = 'white';
            tempContainer.style.padding = '20mm';
            tempContainer.style.fontFamily = 'Arial, sans-serif';

            // Adicionar cabeçalho do PDF
            const header = document.createElement('div');
            header.style.marginBottom = '20px';
            header.style.borderBottom = '3px solid #3b82f6';
            header.style.paddingBottom = '15px';
            header.innerHTML = `
                <h1 style="margin: 0; font-size: 24px; color: #1e40af;">${title}</h1>
                ${subtitle ? `<p style="margin: 5px 0 0 0; font-size: 14px; color: #6b7280;">${subtitle}</p>` : ''}
                <div style="margin-top: 10px; font-size: 12px; color: #6b7280;">
                    <strong>Fonte:</strong> ${author}<br>
                    <strong>Data:</strong> ${date}<br>
                    <strong>Site:</strong> Uroginecologia Em Dia
                </div>
            `;

            tempContainer.appendChild(header);
            tempContainer.appendChild(contentClone);

            // Adicionar rodapé
            const footer = document.createElement('div');
            footer.style.marginTop = '30px';
            footer.style.paddingTop = '15px';
            footer.style.borderTop = '1px solid #e5e7eb';
            footer.style.fontSize = '11px';
            footer.style.color = '#9ca3af';
            footer.style.textAlign = 'center';
            footer.innerHTML = `
                <p style="margin: 0;">© ${new Date().getFullYear()} Uroginecologia Em Dia - Portal de Referência em Uroginecologia</p>
                <p style="margin: 5px 0 0 0;">Conteúdo baseado em evidências científicas</p>
            `;

            tempContainer.appendChild(footer);
            document.body.appendChild(tempContainer);

            // Capturar como canvas
            const canvas = await html2canvas(tempContainer, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            // Remover container temporário
            document.body.removeChild(tempContainer);

            // Criar PDF
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');

            const imgWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            const imgData = canvas.toDataURL('image/png');

            // Adicionar primeira página
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Adicionar páginas extras se necessário
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // Salvar PDF
            pdf.save(filename);

            this.hideLoading();
            this.showSuccess();

        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            this.hideLoading();
            this.showError(error.message);
        }
    }

    /**
     * Mostrar loading
     */
    showLoading() {
        const existing = document.getElementById('pdf-loading');
        if (existing) return;

        const loading = document.createElement('div');
        loading.id = 'pdf-loading';
        loading.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        loading.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 10px; text-align: center; max-width: 300px;">
                <div style="border: 4px solid #f3f4f6; border-top: 4px solid #3b82f6; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                <p style="margin: 0; font-size: 16px; color: #1f2937; font-weight: 600;">Gerando PDF...</p>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #6b7280;">Por favor, aguarde</p>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        document.body.appendChild(loading);
    }

    /**
     * Esconder loading
     */
    hideLoading() {
        const loading = document.getElementById('pdf-loading');
        if (loading) {
            loading.remove();
        }
    }

    /**
     * Mostrar mensagem de sucesso
     */
    showSuccess() {
        this.showToast('✓ PDF gerado com sucesso!', 'success');
    }

    /**
     * Mostrar mensagem de erro
     */
    showError(message) {
        this.showToast(`✗ Erro: ${message}`, 'error');
    }

    /**
     * Mostrar toast notification
     */
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            font-weight: 500;
        `;
        toast.innerHTML = message;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Exportar instância global
window.PDFGenerator = new PDFGenerator();
