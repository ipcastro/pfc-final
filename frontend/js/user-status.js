document.addEventListener('DOMContentLoaded', () => {
    const userStatusContainer = document.getElementById('user-status-container');
    const userStatusContainerMobile = document.getElementById('user-status-container-mobile');
    const token = localStorage.getItem('token');

    if (token) {
        try {
            // Decode JWT payload
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userName = payload.nome || 'Usuário'; // 'nome' is expected from the backend

            // Desktop container
            if (userStatusContainer) {
                userStatusContainer.innerHTML = `
                    <span class="text-gray-900 dark:text-white font-medium">Olá, ${userName}</span>
                    <button id="logout-button" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Sair</button>
                `;
            }

            // Mobile container
            if (userStatusContainerMobile) {
                userStatusContainerMobile.innerHTML = `
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <span class="text-gray-900 dark:text-white font-medium text-base">Olá, ${userName}</span>
                        <button id="logout-button-mobile" class="w-full sm:w-auto text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Sair</button>
                    </div>
                `;
            }

            // Add event listeners for logout buttons
            const logoutButton = document.getElementById('logout-button');
            const logoutButtonMobile = document.getElementById('logout-button-mobile');
            
            const handleLogout = () => {
                localStorage.removeItem('token');
                window.location.href = 'index.html'; // Redirect to home page after logout
            };

            if (logoutButton) {
                logoutButton.addEventListener('click', handleLogout);
            }
            if (logoutButtonMobile) {
                logoutButtonMobile.addEventListener('click', handleLogout);
            }
        } catch (e) {
            console.error('Failed to decode token or update UI:', e);
            // If token is invalid, clear it
            localStorage.removeItem('token');
            if (userStatusContainer) {
                showLoginRegisterButtons(userStatusContainer);
            }
            if (userStatusContainerMobile) {
                showLoginRegisterButtons(userStatusContainerMobile);
            }
        }
    } else {
        // No token - show login/register buttons
        if (userStatusContainer) {
            showLoginRegisterButtons(userStatusContainer);
        }
        if (userStatusContainerMobile) {
            showLoginRegisterButtons(userStatusContainerMobile);
        }
    }
});

function showLoginRegisterButtons(container) {
    const isMobile = container.id === 'user-status-container-mobile';
    
    if (isMobile) {
        // Mobile layout - vertical stack
        container.innerHTML = `
            <div class="flex flex-col gap-2">
                <a href="acesso.html" class="w-full text-center text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800">Login</a>
                <a href="cadastro.html" class="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastro</a>
            </div>
        `;
    } else {
        // Desktop layout - horizontal
        container.innerHTML = `
            <a href="acesso.html" class="text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2 text-center dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800">Login</a>
            <a href="cadastro.html" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastro</a>
        `;
    }
}
