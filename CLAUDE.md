# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Who is Sohm

- **Education:** Georgia Tech senior, dual major in Industrial Design + Computer Science (Intelligence/Devices threads)
- **Target roles:** Creative Technologist, Design Engineer, Product Design Engineer
- **Target companies:** Meta Reality Labs, Apple, Tesla
- **Graduating:** December 2025 or Spring 2026
- **Portfolio goal:** Prove ability to design physical products AND write real code (AI/ML, embedded systems, spatial computing). The portfolio itself should demonstrate creative-technical craft through 3D, motion, and interactivity.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **3D/WebGL:** React Three Fiber + @react-three/drei
- **Animation:** GSAP + ScrollTrigger, Framer Motion
- **Styling:** Tailwind CSS
- **Fonts:** Satoshi (display), Inter (body), JetBrains Mono (code)
- **Hosting:** Vercel (deploy from GitHub, custom domain sohmdubey.com)
- **No database.** All content lives in TypeScript files under `src/content/`.

### Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build
npm run start      # Run production server
npm run lint       # ESLint
npx tsc --noEmit   # Type check
```

---

## Repository Structure

```
portfolio/
├── CLAUDE.md
├── .claude/
│   ├── agents/
│   │   ├── file-scanner.md
│   │   ├── asset-recommender.md
│   │   ├── project-interviewer.md
│   │   ├── content-writer.md
│   │   └── code-extractor.md
│   ├── commands/
│   │   ├── find-content.md
│   │   └── process-project.md
│   └── skills/
│       └── design-system/SKILL.md
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Home (hero, featured projects, about, contact)
│   │   ├── work/page.tsx    # Work index (all projects, filter/sort)
│   │   ├── work/work-content.tsx  # Work page client component
│   │   ├── work/[slug]/page.tsx   # Case study pages
│   │   ├── about/page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── 3d/              # React Three Fiber scenes
│   │   ├── motion/          # Animation wrappers
│   │   ├── ui/              # Base UI components
│   │   └── sections/        # Page section components
│   ├── content/
│   │   └── projects.ts      # All project data
│   ├── lib/
│   └── styles/
├── public/images/[project-slug]/
├── content/assets/[project-name]/   # Staging area
└── reference/
    ├── ssd-structure.md
    └── old-portfolio/
