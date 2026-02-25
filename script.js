/* =========================================================
   TEMA ESCURO / CLARO (Dark Mode)
   ========================================================= */

/* Alterna entre tema claro e escuro */
function toggleTheme() {
    document.body.classList.toggle('dark-mode');

    const isDark = document.body.classList.contains('dark-mode');

    // Guarda preferência no localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    console.log(`Tema alterado para: ${isDark ? 'escuro' : 'claro'}`);
}

/* Botão de alternar tema */
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

/* Carrega o tema guardado ao abrir a página */
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    console.log(`Tema carregado: ${savedTheme || 'padrão (light)'}`);
}



/* =========================================================
   RELÓGIO DIGITAL
   ========================================================= */

/* true = formato 24h | false = formato 12h */
let is24Hour = true;

/* Atualiza o relógio no ecrã */
function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Converte para 12h se necessário
    if (!is24Hour) {
        hours = hours % 12 || 12;
    }

    // Formatação com zero à esquerda
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    // Atualiza o DOM
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

/* Inicia o relógio */
function startClock() {
    updateClock(); // Atualiza imediatamente
    setInterval(updateClock, 1000); // Atualiza a cada segundo
    console.log('⏰ Relógio iniciado!');
}

/* Alterna entre formato 12h / 24h */
function toggleFormat() {
    is24Hour = !is24Hour;

    // Guarda preferência
    localStorage.setItem('clockFormat', is24Hour ? '24' : '12');

    updateClock(); // Atualiza imediatamente

    console.log(`Formato: ${is24Hour ? '24h' : '12h'}`);
}

/* Botão de alternar formato */
const formatToggle = document.getElementById('format-toggle');
if (formatToggle) {
    formatToggle.addEventListener('click', toggleFormat);
}

/* Carrega formato guardado */
function loadClockFormat() {
    const saved = localStorage.getItem('clockFormat');
    if (saved) {
        is24Hour = (saved === '24');
    }
}



/* =========================================================
   CONTADOR DE VISITAS
   ========================================================= */

/* Obtém número de visitas guardado */
function getVisitCount() {
    const count = localStorage.getItem('visitCount');
    return count ? parseInt(count) : 0;
}

/* Incrementa visitas e guarda data */
function incrementVisitCount() {
    let count = getVisitCount();
    count++;

    localStorage.setItem('visitCount', count);

    // Guarda data/hora da visita
    localStorage.setItem('lastVisit', new Date().toISOString());

    return count;
}

/* Atualiza número de visitas no ecrã */
function updateVisitDisplay() {
    const count = getVisitCount();
    const countElement = document.getElementById('visit-count');

    if (countElement) {
        countElement.textContent = count;
    }

    console.log(`📊 Visitas: ${count}`);
}

