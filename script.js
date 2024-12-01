document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const box = document.querySelector('.box');
    const toggles = document.querySelectorAll('.toggle');

    // Alternar entre Login e Cadastro
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            box.classList.toggle('move');
            loginForm.classList.toggle('active');
            registerForm.classList.toggle('active');
        });
    });

    // Função de Login
    document.getElementById('login').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            alert('Login bem-sucedido!');
            window.location.href = '/dashboard.html'; // Redireciona ao dashboard
        } else {
            alert('Erro ao fazer login. Verifique suas credenciais.');
        }
    });

    // Função de Cadastro
    document.getElementById('register').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const response = await fetch('/api/users/register', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            box.classList.toggle('move');
            loginForm.classList.toggle('active');
            registerForm.classList.toggle('active');
        } else {
            alert('Erro ao realizar cadastro.');
        }
    });
});
