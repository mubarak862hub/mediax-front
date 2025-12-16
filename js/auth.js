// MediaX - Authentication JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializePasswordToggle();
    initializeLoginForm();
    initializeRegisterForm();
});

// Password Toggle
function initializePasswordToggle() {
    const toggleBtns = document.querySelectorAll('.password-toggle');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            const eyeOpen = btn.querySelector('.eye-open');
            const eyeClosed = btn.querySelector('.eye-closed');

            if (input.type === 'password') {
                input.type = 'text';
                eyeOpen.style.display = 'none';
                eyeClosed.style.display = 'block';
            } else {
                input.type = 'password';
                eyeOpen.style.display = 'block';
                eyeClosed.style.display = 'none';
            }
        });
    });
}

// Login Form
function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember')?.checked;

    // Validation
    if (!validateEmail(email)) {
        showError('email', 'البريد الإلكتروني غير صحيح');
        return;
    }

    if (password.length < 6) {
        showError('password', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        return;
    }

    // Show loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.classList.add('loading');

    try {
        // Simulate API call
        await simulateApiCall(1500);

        // Store user data (in real app, use secure token)
        if (remember) {
            localStorage.setItem('userEmail', email);
        }

        // Show success
        if (window.MediaX) {
            window.MediaX.showNotification('تم تسجيل الدخول بنجاح!', 'success');
        }

        // Redirect to home
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);

    } catch (error) {
        console.error('Login error:', error);
        if (window.MediaX) {
            window.MediaX.showNotification('حدث خطأ أثناء تسجيل الدخول', 'error');
        }
    } finally {
        submitBtn.classList.remove('loading');
    }
}

// Register Form
function initializeRegisterForm() {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);

        // Real-time password strength
        const passwordInput = registerForm.querySelector('#password');
        if (passwordInput) {
            passwordInput.addEventListener('input', checkPasswordStrength);
        }

        // Confirm password match
        const confirmPasswordInput = registerForm.querySelector('#confirmPassword');
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', checkPasswordMatch);
        }
    }
}

async function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    const terms = document.getElementById('terms')?.checked;

    // Validation
    if (name.length < 3) {
        showError('name', 'الاسم يجب أن يكون 3 أحرف على الأقل');
        return;
    }

    if (!validateEmail(email)) {
        showError('email', 'البريد الإلكتروني غير صحيح');
        return;
    }

    if (password.length < 8) {
        showError('password', 'كلمة المرور يجب أن تكون 8 أحرف على الأقل');
        return;
    }

    if (password !== confirmPassword) {
        showError('confirmPassword', 'كلمات المرور غير متطابقة');
        return;
    }

    if (!terms) {
        if (window.MediaX) {
            window.MediaX.showNotification('يجب الموافقة على الشروط والأحكام', 'error');
        }
        return;
    }

    // Show loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.classList.add('loading');

    try {
        // Simulate API call
        await simulateApiCall(2000);

        // Show success
        if (window.MediaX) {
            window.MediaX.showNotification('تم إنشاء الحساب بنجاح!', 'success');
        }

        // Redirect to login
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);

    } catch (error) {
        console.error('Register error:', error);
        if (window.MediaX) {
            window.MediaX.showNotification('حدث خطأ أثناء إنشاء الحساب', 'error');
        }
    } finally {
        submitBtn.classList.remove('loading');
    }
}

// Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    // Add error class
    field.classList.add('error');

    // Remove existing error message
    const existingError = field.parentElement.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }

    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error active';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);

    // Remove error on input
    field.addEventListener('input', function removeError() {
        field.classList.remove('error');
        const error = field.parentElement.querySelector('.form-error');
        if (error) {
            error.remove();
        }
        field.removeEventListener('input', removeError);
    });
}

function checkPasswordStrength(e) {
    const password = e.target.value;
    const strengthIndicator = document.getElementById('passwordStrength');

    if (!strengthIndicator) return;

    let strength = 0;
    let strengthText = '';
    let strengthClass = '';

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    switch (strength) {
        case 0:
        case 1:
            strengthText = 'ضعيفة';
            strengthClass = 'weak';
            break;
        case 2:
            strengthText = 'متوسطة';
            strengthClass = 'medium';
            break;
        case 3:
            strengthText = 'جيدة';
            strengthClass = 'good';
            break;
        case 4:
            strengthText = 'قوية جداً';
            strengthClass = 'strong';
            break;
    }

    strengthIndicator.textContent = `قوة كلمة المرور: ${strengthText}`;
    strengthIndicator.className = `password-strength ${strengthClass}`;
}

function checkPasswordMatch(e) {
    const password = document.getElementById('password').value;
    const confirmPassword = e.target.value;
    const matchIndicator = e.target.parentElement.querySelector('.password-match');

    if (confirmPassword.length === 0) {
        if (matchIndicator) matchIndicator.remove();
        return;
    }

    if (!matchIndicator) {
        const indicator = document.createElement('div');
        indicator.className = 'password-match';
        e.target.parentElement.appendChild(indicator);
    }

    const indicator = e.target.parentElement.querySelector('.password-match');

    if (password === confirmPassword) {
        indicator.textContent = '✓ كلمات المرور متطابقة';
        indicator.style.color = '#10b981';
        e.target.classList.remove('error');
    } else {
        indicator.textContent = '✗ كلمات المرور غير متطابقة';
        indicator.style.color = '#ef4444';
    }
}

// Utility Functions
function simulateApiCall(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

// Social Login Handlers
document.addEventListener('click', (e) => {
    if (e.target.closest('.google-btn')) {
        handleSocialLogin('Google');
    } else if (e.target.closest('.facebook-btn')) {
        handleSocialLogin('Facebook');
    }
});

function handleSocialLogin(provider) {
    console.log(`Logging in with ${provider}`);
    if (window.MediaX) {
        window.MediaX.showNotification(`جاري تسجيل الدخول عبر ${provider}...`, 'info');
    }
    // TODO: Implement actual social login
}

console.log('Auth module initialized! 🔐');