/* Formata a última visita em "há X minutos/horas/dias" */
function formatLastVisit() {
    const lastVisitISO = localStorage.getItem('lastVisit');

    if (!lastVisitISO) {
        return 'Primeira vez aqui! 🎉';
    }

    const lastVisit = new Date(lastVisitISO);
    const now = new Date();

    const diff = now - lastVisit;

    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Há menos de 1 minuto';
    if (minutes < 60) return `Há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `Há ${hours} hora${hours > 1 ? 's' : ''}`;
    return `Há ${days} dia${days > 1 ? 's' : ''}`;
}

/* Atualiza texto da última visita */
function updateLastVisitDisplay() {
    const lastVisitElement = document.getElementById('last-visit');

    if (lastVisitElement) {
        lastVisitElement.textContent = formatLastVisit();
    }
}



/* =========================================================
   INICIALIZAÇÃO GERAL (executa ao carregar a página)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();       // Carrega tema claro/escuro
    loadClockFormat();      // Carrega formato 12h/24h
    startClock();           // Inicia relógio
    incrementVisitCount();  // Incrementa visitas
    updateVisitDisplay();   // Atualiza número de visitas
    updateLastVisitDisplay(); // Atualiza última visita
});





/* =========================================================
   CONTADOR DE VISITAS — Inicialização e Reset
   ========================================================= */

/* Inicializa o contador ao carregar a página */
function initVisitCounter() {
    incrementVisitCount();      // Incrementa visitas
    updateVisitDisplay();       // Atualiza número de visitas
    updateLastVisitDisplay();   // Atualiza última visita

    console.log('📊 Contador de visitas inicializado!');
}

/* Executa quando a página carrega */
document.addEventListener('DOMContentLoaded', () => {
    initVisitCounter();
    // ... outras inicializações
});

/* Reset ao contador de visitas */
function resetVisitCounter() {
    const confirmReset = window.confirm('Tens a certeza que queres resetar o contador?');

    if (confirmReset) {
        // Apaga dados guardados
        localStorage.removeItem('visitCount');
        localStorage.removeItem('lastVisit');

        // Atualiza interface
        updateVisitDisplay();
        updateLastVisitDisplay();

        console.log('🔄 Contador resetado!');
        alert('Contador resetado com sucesso!');
    }
}

/* Botão de reset */
const resetBtn = document.getElementById('reset-counter');
if (resetBtn) {
    resetBtn.addEventListener('click', resetVisitCounter);
}



/* =========================================================
   BASE DE DADOS DOS PROJETOS
   ========================================================= */

const projects = [
    {
        id: 1,
        title: 'Segurança no desenvolvimento de software',
        category: 'presentation',
        description: 'Apresentação',
        image: 'imagens/projeto1.JPG',
        tags: ['Tech', 'Web', 'Canva', 'Programação'],
        link: 'hhttps://www.canva.com/design/DAGzJtRFPcA/wyoU4RmJ9JIx9N1qhVVfWQ/view?utm_content=DAGzJtRFPcA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5c14e1e449',
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

/* Categoria atualmente selecionada */
let currentCategory = 'all';



/* =========================================================
   RENDERIZAÇÃO DOS PROJETOS
   ========================================================= */

/* Renderiza os projetos no ecrã */
function renderProjects(projectsToRender) {
    const grid = document.getElementById('projects-grid');
    const noResults = document.getElementById('no-results');

    // Limpa a grelha
    grid.innerHTML = '';

    // Se não há projetos, mostra mensagem
    if (projectsToRender.length === 0) {
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    // Cria um card para cada projeto
    projectsToRender.forEach(project => {
        const card = createProjectCard(project);
        grid.appendChild(card);
    });

    // Atualiza contadores dos filtros
    updateCounters();
}

/* Cria o HTML de um card de projeto */
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.id = project.id;
    card.dataset.category = project.category;

    // HTML interno do card
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

/* =========================================================
   CONTADORES DOS FILTROS
   Atualiza os números que aparecem nos botões (ex: Web (3))
   ========================================================= */
function updateCounters() {
    const allCount = projects.length;
    const webCount = projects.filter(p => p.category === 'web').length;
    const mobileCount = projects.filter(p => p.category === 'mobile').length;
    const designCount = projects.filter(p => p.category === 'design').length;
    const presentationCount = projects.filter(p => p.category === 'presentation').length;

    // Atualiza os números nos botões
    document.querySelector('[data-category="all"] .count').textContent = allCount;
    document.querySelector('[data-category="web"] .count').textContent = webCount;
    document.querySelector('[data-category="mobile"] .count').textContent = mobileCount;
    document.querySelector('[data-category="design"] .count').textContent = designCount;
    document.querySelector('[data-category="presentation"] .count').textContent = presentationCount;
}

/* Renderiza projetos ao carregar a página */
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    console.log('✅ Projetos renderizados!');
});



/* =========================================================
   SISTEMA DE FILTROS
   ========================================================= */

/* Filtra os projetos por categoria */
function filterProjects(category) {
    currentCategory = category; // Guarda categoria atual

    let filteredProjects;

    // Se categoria for "all", mostra tudo
    if (category === 'all') {
        filteredProjects = projects;
    } else {
        filteredProjects = projects.filter(project => project.category === category);
    }

    // Re-renderiza com os projetos filtrados
    renderProjects(filteredProjects);

    console.log(`Filtro aplicado: ${category} (${filteredProjects.length} projetos)`);
}



/* =========================================================
   EVENT LISTENERS DOS BOTÕES DE FILTRO
   ========================================================= */
function setupFilterListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {

            // Remove "active" de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Adiciona "active" ao botão clicado
            button.classList.add('active');

            // Obtém categoria do botão
            const category = button.dataset.category;

            // Filtra projetos
            filterProjects(category);
        });
    });
}

/* Ativa filtros ao carregar página */
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    setupFilterListeners();
    console.log('✅ Filtros configurados!');
});



/* =========================================================
   SISTEMA DE MODAL (ABRIR / FECHAR)
   ========================================================= */

/* Abre modal com detalhes do projeto */
function openModal(projectId) {
    // Procura o projeto pelo ID
    const project = projects.find(p => p.id === projectId);

    if (!project) {
        console.error('Projeto não encontrado!');
        return;
    }

    // Preenche conteúdo do modal
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <span class="modal-category">${project.category}</span>
        <h2>${project.title}</h2>

        <img src="${project.image}" alt="${project.title}" class="modal-image">

        <div class="modal-section">
            <h3>Sobre o Projeto</h3>
            <p>${project.longDescription}</p>
        </div>

        <div class="modal-section">
            <h3>Funcionalidades</h3>
            <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-section">
            <h3>Tecnologias Utilizadas</h3>
            <div class="modal-tech">
                ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
        </div>

        <a href="${project.link}" target="_blank" class="modal-link">
            Ver Projeto Completo →
        </a>
    `;

    // Mostra modal
    const modal = document.getElementById('project-modal');
    modal.classList.add('active');

    // Impede scroll do body
    document.body.style.overflow = 'hidden';

    console.log(`Modal aberto: ${project.title}`);
}

