# Bugfix Requirements Document

## Introduction

The manuscript bibliography (src/refs.bib) contains multiple citations with incorrect metadata that doesn't match the actual published sources. These errors include wrong publication years, incorrect volume/issue numbers, wrong page ranges, malformed DOIs, incorrect author attributions, and in some cases, completely wrong sources. This compromises the academic integrity of the manuscript and prevents readers from locating the actual referenced works.

The errors were identified through manual verification against the original published sources and documented in a Discord conversation and the REFS_VALIDITY_CHECK.md file. Nine specific citations require correction: [3], [4], [7], [8], [30], [32], [53], [54], and [57].

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the citation key is `fnri2022enns` (reference [3]) THEN the system contains wrong title ("Expanded National Nutrition Survey" instead of "Philippine Nutrition Facts and Figures"), wrong year (2020 instead of 2022), and unverified statistics

1.2 WHEN the citation key is `2023dietdoh` (reference [4]) THEN the system contains wrong title (missing "Knowledge, Attitudes and Practices towards Diet across the Philippines")

1.3 WHEN the citation key is `cruwys2015social` (reference [7]) THEN the system contains wrong year (2021 instead of 2015), wrong volume (162 instead of 86), and wrong page range

1.4 WHEN the citation key is `jabs2006time` (reference [8]) THEN the system contains completely wrong source attribution (wrong authors, wrong journal, wrong year - attributed to wrong publication)

1.5 WHEN the citation key is `diaita2024` (reference [30]) THEN the system is missing access date and proper framing for blog post citation

1.6 WHEN the citation key is related to Wang et al. (reference [32]) THEN the manuscript contains unverified claim about "Gemini's 50% deviation" that is not found in the cited source

1.7 WHEN the citation key is `abbasian2025opencha` (reference [53]) THEN the system contains completely wrong metadata (wrong authors, wrong journal, wrong article number, wrong title)

1.8 WHEN the citation key is `mantena2025mhccoach` (reference [54]) THEN the system references an unreviewed preprint with unverified connection to MHC-Coach dataset

1.9 WHEN the citation key is `feuerriegel2025nlp` (reference [57]) THEN the system contains DOI formatting error (missing hyphens) and missing volume/issue/page information

### Expected Behavior (Correct)

2.1 WHEN the citation key is `fnri2022enns` THEN the system SHALL contain correct title "Philippine Nutrition Facts and Figures: 2018-2019 Expanded National Nutrition Survey (ENNS)", correct year 2022, correct month May, and verified statistics

2.2 WHEN the citation key is `2023dietdoh` THEN the system SHALL contain correct title "Knowledge, Attitudes and Practices towards Diet across the Philippines" with accurate metadata

2.3 WHEN the citation key is `cruwys2015social` THEN the system SHALL contain correct year 2015, correct volume 86, and correct page range

2.4 WHEN the citation key is `jabs2006time` THEN the system SHALL contain correct authors (Jabs, Jennifer and Devine, Carol M.), correct journal (Appetite), correct year 2006, correct volume 47, correct issue 2, and correct pages 196-204

2.5 WHEN the citation key is `diaita2024` THEN the system SHALL include access date "Accessed: March 31, 2026" and proper framing as a blog post citation

2.6 WHEN manuscript text references Wang et al. for "Gemini's 50% deviation" claim THEN the system SHALL either verify the claim exists in the source or remove/modify the claim to match what the source actually states

2.7 WHEN the citation key is `abbasian2025opencha` THEN the system SHALL contain correct authors (Abbasian, Mohammadmahdi et al.), correct journal (JAMIA Open), correct volume 8, correct issue 4, correct article number ooaf067, and correct title "Conversational Health Agents: A Personalized LLM-Powered Agent Framework"

2.8 WHEN the citation key is `mantena2025mhccoach` THEN the system SHALL verify the MHC-Coach dataset connection or add appropriate caveats about preprint status and unverified claims

2.9 WHEN the citation key is `feuerriegel2025nlp` THEN the system SHALL contain properly formatted DOI (10.1038/s44159-024-00392-z), correct volume 4, correct issue 2, and correct pages 96-111

2.10 WHEN correcting citation metadata THEN the system SHALL verify the metadata using online sources including web search tools, DOI resolution services, journal websites, and academic databases

2.11 WHEN correcting citation metadata THEN the system SHALL cross-reference multiple online sources (DOIs, journal websites, academic databases) to ensure accuracy and consistency

2.12 WHEN correcting citation metadata THEN the system SHALL document the sources used for verification (e.g., DOI.org, publisher website, Google Scholar, PubMed) to enable independent verification

2.13 WHEN all citation corrections are complete THEN the system SHALL ensure that all corrected citations can be independently verified online through their DOIs, journal websites, or academic database entries

2.14 WHEN a source cannot be verified online THEN the system SHALL search for alternative sources that support the same claim or finding

2.15 WHEN alternative sources are used instead of the original unverifiable source THEN the system SHALL document the substitution with a note explaining why the original source was replaced

2.16 WHEN alternative sources are found THEN the system SHALL provide recommendations for replacing unverifiable sources with verifiable alternatives that maintain the same academic support for the claim

2.17 WHEN a source cannot be verified online and no suitable alternative sources exist THEN the system SHALL flag the source for user review with a clear indication that manual verification or removal may be required

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a citation is not in the list of identified errors ([3], [4], [7], [8], [30], [32], [53], [54], [57]) THEN the system SHALL CONTINUE TO maintain its existing metadata without modification

3.2 WHEN a citation has correct metadata THEN the system SHALL CONTINUE TO preserve that correct metadata

3.3 WHEN the bibliography file structure uses BibTeX format THEN the system SHALL CONTINUE TO maintain valid BibTeX syntax

3.4 WHEN citations are organized by topic groups with section comments THEN the system SHALL CONTINUE TO preserve the organizational structure

3.5 WHEN other manuscript files reference these citations THEN the system SHALL CONTINUE TO use the same citation keys without breaking references
