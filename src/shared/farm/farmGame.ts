/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-const */
/**
 * GLOBAL FLAGS
 */
export const SHOW_SETTINGS_UI = true; // Set to false to hide the menu completely

/**
 * CONFIGURATION & STATE
 */
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const promptEl = document.getElementById('interaction-prompt')!;
const modalOverlay = document.getElementById('modal-overlay')!;
const modalBody = document.getElementById('modal-body')!;
const closeBtn = document.getElementById('close-btn')!;

// Settings Elements
let settingsPanel: HTMLElement | null, seasonBtn: HTMLElement | null, editorToggleBtn: HTMLElement | null, debugToggleBtn: HTMLElement | null, editorTools: HTMLElement | null, panelHeader: HTMLElement | null, toggleIcon: HTMLElement | null;

const SETTINGS_HTML = `
<div id="settings-panel">
    <div class="panel-header" id="panel-header">
        <span>⚙️ MENU</span>
        <span id="toggle-icon">▼</span>
    </div>
    <div class="panel-body">
        <div class="control-group">
            <span class="control-label">Current Season</span>
            <button class="pixel-btn" id="season-btn">SPRING</button>
        </div>
        <div class="control-group">
            <span class="control-label">Map Editor</span>
            <button class="pixel-btn" id="editor-toggle-btn">Enable Editing</button>
            <div id="editor-tools">
                <button class="tool-btn active" onclick="setTool('tree')">🌲</button>
                <button class="tool-btn" onclick="setTool('rock')">🪨</button>
                <button class="tool-btn" onclick="setTool('flower')">🌸</button>
                <button class="tool-btn" onclick="setTool('plant')">🌿</button>
                <button class="tool-btn" onclick="setTool('cow')">🐄</button>
                <button class="tool-btn" onclick="setTool('chicken')">🐔</button>
                <button class="tool-btn" onclick="setTool('horse')">🐎</button>
                <button class="tool-btn" onclick="setTool('sheep')">🐏</button>
                <button class="tool-btn" onclick="setTool('erase')">❌</button>
            </div>
        </div>
        <div class="control-group">
            <button class="pixel-btn" onclick="exportMap()" style="font-size: 8px;">💾 Copy Map JSON</button>
        </div>
        <div class="control-group">
            <span class="control-label">Debug</span>
            <button class="pixel-btn" id="debug-toggle-btn">Show Coords</button>
        </div>
    </div>
</div>`;

(window as any).openSesame = function() {
    if (document.getElementById('settings-panel')) return;

    const uiLayer = document.getElementById('ui-layer')!;
    const prompt = document.getElementById('interaction-prompt');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = SETTINGS_HTML;
    uiLayer.insertBefore(tempDiv.firstElementChild!, prompt);

    settingsPanel = document.getElementById('settings-panel');
    seasonBtn = document.getElementById('season-btn');
    editorToggleBtn = document.getElementById('editor-toggle-btn');
    debugToggleBtn = document.getElementById('debug-toggle-btn');
    editorTools = document.getElementById('editor-tools');
    panelHeader = document.getElementById('panel-header');
    toggleIcon = document.getElementById('toggle-icon');

    initSettingsListeners();

    if(seasonBtn) seasonBtn.innerText = SEASONS[gameState.season.current];
    console.log("Developer Mode Enabled");
};

// Game constants
export const TILE_SIZE = 48; // Base unit size
const PLAYER_SPEED = 4;
const PLAYER_SIZE = 32;
const SEASON_DURATION = 60000; // 60 seconds per season
const SEASONS = ['Spring', 'Summer', 'Fall', 'Winter'];

// World Limits (Playable Area - The Island)
const WORLD_LIMITS = { minX: -800, maxX: 800, minY: -600, maxY: 600 };

// Animal Constants
const ANIMAL_SPEED = 0.5;
export const ANIMAL_MOVE_CHANCE = 0.02; // Chance to start moving per frame

const ANIMAL_COLORS: any = {
    cow: { body: '#e3dac9', spots: '#5d4037', snout: '#f8bbd0' }, // Holstein-ish
    chicken: { body: '#ffffff', comb: '#c0392b', beak: '#f1c40f' }, // White chicken
    horse: { body: '#a1887f', mane: '#5d4037', snout: '#d7ccc8' }, // Brown horse
    sheep: { body: '#ecf0f1', head: '#34495e', legs: '#34495e' } // Fluffy sheep
};

const SEASON_PALETTES: any = {
    'Spring': {
        grass: '#76c758',
        grassDark: '#66b04a',
        dirt: '#8b5e3c',
        wood: '#a05a2c',
        woodDark: '#6d3d1e',
        roof: '#c0392b',
        water: '#3498db',
        treeLight: '#2ecc71',
        treeDark: '#27ae60',
        flowerStem: '#27ae60',
        flowerPetal: '#e74c3c',
        cropLeaf: '#2ecc71',
        cropFruit: ['#e74c3c', '#f1c40f', '#9b59b6']
    },
    'Summer': {
        grass: '#53c738', // Brighter green
        grassDark: '#41a02a',
        dirt: '#8b5e3c',
        wood: '#a05a2c',
        woodDark: '#6d3d1e',
        roof: '#c0392b',
        water: '#3498db',
        treeLight: '#2ecc71',
        treeDark: '#27ae60',
        flowerStem: '#27ae60',
        flowerPetal: '#f39c12',
        cropLeaf: '#27ae60',
        cropFruit: ['#c0392b', '#e67e22', '#f39c12']
    },
    'Fall': {
        grass: '#d68910', // Orange/Brown
        grassDark: '#b9770e',
        dirt: '#6e4c30',
        wood: '#a05a2c',
        woodDark: '#6d3d1e',
        roof: '#922b21',
        water: '#2e86c1',
        treeLight: '#e67e22', // Orange leaves
        treeDark: '#d35400',
        flowerStem: '#8b5e3c', // Drying
        flowerPetal: '#8e44ad',
        cropLeaf: '#d35400',
        cropFruit: ['#e67e22', '#8e44ad', '#c0392b']
    },
    'Winter': {
        grass: '#ecf0f1', // Snow
        grassDark: '#bdc3c7',
        dirt: '#95a5a6',
        wood: '#7f8c8d', // Frozen wood
        woodDark: '#555',
        roof: '#2c3e50',
        water: '#aed6f1', // Icy water
        treeLight: '#dfe6e9', // Snow covered
        treeDark: '#b2babb',
        flowerStem: '#95a5a6',
        flowerPetal: '#3498db',
        cropLeaf: '#bdc3c7',
        cropFruit: ['#ecf0f1', '#95a5a6', '#7f8c8d'] // Frozen
    }
};

// Current Colors (will be updated dynamically)
let COLORS = {...SEASON_PALETTES['Spring']};

