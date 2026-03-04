/*    1. TEMA CLARO / ESCURO  */

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function loadSavedTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}


/*  2. RELÓGIO DIGITAL */

let is24Hour = true;
let prevH = '', prevM = '', prevS = '';

/* Anima um dígito quando o seu valor muda */
function setDigit(id, val, prev) {
    const el = document.getElementById(id);
    if (!el) return;
    const span = el.querySelector('span');
    if (val !== prev) {
        span.textContent = val;
        el.classList.remove('flip');
        void el.offsetWidth; // força o browser a reiniciar a animação
        el.classList.add('flip');
    }
}

/* Atualiza todos os dígitos do relógio */
function updateClock() {
    const now = new Date();
    let h = now.getHours();
    if (!is24Hour) h = h % 12 || 12;

    const hs = String(h).padStart(2, '0');
    const ms = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    setDigit('d-h1', hs[0], prevH[0]);
    setDigit('d-h2', hs[1], prevH[1]);
    setDigit('d-m1', ms[0], prevM[0]);
    setDigit('d-m2', ms[1], prevM[1]);
    setDigit('d-s1', ss[0], prevS[0]);
    setDigit('d-s2', ss[1], prevS[1]);

    prevH = hs; prevM = ms; prevS = ss;
}

function startClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function loadClockFormat() {
    const saved = localStorage.getItem('clockFormat');
    if (saved) is24Hour = (saved === '24');
}

const formatToggle = document.getElementById('format-toggle');
if (formatToggle) {
    formatToggle.addEventListener('click', () => {
        is24Hour = !is24Hour;
        localStorage.setItem('clockFormat', is24Hour ? '24' : '12');
        updateClock();
    });
}


/*   3. CONTADOR DE VISITAS */

function getVisitCount() {
    return parseInt(localStorage.getItem('visitCount')) || 0;
}

function incrementVisitCount() {
    const count = getVisitCount() + 1;
    localStorage.setItem('visitCount', count);
    localStorage.setItem('lastVisit', new Date().toISOString());
    return count;
}

