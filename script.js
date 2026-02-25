// ===== DARK MODE TOGGLE =====

// 1. Função para alternar tema
function toggleTheme() {
    // Adiciona/remove classe dark-mode do body
    document.body.classList.toggle('dark-mode');
    
    // Verifica se está em dark mode
    const isDark = document.body.classList.contains('dark-mode');
    
    // Guarda preferência no localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    console.log(`Tema alterado para: ${isDark ? 'escuro' : 'claro'}`);
}

// 2. Event listener no botão
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}



// 3. Carregar tema guardado ao iniciar
function loadSavedTheme() {
    // Buscar tema do localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Se tiver tema guardado como 'dark', ativa dark mode
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    console.log(`Tema carregado: ${savedTheme || 'padrão (light)'}`);
}

// 4. Executar quando página carrega
document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();
});





// ===== RELÓGIO DIGITAL =====

// Variável global para formato (true = 24h, false = 12h)
let is24Hour = true;

// 1. Função para atualizar o relógio
function updateClock() {
    // Obter hora atual
    const now = new Date();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    // Converter para 12h se necessário
    if (!is24Hour) {
        hours = hours % 12 || 12; // 0 vira 12
    }
    
    // Adicionar zero à esquerda se < 10
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    
    // Atualizar DOM
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}


// 2. Variável para guardar o intervalo
let clockInterval;

// 3. Função para iniciar o relógio
function startClock() {
    // Atualizar imediatamente
    updateClock();
    
    // Atualizar a cada 1000ms (1 segundo)
    clockInterval = setInterval(updateClock, 1000);
    
    console.log('⏰ Relógio iniciado!');
}

// 4. Iniciar quando página carrega
document.addEventListener('DOMContentLoaded', () => {
    startClock();
});




// 5. Função para alternar formato
function toggleFormat() {
    is24Hour = !is24Hour;
    
    // Guardar preferência
    localStorage.setItem('clockFormat', is24Hour ? '24' : '12');
    
    // Atualizar imediatamente
    updateClock();
    
    console.log(`Formato: ${is24Hour ? '24h' : '12h'}`);
}

// 6. Event listener no botão
const formatToggle = document.getElementById('format-toggle');
if (formatToggle) {
    formatToggle.addEventListener('click', toggleFormat);
}

// 7. Carregar formato guardado
function loadClockFormat() {
    const saved = localStorage.getItem('clockFormat');
    if (saved) {
        is24Hour = (saved === '24');
    }
}

// Adicionar ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    loadClockFormat();
    startClock();
});





// ===== CONTADOR DE VISITAS =====

// 1. Função para obter contagem atual
function getVisitCount() {
    // Buscar do localStorage (retorna string ou null)
    const count = localStorage.getItem('visitCount');
    
    // Converter para número (ou 0 se não existir)
    return count ? parseInt(count) : 0;
}

// 2. Função para incrementar visitas
function incrementVisitCount() {
    // Obter contagem atual
    let count = getVisitCount();
    
    // Incrementar
    count++;
    
    // Guardar nova contagem
    localStorage.setItem('visitCount', count);
    
    // Guardar timestamp da visita
    const now = new Date().toISOString();
    localStorage.setItem('lastVisit', now);
    
    return count;
}

// 3. Função para atualizar o display
function updateVisitDisplay() {
    const count = getVisitCount();
    
    // Atualizar número
    const countElement = document.getElementById('visit-count');
    if (countElement) {
        countElement.textContent = count;
    }
    
    console.log(`📊 Visitas: ${count}`);
}





