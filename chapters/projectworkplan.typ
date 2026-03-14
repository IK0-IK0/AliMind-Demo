// ================================
// Project Workplan (Feb–Dec 2026)
// ================================

// Define colors for each phase
#let purple = rgb("#d4b5e6")   // Phase 1: Protocol & Ethics
#let blue = rgb("#a9d6f0")   // Phase 2: Iteration 1 (Prototyping)
#let green = rgb("#b8e0b8")   // Phase 3: Iteration 2 (Model Training)
#let yellow = rgb("#f9e6b3")   // Phase 4: Iteration 3 (Refinement & Evaluation)
#let red = rgb("#fbb9b9")   // Phase 5: Documentation & Defense

== Project Workplan


#table(
  columns: (auto, 5fr, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto),
  align: (left, left, center, center, center, center, center, center, center, center, center, center, center),
  stroke: 0.5pt,
  table.header(
    repeat: true,
    [*No.*],
    [*Activity*],
    [*Feb*],
    [*Mar*],
    [*Apr*],
    [*May*],
    [*Jun*],
    [*Jul*],
    [*Aug*],
    [*Sep*],
    [*Oct*],
    [*Nov*],
    [*Dec*],
  ),

  /* --- 1. Protocol Development & Ethics Approval --- */
  [1], [Protocol Development & Ethics Approval], [], [], [], [], [], [], [], [], [], [], [],
  [1.1], [Literature review and protocol writing], table.cell(fill: purple)[], table.cell(
    fill: purple,
  )[], [], [], [], [], [], [], [], [], [],
  [1.2], [JREC submission and ethics review], table.cell(fill: purple)[], table.cell(
    fill: purple,
  )[], [], [], [], [], [], [], [], [], [],

  /* --- 2. Iteration 1 – Prototyping --- */
  [2], [Iteration 1 – Prototyping], [], [], [], [], [], [], [], [], [], [], [],
  [2.1], [Requirements analysis & tool setup], [], [], table.cell(fill: blue)[], [], [], [], [], [], [], [], [],
  [2.2], [Design pipeline architecture (Steps 1‑7)], [], [], [], table.cell(fill: blue)[], [], [], [], [], [], [], [],
  [2.3], [Development with synthetic data (MHC‑Coach, openCHA)], [], [], [], table.cell(fill: blue)[], table.cell(
    fill: blue,
  )[], [], [], [], [], [], [],
  [2.4], [Component testing & connectivity validation], [], [], [], [], table.cell(
    fill: blue,
  )[], [], [], [], [], [], [],
  [2.5], [Review & documentation (Iteration 1 outputs)], [], [], [], [], table.cell(
    fill: blue,
  )[], [], [], [], [], [], [],

  /* --- 3. Iteration 2 – Model Training --- */
  [3], [Iteration 2 – Model Training], [], [], [], [], [], [], [], [], [], [], [],
  [3.1], [Preliminary survey administration (150‑200 participants)], [], [], [], [], table.cell(
    fill: green,
  )[], table.cell(
    fill: green,
  )[], table.cell(
    fill: green,
  )[], [], [], [], [],
  [3.2], [Thematic analysis & theme taxonomy development], [], [], [], [], [], [], table.cell(
    fill: green,
  )[], [], [], [], [],
  [3.3], [Data annotation & preparation for training], [], [], [], [], [], [], table.cell(
    fill: green,
  )[], table.cell(
    fill: green,
  )[], [], [], [],
  [3.4], [Fine‑tune inference models (DeBERTa, RoBERTa, DistilBERT)], [], [], [], [], [], [], [], table.cell(
    fill: green,
  )[], [], [], [],
  [3.5], [Model validation & selection], [], [], [], [], [], [], [], table.cell(fill: green)[], [], [], [],
  [3.6], [Pilot testing (10‑15 users) & feedback collection], [], [], [], [], [], [], [], table.cell(
    fill: green,
  )[], [], [], [],
  [3.7], [Review & refinement for Iteration 3], [], [], [], [], [], [], [], table.cell(fill: green)[], [], [], [],

  /* --- 4. Iteration 3 – Refinement & Evaluation --- */
  [4], [Iteration 3 – Refinement & Evaluation], [], [], [], [], [], [], [], [], [], [], [],
  [4.1], [Implement fallbacks & UX improvements], [], [], [], [], [], [], [], [], table.cell(fill: yellow)[], [], [],
  [4.2], [Integrate longitudinal tracking & dynamic weights], [], [], [], [], [], [], [], [], table.cell(
    fill: yellow,
  )[], [], [],
  [4.3], [Comprehensive user testing (30‑40 participants, 5‑7 sessions)], [], [], [], [], [], [], [], [], table.cell(
    fill: yellow,
  )[], table.cell(fill: yellow)[], [],
  [4.4], [Expert validation (nutritionist review)], [], [], [], [], [], [], [], [], [], table.cell(fill: yellow)[], [],
  [4.5], [Final data analysis & evaluation], [], [], [], [], [], [], [], [], [], table.cell(fill: yellow)[], [],
  [4.6], [Final review & revisions], [], [], [], [], [], [], [], [], [], [], table.cell(fill: yellow)[],

  /* --- 5. Documentation & Defense --- */
  [5], [Documentation & Defense], [], [], [], [], [], [], [], [], [], [], [],
  [5.1], [Thesis writing and documentation], [], [], [], [], [], [], [], [], table.cell(fill: red)[], table.cell(
    fill: red,
  )[], table.cell(fill: red)[],
  [5.2], [Final defense preparation and presentation], [], [], [], [], [], [], [], [], [], [], table.cell(fill: red)[],
)
