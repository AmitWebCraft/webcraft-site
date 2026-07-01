// IMPORTANT: שנה את הסיסמה לפני העלאה לאוויר
const ADMIN_PASSWORD = 'webcraft2024';

let currentOrderId = null;

// Sample orders for demo
const sampleOrders = [
    {
        id: 1717000001,
        name: 'דוד לוי',
        email: 'david@levy.co.il',
        phone: '052-1234567',
        business: 'ליוי פלומבינג',
        field: 'שירותים מקצועיים',
        notes: 'צריך עמוד צור קשר עם טופס',
        template: 'corporate',
        templateName: 'Corporate Pro',
        plan: 'pro',
        status: 'pending',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    {
        id: 1717000002,
        name: 'רחל כהן',
        email: 'rachel@haganrest.co.il',
        phone: '054-9876543',
        business: 'מסעדת הגן',
        field: 'מסעדות ומזון',
        notes: 'גלריית תמונות מנות ותפריט',
        template: 'restaurant',
        templateName: 'Food & Love',
        plan: 'basic',
        status: 'in-progress',
        createdAt: new Date(Date.now() - 3600000 * 30).toISOString()
    },
    {
        id: 1717000003,
        name: 'משה אברהם',
        email: 'moshe@law.co.il',
        phone: '050-5555555',
        business: 'משרד עו"ד אברהם ושות\'',
        field: 'שירותים מקצועיים',
        notes: '',
        template: 'corporate',
        templateName: 'Corporate Pro',
        plan: 'pro',
        status: 'completed',
        createdAt: new Date(Date.now() - 3600000 * 120).toISOString()
    }
];

const STATUS = {
    pending:     { label: 'ממתין',  cls: 'bg-yellow-100 text-yellow-700' },
    'in-progress': { label: 'בעבודה', cls: 'bg-blue-100 text-blue-700' },
    completed:   { label: 'הושלם',  cls: 'bg-green-100 text-green-700' }
};

const PLAN_LABEL = { basic: 'אתר בלבד', pro: 'אתר + תמיכה' };

function getOrders() {
    const stored = JSON.parse(localStorage.getItem('wc_orders') || '[]');
    return [...sampleOrders, ...stored].sort((a, b) => b.id - a.id);
}

/* ---- Login ---- */
function login() {
    const pwd = document.getElementById('admin-password').value;
    if (pwd === ADMIN_PASSWORD) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        initDashboard();
    } else {
        document.getElementById('login-error').classList.remove('hidden');
        setTimeout(() => document.getElementById('login-error').classList.add('hidden'), 3000);
    }
}

document.getElementById('admin-password')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') login();
});

function logout() {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('admin-password').value = '';
}

/* ---- Dashboard ---- */
function initDashboard() {
    renderStats();
    renderOrders();
    showSection('orders');
}

function renderStats() {
    const orders = getOrders();
    const pending    = orders.filter(o => o.status === 'pending').length;
    const inProgress = orders.filter(o => o.status === 'in-progress').length;
    const completed  = orders.filter(o => o.status === 'completed').length;
    const revenue    = completed * 1850;

    document.getElementById('stat-total').textContent     = orders.length;
    document.getElementById('stat-pending').textContent   = pending;
    document.getElementById('stat-progress').textContent  = inProgress;
    document.getElementById('stat-revenue').textContent   = '₪' + revenue.toLocaleString('he-IL');
}