// Game State
let gameState: any = {
    player: { x: 0, y: 0, w: PLAYER_SIZE, h: PLAYER_SIZE, dir: 'down', frame: 0, isMoving: false },
    keys: { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false, " ": false, Enter: false } as any,
    camera: { x: 0, y: 0 },
    interactionTarget: null,
    isModalOpen: false,
    lastTime: 0,
    season: {
        current: 0, // Index in SEASONS
        timer: 0
    },
    animals: [], // Array to store animal instances
    editor: {
        active: false,
        tool: 'tree',
        mouseX: 0,
        mouseY: 0
    },
    debug: {
        showCoords: false
    }
};

// Content Data (Zones) - Re-organized Layout
const ZONES: any[] = [
    {
        id: 'house',
        x: -80, y: -300, w: 160, h: 140, // Moved up
        type: 'building',
        label: 'My House',
        interactDist: 60,
        collisionBox: { x: 10, y: 40, w: 140, h: 90 },
        door: { x: 70, y: 130 },
        content: `
            <h2>About Me</h2>
            <p>Hi! I'm <strong>Louis</strong>, I'm a full-stack web developer with a strong focus on web technologies.</p>
            <h3>Skills</h3>
            <ul>
                <li>JavaScript, TypeScript (React, Node.js, Angular, Backbone, ...)</li>
                <li>Ruby on Rails</li>
                <li>HTML, CSS</li>
                <li>Database Design (SQL, NoSQL)</li>
                <li>Cloud platform (AWS)</li>
            </ul>
        `
    },
    {
        id: 'field1', // Renamed from garden
        x: 100, y: 0, w: 150, h: 150, // Resized to match 30px grid (150/30 = 5)
        type: 'garden',
        label: 'Projects Field',
        interactDist: 80,
        collisionBox: { x: 0, y: 0, w: 150, h: 150 },
        door: { x: 75, y: 150 },
        content: `
            <h2>Projects Field</h2>
            <p>Here is what I've been growing lately:</p>

            <h3>
                <a href="https://github.com/Snap-Mind/snap-mind" target="_blank" style="color: #d35400; text-decoration: none;">🧠 SnapMind</a>
            </h3>
            <p>A cross-platform desktop AI assistant that lets you translate, rewrite, summarize, and brainstorm with just a hotkey.</p>

            <h3>🧬 Cytobank</h3>
            <p>A cloud-based Flow Cytometry data analysis platform.</p>

            <h3>🔁 Aldon Lifecycle Management</h3>
            <p>A Software Life Management tool on IBM i.</p>

            <h3>🧑‍💻 Zowe Code Editor</h3>
            <p>A plug-in of Zowe running on IBM mainframe.</p>
        `
    },
    {
        id: 'board',
        x: -250, y: -210, w: 80, h: 60, // Moved near house
        type: 'sign',
        label: 'Blog Board',
        interactDist: 50,
        collisionBox: { x: 10, y: 10, w: 60, h: 50 },
        door: { x: 40, y: 65 },
        content: `
            <h2>Community Board (Blog)</h2>

            <h3>📅 Fetching</h3>
            <p>Loading my blogs...</p>
        `
    },
    {
        id: 'mailbox',
        x: 130, y: -210, w: 30, h: 50, // Moved right next to house door
        type: 'mailbox',
        label: 'Resume/Contact',
        interactDist: 40,
        collisionBox: { x: 0, y: 0, w: 30, h: 50 },
        door: { x: 15, y: 55 },
        content: `
            <h2>Contact Me</h2>
            <p><strong>Email:</strong> louisgh.cn@gmail.com</p>
            <hr>
            <h3>Social Medias</h3>
            <p><strong>GitHub:</strong> github.com/louis-7</p>
            <p><strong>Dev.to:</strong> dev.to/louis7</p>
            <p><strong>LinkedIn:</strong> www.linkedin.com/in/louis360</p>
        `
    }
];

// Data Arrays
let SCENERY: any[] = [];
let ANIMALS: any[] = [];
let BOUNDARY_OBJECTS: any[] = [];

// Helper to create an animal
function createAnimal(type: string, x: number, y: number) {
    ANIMALS.push({
        x: x, y: y,
        type: type,
        dir: 'down',
        facing: type === 'chicken' ? 'right' : 'left',
        frame: 0,
        isMoving: false,
        moveTimer: Math.random() * 2000 // Random start delay
    });
}