// 4. Função para formatar data
function formatLastVisit() {
    const lastVisitISO = localStorage.getItem('lastVisit');
    
    if (!lastVisitISO) {
        return 'Primeira vez aqui! 🎉';
    }
    
    const lastVisit = new Date(lastVisitISO);
    const now = new Date();
    
    // Calcular diferença em milissegundos
    const diff = now - lastVisit;
    
    // Converter para minutos/horas/dias
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 1) return 'Há menos de 1 minuto';
    if (minutes < 60) return `Há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `Há ${hours} hora${hours > 1 ? 's' : ''}`;
    return `Há ${days} dia${days > 1 ? 's' : ''}`;
}

// 5. Atualizar display da última visita
function updateLastVisitDisplay() {
    const lastVisitText = formatLastVisit();
    
    const lastVisitElement = document.getElementById('last-visit');
    if (lastVisitElement) {
        lastVisitElement.textContent = lastVisitText;
    }
}





// 6. Função para inicializar o contador
function initVisitCounter() {
    // Incrementar visitas
    incrementVisitCount();
    
    // Atualizar displays
    updateVisitDisplay();
    updateLastVisitDisplay();
    
    console.log('📊 Contador de visitas inicializado!');
}

// 7. Executar quando página carrega
document.addEventListener('DOMContentLoaded', () => {
    initVisitCounter();
    // ... outras inicializações
});




// 8. Função para resetar contador
function resetVisitCounter() {
    // Confirmar com utilizador
    const confirm = window.confirm('Tens a certeza que queres resetar o contador?');
    
    if (confirm) {
        // Limpar localStorage
        localStorage.removeItem('visitCount');
        localStorage.removeItem('lastVisit');
        
        // Atualizar displays
        updateVisitDisplay();
        updateLastVisitDisplay();
        
        console.log('🔄 Contador resetado!');
        
        // Feedback visual
        alert('Contador resetado com sucesso!');
    }
}

// 9. Event listener no botão
const resetBtn = document.getElementById('reset-counter');
if (resetBtn) {
    resetBtn.addEventListener('click', resetVisitCounter);
}






// ===== DADOS DOS PROJETOS =====

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

// Variável global para controlar filtro atual
let currentCategory = 'all';










// ===== RENDERIZAR PROJETOS =====

function renderProjects(projectsToRender) {
    const grid = document.getElementById('projects-grid');
    const noResults = document.getElementById('no-results');
    
    // Limpar grid
    grid.innerHTML = '';
    
    // Se não há projetos, mostrar mensagem
    if (projectsToRender.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    // Criar card para cada projeto
    projectsToRender.forEach(project => {
        const card = createProjectCard(project);
        grid.appendChild(card);
    });
    
    // Atualizar contadores
    updateCounters();
}

// Criar HTML de um card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.id = project.id;
    card.dataset.category = project.category;
    card.classList.add("project-card");


    // Template string com HTML do card
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

// Atualizar números nos botões de filtro
function updateCounters() {
    const allCount = projects.length;
    const webCount = projects.filter(p => p.category === 'web').length;
    const mobileCount = projects.filter(p => p.category === 'mobile').length;
    const designCount = projects.filter(p => p.category === 'design').length;
    const presentationCount = projects.filter(p => p.category === 'presentation').length;

    document.querySelector('[data-category="all"] .count').textContent = allCount;
    document.querySelector('[data-category="web"] .count').textContent = webCount;
    document.querySelector('[data-category="mobile"] .count').textContent = mobileCount;
    document.querySelector('[data-category="design"] .count').textContent = designCount;
    document.querySelector('[data-category="presentation"] .count').textContent = presentationCount;
}

// Inicializar ao carregar página
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    console.log('✅ Projetos renderizados!');
});




// ===== SISTEMA DE FILTROS =====

function filterProjects(category) {
    // Guardar categoria atual
    currentCategory = category;
    
    let filteredProjects;
    
    if (category === 'all') {
        filteredProjects = projects;
    } else {
        filteredProjects = projects.filter(project => project.category === category);
    }
    
    // Re-renderizar com projetos filtrados
    renderProjects(filteredProjects);
    
    console.log(`Filtro aplicado: ${category} (${filteredProjects.length} projetos)`);
}








// ===== EVENT LISTENERS PARA FILTROS =====

function setupFilterListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover active de todos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar active ao clicado
            button.classList.add('active');
            
            // Obter categoria do data attribute
            const category = button.dataset.category;
            
            // Filtrar projetos
            filterProjects(category);
        });
    });
}

// Adicionar ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    setupFilterListeners();  // ADICIONAR ESTA LINHA
    console.log('✅ Filtros configurados!');
});







// ===== SISTEMA DE MODAL =====

function openModal(projectId) {
    // Encontrar projeto pelo ID
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
        console.error('Projeto não encontrado!');
        return;
    }
    
    // Preencher conteúdo do modal
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
    
    // Mostrar modal
    const modal = document.getElementById('project-modal');
    modal.classList.add('active');
    
    // Prevenir scroll do body
    document.body.style.overflow = 'hidden';
    
    console.log(`Modal aberto: ${project.title}`);
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    
    // Restaurar scroll
    document.body.style.overflow = 'auto';
    
    console.log('Modal fechado');
}









// ===== EVENT LISTENERS DO MODAL =====

function setupModalListeners() {
    // Event Delegation nos cards
    const grid = document.getElementById('projects-grid');
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            const projectId = parseInt(card.dataset.id);
            openModal(projectId);
        }
    });
    
    // Fechar modal ao clicar no X
    const closeBtn = document.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    // Fechar modal ao clicar fora (no overlay)
    const modal = document.getElementById('project-modal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Fechar modal com tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Adicionar ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    setupFilterListeners();
    setupModalListeners();  // ADICIONAR ESTA LINHA
    console.log('✅ Modal configurado!');
});









// ===== SISTEMA DE PESQUISA =====

function searchProjects(query) {
    // Converter query para lowercase
    const searchTerm = query.toLowerCase().trim();
    
    // Se pesquisa vazia, mostrar todos (respeitando filtro categoria)
    if (searchTerm === '') {
        filterProjects(currentCategory);
        return;
    }
    
    // Começar com projetos da categoria atual
    let baseProjects = currentCategory === 'all' 
        ? projects 
        : projects.filter(p => p.category === currentCategory);
    
    // Filtrar por termo de pesquisa
    const results = baseProjects.filter(project => {
        // Procurar em múltiplos campos
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








// ===== EVENT LISTENER PARA PESQUISA =====

function setupSearchListener() {
    const searchInput = document.getElementById('search-input');
    
    // Event 'input' dispara a cada tecla pressionada
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        searchProjects(query);
    });
    
    // Limpar pesquisa com Escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchProjects('');
            searchInput.blur();
        }
    });
}

// Adicionar ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    setupFilterListeners();
    setupModalListeners();
    setupSearchListener();  // ADICIONAR ESTA LINHA
    console.log('✅ Pesquisa configurada!');
});



// ===== DEBOUNCE PARA PESQUISA =====

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Criar versão debounced da pesquisa
const debouncedSearch = debounce(searchProjects, 300);

function setupSearchListener() {
    const searchInput = document.getElementById('search-input');
    
    // Usar versão debounced
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        debouncedSearch(query);
    });
    
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchProjects('');
            searchInput.blur();
        }
    });
}






const elementos = document.querySelectorAll('.scroll-anim');

function animarScroll() {
  elementos.forEach(el => {
    const topo = el.getBoundingClientRect().top;
    if (topo < window.innerHeight - 100) {
      el.classList.add('visivel');
    }
  });
}

window.addEventListener('scroll', animarScroll);
animarScroll();