function renderOrders() {
    const filter = document.getElementById('status-filter').value;
    let orders   = getOrders();
    if (filter !== 'all') orders = orders.filter(o => o.status === filter);

    const tbody   = document.getElementById('orders-tbody');
    const noOrders = document.getElementById('no-orders');

    if (orders.length === 0) {
        tbody.innerHTML = '';
        noOrders.classList.remove('hidden');
        return;
    }
    noOrders.classList.add('hidden');

    tbody.innerHTML = orders.map(o => {
        const s    = STATUS[o.status] || STATUS.pending;
        const date = new Date(o.createdAt).toLocaleDateString('he-IL');
        const idShort = String(o.id).slice(-5);
        return `
        <tr class="border-b border-gray-100 hover:bg-gray-50 transition">
            <td class="px-5 py-4 text-gray-400 text-sm">#${idShort}</td>
            <td class="px-5 py-4">
                <div class="font-semibold text-gray-900">${o.name}</div>
                <div class="text-gray-400 text-xs">${o.email}</div>
            </td>
            <td class="px-5 py-4 text-gray-600">${o.business}</td>
            <td class="px-5 py-4 text-gray-400 text-sm">${o.templateName}</td>
            <td class="px-5 py-4">
                <span class="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                    ${PLAN_LABEL[o.plan] || o.plan}
                </span>
            </td>
            <td class="px-5 py-4 text-gray-400 text-sm">${date}</td>
            <td class="px-5 py-4">
                <span class="text-xs px-3 py-1 rounded-full font-semibold ${s.cls}">${s.label}</span>
            </td>
            <td class="px-5 py-4">
                <button onclick="openModal(${o.id})"
                        class="text-blue-600 hover:text-blue-800 text-sm font-semibold transition">
                    פרטים
                </button>
            </td>
        </tr>`;
    }).join('');
}

/* ---- Modal ---- */
function openModal(id) {
    currentOrderId = id;
    const order = getOrders().find(o => o.id === id);
    if (!order) return;

    const s = STATUS[order.status] || STATUS.pending;
    document.getElementById('modal-content').innerHTML = `
        <div class="space-y-4 text-sm">
            <div class="grid grid-cols-2 gap-4">
                <div><div class="text-gray-400 mb-0.5">שם</div><div class="font-semibold">${order.name}</div></div>
                <div><div class="text-gray-400 mb-0.5">טלפון</div><div class="font-semibold">${order.phone}</div></div>
                <div><div class="text-gray-400 mb-0.5">אימייל</div><div class="font-semibold">${order.email}</div></div>
                <div><div class="text-gray-400 mb-0.5">עסק</div><div class="font-semibold">${order.business}</div></div>
                <div><div class="text-gray-400 mb-0.5">תחום</div><div class="font-semibold">${order.field || '—'}</div></div>
                <div><div class="text-gray-400 mb-0.5">תבנית</div><div class="font-semibold">${order.templateName}</div></div>
                <div><div class="text-gray-400 mb-0.5">חבילה</div><div class="font-semibold">${PLAN_LABEL[order.plan] || order.plan}</div></div>
                <div><div class="text-gray-400 mb-0.5">סטטוס</div>
                    <span class="text-xs px-3 py-1 rounded-full font-semibold ${s.cls}">${s.label}</span>
                </div>
            </div>
            ${order.notes ? `<div class="bg-gray-50 rounded-xl p-3"><div class="text-gray-400 mb-1">הערות</div><div>${order.notes}</div></div>` : ''}
        </div>`;

    document.getElementById('order-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('order-modal').classList.add('hidden');
    currentOrderId = null;
}

document.getElementById('order-modal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('order-modal')) closeModal();
});

function updateStatus(newStatus) {
    if (!currentOrderId) return;

    const orders = JSON.parse(localStorage.getItem('wc_orders') || '[]');
    const idx    = orders.findIndex(o => o.id === currentOrderId);
    if (idx !== -1) {
        orders[idx].status = newStatus;
        localStorage.setItem('wc_orders', JSON.stringify(orders));
    }
    // Update sample too
    const si = sampleOrders.findIndex(o => o.id === currentOrderId);
    if (si !== -1) sampleOrders[si].status = newStatus;

    closeModal();
    renderOrders();
    renderStats();
}

/* ---- Navigation ---- */
function showSection(section) {
    ['orders', 'stats'].forEach(s => {
        document.getElementById(`section-${s}`)?.classList.toggle('hidden', s !== section);
    });
    document.querySelectorAll('.nav-link').forEach(el => {
        el.classList.toggle('active', el.dataset.section === section);
    });
}
