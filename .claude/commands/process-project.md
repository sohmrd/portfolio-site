---
name: process-project
description: Run the full content pipeline for a portfolio project (scan → recommend → interview → write)
disable-model-invocation: true
---

Run the complete content pipeline for: $ARGUMENTS

## Pipeline Steps

Execute these in order. Each step depends on the previous one.

### Step 1: Discover & Scan
First, search the entire machine for files related to this project:
- Use mdfind across the SSD and home directory
- Check browser (Figma, Drive) if connected
- Then run the **file-scanner** agent on the primary project folder

Wait for: `content/assets/[project-name]/inventory.json`

### Step 2: Recommend Assets
Run the **asset-recommender** agent to analyze the inventory:
- Select hero image, gallery, code candidates
- Identify 3D/interactive opportunities for R3F scenes
- Flag missing assets and generate export checklist for Sohm

Wait for: `content/assets/[project-name]/recommendations.json`

**PAUSE HERE if there are critical missing assets.** Present the export checklist to Sohm and wait for them to provide the files before continuing.

### Step 3: Interview
Run the **project-interviewer** agent:
- Determine project tier (check CLAUDE.md project tiers section)
- Ask the appropriate number of questions
- Include question about 3D/interactive opportunities

Wait for: `content/assets/[project-name]/answers.json`

### Step 4: Write Content
Run the **content-writer** agent to synthesize everything:
- Read inventory.json + recommendations.json + answers.json
- Generate complete projects.ts entry
- Flag any 3D scenes that need to be built

### Step 5: Review
Present the generated entry to Sohm:
- Show the full TypeScript object
- Highlight key content decisions
- List assets that need to be copied to public/images/[slug]/
- List any 3D scenes that need development
- Ask for approval or revision requests

### Step 6: Integrate
Once approved:
- Add the entry to `src/content/projects.ts`
- Copy and optimize assets to `public/images/[slug]/`
- Create a TODO for any 3D scene components needed
