# Tommaso Frosini — Personal Website

Personal portfolio with a retro/hacker aesthetic built on React + Three.js. The experience starts with a welcome screen, then animates into a 3D desk scene where an old CRT monitor runs an interactive terminal.

## Stack

- **React 18** + **Vite**
- **@react-three/fiber** + **@react-three/drei** — 3D rendering
- **Three.js** — 3D engine
- **GSAP** — camera animation
- **react-ga4** — Google Analytics 4
- **react-cookie-consent** — cookie consent

## Project Structure

```
src/
├── App.jsx
├── pages/
│   ├── Desk.jsx          # Canvas + camera animation
│   ├── Welcome.jsx       # Landing screen
│   ├── System.jsx        # Interactive terminal
│   └── System.css / Welcome.css
├── components/
│   ├── Monitor/
│   │   ├── Monitor.jsx   # GLB model + HTML overlay
│   │   └── Monitor.css
│   ├── Scene/
│   │   └── Scene.jsx     # Desk GLB model
│   └── TerminalBoot.jsx  # Typewriter boot animation
└── assets/
    └── sounds/
        ├── boot.mp3
        └── keyboard.mp3
public/
├── scene-transformed.glb     # 3D desk scene
└── monitor-transformed.glb   # CRT monitor model
```

## User Flow

1. **Welcome** — assets load in background; cookie consent required to enable "Enter"
2. **Boot** — boot sound plays, camera zooms into the desk via GSAP
3. **Terminal** — CRT monitor renders an interactive terminal

## Terminal Commands

| Command | Description |
|---|---|
| `help` | List available commands |
| `about` | Short bio |
| `linkedin` | Open LinkedIn profile |
| `github` | Open GitHub profile |
| `echo <msg>` | Print a message |

## Getting Started

```bash
npm install
npm run dev
```

## Credits

- Desk scene: [Office - Assets](https://sketchfab.com/3d-models/office-assets-16c1a779bb0a4055a26367741d39e059) by SeverDoes3D — CC-BY-4.0
- Monitor model: [Old monitor](https://sketchfab.com/3d-models/old-monitor-6fb5032d4c0f45c3b767c1a8d694ec70) by Brandon_Harvey — CC-BY-4.0
