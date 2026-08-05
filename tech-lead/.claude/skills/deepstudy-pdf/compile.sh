#!/usr/bin/env bash
# Compiles a deepstudy-pdf .tex file (built from template.tex) into a PDF.
# Usage: compile.sh path/to/subject.tex
#
# Runs 3 pdflatex passes (TOC + index need a stable page count from a
# prior pass) plus makeindex if the glossary produced a .idx file, with
# -shell-escape so `minted` can call out to pygmentize for syntax
# highlighting. Never call pdflatex directly for these documents.
set -euo pipefail

TEXBIN="/Library/TeX/texbin"
PYBIN="$HOME/Library/Python/3.9/bin"
export PATH="$TEXBIN:$PYBIN:$PATH"

if [ $# -ne 1 ]; then
  echo "usage: $0 path/to/subject.tex" >&2
  exit 1
fi

src="$1"
dir=$(cd "$(dirname "$src")" && pwd)
name=$(basename "$src" .tex)

if ! command -v pdflatex >/dev/null 2>&1; then
  echo "pdflatex not found on PATH (expected under $TEXBIN) — is BasicTeX installed?" >&2
  exit 1
fi
if ! command -v pygmentize >/dev/null 2>&1; then
  echo "pygmentize not found on PATH (expected under $PYBIN) — minted needs it. Run: pip3 install --user Pygments" >&2
  exit 1
fi

cd "$dir"

run_pdflatex() {
  pdflatex -interaction=nonstopmode -halt-on-error -shell-escape "$name.tex" \
    > "$name.compile.log" 2>&1
}

echo "== pass 1/3 =="
if ! run_pdflatex; then
  echo "pdflatex failed on pass 1 — tail of $name.compile.log:" >&2
  tail -40 "$name.compile.log" >&2
  exit 1
fi

if [ -f "$name.idx" ]; then
  echo "== makeindex (glossary index found) =="
  makeindex "$name.idx" >> "$name.compile.log" 2>&1
fi

echo "== pass 2/3 (resolve TOC) =="
run_pdflatex

echo "== pass 3/3 (resolve refs/index) =="
run_pdflatex

if grep -qiE "^! |Fatal error|Emergency stop" "$name.compile.log"; then
  echo "LaTeX reported an error — tail of $name.compile.log:" >&2
  tail -40 "$name.compile.log" >&2
  exit 1
fi

if [ ! -s "$name.pdf" ]; then
  echo "No PDF was produced ($name.pdf missing/empty)" >&2
  exit 1
fi

pages=$(pdfinfo "$name.pdf" 2>/dev/null | awk '/^Pages:/{print $2}')
echo "OK: $dir/$name.pdf generated (${pages:-?} pages)"
