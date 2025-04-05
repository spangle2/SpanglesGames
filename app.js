document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and functionality when the DOM is fully loaded
    initCursorFollow();
    initGameLinks();
    applyCardAnimations();
    loadGameImages();
});

// Custom cursor follower
function initCursorFollow() {
    const cursor = document.querySelector('.cursor-follower');
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Make cursor larger when hovering over clickable elements
    document.querySelectorAll('a, .game-card, .play-button').forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
        });
        
        item.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0.7';
    });
}

// Initialize game card links
function initGameLinks() {
    // Sample game URLs - replace these with your actual game links
    const gameUrls = {
        game1: "https://example.com/game1",
        game2: "https://example.com/game2",
        game3: "https://example.com/game3"
    };
    
    // Set up click handlers for play buttons
    document.querySelectorAll('.play-button').forEach((button, index) => {
        const gameId = button.closest('.game-card').dataset.game;
        button.href = gameUrls[gameId];
    });

    // Parallax effect on game cards
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            this.style.transform = `translateY(-5px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });
}

// Apply staggered animations to cards
function applyCardAnimations() {
    const cards = document.querySelectorAll('.game-card');
    
    // Execute animations with delays when cards come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Reset the animation to ensure it runs each time
                entry.target.style.animation = 'none';
                entry.target.offsetHeight; // Trigger reflow
                entry.target.style.animation = `cardAppear 0.6s forwards ${0.2 * index}s`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

function loadGameImages() {
    // Define your game data with your ImgBB image URLs
    const gameData = [
        {
            id: 1,
            imageUrl: "https://i.ibb.co/n8mJtJw9/2025-04-04-20-45-42-Base64-Encoder-Decoder-Mozilla-Firefox.png",
            title: "Base64 Encoder/Decoder",
            description: "Convert text to and from Base64 encoding",
            gameUrl: "https://example.com/base64"
        },
        {
            id: 2,
            imageUrl: "https://i.ibb.co/chL4hnVX/2025-04-04-20-45-33-Interactive-Periodic-Table-Mozilla-Firefox.png",
            title: "Interactive Periodic Table",
            description: "Explore chemical elements and their properties",
            gameUrl: "https://example.com/periodic-table"
        },
        {
            id: 3,
            imageUrl: "https://i.ibb.co/JRj2c4wn/2025-04-04-20-45-10-Advanced-Calculator-Mozilla-Firefox.png",
            title: "Advanced Calculator",
            description: "Perform complex mathematical calculations",
            gameUrl: "https://example.com/calculator"
        }
    ];
    
    // Update each game card with its data
    gameData.forEach(game => {
        updateGameContent(
            game.id,
            game.imageUrl,
            game.gameUrl,
            game.title,
            game.description
        );
    });
}


// Function to update game links and images
function updateGameContent(gameNumber, imageUrl, gameUrl, title, description) {
    const gameCard = document.querySelector(`[data-game="game${gameNumber}"]`);
    if (!gameCard) return;
    
    // Update image
    const gameImage = gameCard.querySelector('.game-image');
    if (gameImage && imageUrl) {
        gameImage.src = imageUrl;
    }
    
    // Update link
    const playButton = gameCard.querySelector('.play-button');
    if (playButton && gameUrl) {
        playButton.href = gameUrl;
    }
    
    // Update title and description
    if (title) {
        const titleElement = gameCard.querySelector('h2');
        if (titleElement) titleElement.textContent = title;
    }
    
    if (description) {
        const descElement = gameCard.querySelector('p');
        if (descElement) descElement.textContent = description;
    }
}