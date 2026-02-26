# Writing guidelines

This document sets the writing style for this seminar report (see `docs/toc.md`). The goal is to be easy to read for newcomers, while still being precise.

## What we are writing

- **Type**: A seminar report with practical advice.
- **Default voice**: Neutral and explanatory (Wikipedia-like).
- **When to switch voice**: In clearly labeled **Recommendations** or **How-to** parts, it is OK to write directly (for example: “You can…”).

## Core principles

### Be neutral and specific

- State what something _is_ and how it works before judging it.
- Prefer conditions over absolutes.
  - Good: “This can reduce tracking in many cases, but it does not prevent fingerprinting.”
  - Avoid: “This stops tracking.”
- Separate **facts** from **recommendations**.

### Explain terms on first use

- On first use, give a short definition.
- If a term is overloaded, disambiguate.
  - Example: “Security (protection from attacks) is not the same as privacy (control over personal information).”

### Use a lead-first structure

For each page and for major sections:

1. First paragraph: short summary of what the section covers.
2. Next: background and key concepts.
3. Then: risks/threats.
4. Then: recommendations and trade-offs.

### Prefer plain language

- Keep sentences short.
- Use common words when they do the job.
- If you must use jargon, define it and keep using the same term consistently.

### Make trade-offs explicit

Most privacy/security choices are trade-offs. State the cost.

- usability cost (extra steps, breakage)
- compatibility cost (some websites/apps may fail)
- security trade-off (new attack surface)
- privacy trade-off (new data exposure)

## Inclusive language and accessibility

These guidelines apply throughout the report (background, threats, and recommendations).

### Write for a broad audience

- Assume readers have different cultural contexts, identities, and levels of English proficiency.
- Prefer clear, literal wording over clever phrasing.
- If a term could plausibly be exclusionary or carry harmful associations, choose a clearer alternative.

### Research questionable terms and consider context

- If you are unsure about a term or expression, quickly check its origin and common modern connotations.
- Context matters: some words are inappropriate when applied to people but fine when applied to device or software behavior.

### Avoid violent, oppressive, or ableist metaphors

Avoid describing routine technical behavior using metaphors that are inherently violent, oppressive, or ableist.

- Avoid terms like “kill”, “hang”, and similar violent metaphors.
- Avoid “master/slave” terminology.
- Avoid ableist phrases like “sanity check”.

Prefer literal descriptions (what happens) over metaphors (how it feels).

### Avoid idioms and colloquialisms

Idioms can be hard to understand for non-native readers and can be difficult to translate.

- Avoid phrases like “fall through the cracks” or “on the same page”.
- Prefer direct alternatives: “be missed”, “agree on the same definition”, “in this section”, and so on.

### Avoid color-as-morality metaphors

Avoid using colors to convey “good/bad” values (for example, “blacklist/whitelist”).

- Choose replacements case-by-case based on meaning (for example: allow/deny, permit/block, include/exclude).
- If color is relevant, use it only to describe actual colors (for example, “black text on a white background”).

### Gender-inclusive writing

- Avoid binary framing when gender is not relevant.
- Do not use gendered pronouns for an unspecified person. Use singular “they/them/their”, or rewrite the sentence to avoid pronouns.
- For real people, do not assume pronouns. If a person’s pronouns are unknown and not available from a reliable source, rewrite to use their name or avoid pronouns.

### Writing about disability (especially in instructions)

- Mention disability only when it is relevant to the point being made.
- Avoid framing disability as something to “overcome”, or using condescending praise.
- Avoid using “normal”, “healthy”, or “regular” to mean “nondisabled”. Use “nondisabled person” or “person without a disability” when needed.
- In instructions, avoid phrasing that assumes a specific sense (“you see…”, “you hear…”). Prefer describing the event: “A message appears”, “An alert sounds”, “The device vibrates”.

### Examples and representation

- Use diverse names in examples.
- Avoid examples that assume a single culture, family structure, or affluent lifestyle.

## Privacy and tracking terminology (use consistently)

When writing about web tracking prevention, define terms explicitly and use them consistently. If a chapter is tracking-heavy, include a short “Terminology” section near the top (before mechanisms).

Suggested canonical terms (based on WebKit’s tracking-prevention documentation):

