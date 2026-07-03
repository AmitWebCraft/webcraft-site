const templateNames = {
    corporate:  'Corporate Pro',
    restaurant: 'Food & Love',
    fashion:    'Elegant Dark',
    portfolio:  'Creative Portfolio',
    shop:       'Shop Modern',
    medical:    'Health & Care'
};

const params      = new URLSearchParams(window.location.search);
let   templateId  = params.get('template') || '';
const planParam   = params.get('plan') || 'basic';

// Show selected template name (from a shared link like ?template=corporate)
let tName = templateNames[templateId] || 'לא נבחרה עדיין';
if (templateId) {
    document.getElementById('selected-template-name').textContent = tName;
    document.getElementById('template-row').classList.remove('hidden');
}

// Set default plan
const defaultPlan = document.getElementById(`plan-${planParam}`);
if (defaultPlan) defaultPlan.checked = true;

// Called from a template gallery card's "בחר תבנית זו" button
function selectTemplate(id) {
    templateId = id;
    tName = templateNames[id] || 'לא נבחרה עדיין';
    document.getElementById('selected-template-name').textContent = tName;
    document.getElementById('template-row').classList.remove('hidden');
}

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

// Called from the success screen's "חזרה לאתר" button — resets the order form
// so it's ready again if the visitor scrolls back down to place another order
function resetOrderFlow() {
    document.getElementById('order-form').reset();
    document.getElementById('success-section').classList.add('hidden');
    document.getElementById('order-section').classList.remove('hidden');
    document.getElementById('template-row').classList.add('hidden');
    templateId = '';
    tName = 'לא נבחרה עדיין';
    updatePlanUI();
}
