# 🎯 Adivina Quién - Clash Royale

Un juego interactivo de "Adivina Quién" basado en las cartas de Clash Royale. Filtra y oculta cartas para encontrar la carta correcta.

## 🚀 Características

- **Filtros múltiples**: Por elixir, tipo de carta, rareza, evolución
- **Selección automática**: Haz clic en las cartas para voltearlas automáticamente
- **Cartas volteadas**: Efecto visual de cartas ocultas con animación 3D
- **Estadísticas en tiempo real**: Ve cuántas cartas hay totales, visibles y ocultas
- **Diseño responsivo**: Funciona perfectamente en móviles y escritorio
- **Interfaz moderna**: Diseño atractivo con animaciones suaves
- **Datos reales**: Todas las cartas oficiales de Clash Royale

## 🎮 Cómo jugar

1. **Carga la página**: Abre el juego en tu navegador
2. **Usa los filtros**: Selecciona características como elixir, tipo, rareza, evolución
3. **Selecciona cartas**: Haz clic en las cartas para voltearlas automáticamente
4. **Encuentra la carta**: Continúa filtrando hasta encontrar la carta correcta
5. **Limpia selección**: Usa "Limpiar Selección" para resetear las cartas volteadas

## 🛠️ Instalación Local

1. Clona o descarga este repositorio
2. Abre `index.html` en tu navegador web
3. ¡Disfruta del juego!

## 📁 Estructura del proyecto

```
Adivina Quien CR/
├── index.html                    # Página principal
├── styles.css                    # Estilos CSS
├── script.js                     # Lógica del juego
├── response_1755332394151.json   # Datos de cartas de Clash Royale
└── README.md                     # Este archivo
```

## 🌐 GitHub Pages

Este proyecto está optimizado para funcionar en GitHub Pages. Para publicarlo:

1. Sube todos los archivos a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona la rama principal como fuente
4. El juego estará disponible en `https://tuusuario.github.io/turepositorio`

## 🎨 Personalización

### Colores
Puedes cambiar los colores editando las variables CSS en `styles.css`:

```css
/* Colores principales */
--primary-color: #667eea;
--secondary-color: #764ba2;
--accent-color: #ff6b6b;
```

### Tamaño de cartas
Ajusta el tamaño de las cartas modificando:

```css
.cards-container {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
```

## 📱 Compatibilidad

- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Móviles (iOS/Android)

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Puedes:

1. Reportar bugs
2. Sugerir nuevas características
3. Mejorar el diseño
4. Añadir más funcionalidades

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🎯 Próximas características

- [ ] Modo multijugador
- [ ] Más filtros (año de lanzamiento, velocidad de ataque)
- [ ] Modo oscuro
- [ ] Sonidos y efectos
- [ ] Guardar partidas
- [ ] Estadísticas de juego
- [ ] Modo desafío con tiempo límite

---

¡Disfruta jugando Adivina Quién con Clash Royale! 🎮

**Demo en vivo**: [Enlace a GitHub Pages cuando esté publicado]
