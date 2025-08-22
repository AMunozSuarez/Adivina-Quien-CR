class ClashRoyaleGame {
    constructor() {
        this.cards = [];
        this.filteredCards = [];
        this.selectedCards = [];
        this.filters = {
            elixir: [],
            type: [],
            rarity: [],
            evolution: []
        };
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadCards();
        this.renderCards();
        this.updateStats();
    }

    setupEventListeners() {
        // Filtros de elixir
        document.querySelectorAll('#elixir-filters .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => this.toggleFilter('elixir', parseInt(btn.dataset.elixir), btn));
        });

        // Filtros de tipo
        document.querySelectorAll('#type-filters .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => this.toggleFilter('type', btn.dataset.type, btn));
        });

        // Filtros de rareza
        document.querySelectorAll('#rarity-filters .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => this.toggleFilter('rarity', btn.dataset.rarity, btn));
        });

        // Filtros de evolución
        document.querySelectorAll('#evolution-filters .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => this.toggleFilter('evolution', btn.dataset.evolution === 'true', btn));
        });

        // Botones de acción
        document.getElementById('reset-filters').addEventListener('click', () => this.resetFilters());
    }

    async loadCards() {
        try {
            console.log('Iniciando carga de cartas...');
            // Usar el archivo JSON que estará en GitHub Pages
            const response = await fetch('./response_1755332394151.json');
            console.log('Respuesta del fetch:', response);

            if (!response.ok) {
                throw new Error(`Error al cargar las cartas: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Datos cargados:', data);
            console.log('Número de items:', data.items ? data.items.length : 'No hay items');
            
            if (!data.items || !Array.isArray(data.items)) {
                throw new Error('El archivo JSON no tiene la estructura esperada (data.items)');
            }

            this.cards = data.items.map(card => ({
                id: card.id,
                name: card.name,
                elixir: card.elixirCost,
                type: this.getCardType(card.id),
                rarity: this.capitalizeFirst(card.rarity),
                evolution: card.maxEvolutionLevel && card.maxEvolutionLevel > 0,
                key: card.name.toLowerCase().replace(/\s+/g, '-'),
                description: '',
                image: card.iconUrls.medium
            }));

            console.log('Cartas procesadas:', this.cards.length);
            this.filteredCards = [...this.cards];
            
        } catch (error) {
            console.error('Error cargando cartas:', error);
            // Mostrar mensaje de error si no se puede cargar el archivo
            this.showError(`Error: ${error.message}`);
        } finally {
            document.getElementById('loading').style.display = 'none';
        }
    }

    showError(message) {
        const container = document.getElementById('cards-container');
        container.innerHTML = `
            <div style="text-align: center; color: white; padding: 50px; grid-column: 1 / -1;">
                <h3>❌ Error</h3>
                <p>${message}</p>
                <p>Asegúrate de que el archivo <strong>response_1755332394151.json</strong> esté en el mismo directorio que index.html</p>
            </div>
        `;
    }

    toggleFilter(filterType, value, button) {
        const index = this.filters[filterType].indexOf(value);
        
        if (index > -1) {
            this.filters[filterType].splice(index, 1);
            button.classList.remove('active');
        } else {
            this.filters[filterType].push(value);
            button.classList.add('active');
        }
        
        this.applyFilters();
    }

    applyFilters() {
        this.filteredCards = this.cards.filter(card => {
            // Filtrar por elixir
            if (this.filters.elixir.length > 0 && !this.filters.elixir.includes(card.elixir)) {
                return false;
            }
            
            // Filtrar por tipo
            if (this.filters.type.length > 0 && !this.filters.type.includes(card.type)) {
                return false;
            }
            
            // Filtrar por rareza
            if (this.filters.rarity.length > 0 && !this.filters.rarity.includes(card.rarity)) {
                return false;
            }
            
            // Filtrar por evolución
            if (this.filters.evolution.length > 0) {
                const hasEvolution = card.evolution === true;
                const wantsEvolution = this.filters.evolution.includes(true);
                const wantsNoEvolution = this.filters.evolution.includes(false);
                
                // Si quiere evolución pero la carta no tiene, filtrar
                if (wantsEvolution && !hasEvolution) {
                    return false;
                }
                // Si quiere no evolución pero la carta tiene, filtrar
                if (wantsNoEvolution && hasEvolution) {
                    return false;
                }
            }
            
            return true;
        });
        
        this.renderCards();
        this.updateStats();
    }

    resetFilters() {
        // Limpiar filtros
        this.filters = {
            elixir: [],
            type: [],
            rarity: [],
            evolution: []
        };
        
        // Remover clases activas de botones
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Mostrar todas las cartas y resetear cartas volteadas
        this.filteredCards = [...this.cards];
        this.selectedCards = [];
        
        // Remover clases de cartas volteadas y seleccionadas
        document.querySelectorAll('.card.flipped, .card.selected').forEach(card => {
            card.classList.remove('flipped');
            card.classList.remove('selected');
        });
        
        this.renderCards();
        this.updateStats();
    }

    hideSelectedCards() {
        // Esta función ya no es necesaria ya que las cartas se voltean automáticamente
        // Pero la mantenemos por compatibilidad - ahora solo limpia la selección
        this.selectedCards.forEach(cardId => {
            const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
            if (cardElement) {
                cardElement.classList.remove('selected');
                // Las cartas ya están volteadas, no las desvolteamos aquí
            }
        });
        
        this.selectedCards = [];
        this.updateStats();
    }

    renderCards() {
        const container = document.getElementById('cards-container');
        container.innerHTML = '';
        
        this.filteredCards.forEach(card => {
            const cardElement = this.createCardElement(card);
            container.appendChild(cardElement);
        });
    }

    createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = `card rarity-${card.rarity.toLowerCase()}`;
        cardDiv.dataset.cardId = card.id;
        
        const isSelected = this.selectedCards.includes(card.id);
        if (isSelected) {
            cardDiv.classList.add('selected');
            cardDiv.classList.add('flipped');
        }
        
        cardDiv.innerHTML = `
            <div class="card-front">
                ${card.evolution ? '<div class="evolution-badge">EVO</div>' : ''}
                <div class="card-rarity rarity-${card.rarity.toLowerCase()}">${this.getRaritySymbol(card.rarity)}</div>
                <img src="${card.image}" alt="${card.name}" class="card-image" onerror="this.src='https://via.placeholder.com/200x120/cccccc/666666?text=${encodeURIComponent(card.name)}'">
                <div class="card-name">${card.name}</div>
                <div class="card-details">
                    <div class="card-elixir">
                        <img src="imagenes/elixir.png" alt="Elixir" class="elixir-icon">
                        <span class="elixir-number">${card.elixir}</span>
                    </div>
                    <span class="card-type">${this.getTypeName(card.type)}</span>
                </div>
            </div>
            <div class="card-back">
                <img src="imagenes/comodin.png" alt="Comodín" class="card-back-image">
                <div class="card-back-text">Carta Ocultada</div>
            </div>
        `;
        
        cardDiv.addEventListener('click', () => this.toggleCardSelection(card.id, cardDiv));
        
        return cardDiv;
    }

    toggleCardSelection(cardId, cardElement) {
        const index = this.selectedCards.indexOf(cardId);
        
        if (index > -1) {
            // Deseleccionar carta - desvoltear
            this.selectedCards.splice(index, 1);
            cardElement.classList.remove('selected');
            cardElement.classList.remove('flipped');
        } else {
            // Seleccionar carta - voltear
            this.selectedCards.push(cardId);
            cardElement.classList.add('selected');
            cardElement.classList.add('flipped');
        }
        
        this.updateStats();
    }

    getRaritySymbol(rarity) {
        const symbols = {
            'Common': 'COMÚN',
            'Rare': 'ESPECIAL',
            'Epic': 'ÉPICA',
            'Legendary': 'LEGENDARIA',
            'Champion': 'CAMPEÓN'
        };
        return symbols[rarity] || '?';
    }

    getTypeName(type) {
        const names = {
            'Troop': 'Tropa',
            'Building': 'Edificio',
            'Spell': 'Hechizo'
        };
        return names[type] || type;
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getCardType(id) {
        // Determinar tipo basado en el rango del ID
        if (id >= 26000000 && id < 27000000) return 'Troop';
        if (id >= 27000000 && id < 28000000) return 'Building';
        if (id >= 28000000 && id < 29000000) return 'Spell';
        return 'Troop'; // Por defecto
    }



    updateStats() {
        const totalCards = this.cards.length;
        const visibleCards = this.filteredCards.length;
        const hiddenCards = this.cards.filter(card => {
            const cardElement = document.querySelector(`[data-card-id="${card.id}"]`);
            return cardElement && cardElement.classList.contains('flipped');
        }).length;
        
        document.getElementById('total-cards').textContent = totalCards;
        document.getElementById('visible-cards').textContent = visibleCards;
        document.getElementById('hidden-cards').textContent = hiddenCards;
    }
}

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new ClashRoyaleGame();
});
