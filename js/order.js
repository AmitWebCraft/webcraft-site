const templateNames = {
    corporate:  'Corporate Pro',
    restaurant: 'Food & Love',
    fashion:    'Elegant Dark',
    portfolio:  'Creative Portfolio',
    shop:       'Shop Modern',
    medical:    'Health & Care'
};

const params      = new URLSearchParams(window.location.search);
const templateId  = params.get('template') || '';
const planParam   = params.get('plan') || 'basic';

// Show selected template name
const tName = templateNames[templateId] || 'לא נבחרה עדיין';
document.getElementById('selected-template-name').textContent = tName;
if (!templateId) {
    document.getElementById('template-row').classList.add('hidden');
}

// Set default plan
const defaultPlan = document.getElementById(`plan-${planParam}`);
if (defaultPlan) defaultPlan.checked = true;

function updatePlanUI() {
    document.querySelectorAll('.plan-option').forEach(el => {
        const radio = el.querySelector('input[type="radio"]');
        el.classList.toggle('selected', radio.checked);
    });
    const isPro = document.getElementById('plan-pro').checked;
    // price note removed — pricing sent after contact
}

document.querySelectorAll('input[name="plan"]').forEach(r => r.addEventListener('change', updatePlanUI));
updatePlanUI();

function submitOrder() {
    const form  = document.getElementById('order-form');
    const name  = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const biz   = form.querySelector('[name="business"]').value.trim();

    if (!name || !email || !phone || !biz) {
        showError('אנא מלא את כל השדות המסומנים ב-*');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('כתובת האימייל אינה תקינה');
        return;
    }

    const plan = document.querySelector('input[name="plan"]:checked').value;

    const order = {
        id:           Date.now(),
        name, email, phone,
        business:     biz,
        field:        form.querySelector('[name="field"]').value,
        notes:        form.querySelector('[name="notes"]').value.trim(),
        template:     templateId || 'לא נבחר',
        templateName: tName,
        plan,
        status:       'pending',
        createdAt:    new Date().toISOString()
    };

    const orders = JSON.parse(localStorage.getItem('wc_orders') || '[]');
    orders.push(order);
    localStorage.setItem('wc_orders', JSON.stringify(orders));

    // TODO: כאן יש לחבר Stripe Payment Link
    // לעכשיו מציגים מסך תודה
    showSuccess(order);
}

function showError(msg) {
    const el = document.getElementById('form-error');
    el.textContent = msg;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 4000);
}

function showSuccess(order) {
    document.getElementById('order-section').classList.add('hidden');
    const success = document.getElementById('success-section');
    success.classList.remove('hidden');
    document.getElementById('success-name').textContent = order.name;
    document.getElementById('success-id').textContent   = '#' + String(order.id).slice(-6);
    document.getElementById('success-email').textContent = order.email;
}
