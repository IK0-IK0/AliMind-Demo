#import "@preview/fletcher:0.5.8" as fletcher: diagram, edge, node

#set text(font: "Arial")
#set par(justify: true)
#set page(numbering: "1")

#set page(
  paper: "a4",
  margin: 1in,
)

#set par(
  leading: 0.4em,
  justify: true,
)

#show figure: it => {
  v(1em)
  it
  v(1em)
}

#set math.equation(numbering: "(1)")
#show heading.where(level: 1): it => [
  #align(center)[
    #text(size: 11pt, weight: "bold")[#it.body]
  ]
]

#set text(size: 11pt)
#align(center + horizon)[
  #v(-5em)
  *From Behavioral Inference to Stage-Specific
  Nutrition Support: \ A Theory of Planned Behavior- and Transtheoretical Model- Informed System*

  #v(-5pt)
  Chris John David Manero#super[1],
  Francis Neil Cuadra#super[2],
  Mika Ysabelle Regalado#super[2],
  \ John Lloyd Monterolla#super[2]

]

1 Faculty Researcher, College of Computer Studies
#v(-7pt)
2 Student Researcher, College of Computer Studies

#show heading.where(level: 1): it => [
  #v(1em)
  #align(center)[
    #text(size: 11pt, weight: "bold")[#upper(it.body)]
  ]
  #v(-0.5em)
]


#show heading.where(level: 2): it => [
  #v(1em)
  #align(center)[
    #text(size: 11pt, weight: "bold")[#it.body]
  ]
]


#include "introduction.typ"
#include "methods.typ"
#bibliography("../src/refs.bib")
#include "projectworkplan.typ"
#v(30em)
#include "budgetplan.typ"
