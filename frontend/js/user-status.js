document.addEventListener('DOMContentLoaded', () => {
    const userStatusContainer = document.getElementById('user-status-container');
    const token = localStorage.getItem('token');

    if (token && userStatusContainer) {
        try {
            // Decode JWT payload
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userName = payload.nome || 'Usuário'; // 'nome' is expected from the backend

            // Replace login/register buttons with user info and logout button
            userStatusContainer.innerHTML = `
                <span class="text-gray-900 dark:text-white font-medium">Olá, ${userName}</span>
                <button id="logout-button" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Sair</button>
            `;

            const logoutButton = document.getElementById('logout-button');
            if (logoutButton) {
                logoutButton.addEventListener('click', () => {
                    localStorage.removeItem('token');
                    window.location.href = 'index.html'; // Redirect to home page after logout
                });
            }
        } catch (e) {
            console.error('Failed to decode token or update UI:', e);
            // If token is invalid, clear it
            localStorage.removeItem('token');
            showLoginRegisterButtons(userStatusContainer);
        }
    } else if (userStatusContainer) {
        showLoginRegisterButtons(userStatusContainer);
    }
});

function showLoginRegisterButtons(container) {
    container.innerHTML = `
        <a href="acesso.html" class="text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 text-center dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800">Login</a>
        <a href="cadastro.html" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastro</a>
    `;
}
