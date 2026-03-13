#import "@preview/fletcher:0.5.8" as fletcher: diagram, edge, node

#set text(font: "Times New Roman")
#set par(justify: true)
#set page(numbering: "1")

#show figure: it => {
  v(1em)
  it
  v(1em)
}

#show heading.where(level: 1): it => [
  #v(1em)
  #align(center)[
    #text(size: 12pt, weight: "bold")[#upper(it.body)]
  ]
]

#show heading.where(level: 2): it => [
  #v(1em)
  #align(center)[
    #text(size: 12pt, weight: "bold")[#it.body]
  ]
]

#include "introduction.typ"
#include "methods.typ"

#bibliography("/src/refs.bib")
