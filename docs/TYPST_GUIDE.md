# Typst Quick Reference Guide

## Installation Complete! ✓

Your project is now set up with tinymist language server support.

## Getting Started

1. **Install the Extension** (if not already done):
   - Press `Ctrl+Shift+X` to open Extensions
   - Search for "tinymist"
   - Install "Tinymist Typst" by myriad-dreamin

2. **Open a Typst File**:
   - Open `test.typ` or `main.typ`
   - The language server will activate automatically

3. **Preview Your Document**:
   - Press `Ctrl+Shift+P` to open Command Palette
   - Type "Typst Preview" and select it
   - A live preview will open in a new panel

## Basic Typst Syntax

### Headings
```typst
= Level 1 Heading
== Level 2 Heading
=== Level 3 Heading
```

### Text Formatting
```typst
*bold text*
_italic text_
`code text`
```

### Lists
```typst
// Unordered list
- Item 1
- Item 2
  - Nested item

// Ordered list
+ First
+ Second
+ Third
```

### Citations
```typst
Research shows @author2020study that...
Multiple citations @study1 @study2.
```

### Figures
```typst
#figure(
  image("figures/diagram.png"),
  caption: [Your caption here]
) <label>

// Reference it later
See @label for details.
```

### Math
```typst
Inline math: $x^2 + y^2 = z^2$

Display math:
$ sum_(i=1)^n i = (n(n+1))/2 $
```

### Tables
```typst
#table(
  columns: (auto, auto, auto),
  [Header 1], [Header 2], [Header 3],
  [Row 1], [Data], [Data],
  [Row 2], [Data], [Data]
)
```

### Code Blocks
```typst
```python
def hello():
    print("Hello, World!")
\```
```

### Comments
```typst
// Single line comment

/* Multi-line
   comment */
```

## Useful Commands

### Compile to PDF
The extension auto-compiles on save. Output goes to the same directory.

### Format Document
- Right-click in editor → "Format Document"
- Or press `Shift+Alt+F`

### Show Compilation Status
Check the status bar at the bottom of the editor.

## Project Structure

```
your-project/
├── main.typ              # Main research paper
├── template.typ          # Clean template to start from
├── test.typ              # Scratch/test file
├── refs.bib              # Bibliography
├── chapters/             # Organized chapters
│   ├── introduction.typ
│   ├── literature-review.typ
│   └── methods.typ
├── figures/              # Images and diagrams
├── data/                 # Research data
└── output/               # Compiled PDFs (gitignored)
```

## Tips

1. **Auto-completion**: Start typing and press `Ctrl+Space` for suggestions
2. **Go to Definition**: `Ctrl+Click` on citations or labels
3. **Find References**: Right-click → "Find All References"
4. **Rename Symbol**: Right-click → "Rename Symbol"

## Common Issues

### Extension not working?
- Reload the window: `Ctrl+Shift+P` → "Reload Window"
- Check the Output panel: View → Output → Select "Tinymist"

### Preview not showing?
- Make sure the file is saved
- Try closing and reopening the preview

### Citations not working?
- Ensure `refs.bib` is in the same directory
- Check the bibliography path in your `.typ` file

## Resources

- [Typst Documentation](https://typst.app/docs)
- [Tinymist GitHub](https://github.com/Myriad-Dreamin/tinymist)
- [Typst Universe](https://typst.app/universe) - Packages and templates

## Your Current Files

- `test.typ` - Simple test file (= wawawa)
- `main.typ` - Your full research paper (1705 lines)
- `refs.bib` - Your bibliography (1035 lines)
- `template.typ` - Clean starting template
