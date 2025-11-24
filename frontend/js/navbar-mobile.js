// Script padronizado para controlar o menu mobile em todas as páginas
document.addEventListener('DOMContentLoaded', () => {
    // Suporta tanto data-collapse-toggle quanto id="hamburger"
    const toggleButton = document.querySelector('[data-collapse-toggle="navbar-default"]') || 
                         document.querySelector('[data-collapse-toggle="navbar-mobile"]') ||
                         document.getElementById('hamburger');
    
    const mobileMenu = document.getElementById('navbar-default') || 
                       document.getElementById('navbar-mobile');

    if (!toggleButton || !mobileMenu) {
        console.warn('Navbar mobile: Elementos não encontrados');
        return; // Se não encontrar os elementos, não faz nada
    }

    // Verificar se há overlay (para index.html)
    let overlay = document.getElementById('menu-overlay');
    const isIndexPage = toggleButton.id === 'hamburger' && mobileMenu.id === 'navbar-mobile';
    
    if (!overlay && isIndexPage) {
        // Criar overlay se não existir (para index.html)
        overlay = document.createElement('div');
        overlay.id = 'menu-overlay';
        overlay.className = 'fixed inset-0 bg-black/50 z-[19] hidden transition-opacity duration-300';
        // Overlay deve estar abaixo do menu para não bloquear cliques
        document.body.appendChild(overlay);
    }

    // Função para abrir o menu
    function openMenu() {
        mobileMenu.classList.remove('hidden');
        mobileMenu.style.display = 'block';
        toggleButton.setAttribute('aria-expanded', 'true');
        
        // Adiciona classe active para animação do hamburger (se existir)
        if (toggleButton.classList.contains('hamburger')) {
            toggleButton.classList.add('active');
        }
        
        // Mostra overlay se existir
        if (overlay) {
            overlay.classList.remove('hidden');
            overlay.style.display = 'block';
        }
        
        // Previne scroll do body quando menu está aberto
        document.body.style.overflow = 'hidden';
    }

    // Função para fechar o menu
    function closeMenu() {
        mobileMenu.classList.add('hidden');
        mobileMenu.style.display = 'none';
        toggleButton.setAttribute('aria-expanded', 'false');
        
        // Remove classe active do hamburger (se existir)
        if (toggleButton.classList.contains('hamburger')) {
            toggleButton.classList.remove('active');
        }
        
        // Esconde overlay se existir
        if (overlay) {
            overlay.classList.add('hidden');
            overlay.style.display = 'none';
        }
        
        // Restaura scroll do body
        document.body.style.overflow = '';
    }

    // Garantir que o menu comece fechado
    closeMenu();

    // Toggle do menu ao clicar no botão
    toggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isHidden = mobileMenu.classList.contains('hidden') || mobileMenu.style.display === 'none';
        if (isHidden) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    // Fechar menu ao clicar em um link
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const isHidden = mobileMenu.classList.contains('hidden') || mobileMenu.style.display === 'none';
            if (!isHidden) {
                closeMenu();
            }
        }
    });

    // Fechar menu ao clicar fora (se houver overlay)
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMenu();
        });
    }

    // Fechar menu ao redimensionar para desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth >= 1024) { // lg breakpoint
                closeMenu();
            }
        }, 100);
    });
});