```

---

## Content Discovery

### SSD Location
`/Volumes/Extreme SSD/Portfolio/Projects/`

### Search tools
```bash
mdfind "[query]" -onlyin "/Volumes/Extreme SSD/"    # Fastest
mdfind "[query]" -onlyin ~                            # Home directory
find "/Volumes/Extreme SSD/Portfolio/Projects" -name "*.swift" -type f
grep -rl "ARSession" "/path/to/project/"
```

Also check: `~/Desktop/`, `~/Documents/`, `~/Downloads/`, `~/Library/CloudStorage/`

### Browser Search (Claude in Chrome)
- figma.com, drive.google.com, sohms-portfolio.replit.app, sohmdubey.com

### Asset Staging
1. Copy to `content/assets/[project-name]/` (never modify originals)
2. Convert for web: images → WebP, video → MP4, 3D → GLB (DRACO)
3. Optimized versions → `public/images/[project-slug]/`

---

## Content Pipeline

| Agent | Purpose | Output |
|-------|---------|--------|
| file-scanner | Inventory project files | `inventory.json` |
| asset-recommender | Select assets, flag gaps | `recommendations.json` |
| project-interviewer | Gather context via Q&A | `answers.json` |
| content-writer | Generate projects.ts entries | TypeScript object |
| code-extractor | Extract code snippets | Code + explanation |

Pipeline: scan → recommend → interview → write → extract

---

## Verified SSD Content (from actual file scan, Feb 2026)

### Tier 1: Flagship Projects

#### 1. Coca-Cola / Dynamic Drinking Vessel
- **Path:** `Projects/Coca Cola/`
- **Status:** ✅ RICHEST PROJECT — tons of real content
- ✅ Everything can be shown publicly
- ❌ Do NOT use "SipStream". Use "Dynamic Drinking Vessel" instead
- **Content:**
  - `01_Needfinding_Project/`: Canon MOV footage (5), DJI Osmo photos (12 JPG) + videos (15 MP4), Qualtrics survey XLSX, proposals and presentations (PDF, DOCX, PPTX)
  - `02_Preliminary_Design/`: Flavor testing XLSX, pump research PPTX, spec sheets
  - `02.5_Midterm_Report_and_Presentation/`: Midterm report (DOCX/PDF)
  - `03_Cumulative_Design/Mechanical_Bottle/`: **SolidWorks CAD** (SLDPRT, SLDASM, STEP), STL files, Full assembly ZIPs. Subfolders: Cap Cad, Final Assembly, Bottle_and_Cartridge_Assembly, Old Pinch Valve
  - `09_Pictures/`: Form study (21 JPGs), proof of concept device (35 JPEGs), team photos (7 JPEGs)
  - `11_Specs_CAD_Assignment/`: Gravity Free-Sip drawings (SLDDRW), BOMs (XLSX), three sub-designs
  - `12_Electronics/`: `piezo.ino`, `piezo2.ino` (Arduino sketches)
  - `13_Fab_Package/`: Technical binder (DOCX/PDF), electronic parts drawings, BOM
  - `14_Final_Report/`: Final report (DOCX/PDF)
  - `15_Final_Omni_Bottle_PackandGo/`: Final branded assembly ZIP
  - `Sip Stream App/SipStream/Arduino Code/FrankenCode/`: `FrankenCode.ino`
  - `Sip Stream App/SipStream/SipStream IOS/SipStream/SipStream/`: **16 Swift files** — BLEManager.swift, FlavorManager.swift, FlavorConfigurationView.swift, FlavorStateManager.swift, MenuView.swift, MixManager.swift, MixesView.swift, NetworkManager.swift, ShopManager.swift, ShopView.swift, AccountView.swift, AppDelegate.swift, ContentView.swift, MainTabView.swift, MockAPIService.swift, SipStreamApp.swift
  - Also in `_school/collab-studio/SipStream/`: Duplicate iOS app (V1 + V2), expo poster PDF, logo (AI + PNG)

#### 2. LiDAR Room Scanner (Fittage)
- **Path:** `Projects/_personal/lidar-room-scanner/`
- **Status:** ⚠️ Good code, needs visual assets
- **Content:**
  - `ios-app/Fittage/Fittage/`: Well-structured Swift app:
    - `AR/`: ARSessionController.swift, RaycastService.swift
    - `Measurement/`: MeasurementTypes.swift
    - `Storage/`: Persistence.swift
    - `UI/`: CaptureView_Backend.swift
    - `Vision/`: ARMeasurementEngine.swift
    - Root: ContentView.swift, FittageApp.swift, StringExtensions.swift
  - `ios-app/Fittage v2/`: Second version (same structure)
  - Docs: QUICKSTART.md, TESTFLIGHT_SETUP.md, TESTING.md, MEASUREMENT_USAGE_GUIDE.md, ON_DEVICE_IMPLEMENTATION.md, README.md
  - `logo/`: fittage-ios.ai, fittage-ios.png, fittage-ipad.ai, fittage-ipad.png
  - Root: build.sh, Expenses.xlsx, fittage.code-workspace
- **⚠️ MISSING:** Screenshots, demo videos. Empty folders: cad/, code/, data/, design/, documents/, images/, videos/
- **Action needed:** Need app screenshots and demo video from Sohm's iPhone.
- **NOTE:** The 180 PLY point cloud files are NOT from this project. They belong to **Perception & Robotics Project 6** (CS 3630 LiDAR assignment). Found in 3 locations:
  - `_school/perception-robotics/Project 6/lidar/` (~180 PLY files)
  - `~/Documents/Georgia Tech/Fall 2025/CS 3630/Project 6/lidar/` (duplicate)
  - `~/Downloads/project6_assets/lidar/` (duplicate)
  - These are course-provided data, not Fittage app scans. Could still be used as R3F particle demo for the Perception & Robotics portfolio entry.

#### 3. CV-Clothing (YOLOv11-test)
- **Path:** `Projects/_personal/cv-clothing/`
- **Status:** ⚠️ Has models, source files may be compiled-only
- **Content:**
  - Root: `data.yaml`, `DOCUMENTATION.md`, `README.md`, `inference_fashion_detection.py`, `kaggle.json`, workspace file
  - **Source .py files confirmed:** `inference_fashion_detection.py` exists at root level. Also mirrored at `~/Documents/YOLOv11-test/inference_fashion_detection.py`
  - **7 YOLO model weights:** yolo11m.pt, yolo11n.pt, yolo11n-pose.pt, yolo11s-pose.pt, yolo11x-pose.pt, yolo11x.pt, yolov8m.pt
  - Root images: bus.jpg, GRdCC.jpg
  - `__pycache__/`: Compiled .pyc for inference_fashion_detection, inference_pose_estimation, train_fashion_detection, train_pose_estimation (confirms these .py files exist or existed)
  - `datasets/coco8/` and `datasets/coco8-pose/`: Training/validation data
  - `env/`: Full Python environment (massive, ~92GB total for project)
  - Additional copy at: `~/Documents/YOLOv11-test/` (DOCUMENTATION.md, inference_fashion_detection.py, README.md)
- **⚠️ MISSING:** inference result screenshots, training metrics visualization, architecture diagram. Check if train_fashion_detection.py, inference_pose_estimation.py, train_pose_estimation.py exist (they have .pyc files, source should exist nearby).
- **Action needed:** Verify all .py source files exist. Need: inference result screenshots, training loss curves, architecture diagram.

#### 4. AliveCor
- **Path:** `Projects/_work/alivecor/`
- **Status:** ❌ COMPLETELY EMPTY — all 7 subfolders empty
- **Action needed:** ALL content must come from external sources — Figma, Google Drive, personal photos, presentations from internship, any saved renders/mockups.

### Tier 2: Supporting Projects (verified content)

| Project | Path | Key Content |
|---------|------|-------------|
| Collab Studio (DDV school side) | `_school/collab-studio/` | SipStream V1+V2 iOS code, expo poster PDF, logo files |
| Interactive Products | `_school/interactive-products/Touch Designer/` | 40+ .toe files across 6 labs + Projection Mapping, Assets folders |
| Perception & Robotics | `_school/perception-robotics/` | Projects 1-5 with Jupyter notebooks (.ipynb), Python files, some reports. **Project 6 has ~180 PLY LiDAR point cloud files** (great R3F particle demo candidate) |
| Interactive Studio | `_school/interactive-studio/` | Emotion Arduino Block Diagram.indd, Skills Inventory (INDD/PDF) |
| HP Inc. | `_work/hp-inc/` | Only `HP Final Presentation.pptx`. All other folders empty. |
| Intro AI | `_school/intro-ai/` | 607 files, 18GB — course assignments with notebooks |
| Machine Learning | `_school/machine-learning/` | 561 files — course assignments |
| ID Studio 1 | `_school/id-studio-1/` | Needs verification |
| ID Studio 2 | `_school/id-studio-2/` | Needs verification |
| Smart Product Design | `_school/smart-product-design/` | Needs verification |
| N-Gram Prediction | `_personal/ngram-prediction/` | Empty organized folders only |
| Transformer Learning | `_personal/transformer-learning/` | 25 files, 36MB |

### Tier 3: Foundational / Empty

| Project | Path | Content |
|---------|------|---------|
| Fundamentals | `_school/fundamentals/` | Large (many files from ID 1011/1012) |
| Graphic Comm | `_school/graphic-comm/` | 223+ files |
| AI Square | `_personal/ai-square/` | Empty organized folders |
| Cyara | `_work/cyara/` | Empty organized folders |
| Marché Health | `_work/marche-health/` | Empty organized folders |
| Job Materials | `_work/_job-materials/` | Resume v9r.pdf, cover letters (Atlassian, Neuralink, Robinhood) |

### Key Findings

1. **Coca-Cola is the only project with deep, real content** — CAD, Arduino, iOS, photos, reports, surveys
2. **LiDAR/Fittage has good code architecture** but NO scan output files (PLY/screenshots) — needs demo video from Sohm's phone
3. **CV-Clothing .py source files confirmed** at root (`inference_fashion_detection.py`) and mirrored in `~/Documents/YOLOv11-test/`. Need to verify all 4 scripts exist.
4. **AliveCor is completely empty** — will be interview-heavy, needs external assets
5. **180 PLY files belong to Perception & Robotics Project 6** (CS 3630), not LiDAR Room Scanner. Exist in 3 locations (SSD, Documents, Downloads). Excellent R3F particle visualization candidate.
6. **Collab-studio duplicates Coca-Cola content** — use as additional source
7. **Cowork template folders** (cad/, code/, data/, etc.) were created but rarely populated

---

## projects.ts Schema

```typescript
export interface Project {
  slug: string;
  title: string;
  description: string;              // ≤20 words
  thumbnail: string;
  tags: string[];                   // 3-6 tags
  summary: string;                  // 2-3 sentences
  timeline: string;
  role: string;
  duration: string;
  tools: string[];
  team?: string;
  heroImage: string;
  heroScene?: string;               // R3F component name
  sections: Section[];
  tier: 1 | 2 | 3;
  featured: boolean;
  visible: boolean;
}

export type Section = StandardSection | StackSection | CodeSection | FailureSection;

// StandardSection: type 'standard', heading, content, images?
// StackSection: type 'stack', heading, content, hardware?, software?, images?
// CodeSection: type 'code', heading, content, code, language, images?
// FailureSection: type 'failure', heading, content, iterations[], images?
```

---

## Writing Guidelines

- First person, active voice, confident
- **No em dashes (—)**
- Impact-first: Lead with outcomes
- Tags use consistent vocabulary (see agent files)
- description: 10-20 words, summary: 2-3 sentences, section content: 2-4 sentences
