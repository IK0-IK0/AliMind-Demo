# Citation Errors Fix Bugfix Design

## Overview

This bugfix addresses incorrect citation metadata in the manuscript bibliography (src/refs.bib) that prevents readers from locating the actual referenced works and compromises academic integrity. Nine specific citations contain errors including wrong publication years, incorrect volume/issue numbers, wrong page ranges, malformed DOIs, incorrect author attributions, and in some cases, completely wrong sources.

The fix approach involves systematically verifying each problematic citation online using web search tools, DOI resolution services, journal websites, and academic databases. For unverifiable sources, we will search for alternative sources that support the same claims. All corrections will maintain valid BibTeX syntax and preserve the file's organizational structure.

## Glossary

- **Bug_Condition (C)**: The condition that triggers the bug - when a citation key is one of the 9 identified problematic citations ([3], [4], [7], [8], [30], [32], [53], [54], [57]) and contains incorrect metadata
- **Property (P)**: The desired behavior - citations should contain accurate, verifiable metadata that matches the actual published sources and can be independently verified online
- **Preservation**: Existing correct citations and BibTeX file structure that must remain unchanged by the fix
- **Citation Metadata**: The bibliographic information including authors, title, journal, year, volume, issue, pages, DOI, and URL
- **DOI Resolution**: The process of using a DOI (Digital Object Identifier) to locate the canonical source via doi.org
- **Academic Database**: Online repositories like PubMed, Google Scholar, Semantic Scholar, CrossRef, or publisher websites used to verify citation information
- **Verification Source**: The authoritative online source (DOI.org, journal website, academic database) used to confirm citation accuracy
- **BibTeX Syntax**: The structured format for bibliography entries used by LaTeX/Typst document processors

## Bug Details

### Bug Condition

The bug manifests when a citation key is one of the 9 identified problematic entries and contains metadata that does not match the actual published source. The bibliography system is either storing incorrect publication details, referencing the wrong source entirely, or containing malformed identifiers that prevent source location.

**Formal Specification:**
```
FUNCTION isBugCondition(citation)
  INPUT: citation of type BibTeXEntry
  OUTPUT: boolean
  
  RETURN citation.key IN ['fnri2022enns', '2023dietdoh', 'cruwys2015social', 
                          'jabs2006time', 'diaita2024', 'wang2025', 
                          'abbasian2025opencha', 'mantena2025mhccoach', 
                          'feuerriegel2025nlp']
         AND (citation.metadata != actualPublishedMetadata(citation.key)
              OR NOT isVerifiableOnline(citation))
END FUNCTION
```

### Examples

- **fnri2022enns (reference [3])**: Contains wrong title "Expanded National Nutrition Survey" instead of "Philippine Nutrition Facts and Figures: 2018-2019 Expanded National Nutrition Survey (ENNS)", wrong year 2020 instead of 2022, and unverified statistics
  
- **2023dietdoh (reference [4])**: Missing key part of title - should include "Knowledge, Attitudes and Practices towards Diet across the Philippines"

- **cruwys2015social (reference [7])**: Contains wrong year 2021 instead of 2015, wrong volume 162 instead of 86, and wrong page range

- **jabs2006time (reference [8])**: Completely wrong source attribution with wrong authors, wrong journal, wrong year - attributed to wrong publication entirely

- **diaita2024 (reference [30])**: Missing access date and proper framing for blog post citation

- **wang2025 (reference [32])**: Manuscript contains unverified claim about "Gemini's 50% deviation" that is not found in the cited source

- **abbasian2025opencha (reference [53])**: Contains completely wrong metadata including wrong authors, wrong journal, wrong article number, wrong title

- **mantena2025mhccoach (reference [54])**: References an unreviewed preprint with unverified connection to MHC-Coach dataset

