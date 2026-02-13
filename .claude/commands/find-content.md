---
name: find-content
description: Search the entire machine and browser for all files related to a portfolio project
disable-model-invocation: true
---

Search for ALL content related to the project: $ARGUMENTS

## Execution Steps

### 1. Local Filesystem Search
Use mdfind (macOS Spotlight) as primary search. Try multiple query variations:

```bash
# Broad project name search across everything
mdfind "$ARGUMENTS" -onlyin "/Volumes/Extreme SSD/"
mdfind "$ARGUMENTS" -onlyin ~

# Search for related file types
mdfind "$ARGUMENTS AND kMDItemContentType == 'com.adobe.pdf'"
mdfind "$ARGUMENTS AND (kMDItemContentType == 'public.image')"
```

Also check these paths with find:
- `/Volumes/Extreme SSD/Portfolio/Projects/` (known project folders)
- `~/Desktop/`, `~/Documents/`, `~/Downloads/`
- `~/Library/CloudStorage/` (synced cloud storage)

### 2. Browser Search (if Claude in Chrome is connected)
- Navigate to **figma.com** → search for project name → screenshot relevant files
- Navigate to **drive.google.com** → search for project name → note documents found
- Navigate to **sohms-portfolio.replit.app** → check if project has existing content
- Navigate to **sohmdubey.com** → check for legacy content/images

### 3. Report Findings
For each file found, report:
- File path (absolute)
- File type and size
- Last modified date
- Which source (SSD, Desktop, Cloud, Browser)

### 4. Identify Missing Content
Compare what was found against what a strong portfolio case study needs:
- Hero image (high-res, polished)
- 4+ process images (sketches, prototypes, iterations)
- Technical artifact (code, CAD, architecture diagram)
- Demo video or screen recording
- 3D model files (for interactive R3F scenes)
- Presentation or summary document

### 5. Generate Export Checklist
For anything likely to exist in cloud-only tools, create a numbered checklist:

```
## Export Checklist for Sohm

### Found Locally (ready to use)
✅ [list files with paths]

### Found via Browser (screenshots taken)
📸 [list screenshots]

### Need Manual Export
☐ [Figma] — [specific file/frame] → export as [format]
☐ [Fusion 360] — [specific model] → export as [format]  
☐ [Google Slides] — [presentation name] → export slides as PNG
☐ [Adobe CC] — [file] → export as [format]
☐ [Photos/iPhone] — [description of physical prototype photos needed]
```

Save all exports to: `content/assets/[project-name]/`
