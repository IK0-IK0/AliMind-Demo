# Research Project Organization Guide

## Current Status

Your research paper on TPB/TTM-informed nutrition support system is well underway!

### What You Have

- **main.typ** (1705 lines) - Your complete research paper with:
  - Introduction with Filipino context (Davao City focus)
  - Literature review on TPB and TTM
  - Gap analysis of current AI nutrition tools
  - Comprehensive methods section with iterative development
  - Figures and tables
  - Bibliography integration

- **refs.bib** (1035 lines) - Extensive bibliography with 25+ references

- **test.typ** - Simple test file for experiments

## Recommended Next Steps

### 1. Install Tinymist Extension
- Open Extensions (Ctrl+Shift+X)
- Search "tinymist"
- Install and reload

### 2. Choose Your Workflow

**Option A: Keep Everything in main.typ** (Current approach)
- Good for: Easier navigation, single file
- Continue editing main.typ directly

**Option B: Split into Chapters** (Better for large papers)
- Move sections from main.typ into chapters/
- Use `#include "chapters/filename.typ"` in main
- Easier to manage and collaborate

### 3. Add Your Figures
- Place images in `figures/` directory
- Already referenced in main.typ: intAct.png, iterative.png
- Make sure these files exist or update references

## File Organization Tips

```
chapters/
├── introduction.typ       # Background, motivation, Filipino context
├── literature-review.typ  # TPB, TTM, current tools
├── methods.typ            # Research design, iterations
├── results.typ            # Findings (when ready)
└── discussion.typ         # Analysis and implications

figures/
├── intAct.png            # Intention vs Action diagram
├── iterative.png         # Development cycle flow
└── [other diagrams]

data/
└── [survey data, datasets]

output/
└── [compiled PDFs]
```

## Quick Actions

See TYPST_GUIDE.md for syntax and commands.
See README.md for setup instructions.
