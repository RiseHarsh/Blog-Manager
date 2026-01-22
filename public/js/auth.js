const loginToggle = document.getElementById('login-toggle');
const signupToggle = document.getElementById('signup-toggle');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

loginToggle.addEventListener('click', () => {
    loginForm.style.display = 'flex';
    signupForm.style.display = 'none';
    loginToggle.classList.add('active');
    signupToggle.classList.remove('active');
});

signupToggle.addEventListener('click', () => {
    signupForm.style.display = 'flex';
    loginForm.style.display = 'none';
    signupToggle.classList.add('active');
    loginToggle.classList.remove('active');
});

// Optional: simple client-side password match check
signupForm.addEventListener('submit', (e) => {
    const password = signupForm.password.value;
    const confirmPassword = signupForm.confirmPassword.value;
    if (password !== confirmPassword) {
        e.preventDefault();
        alert('Passwords do not match!');
    }
});