// Initialize the new map layout
function initScenery() {
    SCENERY = [];
    ANIMALS = [];
    BOUNDARY_OBJECTS = [];

    // 1. Place boundaries (Fences)
    // REMOVED OUTER FENCES PER REQUEST (User: "I don't want fence around my island")

    // Pasture Fence (Right side of the map)
    // const pastureRect = { x: 150, y: -200, w: 400, h: 500 };
    // const spacing = 40;
    // for(let x = pastureRect.x; x <= pastureRect.x + pastureRect.w; x += spacing) {
    //     if(x > pastureRect.x + 100 && x < pastureRect.x + 180 && y === pastureRect.y + pastureRect.h) continue; // Leave a gate
    //     BOUNDARY_OBJECTS.push({x: x, y: pastureRect.y, type: 'fence'});
    //     BOUNDARY_OBJECTS.push({x: x, y: pastureRect.y + pastureRect.h, type: 'fence'});
    // }
    // for(let y = pastureRect.y; y <= pastureRect.y + pastureRect.h; y += spacing) {
    //     BOUNDARY_OBJECTS.push({x: pastureRect.x, y: y, type: 'fence'});
    //     BOUNDARY_OBJECTS.push({x: pastureRect.x + pastureRect.w, y: y, type: 'fence'});
    // }

    // 2. Place Initial Animals (Randomly but avoiding zones)
    const animalsToSpawn = ['cow', 'cow', 'chicken', 'chicken', 'chicken', 'horse', 'sheep', 'sheep'];

    animalsToSpawn.forEach(type => {
        let placed = false;
        let attempts = 0;
        while(!placed && attempts < 50) {
            // Try to place somewhat near the center/right (pasture area) first, then global
            let x, y;
            if (attempts < 20) {
                // Pasture-ish area
                x = 150 + Math.random() * 400;
                y = -200 + Math.random() * 400;
            } else {
                // Anywhere
                x = Math.random() * (WORLD_LIMITS.maxX - WORLD_LIMITS.minX) + WORLD_LIMITS.minX;
                y = Math.random() * (WORLD_LIMITS.maxY - WORLD_LIMITS.minY) + WORLD_LIMITS.minY;
            }

            // Check collision with zones
            let hitZone = false;
            const buffer = 40; // Space around zones

            for(const zone of ZONES) {
                if (x > zone.x - buffer && x < zone.x + zone.w + buffer &&
                    y > zone.y - buffer && y < zone.y + zone.h + buffer) {
                    hitZone = true;
                    break;
                }
            }

            if (!hitZone) {
                createAnimal(type, x, y);
                placed = true;
            }
            attempts++;
        }
    });

    // 3. Place Scenery (Trees, rocks)
    // Fill outer areas
    for(let i=0; i<100; i++) {
        const x = Math.random() * (WORLD_LIMITS.maxX - WORLD_LIMITS.minX) + WORLD_LIMITS.minX;
        const y = Math.random() * (WORLD_LIMITS.maxY - WORLD_LIMITS.minY) + WORLD_LIMITS.minY;

        // Avoid placing inside the main farm area (specific zones)
        // Dynamic check against all ZONES
        let hitZone = false;
        const buffer = 30; // Space around zones

        for(const zone of ZONES) {
            // Check if point is inside zone + buffer
            // Note: zone.x/y is top-left of the zone area (including collision box offset usually handled in draw/collision logic,
            // but here ZONES define the main area. Let's use the zone's main rect defined by x,y,w,h)
            if (x > zone.x - buffer && x < zone.x + zone.w + buffer &&
                y > zone.y - buffer && y < zone.y + zone.h + buffer) {
                hitZone = true;
                break;
            }
        }

        // Also avoid the pasture area where animals are initially placed
        // Since pasture is not a zone, we keep a rough check for it, or we can check if it's near initial animals?
        // For now, let's keep the pasture check as it was requested to be "main farm area" logic dynamic.
        // If the user considers pasture part of "main farm area", they should probably add it to ZONES.
        // However, to be safe and not regress on "animals in pasture", I will keep a check for the area where we spawn animals.
        // Animals are at: (250,0), (400,100), (200,-100)... roughly x[180, 450], y[-120, 200]
        // The previous hardcoded pasture check was: x > 130 && x < 570 && y > -220 && y < 320
        // I will keep this one hardcoded check as "Pasture" is not in ZONES, but I'll comment it clearly.
        if (x > 130 && x < 570 && y > -220 && y < 320) hitZone = true;

        if (hitZone) continue;

        SCENERY.push({
            x: x,
            y: y,
            type: Math.random() > 0.7 ? 'rock' : 'tree'
        });
    }
    // Place some specific nice-looking ones
    SCENERY.push({x: -150, y: -250, type: 'tree'}); // Near house
    SCENERY.push({x: 80, y: -250, type: 'tree'});  // Near house
    SCENERY.push({x: -400, y: -200, type: 'rock'}); // Near top field
}

/**
 * SEASON LOGIC
 */
function nextSeason() {
    gameState.season.current = (gameState.season.current + 1) % SEASONS.length;
    gameState.season.timer = 0; // Reset timer for full duration
    applySeason();
}

function applySeason() {
    const newSeason = SEASONS[gameState.season.current];
    COLORS = {...SEASON_PALETTES[newSeason]};
    if(seasonBtn) seasonBtn.innerText = newSeason; // Update button text
    console.log("Season changed to " + newSeason);
}

function initSettingsListeners() {
    if(seasonBtn) seasonBtn.addEventListener('click', nextSeason);

    // Toggle Panel Minimize
    panelHeader!.addEventListener('click', () => {
        settingsPanel!.classList.toggle('minimized');
        toggleIcon!.innerText = settingsPanel!.classList.contains('minimized') ? '▶' : '▼';
    });

    // Toggle Edit Mode
    editorToggleBtn!.addEventListener('click', () => {
        gameState.editor.active = !gameState.editor.active;

        if(gameState.editor.active) {
            editorToggleBtn!.innerText = "Disable Editing";
            editorToggleBtn!.classList.add('active');
            editorTools!.style.display = 'grid';
        } else {
            editorToggleBtn!.innerText = "Enable Editing";
            editorToggleBtn!.classList.remove('active');
            editorTools!.style.display = 'none';
        }
    });

    // Toggle Debug Mode
    debugToggleBtn!.addEventListener('click', () => {
        gameState.debug.showCoords = !gameState.debug.showCoords;
        debugToggleBtn!.classList.toggle('active');
        debugToggleBtn!.innerText = gameState.debug.showCoords ? "Hide Coords" : "Show Coords";
    });
}