- **feuerriegel2025nlp (reference [57])**: Contains DOI formatting error (missing hyphens) and missing volume/issue/page information

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- All citations NOT in the list of 9 problematic entries must remain exactly as they are
- The BibTeX file structure with topic-based organization and section comments must be preserved
- Valid BibTeX syntax must be maintained throughout the file
- Citation keys must remain unchanged so manuscript references don't break
- The organizational grouping of citations by topic must be preserved

**Scope:**
All citations that are not identified as problematic (not in the list of 9 citation keys) should be completely unaffected by this fix. This includes:
- Correct existing metadata for verified citations
- BibTeX entry formatting and field ordering
- Comment blocks that organize citations by topic
- File encoding and line endings

## Hypothesized Root Cause

Based on the bug description and error patterns, the most likely issues are:

1. **Manual Entry Errors**: Citations were manually entered or copied without verification against the original source
   - Typos in publication years, volumes, or page numbers
   - Incomplete titles or missing subtitle information
   - Incorrect author name spellings or orderings

2. **Source Confusion**: The wrong source was cited or metadata from a different publication was mixed in
   - Reference [8] (jabs2006time) appears to have completely wrong source attribution
   - Reference [32] (wang2025) may cite a source that doesn't contain the claimed information

3. **Incomplete Citation Information**: Some citations lack required fields or verification details
   - Reference [30] (diaita2024) missing access date for online source
   - Reference [57] (feuerriegel2025nlp) missing volume/issue/page details

4. **DOI Formatting Errors**: Malformed DOIs prevent automatic resolution
   - Reference [57] has DOI with missing hyphens

5. **Preprint vs. Published Version Confusion**: Citations may reference preprints without noting their unreviewed status
   - Reference [54] (mantena2025mhccoach) is a preprint with unverified claims

## Correctness Properties

Property 1: Bug Condition - Citation Metadata Accuracy

_For any_ citation where the bug condition holds (isBugCondition returns true), the fixed bibliography SHALL contain accurate metadata that matches the actual published source and can be independently verified online through DOI resolution, journal websites, or academic databases.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 2.12, 2.13**

Property 2: Preservation - Non-Buggy Citation Integrity

_For any_ citation where the bug condition does NOT hold (isBugCondition returns false), the fixed bibliography SHALL preserve exactly the same metadata, formatting, and structure as the original file, maintaining all correct citations unchanged.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**

Property 3: Alternative Source Substitution

_For any_ citation that cannot be verified online and has no accessible source, the fixed bibliography SHALL either provide a verifiable alternative source that supports the same claim OR flag the citation for user review with clear documentation of the verification attempt.

**Validates: Requirements 2.14, 2.15, 2.16, 2.17**

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct:

**File**: `src/refs.bib`

**Function**: Bibliography metadata entries

**Specific Changes**:

1. **fnri2022enns (reference [3]) - Correct FNRI Survey Citation**:
   - Verify correct title: "Philippine Nutrition Facts and Figures: 2018-2019 Expanded National Nutrition Survey (ENNS)"
   - Correct year from 2020 to 2022
   - Correct month to May
   - Verify URL: https://enutrition.fnri.dost.gov.ph/uploads/2018-2019%20ENNS%20FACTS%20AND%20FIGURES_JULY182023.pdf
   - Verify statistics cited in manuscript match the source document

2. **2023dietdoh (reference [4]) - Complete DOH Policy Brief Title**:
   - Add missing title component: "Knowledge, Attitudes and Practices towards Diet across the Philippines"
   - Verify URL: https://www.idinsight.org/wp-content/uploads/2025/01/DOH-HPLS-Nutrition-Diet-Policy-Brief.pdf
   - Confirm authors: Department of Health Philippines and IDinsight
   - Verify year 2023 is correct

3. **cruwys2015social (reference [7]) - Correct Cruwys et al. Citation**:
   - Correct year from 2021 to 2015
   - Correct volume from 162 to 86
   - Correct page range to match published article
   - Verify DOI: 10.1016/j.appet.2014.08.035
   - Verify journal: Appetite

