#!/bin/bash

INPUT_FILE="$1"
OUTPUT_FILE="extraction_results.txt"

# This version uses (?i) for case-insensitive and \s* to ignore extra spaces
perl -0777 -ne 'while (/(?i)(\[Tags:\s*.*?\[Memory_Bank:\s*.*?\])/gs) { print "$1\n\n"; }' "$INPUT_FILE" | tee "$OUTPUT_FILE"

# Let's see if we caught anything this time
COUNT=$(grep -c "\[Tags:" "$OUTPUT_FILE")
echo "Scan complete. Found $COUNT matches."
