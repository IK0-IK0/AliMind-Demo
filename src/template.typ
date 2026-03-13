// Research Paper Template
// Organized structure for your TPB/TTM research

#import "@preview/fletcher:0.5.8" as fletcher: diagram, node, edge
#import fletcher.shapes: diamond

// Document settings
#set par(justify: true)
#show align.where(alignment: center): set par(justify: false)
#set page(numbering: "1")

// Title Page
#align(center + horizon)[
  = *From Behavioral Inference to Stage-Specific Nutrition Support: A TPB- and TTM- Informed System*

  #v(1em)
  
  Regalado, Mika | Monterolla, John Lloyd | Cuadra, Francis Neil
  
  #v(1em)
  
  Research Project
  
  #v(0.5em)
  
  #datetime.today().display()
]

#pagebreak()

// Table of Contents
#outline(
  title: "Table of Contents",
  indent: auto
)

#pagebreak()

// Import chapters (uncomment as you organize)
// #include "chapters/introduction.typ"
// #include "chapters/literature-review.typ"
// #include "chapters/methods.typ"
// #include "chapters/results.typ"
// #include "chapters/discussion.typ"
// #include "chapters/conclusion.typ"

// Or keep everything in one file for now
= Introduction

Your introduction content here...

= Literature Review

== Theory of Planned Behavior (TPB)
== Transtheoretical Model (TTM)
== Current Digital Health Tools

= Methods and Materials

== Research Method
== Design Procedure

= Results

= Discussion

= Conclusion

// Bibliography
#pagebreak()
#bibliography("refs.bib", title: "References", style: "apa")