4. **jabs2006time (reference [8]) - Fix Completely Wrong Source**:
   - Verify correct authors: Jabs, Jennifer and Devine, Carol M.
   - Verify correct journal: Appetite
   - Verify correct year: 2006
   - Verify correct volume: 47
   - Verify correct issue: 2
   - Verify correct pages: 196-204
   - Verify DOI: 10.1016/j.appet.2006.02.014
   - Search for actual source online to confirm all metadata

5. **diaita2024 (reference [30]) - Add Blog Post Access Date**:
   - Add access date: "Accessed: March 31, 2026"
   - Verify URL is accessible: https://blog.bestiario.org/introducing-diaita-an-ai-driven-diet-assistant-designed-to-support-cancer-patients-and-caregivers-along-their-recovery-journey
   - Confirm proper framing as blog post in note field

6. **wang2025 (reference [32]) - Verify Gemini Claim**:
   - Search the Wang et al. 2025 paper for "Gemini" and "50% deviation" claim
   - If claim not found, document that manuscript text needs correction
   - Verify all other metadata (authors, title, journal, volume, pages, DOI) is correct
   - If source doesn't support the claim, search for alternative sources that do

7. **abbasian2025opencha (reference [53]) - Correct All Metadata**:
   - Verify correct authors: Abbasian, Mohammadmahdi et al.
   - Verify correct journal: JAMIA Open
   - Verify correct volume: 8
   - Verify correct issue: 4
   - Verify correct article number: ooaf067
   - Verify correct title: "Conversational Health Agents: A Personalized LLM-Powered Agent Framework"
   - Verify DOI: 10.1093/jamiaopen/ooaf067
   - Search academic databases to confirm all details

8. **mantena2025mhccoach (reference [54]) - Verify Preprint Claims**:
   - Confirm this is a medRxiv preprint (not peer-reviewed)
   - Verify DOI: 10.1101/2025.02.19.25322559
   - Search for MHC-Coach dataset connection in the paper
   - Add note about preprint status if not already present
   - If MHC-Coach connection unverified, add caveat or flag for review

9. **feuerriegel2025nlp (reference [57]) - Fix DOI and Add Missing Info**:
   - Correct DOI format from malformed to: 10.1038/s44159-024-00392-z
   - Add volume: 4
   - Add issue: 2
   - Add pages: 96-111
   - Verify all metadata via DOI resolution at doi.org

### Verification Process

For each citation correction:

1. **DOI Resolution**: If DOI exists, resolve it via https://doi.org/ to get canonical metadata
2. **Journal Website Search**: Search the publisher's website for the article
3. **Academic Database Search**: Check PubMed, Google Scholar, Semantic Scholar, or CrossRef
4. **Cross-Reference**: Compare metadata across multiple sources to ensure consistency
5. **Document Sources**: Note which verification sources were used for each correction
6. **Alternative Source Search**: If original source unverifiable, search for alternative sources supporting the same claim
7. **Flag Unverifiable**: If no verification possible and no alternatives found, flag for user review

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, document the current incorrect metadata and attempt online verification to confirm the errors, then verify that corrected metadata can be independently verified online and matches authoritative sources.

### Exploratory Bug Condition Checking

**Goal**: Document the current incorrect metadata for each of the 9 problematic citations BEFORE implementing the fix. Attempt to verify the current metadata online to confirm it doesn't match published sources.

**Test Plan**: For each of the 9 citations, attempt to verify the current metadata using DOI resolution, journal website searches, and academic database searches. Document where verification fails and what the correct metadata should be.

**Test Cases**:
1. **fnri2022enns Test**: Search for "Expanded National Nutrition Survey 2020" - should fail to find exact match (will fail on unfixed code)
2. **cruwys2015social Test**: Resolve DOI 10.1016/j.appet.2014.08.035 - should show year 2015, not 2021 (will fail on unfixed code)
3. **jabs2006time Test**: Search for current authors/journal combination - should not find the cited article (will fail on unfixed code)
4. **feuerriegel2025nlp Test**: Attempt to resolve malformed DOI - should fail (will fail on unfixed code)
5. **abbasian2025opencha Test**: Search for current metadata combination - should not match any published article (will fail on unfixed code)