(window as any).setTool = function(tool: string) {
    gameState.editor.tool = tool;
    // Update UI
    document.querySelectorAll('#editor-tools .tool-btn').forEach(btn => {
        // Crude check for active class based on onclick attr
        if(btn.outerHTML.includes(tool)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
};

(window as any).exportMap = function() {
    // Export both Scenery and Animals
    const data = JSON.stringify({ scenery: SCENERY, animals: ANIMALS });
    // Copy to clipboard
    navigator.clipboard.writeText(data).then(() => {
        alert('Map data copied to clipboard! You can save this JSON.');
    });
    console.log(data);
};

// Mouse listeners for editor
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    gameState.editor.mouseX = e.clientX - rect.left;
    gameState.editor.mouseY = e.clientY - rect.top;
});

canvas.addEventListener('mousedown', (e) => {
    if (!gameState.editor.active) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const worldX = Math.round(clickX + gameState.camera.x);
    const worldY = Math.round(clickY + gameState.camera.y);
    const clickThreshold = 30;

    if (gameState.editor.tool === 'erase') {
        // Find closest object in SCENERY
        let idx = SCENERY.findIndex(s => Math.hypot(s.x - worldX, s.y - worldY) < clickThreshold);
        if (idx !== -1) {
            SCENERY.splice(idx, 1);
        } else {
            // If not found, check ANIMALS
            idx = ANIMALS.findIndex(a => Math.hypot(a.x - worldX, a.y - worldY) < clickThreshold);
            if (idx !== -1) {
                ANIMALS.splice(idx, 1);
            }
        }
    } else if (['cow', 'chicken', 'horse', 'sheep'].includes(gameState.editor.tool)) {
        // Add animal
        createAnimal(gameState.editor.tool, worldX, worldY);
    } else {
        // Add scenery (tree, rock, flower, plant)
        SCENERY.push({
            x: worldX,
            y: worldY,
            type: gameState.editor.tool
        });
    }
});


/**
 * INPUT HANDLING
 */
window.addEventListener('keydown', (e) => {
    if(gameState.keys.hasOwnProperty(e.key) || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
        gameState.keys[e.key] = true;
    }

    // Close modal with ESC or Space key
    if((e.key === 'Escape' || e.key === ' ') && gameState.isModalOpen) {
        closeModal();
        return;
    }

    // Interaction triggers
    if((e.key === ' ' || e.key === 'Enter') && !gameState.isModalOpen && gameState.interactionTarget) {
        openModal(gameState.interactionTarget.content);
    }
});

window.addEventListener('keyup', (e) => {
    if(gameState.keys.hasOwnProperty(e.key) || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
        gameState.keys[e.key] = false;
    }
});

// Touch Controls
const joystick = document.getElementById('joystick')!;
const joystickKnob = document.getElementById('joystick-knob')!;
const btnAction = document.getElementById('btn-action')!;
const btnClose = document.getElementById('btn-close')!;
const mobileControls = document.getElementById('mobile-controls')!;

// Detect touch device roughly
if('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    mobileControls.style.display = 'block';
    promptEl.innerText = "Tap 'A' to Interact";
}

// Virtual Joystick Logic
let joystickActive = false;
let joystickCenter = { x: 0, y: 0 };
const joystickMaxDistance = 35; // Max distance knob can move from center

function updateJoystickPosition(touchX: number, touchY: number) {
    const rect = joystick.getBoundingClientRect();
    joystickCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };

    let deltaX = touchX - joystickCenter.x;
    let deltaY = touchY - joystickCenter.y;

    // Calculate distance from center
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Clamp to max distance
    if (distance > joystickMaxDistance) {
        deltaX = (deltaX / distance) * joystickMaxDistance;
        deltaY = (deltaY / distance) * joystickMaxDistance;
    }

    // Update knob position
    joystickKnob.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`;

    // Reset all direction keys
    gameState.keys['ArrowUp'] = false;
    gameState.keys['ArrowDown'] = false;
    gameState.keys['ArrowLeft'] = false;
    gameState.keys['ArrowRight'] = false;

    // Set direction keys based on joystick position (with dead zone)
    const deadZone = 15;
    if (distance > deadZone) {
        if (deltaY < -deadZone * 0.5) gameState.keys['ArrowUp'] = true;
        if (deltaY > deadZone * 0.5) gameState.keys['ArrowDown'] = true;
        if (deltaX < -deadZone * 0.5) gameState.keys['ArrowLeft'] = true;
        if (deltaX > deadZone * 0.5) gameState.keys['ArrowRight'] = true;
    }
}

function resetJoystick() {
    joystickActive = false;
    joystickKnob.style.transform = 'translate(-50%, -50%)';
    gameState.keys['ArrowUp'] = false;
    gameState.keys['ArrowDown'] = false;
    gameState.keys['ArrowLeft'] = false;
    gameState.keys['ArrowRight'] = false;
}

joystick.addEventListener('touchstart', (e) => {
    e.preventDefault();
    joystickActive = true;
    const touch = e.touches[0];
    updateJoystickPosition(touch.clientX, touch.clientY);
});

joystick.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (joystickActive) {
        const touch = e.touches[0];
        updateJoystickPosition(touch.clientX, touch.clientY);
    }
});

joystick.addEventListener('touchend', (e) => {
    e.preventDefault();
    resetJoystick();
});

joystick.addEventListener('touchcancel', (e) => {
    e.preventDefault();
    resetJoystick();
});

btnAction.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if(!gameState.isModalOpen && gameState.interactionTarget) {
        openModal(gameState.interactionTarget.content);
    }
});

btnClose.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if(gameState.isModalOpen) {
        closeModal();
    }
});

/**
 * GAME LOGIC
 */
async function fetchBlogs() {
    const boardZone = ZONES.find(z => z.id === 'board');
    if(!boardZone) return;

    // Show loading state
    boardZone.content = `<h2>Community Board (Blog)</h2><p>Loading articles...</p>`;

    try {
        const response = await fetch('https://dev.to/api/articles?username=louis7');
        const data = await response.json();

        let html = `<h2>Community Board (Blog)</h2>`;

        data.forEach((blog: any) => {
            const date = new Date(blog.published_at).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
            });

            html += `
                <div class="blog-item" style="margin-bottom: 20px; border-bottom: 1px dashed #8b4513; padding-bottom: 10px;">
                    <h3 style="margin-bottom: 8px; font-size: 14px;">
                        <a href="${blog.url}" target="_blank" style="color: #d35400; text-decoration: none;">${blog.title}</a>
                    </h3>
                    <p style="font-size: 10px; color: #555; margin: 0;">
                        ⏳ ${blog.reading_time_minutes} min · 📅 ${date} · ❤️ ${blog.public_reactions_count}
                    </p>
                </div>
            `;
        });

        boardZone.content = html;

    } catch (err) {
        console.error(err);
        boardZone.content = `
            <h2>Community Board (Blog)</h2>
            <p>Failed to load blogs.</p>
            <p>Check out <a href="https://dev.to/louis7" target="_blank">dev.to/louis7</a></p>
        `;
    }
}

async function init() {
    resize();
    window.addEventListener('resize', resize);

    initScenery();

    // Wait for resources (Font, Blogs) with a timeout
    // We want to show the loading screen for at least 2s (minLoadTime)
    // But we don't want to wait forever, so we cap resource waiting at 5s (maxLoadTime)
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 2000));
    const maxLoadTime = new Promise(resolve => setTimeout(resolve, 5000));

    const fontLoad = document.fonts.ready.catch(e => console.warn('Font load warning:', e));
    const blogLoad = fetchBlogs().catch(e => console.warn('Blog load warning:', e));

    const resourcesLoaded = Promise.all([fontLoad, blogLoad]);

    // Wait for (resources loaded OR timeout) AND min time
    await Promise.all([
        minLoadTime,
        Promise.race([resourcesLoaded, maxLoadTime])
    ]);

    // Start player in front of the new house location
    gameState.player.x = 0;
    gameState.player.y = -150;

    // Hide loading screen
    const loader = document.getElementById('loading-screen')!;
    loader.classList.add('fade-out');

    // Start loop
    requestAnimationFrame(loop);

    // Cleanup loader
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.imageSmoothingEnabled = false; // Keep pixel art crisp
}

function update(deltaTime: number) {
    if (gameState.isModalOpen) return;

    // -- SEASON LOGIC --
    gameState.season.timer += deltaTime;
    if (gameState.season.timer >= SEASON_DURATION) {
        nextSeason();
    }

    // -- ANIMAL LOGIC --
    ANIMALS.forEach(animal => {
        // Update timer
        animal.moveTimer -= deltaTime;

        if (animal.isMoving) {
            if (animal.moveTimer <= 0) {
                // Stop moving, start idling
                animal.isMoving = false;
                animal.frame = 0;
                // Pause for 1-3 seconds
                animal.moveTimer = 1000 + Math.random() * 2000;
            } else {
                // Move
                let dx = 0, dy = 0;
                if (animal.dir === 'up') dy = -ANIMAL_SPEED;
                if (animal.dir === 'down') dy = ANIMAL_SPEED;
                if (animal.dir === 'left') { dx = -ANIMAL_SPEED; animal.facing = 'left'; }
                if (animal.dir === 'right') { dx = ANIMAL_SPEED; animal.facing = 'right'; }

                let newX = animal.x + dx;
                let newY = animal.y + dy;

                // Simple boundary check (keep them roughly in the world)
                // A real system would check against fences specifically
                if (newX < WORLD_LIMITS.minX + 20 || newX > WORLD_LIMITS.maxX - 20) newX = animal.x;
                if (newY < WORLD_LIMITS.minY + 20 || newY > WORLD_LIMITS.maxY - 20) newY = animal.y;

                // Check collision with zones
                // Animal "feet" box approx 20x10 centered at bottom
                if (checkZoneCollision({ x: newX - 10, y: newY - 5, w: 20, h: 10 })) {
                    newX = animal.x;
                    newY = animal.y;
                    // Pick new random direction on collision
                    const dirs = ['up', 'down', 'left', 'right'];
                    animal.dir = dirs[Math.floor(Math.random() * dirs.length)];
                }

                animal.x = newX;
                animal.y = newY;

                // Animate
                animal.frame = (animal.frame + deltaTime * 0.01) % 2; // Simple 2-frame animation
            }
        } else {
            // Idle state
            if (animal.moveTimer <= 0) {
                // Start moving
                animal.isMoving = true;
                // Move for 2-5 seconds
                animal.moveTimer = 2000 + Math.random() * 3000;
                const dirs = ['up', 'down', 'left', 'right'];
                animal.dir = dirs[Math.floor(Math.random() * dirs.length)];
            }
        }
    });
    // ------------------

    const p = gameState.player;
    let dx = 0;
    let dy = 0;

    if (gameState.keys.w || gameState.keys.ArrowUp) dy = -PLAYER_SPEED;
    if (gameState.keys.s || gameState.keys.ArrowDown) dy = PLAYER_SPEED;
    if (gameState.keys.a || gameState.keys.ArrowLeft) dx = -PLAYER_SPEED;
    if (gameState.keys.d || gameState.keys.ArrowRight) dx = PLAYER_SPEED;

    // Normalize diagonal movement
    if (dx !== 0 && dy !== 0) {
        dx *= 0.707;
        dy *= 0.707;
    }

    if (dx !== 0 || dy !== 0) {
        p.isMoving = true;

        // Determine direction
        if (Math.abs(dx) > Math.abs(dy)) {
            p.dir = dx > 0 ? 'right' : 'left';
        } else {
            p.dir = dy > 0 ? 'down' : 'up';
        }

        // Check collision with objects
        let newX = p.x + dx;
        let newY = p.y + dy;

        // World Boundary Constraints (The Island)
        // Stop if player tries to walk off the island rect
        if (newX < WORLD_LIMITS.minX) newX = p.x;
        if (newX > WORLD_LIMITS.maxX - p.w) newX = p.x;
        if (newY < WORLD_LIMITS.minY) newY = p.y;
        if (newY > WORLD_LIMITS.maxY - p.h) newY = p.y;

        if (!checkCollision(newX, p.y)) p.x = newX;
        if (!checkCollision(p.x, newY)) p.y = newY;

    } else {
        p.isMoving = false;
    }

    // Check interaction
    checkInteraction();

    // Update Camera
    gameState.camera.x = p.x - canvas.width / 2 + p.w / 2;
    gameState.camera.y = p.y - canvas.height / 2 + p.h / 2;
}

function checkZoneCollision(box: any) {
    for (let zone of ZONES) {
        const zBox = zone.collisionBox;
        const zoneX = zone.x + zBox.x;
        const zoneY = zone.y + zBox.y;

        if (box.x < zoneX + zBox.w &&
            box.x + box.w > zoneX &&
            box.y < zoneY + zBox.h &&
            box.y + box.h > zoneY) {
            return true;
        }
    }
    return false;
}

function checkCollision(x: number, y: number) {
    const pBox = { x: x, y: y + PLAYER_SIZE/2, w: PLAYER_SIZE, h: PLAYER_SIZE/2 }; // Collision at feet
    return checkZoneCollision(pBox);
}

function checkInteraction() {
    const p = gameState.player;
    const pCenter = { x: p.x + p.w/2, y: p.y + p.h/2 };

    let closest = null;
    let minDst = Infinity;

    for (let zone of ZONES) {
        const door = { x: zone.x + zone.door.x, y: zone.y + zone.door.y };
        const dist = Math.hypot(pCenter.x - door.x, pCenter.y - door.y);

        if (dist < zone.interactDist && dist < minDst) {
            minDst = dist;
            closest = zone;
        }
    }

    gameState.interactionTarget = closest;

    if (closest) {
        promptEl.style.display = 'block';
    } else {
        promptEl.style.display = 'none';
    }
}

function openModal(content: string) {
    gameState.isModalOpen = true;
    modalBody.innerHTML = content;
    modalOverlay.style.display = 'flex';
    // Reset keys so player doesn't keep walking
    Object.keys(gameState.keys).forEach(k => gameState.keys[k] = false);
}

function closeModal() {
    gameState.isModalOpen = false;
    modalOverlay.style.display = 'none';
}

closeBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

/**
 * RENDERING
 */
function draw() {
    // Clear Screen
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    // Apply Camera
    ctx.translate(-gameState.camera.x, -gameState.camera.y);

    // Draw Ground
    drawGround();

    // Sort entities by Y for depth sorting (pseudo-3D)
    const entities = [
        ...SCENERY.map(s => ({...s, drawType: 'scenery', z: s.y})),
        ...BOUNDARY_OBJECTS.map(b => ({...b, drawType: 'fence', z: b.y + 10})),
        ...ZONES.map(z => ({...z, drawType: 'zone', z: z.y + z.collisionBox.h + z.collisionBox.y})),
        ...ANIMALS.map(a => ({...a, drawType: 'animal', z: a.y + 2})), // Add animals
        { drawType: 'player', z: gameState.player.y + gameState.player.h }
    ];

    entities.sort((a, b) => a.z - b.z);

    entities.forEach(e => {
        if(e.drawType === 'scenery') drawScenery(e);
        if(e.drawType === 'fence') drawFence(e);
        if(e.drawType === 'zone') drawZone(e);
        if(e.drawType === 'animal') drawAnimal(e);
        if(e.drawType === 'player') drawPlayer();
    });

    // Draw Interaction Marker
    if(gameState.interactionTarget) {
        const t = gameState.interactionTarget;
        const x = t.x + t.door.x;
        const y = t.y + t.door.y - 30;

        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        // Bobbing arrow
        const offset = Math.sin(Date.now() / 200) * 5;

        ctx.beginPath();
        ctx.moveTo(x - 10, y + offset);
        ctx.lineTo(x + 10, y + offset);
        ctx.lineTo(x, y + 10 + offset);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    // Draw Editor Ghost
    if(gameState.editor.active && gameState.editor.tool !== 'erase') {
        const worldX = gameState.editor.mouseX + gameState.camera.x;
        const worldY = gameState.editor.mouseY + gameState.camera.y;

        ctx.globalAlpha = 0.5; // Ghost effect

        if (['cow', 'chicken', 'horse', 'sheep'].includes(gameState.editor.tool)) {
            drawAnimal({x: worldX, y: worldY, type: gameState.editor.tool, isMoving: false, frame: 0});
        } else {
            drawScenery({x: worldX, y: worldY, type: gameState.editor.tool});
        }

        ctx.globalAlpha = 1.0;

        // Cursor circle
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(worldX, worldY, 20, 0, Math.PI*2);
        ctx.stroke();
    } else if (gameState.editor.active && gameState.editor.tool === 'erase') {
        const worldX = gameState.editor.mouseX + gameState.camera.x;
        const worldY = gameState.editor.mouseY + gameState.camera.y;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(worldX, worldY, 15, 0, Math.PI*2);
        ctx.moveTo(worldX - 10, worldY - 10);
        ctx.lineTo(worldX + 10, worldY + 10);
        ctx.moveTo(worldX + 10, worldY - 10);
        ctx.lineTo(worldX - 10, worldY + 10);
        ctx.stroke();
    }

    // Draw Coordinate System
    if (gameState.debug.showCoords) {
        drawCoordinates();
    }

    ctx.restore();
}

function drawCoordinates() {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = '10px monospace';

    // Draw Axes
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)'; // X Axis Red
    ctx.beginPath();
    ctx.moveTo(WORLD_LIMITS.minX, 0);
    ctx.lineTo(WORLD_LIMITS.maxX, 0);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)'; // Y Axis Blue
    ctx.beginPath();
    ctx.moveTo(0, WORLD_LIMITS.minY);
    ctx.lineTo(0, WORLD_LIMITS.maxY);
    ctx.stroke();

    // Draw Grid/Ticks every 100 units
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // X Axis Ticks
    for (let x = Math.ceil(WORLD_LIMITS.minX / 100) * 100; x <= WORLD_LIMITS.maxX; x += 100) {
        if (x === 0) continue;
        ctx.beginPath();
        ctx.moveTo(x, -5);
        ctx.lineTo(x, 5);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.stroke();
        ctx.fillText(x.toString(), x, 8);
    }

    // Y Axis Ticks
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    for (let y = Math.ceil(WORLD_LIMITS.minY / 100) * 100; y <= WORLD_LIMITS.maxY; y += 100) {
        if (y === 0) continue;
        ctx.beginPath();
        ctx.moveTo(-5, y);
        ctx.lineTo(5, y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.stroke();
        ctx.fillText(y.toString(), 8, y);
    }

    // Origin Label
    ctx.fillStyle = 'yellow';
    ctx.fillText("(0,0)", 5, 5);

    ctx.restore();
}

function drawGround() {
    // 1. Draw Water (Screen wide, based on camera view)
    ctx.fillStyle = COLORS.water;
    ctx.fillRect(gameState.camera.x, gameState.camera.y, canvas.width, canvas.height);

    // 2. Water Animation (Simple sparkles/waves)
    const time = Date.now();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';

    // Draw random-ish waves based on world coordinates visible in camera
    const startX = Math.floor(gameState.camera.x / 50) * 50;
    const startY = Math.floor(gameState.camera.y / 50) * 50;
    const w = canvas.width + 100;
    const h = canvas.height + 100;

    for(let x = startX; x < startX + w; x += 50) {
        for(let y = startY; y < startY + h; y += 50) {
            // Create deterministic "randomness" for position offset
            const offsetX = Math.sin(x * 99 + time / 1000) * 20;
            const offsetY = Math.cos(y * 88 + time / 1000) * 20;

            // Only draw if outside the island rect
            if (x + offsetX < WORLD_LIMITS.minX || x + offsetX > WORLD_LIMITS.maxX ||
                y + offsetY < WORLD_LIMITS.minY || y + offsetY > WORLD_LIMITS.maxY) {

                // Draw wave foam
                const size = (Math.sin(time / 500 + x) + 1) * 2 + 1;
                ctx.fillRect(x + offsetX, y + offsetY, size * 2, size);
            }
        }
    }

    // 3. Draw The Island (Grass)
    ctx.fillStyle = COLORS.grass;
    ctx.fillRect(WORLD_LIMITS.minX, WORLD_LIMITS.minY, WORLD_LIMITS.maxX - WORLD_LIMITS.minX, WORLD_LIMITS.maxY - WORLD_LIMITS.minY);

    // 4. Grass Texture (Inside Island)
    ctx.fillStyle = COLORS.grassDark;
    for(let x = WORLD_LIMITS.minX; x < WORLD_LIMITS.maxX; x+=50) {
        for(let y = WORLD_LIMITS.minY; y < WORLD_LIMITS.maxY; y+=50) {
            if ((Math.abs(x * y) % 7) === 0) {
                ctx.fillRect(x + 10, y + 10, 5, 5);
                ctx.fillRect(x + 15, y + 5, 5, 5);
            }
        }
    }
}

function drawFence(obj: any) {
        // Simple post
        ctx.fillStyle = COLORS.woodDark;
        ctx.fillRect(obj.x, obj.y - 15, 8, 20);
        // Horizontal rails
        ctx.fillStyle = COLORS.wood;
        ctx.fillRect(obj.x - 10, obj.y - 10, 42, 4); // Connects to next post
        ctx.fillRect(obj.x - 10, obj.y - 2, 42, 4);
}

function drawScenery(obj: any) {
    if(obj.type === 'tree') {
        // Trunk
        ctx.fillStyle = COLORS.woodDark;
        ctx.fillRect(obj.x - 8, obj.y - 10, 16, 30);
        // Leaves
        ctx.fillStyle = COLORS.treeLight; // Dynamic color
        ctx.beginPath();
        ctx.arc(obj.x, obj.y - 30, 25, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = COLORS.treeDark; // Dynamic color
        ctx.beginPath();
        ctx.arc(obj.x - 10, obj.y - 35, 15, 0, Math.PI*2);
        ctx.fill();
    } else if (obj.type === 'rock') {
        ctx.fillStyle = '#7f8c8d';
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, 10, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#95a5a6';
        ctx.fillRect(obj.x-5, obj.y-8, 5, 5);
    } else if (obj.type === 'flower') {
        ctx.fillStyle = COLORS.flowerStem; // Dynamic
        ctx.fillRect(obj.x - 1, obj.y, 2, 8);
        ctx.fillStyle = COLORS.flowerPetal; // Dynamic
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, 4, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#f1c40f'; // Center
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, 1.5, 0, Math.PI*2);
        ctx.fill();
    } else if (obj.type === 'plant') {
        // Simple generic crop/plant
        ctx.fillStyle = COLORS.cropLeaf;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y - 4, 6, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = COLORS.cropFruit[0]; // Just use first fruit color
        ctx.beginPath();
        ctx.arc(obj.x, obj.y - 8, 3, 0, Math.PI*2);
        ctx.fill();
    }
}

function drawAnimal(animal: any) {
    const x = animal.x;
    const y = animal.y;
    const colors = ANIMAL_COLORS[animal.type];
    const frameOffset = animal.isMoving && Math.floor(animal.frame) === 1 ? 2 : 0;

    ctx.save();

    // Determine flip based on facing direction
    let flip = false;
    // Default facing: Chicken=Right, Others=Left
    if (animal.type === 'chicken') {
            if (animal.facing === 'left') flip = true;
    } else {
            if (animal.facing === 'right') flip = true;
    }

    if (flip) {
        ctx.translate(x, y);
        ctx.scale(-1, 1);
        ctx.translate(-x, -y);
    }

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(x, y + 4, 10, 5, 0, 0, Math.PI*2);
    ctx.fill();

    if (animal.type === 'cow') {
        // Body
        ctx.fillStyle = colors.body;
        ctx.fillRect(x - 14, y - 20, 28, 20);

        // Spots
        ctx.fillStyle = colors.spots;
        ctx.fillRect(x - 8, y - 18, 10, 8);
        ctx.fillRect(x + 6, y - 14, 6, 6);

        // Head
        ctx.fillStyle = colors.body;
        ctx.fillRect(x - 18, y - 26, 16, 16);

        // Horns
        ctx.fillStyle = '#d7ccc8';
        ctx.fillRect(x - 18, y - 28, 4, 4);
        ctx.fillRect(x - 6, y - 28, 4, 4);

        // Ears
        ctx.fillStyle = colors.body;
        ctx.fillRect(x - 20, y - 22, 2, 4);
        ctx.fillRect(x - 2, y - 22, 2, 4);

        // Snout
        ctx.fillStyle = colors.snout;
        ctx.fillRect(x - 18, y - 14, 16, 6);

        // Eyes
        ctx.fillStyle = '#000';
        ctx.fillRect(x - 16, y - 20, 2, 2);
        ctx.fillRect(x - 8, y - 20, 2, 2);

        // Legs
        ctx.fillStyle = colors.body;
        ctx.fillRect(x - 12, y, 6, 6 + frameOffset);
        ctx.fillRect(x + 6, y, 6, 6 - frameOffset);

        // Tail
        ctx.fillStyle = colors.body;
        ctx.fillRect(x + 14, y - 18, 2, 10);
        ctx.fillStyle = colors.spots;
        ctx.fillRect(x + 13, y - 8, 4, 4);

    } else if (animal.type === 'chicken') {
        // Body
        ctx.fillStyle = colors.body;
        ctx.fillRect(x - 6, y - 10, 12, 10);

        // Tail feathers
        ctx.fillStyle = colors.body;
        ctx.fillRect(x - 8, y - 12, 4, 6);

        // Wing
        ctx.fillStyle = '#e0e0e0'; // Slightly darker for wing
        ctx.fillRect(x - 2, y - 8, 6, 4);

        // Head
        ctx.fillStyle = colors.body;
        ctx.fillRect(x + 2, y - 14, 6, 6);

        // Comb
        ctx.fillStyle = colors.comb;
        ctx.fillRect(x + 3, y - 16, 4, 2);
        ctx.fillRect(x + 4, y - 10, 2, 2); // Wattle

        // Beak
        ctx.fillStyle = colors.beak;
        ctx.fillRect(x + 8, y - 12, 2, 2);

        // Eye
        ctx.fillStyle = '#000';
        ctx.fillRect(x + 6, y - 13, 1, 1);

        // Legs
        ctx.fillStyle = '#e67e22';
        ctx.fillRect(x - 2, y, 2, 4 + frameOffset);
        ctx.fillRect(x + 4, y, 2, 4 - frameOffset);

    } else if (animal.type === 'horse') {
        // Body
        ctx.fillStyle = colors.body;
        ctx.fillRect(x - 14, y - 22, 30, 18);

        // Neck
        ctx.fillStyle = colors.body;
        ctx.fillRect(x - 16, y - 30, 10, 14);

        // Head
        ctx.fillStyle = colors.body;
        ctx.fillRect(x - 22, y - 32, 14, 10);

        // Mane
        ctx.fillStyle = colors.mane;
        ctx.fillRect(x - 6, y - 32, 4, 16); // Neck mane
        ctx.fillRect(x - 16, y - 34, 4, 4); // Top mane

        // Ears
        ctx.fillStyle = colors.body;
        ctx.fillRect(x - 14, y - 34, 2, 4);
        ctx.fillRect(x - 8, y - 34, 2, 4);

        // Snout
        ctx.fillStyle = colors.snout;
        ctx.fillRect(x - 24, y - 28, 4, 6);

        // Eye
        ctx.fillStyle = '#000';
        ctx.fillRect(x - 18, y - 28, 2, 2);

        // Legs
        ctx.fillStyle = colors.body;
        ctx.fillRect(x - 12, y - 4, 6, 10 + frameOffset);
        ctx.fillRect(x + 8, y - 4, 6, 10 - frameOffset);

        // Tail
        ctx.fillStyle = colors.mane;
        ctx.fillRect(x + 16, y - 20, 4, 12);

    } else if (animal.type === 'sheep') {
        // Legs (draw behind body)
        ctx.fillStyle = colors.legs;
        ctx.fillRect(x - 8, y + 2, 4, 6 + frameOffset);
        ctx.fillRect(x + 4, y + 2, 4, 6 - frameOffset);

        // Woolly Body
        ctx.fillStyle = colors.body;
        // Main fluff
        ctx.beginPath(); ctx.arc(x, y - 8, 10, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(x - 6, y - 6, 8, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(x + 6, y - 6, 8, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(x, y - 12, 9, 0, Math.PI*2); ctx.fill();

        // Head
        ctx.fillStyle = colors.head;
        ctx.fillRect(x - 14, y - 16, 10, 10); // Face

        // Ears
        ctx.fillRect(x - 16, y - 14, 2, 4);
        ctx.fillRect(x - 4, y - 14, 2, 4);

        // Wool on head
        ctx.fillStyle = colors.body;
        ctx.fillRect(x - 14, y - 18, 10, 4);

        // Eye
        ctx.fillStyle = '#fff';
        ctx.fillRect(x - 12, y - 14, 2, 2);
    }

    ctx.restore();
}

function drawZone(zone: any) {
    if (zone.type === 'building') {
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(zone.x + 10, zone.y + 100, 140, 40);

        // Walls
        ctx.fillStyle = '#f5d76e'; // Yellowish wall
        ctx.fillRect(zone.x + 10, zone.y + 40, 140, 90);

        // Wood trim
        ctx.fillStyle = COLORS.wood;
        ctx.fillRect(zone.x + 10, zone.y + 40, 140, 10); // Top trim
        ctx.fillRect(zone.x + 10, zone.y + 120, 140, 10); // Bottom trim
        ctx.fillRect(zone.x + 10, zone.y + 40, 10, 90); // Left
        ctx.fillRect(zone.x + 140, zone.y + 40, 10, 90); // Right

        // Roof
        ctx.fillStyle = COLORS.roof;
        ctx.beginPath();
        ctx.moveTo(zone.x - 10, zone.y + 40);
        ctx.lineTo(zone.x + 80, zone.y - 20);
        ctx.lineTo(zone.x + 170, zone.y + 40);
        ctx.fill();

        // Door
        ctx.fillStyle = COLORS.woodDark;
        ctx.fillRect(zone.x + 60, zone.y + 80, 40, 50);
        ctx.fillStyle = '#f39c12'; // Knob
        ctx.fillRect(zone.x + 90, zone.y + 105, 4, 4);

        // Window
        ctx.fillStyle = '#85c1e9';
        ctx.fillRect(zone.x + 25, zone.y + 60, 30, 30);
        ctx.fillStyle = COLORS.wood;
        ctx.fillRect(zone.x + 38, zone.y + 60, 4, 30);
        ctx.fillRect(zone.x + 25, zone.y + 73, 30, 4);

    } else if (zone.type === 'garden') {
        // Soil
        ctx.fillStyle = COLORS.dirt;
        ctx.fillRect(zone.x, zone.y, zone.w, zone.h);

        // Grid lines
        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
        ctx.beginPath();
        for(let gx=0; gx<=zone.w; gx+=30) {
            ctx.moveTo(zone.x + gx, zone.y);
            ctx.lineTo(zone.x + gx, zone.y + zone.h);
        }
        for(let gy=0; gy<=zone.h; gy+=30) {
            ctx.moveTo(zone.x, zone.y + gy);
            ctx.lineTo(zone.x + zone.w, zone.y + gy);
        }
        ctx.stroke();

        // Crops
        for(let gx=15; gx<zone.w; gx+=30) {
            for(let gy=15; gy<zone.h; gy+=30) {
                // Plant
                ctx.fillStyle = COLORS.cropLeaf; // DYNAMIC COLOR
                ctx.beginPath();
                ctx.arc(zone.x + gx, zone.y + gy, 10, 0, Math.PI*2);
                ctx.fill();

                // Fruit/Flower (random color from palette)
                const palette = COLORS.cropFruit;
                const color = palette[(gx+gy)%palette.length];

                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(zone.x + gx, zone.y + gy - 5, 4, 0, Math.PI*2);
                ctx.fill();
            }
        }

        // Sign (I don't want a sign for now)
        // ctx.fillStyle = COLORS.wood;
        // ctx.fillRect(zone.x + zone.w/2 - 2, zone.y - 20, 4, 20);
        // ctx.fillStyle = COLORS.woodDark;
        // ctx.fillRect(zone.x + zone.w/2 - 15, zone.y - 35, 30, 20);

    } else if (zone.type === 'sign') {
        // Legs
        ctx.fillStyle = COLORS.wood;
        ctx.fillRect(zone.x + 15, zone.y + 30, 5, 20);
        ctx.fillRect(zone.x + 60, zone.y + 30, 5, 20);
        // Board
        ctx.fillStyle = COLORS.woodDark;
        ctx.fillRect(zone.x, zone.y, zone.w, 40);
        // Paper
        ctx.fillStyle = '#fff';
        ctx.fillRect(zone.x + 5, zone.y + 5, zone.w - 10, 30);
        // Lines
        ctx.fillStyle = '#333';
        ctx.fillRect(zone.x + 10, zone.y + 15, zone.w - 20, 2);
        ctx.fillRect(zone.x + 10, zone.y + 25, zone.w - 20, 2);

    } else if (zone.type === 'mailbox') {
        ctx.fillStyle = '#bdc3c7'; // Post
        ctx.fillRect(zone.x + 12, zone.y + 20, 6, 30);
        ctx.fillStyle = '#34495e'; // Box
        ctx.beginPath();
        ctx.arc(zone.x + 15, zone.y + 10, 15, Math.PI, 0);
        ctx.lineTo(zone.x + 30, zone.y + 20);
        ctx.lineTo(zone.x, zone.y + 20);
        ctx.fill();
        ctx.fillStyle = '#c0392b'; // Flag
        ctx.fillRect(zone.x + 28, zone.y + 5, 2, 10);
        ctx.fillRect(zone.x + 28, zone.y + 5, 8, 5);
    }
}

function drawPlayer() {
    const p = gameState.player;
    const x = p.x;
    const y = p.y;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(x + 16, y + 30, 10, 4, 0, 0, Math.PI*2);
    ctx.fill();

    // Simple Character Drawing

    // Legs (animated)
    ctx.fillStyle = '#2c3e50'; // Pants
    if (p.isMoving) {
        const step = Math.sin(Date.now() / 100) * 5;
        ctx.fillRect(x + 8, y + 20 + step, 6, 12); // Left leg
        ctx.fillRect(x + 18, y + 20 - step, 6, 12); // Right leg
    } else {
        ctx.fillRect(x + 8, y + 20, 6, 12);
        ctx.fillRect(x + 18, y + 20, 6, 12);
    }

    // Body (Shirt)
    ctx.fillStyle = '#e74c3c'; // Red shirt
    ctx.fillRect(x + 6, y + 12, 20, 14);

    // Head
    ctx.fillStyle = '#f1c40f'; // Skin
    ctx.fillRect(x + 8, y, 16, 14);

    // Hat
    ctx.fillStyle = '#2980b9'; // Blue hat
    ctx.fillRect(x + 6, y - 4, 20, 6); // Brim
    ctx.fillRect(x + 8, y - 8, 16, 6); // Top

    // Face details based on direction
    ctx.fillStyle = 'black';
    if (p.dir === 'down') {
        ctx.fillRect(x + 12, y + 6, 2, 2); // Eye
        ctx.fillRect(x + 18, y + 6, 2, 2); // Eye
    } else if (p.dir === 'right') {
        ctx.fillRect(x + 18, y + 6, 2, 2); // Eye
    } else if (p.dir === 'left') {
        ctx.fillRect(x + 12, y + 6, 2, 2); // Eye
    }

    // Label "Me"
    ctx.fillStyle = 'white';
    ctx.font = '10px "Press Start 2P"';
    ctx.fillText('Me', x + 6, y - 15);
}

function loop(timestamp: number) {
    const deltaTime = timestamp - gameState.lastTime;
    gameState.lastTime = timestamp;
    update(deltaTime);
    draw();
    requestAnimationFrame(loop);
}

// Start
init();
