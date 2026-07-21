# Sushant Guri — Portfolio Website

A high-performance, motion-first personal portfolio website built for **Sushant Guri** (AI, Robotics & Full-Stack Developer). 

Inspired directly by the clean, minimalist, and highly technical design system of **[animejs.com](https://animejs.com/)**, the site combines an interactive blueprint layout with 3D graphics, spring physics simulations, and smooth momentum scrolling.

---

## 🎨 Key Design & Aesthetic Themes

*   **Signature Palette:** Minimalist dark mode (`#060606`) accented with Anime.js signature orange-red (`#ff4b4b`), clean cyan (`#06b6d4`), and deep violet accents.
*   **Blueprint Grid Sheet:** A subtle fixed coordinate grid pattern (`body::before`) layered behind the layout content to reinforce the engineering look and feel.
*   **Staggered Typography:** Interactive page titles and navigation links utilizing character-split spans that execute springy bounces on hover and loops.
*   **Flat Coordinate Panels:** Flat cards, fine horizontal/vertical border grid lines, and neat label badges with no heavy card gradients.

---

## 🚀 Core Features & Technology Stack

### 1. Motion & Physics (Anime.js)
*   **Interactive Grid Ripple:** An interactive 15x8 stagger grid in the showcase where clicking/hovering launches radial ripples. Includes custom easing, animation triggers, and live code generation.
*   **Vector Shape Morphing:** Smoothly morphs complex SVG paths using elastic ease curves.
*   **Spring Physics:** A drag-and-release spring ball demonstrating elastic physics models.
*   **Letter Bouncing:** Staggered character bounces triggering automatically on a 5-second interval loop for header items.

### 2. Global 3D Background (Three.js)
*   **Orbital Geometries:** 5 floating wireframe shapes (Icosahedron, Dodecahedron, Octahedron, Torus, Torus Knot) revolving around the scene center as you scroll.
*   **Particle Field:** 600 color-coded drifting vertices.
*   **Performance Budgeted:** Fixed at `setPixelRatio(1)` with antialiasing disabled and delta-time frame capping to guarantee 60fps on mobile and Retina screens.

### 3. Momentum Scrolling (Lenis)
*   **Smooth Inertial Scroll:** Integrated Lenis React scroll engine for custom wheel/touch momentum.
*   **Synced Animations:** Direct sub-frame updates syncing both Three.js camera/geometries and roadmap timeline progress lines perfectly to the scroll position.

---

## 📂 Project Structure

```bash
Port/
├── public/                 # Static assets
├── src/
│   ├── components/         # Custom React elements
│   │   ├── About.jsx       # Biography & statistics cards
│   │   ├── Experience.jsx  # Professional work details
│   │   ├── Internship.jsx  # Research project highlights
│   │   ├── Projects.jsx    # Shipped software details
│   │   ├── Timeline.jsx    # Roadmap journey progress line
│   │   ├── Gallery.jsx     # High-fidelity project showcase
│   │   ├── StaggeredText.jsx# Char-split spring bounce helper
│   │   ├── ThreeBackground.jsx # Orbital Three.js bg
│   │   └── Navbar.jsx      # Navigation with staggered hover links
│   ├── App.jsx             # App layout wrapper (Lenis setup)
│   ├── index.css           # Global CSS variables, custom scrollbar
│   └── main.jsx            # Entry point
├── package.json            # Dependencies list (animejs, three, lenis)
└── vite.config.js          # Vite configurations
```

---

## 🛠️ Setup & Local Development

### Prerequisites
*   Node.js (v18+)
*   npm or yarn

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/sushantguri/portfolios.git
    cd portfolios
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running Locally
To launch the hot-reloading development server:
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** (or the allocated port shown in your terminal) to view the live site.

### Building for Production
To compile and bundle optimized client assets:
```bash
npm run build
```
The output files will be generated inside the `/dist` directory, ready to be served by any static host.