function formatLastVisit() {
    const iso = localStorage.getItem('lastVisit');
    if (!iso) return 'Primeira vez aqui! 🎉';

    const diff = new Date() - new Date(iso);
    const minutes = Math.floor(diff / 60000);
    const hours   = Math.floor(minutes / 60);
    const days    = Math.floor(hours / 24);

    if (minutes < 1)  return 'Há menos de 1 minuto';
    if (minutes < 60) return `Há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (hours < 24)   return `Há ${hours} hora${hours > 1 ? 's' : ''}`;
    return `Há ${days} dia${days > 1 ? 's' : ''}`;
}

function updateLastVisitDisplay() {
    const el = document.getElementById('last-visit');
    if (el) el.textContent = formatLastVisit();
}

/* Anima o número de 0 até ao valor real */
function animateCounter(target) {
    const el = document.getElementById('visit-count');
    if (!el) return;
    const steps    = 40;
    const interval = 1500 / steps; // dura 1.5 segundos no total
    let current    = 0;

    const timer = setInterval(() => {
        current += target / steps;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
        // Pequeno bounce em cada passo
        el.classList.remove('counting');
        void el.offsetWidth;
        el.classList.add('counting');
    }, interval);
}

function initVisitCounter() {
    incrementVisitCount();
    updateLastVisitDisplay();
    animateCounter(getVisitCount()); // conta animado em vez de mostrar direto
}

function resetVisitCounter() {
    if (!window.confirm('Tens a certeza que queres resetar o contador?')) return;
    localStorage.removeItem('visitCount');
    localStorage.removeItem('lastVisit');
    const el = document.getElementById('visit-count');
    if (el) el.textContent = '0';
    updateLastVisitDisplay();
    alert('Contador resetado com sucesso!');
}

const resetBtn = document.getElementById('reset-counter');
if (resetBtn) resetBtn.addEventListener('click', resetVisitCounter);


/*   4. BASE DE DADOS DOS PROJETOS  */

const projects = [
    {
        id: 1,
        title: 'Segurança no desenvolvimento de software',
        category: 'presentation',
        description: 'Apresentação',
        image: 'imagens/projeto1.JPG',
        tags: ['Tech', 'Web', 'Canva', 'Programação'],
        link: 'https://www.canva.com/design/DAGzJtRFPcA/wyoU4RmJ9JIx9N1qhVVfWQ/view?utm_content=DAGzJtRFPcA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5c14e1e449',
        longDescription: 'Apresentação de programação sobre segurança no desenvolvimento de softwares',
        features: ['Aprendizagem', 'Prática', 'Exemplos', 'Dicas de segurança'],
        technologies: ['Canva'],
        date: '2026-02'
    },
    {
        id: 2,
        title: 'Strings',
        category: 'presentation',
        description: 'Apresentação',
        image: 'imagens/projeto2.JPG',
        tags: ['Tech', 'Web', 'Canva', 'Programação'],
        link: 'https://www.canva.com/design/DAGfXyKpDtA/8RR2Hscn4TmDxuXOrW48Lw/view?utm_content=DAGfXyKpDtA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5320ba220e',
        longDescription: 'Apresentação de programação sobre strings',
        features: ['Aprendizagem', 'Prática', 'Exemplos', 'Dicas de manipulação de strings'],
        technologies: ['Canva', 'C'],
        date: '2025-03'
    },
    {
        id: 3,
        title: 'Explora o mundo',
        category: 'web',
        description: 'Site de viagens para explorar destinos',
        image: 'imagens/projeto3.JPG',
        tags: ['HTML', 'CSS', 'Design', 'TIC'],
        link: 'Site%20tic/Início.html',
        longDescription: 'Site de viagens para explorar destinos turísticos com design moderno.',
        features: ['Design responsivo', 'Animações suaves', 'Galeria de trabalhos', 'Formulário de contacto'],
        technologies: ['HTML', 'CSS'],
        date: '2024-12'
    },
    {
        id: 4,
        title: 'Projeto Arduíno',
        category: 'presentation',
        description: 'Apresentação',
        image: 'imagens/projeto4.JPG',
        tags: ['Tech', 'Web', 'Canva', 'Programação'],
        link: 'https://www.canva.com/design/DAGc3f3JU_A/A1R8CCnizkE-2Y1GNCtOZw/view?utm_content=DAGc3f3JU_A&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb52ba69eb7',
        longDescription: 'Apresentação sobre o projeto Arduíno.',
        features: ['Introdução ao Arduíno', 'Componentes principais', 'Circuitos básicos', 'Exemplos práticos'],
        technologies: ['Canva', 'Arduíno'],
        date: '2025-04'
    },
    {
        id: 5,
        title: 'Estruturas de Dados Dinâmicas',
        category: 'presentation',
        description: 'Apresentação de estruturas de dados dinâmicas, programação.',
        image: 'imagens/projeto5.JPG',
        tags: ['Tech', 'Web', 'Canva', 'Programação'],
        link: 'https://www.canva.com/design/DAGlxWmx4hk/971WHwdOPwlMMsqkid9i_Q/view?utm_content=DAGlxWmx4hk&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hf39bc9a6a9',
        longDescription: 'Apresentação de estruturas de dados dinâmicas, programação.',
        features: ['O que são', 'Tipos de estruturas', 'Exemplos de uso'],
        technologies: ['Canva', 'C'],
        date: '2024-12'
    },
    {
        id: 6,
        title: 'Catálogo',
        category: 'presentation',
        description: 'Catálogo sobre componentes dos computadores',
        image: 'imagens/projeto6.JPG',
        tags: ['Tech', 'Web', 'Canva', 'IC'],
        link: 'https://www.canva.com/design/DAGg8Nor2Oo/JepvAMnT1uy8wVDqIW30Kw/view?utm_content=DAGg8Nor2Oo&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he62843e512',
        longDescription: 'Catálogo sobre componentes dos computadores.',
        features: ['Imagens ilustrativas', 'Descrições técnicas', 'Organização por categorias'],
        technologies: ['Canva'],
        date: '2025-04'
    }
];

let currentCategory = 'all';


/*    5. RENDERIZAÇÃO DOS PROJETOS */

function renderProjects(projectsToRender) {
    const grid      = document.getElementById('projects-grid');
    const noResults = document.getElementById('no-results');

    grid.innerHTML = '';

    if (projectsToRender.length === 0) {
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    projectsToRender.forEach(p => grid.appendChild(createProjectCard(p)));
    updateCounters();
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.id = project.id;
    card.dataset.category = project.category;

    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="project-card-body">
            <span class="project-category">${project.category}</span>
            <h3>${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;

    return card;
}

/* Atualiza os contadores nos botões de filtro */
function updateCounters() {
    document.querySelector('[data-category="all"] .count').textContent          = projects.length;
    document.querySelector('[data-category="web"] .count').textContent          = projects.filter(p => p.category === 'web').length;
    document.querySelector('[data-category="mobile"] .count').textContent       = projects.filter(p => p.category === 'mobile').length;
    document.querySelector('[data-category="design"] .count').textContent       = projects.filter(p => p.category === 'design').length;
    document.querySelector('[data-category="presentation"] .count').textContent = projects.filter(p => p.category === 'presentation').length;
}


/*    6. FILTROS */

function filterProjects(category) {
    currentCategory = category;
    const filtered = category === 'all'
        ? projects
        : projects.filter(p => p.category === category);
    renderProjects(filtered);
}

function setupFilterListeners() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects(btn.dataset.category);
        });
    });
}


/*    7. PESQUISA  */

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function searchProjects(query) {
    const term = query.toLowerCase().trim();

    if (!term) {
        filterProjects(currentCategory);
        return;
    }

    const base = currentCategory === 'all'
        ? projects
        : projects.filter(p => p.category === currentCategory);

    const results = base.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags.some(t => t.toLowerCase().includes(term))
    );

    renderProjects(results);
}

const debouncedSearch = debounce(searchProjects, 300);

function setupSearchListener() {
    const input = document.getElementById('search-input');
    input.addEventListener('input', e => debouncedSearch(e.target.value));
    input.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            input.value = '';
            searchProjects('');
            input.blur();
        }
    });
}


/*    8. MODAL */

function openModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    document.getElementById('modal-body').innerHTML = `
        <span class="modal-category">${project.category}</span>
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" class="modal-image">
        <div class="modal-section">
            <h3>Sobre o Projeto</h3>
            <p>${project.longDescription}</p>
        </div>
        <div class="modal-section">
            <h3>Funcionalidades</h3>
            <ul>${project.features.map(f => `<li>${f}</li>`).join('')}</ul>
        </div>
        <div class="modal-section">
            <h3>Tecnologias Utilizadas</h3>
            <div class="modal-tech">
                ${project.technologies.map(t => `<span class="tech-badge">${t}</span>`).join('')}
            </div>
        </div>
        <a href="${project.link}" target="_blank" class="modal-link">Ver Projeto Completo →</a>
    `;

    document.getElementById('project-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('project-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function setupModalListeners() {
    // Abrir ao clicar num card
    document.getElementById('projects-grid').addEventListener('click', e => {
        const card = e.target.closest('.project-card');
        if (card) openModal(parseInt(card.dataset.id));
    });

    // Fechar com o botão X
    document.querySelector('.modal-close').addEventListener('click', closeModal);

    // Fechar ao clicar fora do modal
    document.getElementById('project-modal').addEventListener('click', e => {
        if (e.target === document.getElementById('project-modal')) closeModal();
    });

    // Fechar com tecla ESC
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    });
}


/*    9. FORMULÁRIO DOS CONTACTOS */

const validationRules = {
    name: {
        required: true, minLength: 3,
        pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
        errorMessages: {
            required: 'Por favor, introduz o teu nome',
            minLength: 'O nome deve ter pelo menos 3 caracteres',
            pattern: 'O nome só pode conter letras'
        }
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessages: {
            required: 'Por favor, introduz o teu email',
            pattern: 'Por favor, introduz um email válido'
        }
    },
    subject: {
        required: true,
        errorMessages: { required: 'Por favor, seleciona um assunto' }
    },
    message: {
        required: true, minLength: 10, maxLength: 500,
        errorMessages: {
            required: 'Por favor, escreve uma mensagem',
            minLength: 'A mensagem deve ter pelo menos 10 caracteres',
            maxLength: 'A mensagem não pode ter mais de 500 caracteres'
        }
    }
};

function validateField(fieldName, value) {
    const rules = validationRules[fieldName];
    if (rules.required && !value.trim())                          return { valid: false, message: rules.errorMessages.required };
    if (rules.minLength && value.trim().length < rules.minLength) return { valid: false, message: rules.errorMessages.minLength };
    if (rules.maxLength && value.trim().length > rules.maxLength) return { valid: false, message: rules.errorMessages.maxLength };
    if (rules.pattern && !rules.pattern.test(value))             return { valid: false, message: rules.errorMessages.pattern };
    return { valid: true, message: '' };
}

function showFieldFeedback(fieldName, isValid, message = '') {
    const group = document.getElementById(fieldName).closest('.form-group');
    const error = group.querySelector('.error-message');
    group.classList.remove('valid', 'invalid');
    group.classList.add(isValid ? 'valid' : 'invalid');
    error.textContent = isValid ? '' : message;
}

function validateForm() {
    const fields = ['name', 'email', 'subject', 'message'];
    let isValid = true;
    fields.forEach(f => {
        const result = validateField(f, document.getElementById(f).value);
        showFieldFeedback(f, result.valid, result.message);
        if (!result.valid) isValid = false;
    });
    return isValid;
}

function updateSubmitButton() {
    document.getElementById('submit-btn').disabled = !validateForm();
}

function setupFormValidation() {
    ['name', 'email', 'subject', 'message'].forEach(fieldName => {
        const field = document.getElementById(fieldName);
        field.addEventListener('blur', () => {
            const r = validateField(fieldName, field.value);
            showFieldFeedback(fieldName, r.valid, r.message);
            updateSubmitButton();
        });
        field.addEventListener('input', () => {
            if (field.closest('.form-group').classList.contains('invalid')) {
                const r = validateField(fieldName, field.value);
                showFieldFeedback(fieldName, r.valid, r.message);
                updateSubmitButton();
            }
        });
    });
}

function setupCharCounter() {
    const msg     = document.getElementById('message');
    const count   = document.getElementById('char-count');
    const counter = document.querySelector('.char-counter');

    msg.addEventListener('input', () => {
        const len = msg.value.length;
        count.textContent = len;
        counter.classList.remove('warning', 'error');
        if (len > 400 && len <= 500) counter.classList.add('warning');
        if (len > 500)               counter.classList.add('error');
    });
}

function setupFormSubmit() {
    const form      = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    form.addEventListener('submit', async e => {
        e.preventDefault();
        if (!validateForm()) {
            showToast('error', 'Erro!', 'Por favor, corrige os erros no formulário');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        try {
            await new Promise(res => setTimeout(res, 1500));
            saveMessage(new FormData(form));
            showToast('success', 'Mensagem Enviada!', 'Obrigado pelo contacto. Respondo em breve!');
            loadMessages();
            form.reset();
            document.querySelectorAll('.form-group').forEach(g => g.classList.remove('valid', 'invalid'));
            document.getElementById('char-count').textContent = '0';
        } catch {
            showToast('error', 'Erro ao Enviar', 'Ocorreu um erro. Tenta novamente.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });
}


/*   10. TOAST (notificações) */

function showToast(type, title, message, duration = 3000) {
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">${icons[type]}</div>
        <div class="toast-content">
            <strong>${title}</strong>
            <p>${message}</p>
        </div>
        <span class="toast-close">×</span>
    `;

    document.getElementById('toast-container').appendChild(toast);

    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.style.animation = 'fadeOut 0.4s ease forwards';
        setTimeout(() => toast.remove(), 400);
    });

    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'fadeOut 0.4s ease forwards';
            setTimeout(() => toast.remove(), 400);
        }
    }, duration);
}


