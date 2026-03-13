# Research Project - TPB & TTM Nutrition Support System

This is a research project exploring behavioral inference and stage-specific nutrition support using the Theory of Planned Behavior (TPB) and Transtheoretical Model (TTM).

## Setup Instructions

### 1. Install Typst Language Server (tinymist)

For VS Code/Kiro:
1. Open the Extensions view (Ctrl+Shift+X)
2. Search for "tinymist"
3. Install the "Tinymist Typst" extension by myriad-dreamin
4. Reload the editor

The extension will automatically download and configure the language server.

### 2. Project Structure

```
.
├── main.typ           # Main research paper
├── test.typ           # Test/scratch file
├── refs.bib           # Bibliography references
├── chapters/          # Individual chapters (optional)
├── figures/           # Images and diagrams
├── data/              # Research data files
└── .vscode/           # Editor configuration
```

### 3. Working with Typst

- Edit `.typ` files to write your research paper
- The extension provides:
  - Syntax highlighting
  - Auto-completion
  - Live preview (use command palette: "Typst Preview")
  - PDF export on save
  - Error checking

### 4. Compiling Documents

The tinymist extension will automatically compile your documents. You can also use:

```bash
# If you have Typst CLI installed
typst compile main.typ
```

## Features

- Theory-driven conversational AI system
- TPB construct inference from natural language
- TTM stage classification
- Personalized nutrition recommendations

## References

See `refs.bib` for all bibliographic references.