- **Registrable domain (eTLD+1)**: effective top-level domain plus one label, as defined by the Public Suffix List.
- **Website / site (for this report)**: state what you mean. If you follow WebKit’s convention, treat http and https as the same “site” for cookie/tracking discussions because cookies can span schemes.
- **First party / third party**: first party is what is shown in the URL bar; third party is any other registrable domain loaded as a subresource.
- **Cross-site**: across different websites/registrable domains (for example, a first-party loading a third-party resource).
- **Partitioning**: separate storage/state per first-party website to prevent cross-site correlation.
- **Ephemeral storage**: storage that does not persist to disk and is removed when the session/app ends.
- **Stateful tracking**: tracking using client-side state (cookies, storage, caches).
- **Fingerprinting (stateless tracking)**: tracking without explicit client storage, using properties of the device, browser, or network.
- **Link decoration**: tracking identifiers added to URLs (query string or fragments).

## Units of measure (technical writing)

Use units consistently and in a way that is easy to read and hard to misinterpret.

- **Spell out on first use (when writing for a general audience):** In narrative text, spell out a unit and put the abbreviation in parentheses the first time you use it in a section when the abbreviation may not be familiar.
- **Noun form:** When using a unit symbol/abbreviation as a noun, put a space between the number and the unit.
  - Example: “20 GB of memory”.
- **Adjective form:**
  - If you spell out the unit in a compound adjective, hyphenate: “17-inch display”, “3-meter cable”.
  - If you use a unit symbol/abbreviation in a compound adjective, do not hyphenate; keep a space: “30 GB capacity”.
- **Plurals:** Unit symbols and abbreviations do not change for plurals (for example, “lb.” not “lbs.”).
- **SI punctuation:** Do not add periods to SI unit symbols (unless the unit appears at the end of a sentence).
- **Don’t mix styles:** Don’t mix unit symbols and names in a single expression (avoid “m/second” or “J/sec.”).

## Technical notation and code typography

Use code typography consistently to make technical parts scannable.

- Use code font for:
  - code and code fragments
  - file/directory/library names
  - literal syntax elements
- In prose, do not treat commands/function names as verbs.
  - Prefer: “Run `ls` on both directories.”
  - Avoid: “`ls` both directories.”
- Avoid mixing fonts within a single word. If pluralization or grammar would force this, rewrite.
- **Placeholder names:** In running text, italicize placeholder names (the “replace this with a value” tokens) and spell them exactly as in the syntax description.
- **Placeholder naming discipline:** Use consistent placeholder names (don’t alternate between near-synonyms).
- Avoid `foo`/`bar`/`baz` as placeholders in examples. Prefer names that suggest meaning or ordering.

## International style (reduce ambiguity)

When writing data-like text (dates, times, currencies, codes), use formats that are unambiguous internationally.

- **Dates and times (ISO 8601):** Use `YYYY-MM-DD`. Use 24-hour time. Use `Z` for UTC, and specify offsets where relevant.
- **Currency (ISO 4217):** Use an amount followed by a space and a three-letter code (for example, “1199 USD”). Avoid ambiguous currency symbols when the audience is global.
- **Country and language codes (ISO):** If you use codes in tables, use ISO standards and make it clear what the codes represent.
- **Decimals and large numbers:** Use a period for decimals in English. For large numbers, avoid comma/period group separators; use a (nonbreaking) space if grouping is needed.
- **Telephone numbers (ITU E.123):** Prefer `+` followed by country code and spaced groupings (for example, “+1 408 996 1010”).
- **Units:** Prefer SI units by default; include non-metric equivalents in parentheses only when needed for safety or to match a product name.

## Voice and wording rules

### Default voice (encyclopedic)

Use this in definitions, background, and threat sections.

- Avoid second-person (“you/your”) in these parts.
- Avoid rhetorical questions.
- Avoid “sales” language.

#### Example paragraph (default voice)

A web browser is a large and complex application that processes untrusted content from many sources. Because it handles scripts, media, fonts, and network requests, it is a common target for exploits and a common source of tracking data.

### Recommendation voice (practical)

Use this in **Recommendations**, **How-to**, or **Checklist** sections.

- It is OK to use “you” and imperatives.
- Keep steps concrete and ordered.
- Mention prerequisites.

#### Example paragraph (recommendation)

If you use multiple browser profiles, give each profile a clear purpose (for example: “banking”, “work”, “social”). This reduces cross-site tracking between activities and makes it easier to audit extensions and saved logins.

## Claims, comparisons, and citations

### How strong claims should be

- If a claim is well-known and uncontroversial, state it plainly.
- If a claim depends on conditions, name the conditions.
- If a claim is uncertain or debated, say that and avoid definitive wording.

#### Example (qualified comparison)

Blocking third-party cookies can reduce common tracking methods, but many sites also use fingerprinting and first-party storage for tracking. As a result, cookie controls help, but they are not a complete anti-tracking solution.

### Citations policy

- Add citations (links or footnotes) for:
  - statistics and numbers
  - specific technical claims that are not obvious
  - comparisons between products/approaches
  - anything likely to be challenged