/*    11. PAINEL ADMIN (mensagens recebidas) */

function saveMessage(formData) {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.unshift({
        id: Date.now(),
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        date: new Date().toISOString(),
        read: false
    });
    localStorage.setItem('contactMessages', JSON.stringify(messages));
}

function loadMessages() {
    const messages   = JSON.parse(localStorage.getItem('contactMessages')) || [];
    const list       = document.getElementById('messages-list');
    const noMessages = document.getElementById('no-messages');
    const total      = document.getElementById('total-messages');
    const badge      = document.getElementById('unread-badge');

    total.textContent = messages.length;

    const unread = messages.filter(m => !m.read).length;
    badge.textContent   = unread;
    badge.style.display = unread > 0 ? 'flex' : 'none';

    list.innerHTML = '';

    if (messages.length === 0) {
        noMessages.style.display = 'block';
        return;
    }

    noMessages.style.display = 'none';

    messages.forEach(msg => {
        const card = document.createElement('div');
        card.className = `message-card ${msg.read ? '' : 'unread'}`;
        card.dataset.id = msg.id;

        const date    = new Date(msg.date);
        const dateStr = date.toLocaleDateString('pt-PT') + ' ' +
            date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });

        card.innerHTML = `
            <div class="message-header">
                <div class="message-sender">
                    <h4>${msg.name}</h4>
                    <p>${msg.email}</p>
                </div>
                <div class="message-meta">${dateStr}</div>
            </div>
            <span class="message-subject">${msg.subject}</span>
            <div class="message-body">${msg.message}</div>
            <div class="message-actions">
                <button class="btn-delete" onclick="deleteMessage(${msg.id})">🗑️ Apagar</button>
            </div>
        `;

        list.appendChild(card);
    });
}