/* Fecha modal */
function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');

    // Restaura scroll
    document.body.style.overflow = 'auto';

    console.log('Modal fechado');
}
/* =========================================================
   EVENT LISTENERS DO MODAL
   ========================================================= */

function setupModalListeners() {
    const grid = document.getElementById('projects-grid');

    /* Abrir modal ao clicar num card
       (Event Delegation — funciona mesmo com cards criados dinamicamente) */
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            const projectId = parseInt(card.dataset.id);
            openModal(projectId);
        }
    });

    /* Botão X para fechar modal */
    const closeBtn = document.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);

    /* Fechar modal ao clicar fora do conteúdo (overlay) */
    const modal = document.getElementById('project-modal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    /* Fechar modal com tecla ESC */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

/* Ativar modal ao carregar página */
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    setupFilterListeners();
    setupModalListeners();
    console.log('✅ Modal configurado!');
});



/* =========================================================
   SISTEMA DE PESQUISA
   ========================================================= */

/* Pesquisa projetos por título, descrição ou tags */
function searchProjects(query) {
    const searchTerm = query.toLowerCase().trim();

    // Se pesquisa vazia → mostrar projetos da categoria atual
    if (searchTerm === '') {
        filterProjects(currentCategory);
        return;
    }

    // Base da pesquisa depende do filtro ativo
    const baseProjects = currentCategory === 'all'
        ? projects
        : projects.filter(p => p.category === currentCategory);

    // Filtrar por título, descrição ou tags
    const results = baseProjects.filter(project => {
        const titleMatch = project.title.toLowerCase().includes(searchTerm);
        const descMatch = project.description.toLowerCase().includes(searchTerm);
        const tagsMatch = project.tags.some(tag =>
            tag.toLowerCase().includes(searchTerm)
        );

        return titleMatch || descMatch || tagsMatch;
    });

    // Renderizar resultados
    renderProjects(results);

    console.log(`Pesquisa: "${query}" - ${results.length} resultados`);
}



/* =========================================================
   EVENT LISTENER PARA PESQUISA (com debounce)
   ========================================================= */

/* Debounce — evita executar pesquisa a cada tecla, melhora performance */
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

/* Versão otimizada da pesquisa */
const debouncedSearch = debounce(searchProjects, 300);

/* Ativa listener da pesquisa */
function setupSearchListener() {
    const searchInput = document.getElementById('search-input');

    // Pesquisa com debounce
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        debouncedSearch(query);
    });

    // Limpar pesquisa com ESC
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchProjects('');
            searchInput.blur();
        }
    });
}

/* Ativar pesquisa ao carregar página */
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    setupFilterListeners();
    setupModalListeners();
    setupSearchListener();
    console.log('✅ Pesquisa configurada!');
});



/* =========================================================
   ANIMAÇÃO DE SCROLL (revela elementos ao aparecerem no ecrã)
   ========================================================= */

const elementos = document.querySelectorAll('.scroll-anim');

/* Verifica se elemento entrou na área visível */
function animarScroll() {
    elementos.forEach(el => {
        const topo = el.getBoundingClientRect().top;

        // Quando o topo do elemento está a menos de 100px do fundo da janela
        if (topo < window.innerHeight - 100) {
            el.classList.add('visivel');
        }
    });
}

/* Ativar animação no scroll */
window.addEventListener('scroll', animarScroll);

/* Executar uma vez ao carregar página */
animarScroll();