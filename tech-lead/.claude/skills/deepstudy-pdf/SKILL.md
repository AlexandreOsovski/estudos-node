---
name: deepstudy-pdf
description: Generate a deep-study LaTeX/PDF document on any subject — "crie um PDF sobre X", "gere material de estudo sobre X", "deep study: X", "quero aprender profundamente sobre X". Use when asked to write, build, compile, or generate a study PDF, not just explain a topic in chat.
---

This skill produces a real, compiled PDF book (LaTeX `book` class) on
any subject, with theory, an architecture chapter, worked code
examples (syntax-highlighted via `minted`), diagrams (`tikz`), and a
glossary with an index. The agent path is: fill in
`template.tex` → compile it with `compile.sh` → verify the resulting
PDF with `pdfinfo`/`pdftoppm`. Do not call `pdflatex` directly — the
document needs a 3-pass build (`-shell-escape` for `minted`, then a
TOC pass, then a refs/index pass) that `compile.sh` handles.

All paths below are relative to `tech-lead/` (this skill's unit).

## Prerequisites

A LaTeX toolchain (BasicTeX) plus a few CTAN packages and Pygments
(for `minted`'s syntax highlighting). These installs need `sudo` and
**must be run in a real Terminal.app window**, not through Claude's
Bash tool or the `!`-prefixed inline-command channel — both of those
run without a TTY, so `sudo` fails with "a password is required".

```bash
brew install --cask basictex
# open a new terminal tab (or: eval "$(/usr/libexec/path_helper)") so pdflatex is on PATH
sudo tlmgr update --self
sudo tlmgr install collection-latexextra collection-pictures collection-fontsrecommended minted fvextra
pip3 install --user Pygments
brew install poppler   # pdfinfo/pdftoppm, for verifying output — no sudo needed
```

Verified this session: `pdflatex` and `tlmgr` land at
`/Library/TeX/texbin/` (not on `PATH` by default outside an
interactive login shell); `pygmentize` lands at
`~/Library/Python/3.9/bin/`. `compile.sh` hardcodes both paths so it
works regardless of the calling shell's `PATH`.

## Run (agent path)

```bash
mkdir -p output
cp .claude/skills/deepstudy-pdf/template.tex output/<slug>.tex
# edit output/<slug>.tex:
#  - replace @@TITULO@@ and @@SUBTITULO@@
#  - write real content into each %% TODO chapter (see template for structure)
.claude/skills/deepstudy-pdf/compile.sh output/<slug>.tex
```

`compile.sh` prints `OK: <path>.pdf generated (N pages)` on success,
or on failure dumps the tail of `<slug>.compile.log` and exits
non-zero. On success, sanity-check the actual rendering before calling
it done — a clean compile does not mean the content looks right:

```bash
brew list poppler >/dev/null 2>&1 || brew install poppler
pdftoppm -png -r 100 output/<slug>.pdf /tmp/<slug>-page
# then view /tmp/<slug>-page-1.png (title page) and a couple of content pages
```

Verified this session end-to-end with two real samples:
`output/event-loop.tex` (9 pages, Node.js event loop) and a 16-page
sample on computer architecture (transistors → logic gates → von
Neumann → fetch-decode-execute → memory hierarchy → RISC-V assembly →
TypeScript, with a `gas`-highlighted assembly listing, a
`typescript`-highlighted listing, four distinct `tikz` diagrams — logic
gate, bus/block diagram, pipeline diagram, memory-hierarchy pyramid —
and a populated `Index` with correct page backreferences). Both
rendered correctly on visual inspection, not just a clean compile.

## Test

Compile the untouched `template.tex` as a smoke test — it has no real
content but must still produce a valid PDF (title page + 4 empty
chapters + appendix + empty index, 8 pages):

```bash
cp .claude/skills/deepstudy-pdf/template.tex /tmp/baseline.tex
.claude/skills/deepstudy-pdf/compile.sh /tmp/baseline.tex
```

## Gotchas

- **`sudo` through Claude's Bash tool (or `!command`) always fails
  with "a password is required"** — neither channel has a TTY. Any
  one-time `tlmgr`/`brew --cask` install step has to be run by the
  user directly in Terminal.app.
- **`<<TITULO>>` is not a safe placeholder marker** — Computer Modern
  ligates `<<` and `>>` into `«`/`»` guillemets, so double-angle-bracket
  placeholders silently survive as typeset quote marks instead of
  vanishing text. The template uses `@@TITULO@@` / `@@SUBTITULO@@`
  instead (verified: `@` has no ligature or catcode surprise here).
- **`tikz` arrow tips like `Stealth` throw `Unknown arrow tip kind`**
  unless `\usetikzlibrary{arrows.meta}` is loaded — plain `\usepackage{tikz}`
  isn't enough for modern arrow syntax. Already in `template.tex`;
  don't drop it if you strip imports "to simplify."
- **`trapezium`/other named `tikz` node shapes fail with "I do not
  know the key `/tikz/trapezium`"** unless `\usetikzlibrary{shapes.geometric}`
  is loaded. Needed for anything like a memory-hierarchy pyramid.
  Already in `template.tex`.
- **`right=0.3cm of <node>` positioning syntax fails with a PGF Math
  Error ("Unknown operator `o` or `of`")** unless
  `\usetikzlibrary{positioning}` is loaded. Already in `template.tex`.
- **`tikz` nodes with `minimum width` but no `text width` silently
  overlap** when the label text is longer than the minimum — the box
  auto-expands to fit an unwrapped line, and two adjacent boxes can
  end up overlapping each other's text (looked fine in the `.tex`,
  broken in the rendered PDF — only caught by actually rendering the
  page, not by a clean compile). Use `text width=<N>cm` instead of (or
  together with) `minimum width` for any box containing more than a
  couple of words, and leave enough horizontal distance between node
  centers for both wrapped widths plus label room.
- **`pdflatex`/`tlmgr`/`pygmentize` are not on `PATH`** even after a
  successful install, unless the shell is interactive/login. Don't
  rely on ambient `PATH` — `compile.sh` exports the exact
  `/Library/TeX/texbin` and `~/Library/Python/3.9/bin` paths itself.
- **`imakeidx` + `\printindex` with zero `\index{}` calls still
  compiles fine** (empty Index chapter) — you don't need to skip
  indexing for topics where a glossary doesn't make sense, but do add
  real `\index{termo}` calls near each glossary term so the index is
  actually useful, not just present.

## Troubleshooting

- **`pdflatex failed on pass 1` / `Unknown arrow tip kind 'Stealth'`**:
  missing `\usetikzlibrary{arrows.meta}` before the `\begin{tikzpicture}`
  that uses `-Stealth` or similar modern arrow syntax.
- **`I do not know the key '/tikz/trapezium'`**: missing
  `\usetikzlibrary{shapes.geometric}`.
- **`Package PGF Math Error: Unknown operator 'o' or 'of'`** on a line
  using `right=... of <node>`: missing `\usetikzlibrary{positioning}`.
- **Two `tikz` boxes' text visibly collides in the rendered PDF** even
  though the `.tex` compiled clean: give the node style a `text width`
  so long labels wrap instead of expanding the box into its neighbor.
- **`pygmentize not found on PATH`** (from `compile.sh`'s own
  precheck): Pygments isn't installed for this user — run
  `pip3 install --user Pygments`.
- **`pdflatex not found on PATH`**: BasicTeX isn't installed, or was
  installed but `/Library/TeX/texbin` doesn't exist yet — check with
  `ls /Library/TeX/texbin` and `brew list --cask basictex`.
- **`sudo: a password is required`** during `tlmgr`/`brew --cask`:
  you're running from Claude's Bash tool or `!command`, neither of
  which has a TTY for the password prompt. Ask the user to run it in
  Terminal.app directly.