function deleteMessage(id) {
    if (!window.confirm('Tens a certeza que queres apagar esta mensagem?')) return;
    let msgs = JSON.parse(localStorage.getItem('contactMessages')) || [];
    msgs = msgs.filter(m => m.id !== id);
    localStorage.setItem('contactMessages', JSON.stringify(msgs));
    loadMessages();
    showToast('success', 'Mensagem Apagada!', 'A mensagem foi removida com sucesso.');
}

function clearAllMessages() {
    if (!window.confirm('Tens a certeza que queres apagar TODAS as mensagens?')) return;
    localStorage.removeItem('contactMessages');
    loadMessages();
    showToast('success', 'Mensagens Apagadas!', 'Todas as mensagens foram removidas.');
}

function setupAdminToggle() {
    const btn     = document.getElementById('toggle-admin');
    const section = document.getElementById('admin-messages');
    let visible   = false;

    btn.addEventListener('click', () => {
        visible = !visible;
        section.style.display = visible ? 'block' : 'none';
        if (visible) {
            loadMessages();
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

document.getElementById('clear-messages')?.addEventListener('click', clearAllMessages);


/*    12. ANIMAÇÃO DE SCROLL */

function animarScroll() {
    document.querySelectorAll('.scroll-anim').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('visivel');
        }
    });
}

window.addEventListener('scroll', animarScroll);
animarScroll();


/*    13. CURSOR PERSONALIZADO + MATRIX RAIN */

(function () {

    // ── CURSOR ──
    const cursor = document.getElementById('cursor');
    const ring   = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top  = my + 'px';
    });

    // Anel segue com suavidade
    (function animateRing() {
        rx += (mx - rx) * 0.13;
        ry += (my - ry) * 0.13;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(animateRing);
    })();

    // Cursor cresce ao passar em elementos interativos
    document.querySelectorAll('a, button, .project-card, .filter-btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width      = '18px';
            cursor.style.height     = '18px';
            cursor.style.background = '#33ccff';
            ring.style.width        = '52px';
            ring.style.height       = '52px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width      = '10px';
            cursor.style.height     = '10px';
            cursor.style.background = document.body.classList.contains('dark-mode') ? '#00aaff' : '#1a7abf';
            ring.style.width        = '34px';
            ring.style.height       = '34px';
        });
    });

    // Atualiza cor do cursor ao mudar de tema
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        setTimeout(() => {
            cursor.style.background = document.body.classList.contains('dark-mode') ? '#00aaff' : '#1a7abf';
        }, 50);
    });

    // ── MATRIX RAIN — só dentro do hero ──
    const canvas = document.getElementById('matrix-bg');
    const ctx    = canvas.getContext('2d');
    const hero   = canvas.parentElement;

    function resizeCanvas() {
        canvas.width  = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', () => { resizeCanvas(); initDrops(); });

    const fontSize = 13;
    const chars    = '01アイウエオカキクケコサシスセソ0123456789ABCDEF#!%&?';
    let drops = [];

    function initDrops() {
        drops = Array.from(
            { length: Math.floor(canvas.width / fontSize) },
            () => Math.random() * -40
        );
    }
    initDrops();

    function isDark() { return document.body.classList.contains('dark-mode'); }

    function drawMatrix() {
        ctx.fillStyle = isDark() ? 'rgba(8,50,80,0.06)' : 'rgba(26,80,120,0.06)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = fontSize + 'px "Courier New", monospace';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Cabeça da coluna mais brilhante
            ctx.fillStyle = drops[i] * fontSize < fontSize * 2
                ? 'rgba(255,255,255,0.98)'
                : 'rgba(255,255,255,0.65)';

            ctx.fillText(char, x, y);

            if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);

})();


/*    14. INICIALIZAÇÃO — executa quando a página está pronta */

document.addEventListener('DOMContentLoaded', () => {
    // Atualiza o ano no footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    loadSavedTheme();       // Carrega tema guardado
    loadClockFormat();      // Carrega formato do relógio
    startClock();           // Inicia o relógio
    initVisitCounter();     // Inicia o contador de visitas (com animação)

    renderProjects(projects); // Renderiza os projetos
    setupFilterListeners();   // Ativa os filtros
    setupModalListeners();    // Ativa o modal
    setupSearchListener();    // Ativa a pesquisa

    setupFormValidation();  // Ativa validação do formulário
    setupCharCounter();     // Ativa contador de caracteres
    setupFormSubmit();      // Ativa o envio do formulário

    setupAdminToggle();     // Ativa o painel admin
    loadMessages();         // Carrega contagem inicial de mensagens

    // ── BACK TO TOP ──
    const backBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backBtn.classList.toggle('visivel', window.scrollY > 300);
    });
    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});