**Expected Counterexamples**:
- DOI resolution fails or returns different metadata than what's in refs.bib
- Journal website searches don't find articles matching the current metadata
- Academic database searches return different publication years, volumes, or page ranges
- Possible causes: manual entry errors, source confusion, incomplete information, DOI formatting errors

### Fix Checking

**Goal**: Verify that for all citations where the bug condition holds, the fixed bibliography contains accurate metadata that can be independently verified online.

**Pseudocode:**
```
FOR ALL citation WHERE isBugCondition(citation) DO
  correctedMetadata := getCorrectedMetadata(citation)
  ASSERT isVerifiableOnline(correctedMetadata)
  ASSERT correctedMetadata = getAuthoritative Metadata(citation.doi OR citation.title)
  ASSERT allRequiredFieldsPresent(correctedMetadata)
  ASSERT validBibTeXSyntax(correctedMetadata)
END FOR
```

**Test Cases**:
1. **DOI Resolution Test**: For each corrected citation with a DOI, resolve it via doi.org and verify metadata matches
2. **Journal Website Test**: Search publisher websites for each corrected citation and verify metadata matches
3. **Academic Database Test**: Search PubMed/Google Scholar for each corrected citation and verify metadata matches
4. **Cross-Reference Test**: Verify metadata is consistent across multiple verification sources
5. **BibTeX Syntax Test**: Parse the corrected refs.bib file and verify no syntax errors
6. **Alternative Source Test**: For citations replaced with alternatives, verify the new source supports the same claim

### Preservation Checking

**Goal**: Verify that for all citations where the bug condition does NOT hold, the fixed bibliography preserves exactly the same metadata and structure as the original.

**Pseudocode:**
```
FOR ALL citation WHERE NOT isBugCondition(citation) DO
  ASSERT bibliography_original(citation) = bibliography_fixed(citation)
END FOR

ASSERT fileStructure_original = fileStructure_fixed
ASSERT topicComments_original = topicComments_fixed
ASSERT citationKeys_original = citationKeys_fixed
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It can verify that all non-buggy citations remain unchanged across the entire file
- It catches accidental modifications to correct citations
- It provides strong guarantees that file structure and organization are preserved

**Test Plan**: Before making changes, create a snapshot of all non-problematic citations. After corrections, verify that these citations remain byte-for-byte identical.

**Test Cases**:
1. **Non-Buggy Citation Preservation**: Verify all citations not in the list of 9 remain unchanged
2. **File Structure Preservation**: Verify topic section comments remain in place
3. **Citation Key Preservation**: Verify all citation keys remain unchanged
4. **BibTeX Format Preservation**: Verify field ordering and formatting style is preserved
5. **Encoding Preservation**: Verify file encoding and line endings remain unchanged

### Unit Tests

- Test DOI resolution for each corrected citation
- Test journal website searches return matching metadata
- Test academic database searches return matching metadata
- Test BibTeX syntax validation on corrected entries
- Test that citation keys remain unchanged
- Test that non-buggy citations are preserved exactly

### Property-Based Tests

- Generate verification attempts for all 9 problematic citations and verify they can be resolved online
- Generate comparison checks for all non-problematic citations to verify preservation
- Test that all corrected citations have complete required fields (author, title, year, journal/booktitle)
- Test that all DOIs are properly formatted and resolvable

### Integration Tests

- Test full bibliography file parses correctly with BibTeX/Typst parser
- Test that manuscript compilation still works with corrected citations
- Test that citation numbers [3], [4], [7], [8], [30], [32], [53], [54], [57] still resolve correctly in compiled document
- Test that corrected metadata can be independently verified by a third party using the documented verification sources