#### Preferred formats

- Inline link: `… according to the W3C …` (link the organization or document)
- Footnote: Use Markdown footnotes (`[^1]`) when a link would clutter the paragraph.

## Formatting rules (Markdown)

### Headings

- Use sentence case: “Browser threat landscape”, not “Browser Threat Landscape”.
- Keep headings short.
- Avoid headings that are just synonyms (“Overview”, “Introduction”) unless they add structure.

### Lists

- Prefer `-` lists over special bullet characters.
- Keep list items parallel (same grammatical form).

### Emphasis

- Use **bold** for key terms when defining them.
- Avoid excessive italics.

### Links

- Prefer descriptive link text.
  - Good: “See the section on DNS over HTTPS.”
  - Avoid: “Click here.”

## Words and phrases to avoid

This project aims for plain writing. Avoid these patterns unless there is a strong reason.

- “life cycle” → use “steps”, “process”, or “what happens over time”
- “utilize” → use “use”
- “leverage” → use “use” or “take advantage of” (only if needed)
- “robust” → say what is robust (for example: “resists brute-force attacks”)
- “therefore/thus/hence” → often can be removed, or replace with “so”
- “aforementioned” → repeat the noun
- “paradigm/framework” → say what it is (method, approach, model)
- “in order to” → use “to”

Also avoid vague “confidence words” without support:

- “best”, “perfect”, “secure”, “safe”, “private” (without scope and conditions)

Inclusive-language additions (avoid unless you are quoting a source or the term is unavoidable in a specific technical context):

- violent metaphors for routine actions (for example, “kill”, “hang”)
- oppressive relationship metaphors (for example, “master/slave”)
- ableist phrases used as correctness checks (for example, “sanity check”)
- color-as-morality metaphors (for example, “blacklist/whitelist”) — choose a literal replacement based on meaning

## Section templates (copy/paste)

### Page template

Use this skeleton for a new chapter/page.

- Lead (2–4 sentences)
- Terminology / key terms (optional, but recommended for tracking-heavy chapters)
- Background (how it works)
- Threats (what can go wrong)
- Recommendations (what to do)
- Trade-offs and limits
- References (links / footnotes)

## Sources and inspirations

- Apple Style Guide excerpts: inclusive writing, units of measure, technical notation, and international style in `../Apple - Writing inclusively.md`.
- WebKit: [Tracking Prevention in WebKit](https://webkit.org/tracking-prevention/) and [Tracking Prevention Policy](https://webkit.org/tracking-prevention-policy/).

### Definition section

Template:

- Define the term in one sentence.
- Explain why it matters in this report.
- Clarify common confusion.

Example paragraph:

Privacy is the ability to limit what personal information is collected, shared, or inferred about a person. In practice, it often focuses on reducing unnecessary data exposure and limiting linkability between activities.

### Threats section

Template:

- Name the threat.
- Explain how it works (one level deeper than a headline).
- Explain impact.
- Mention common misconceptions.

Example paragraph:

Browser fingerprinting identifies a device by combining many small signals, such as installed fonts, screen size, and rendering behavior. Unlike cookies, fingerprinting can still work when storage is cleared, although its reliability varies across setups and sites.

### Recommendations section

Template:

- List actions in priority order.
- For each action: purpose → how to do it → what it breaks.
- Prefer defaults that are safe and maintainable.

Example paragraph:

Start by removing extensions you do not actively use, then keep a short allowlist of trusted extensions. Extensions often have broad access to browsing data, so fewer extensions generally means less exposure.

### Trade-offs section

Template:

- State the trade-off.
- Say who it affects.
- Offer a fallback option.

Example paragraph:

Using strict content blocking can improve privacy, but it may also break logins or embedded media on some sites. A practical fallback is to keep a separate “compatibility” browser profile with fewer blockers, used only when needed.

### Checklist section

Template:

- Keep items short.
- Make each item testable (“can I verify it?”).

Example list:

- Are browser profiles separated by purpose?
- Are extensions limited to an allowlist?
- Is MFA enabled on the primary email account?

## Pre-write checklist

Before writing a section, answer these quickly:

- What is the reader trying to do or understand?
- What is the threat model level (casual tracking, targeted phishing, device compromise, etc.)?
- What assumptions am I making (platform, budget, skill)?
- What is the simplest safe recommendation?

## Editing checklist

Before you consider a page “done”:

- The first paragraph summarizes the section.
- Jargon is defined on first use.
- Strong claims are cited or qualified.
- Recommendations are separated from background facts.
- Trade-offs are stated.
- Formatting is consistent (headings, lists, links).
