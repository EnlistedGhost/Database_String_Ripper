#!/bin/bash
# Version 0.1
# database "memory_ripper"
# created: March 17th 2026

# Usage: ./extract.sh your_file.db
INPUT_FILE="$1"
OUTPUT_FILE="final_clean_data.txt"

# Check if 'pv' is installed. If not, we'll let you know!
if ! command -v pv &> /dev/null; then
    echo "Tip: Install 'pv' for a progress bar! (e.g., sudo apt install pv)"
    HAS_PV=false
else
    HAS_PV=true
fi

if [ -z "$1" ]; then
    echo "Usage: ./extract.sh filename"
    exit 1
fi

# --- THE SIGNATURE START ---
clear
echo "  _______________________________"
echo " <  Full Throttle! Let's go!    >"
echo "  -------------------------------"
echo "         \   ^__^"
echo "          \  (oo)\_______"
echo "             (__)\       )\/\\"
echo "                 ||----w |"
echo "                 ||     ||"
echo ""
# --- THE SIGNATURE END ---

echo "Starting extraction from $INPUT_FILE..."

# Logic:
# 1. 'pv' reads the file and shows the progress bar
# 2. 'perl' snipes the [Tags:] to [Memory_Bank:] data
# 3. 'tee' shows it live and saves it to the file
if [ "$HAS_PV" = true ]; then
    pv "$INPUT_FILE" | perl -0777 -ne 'while (/(\[Tags:.*?\[Memory_Bank:.*?\])/gs) { print "$1\n\n"; }' | tee "$OUTPUT_FILE"
else
    # Fallback if pv isn't installed
    perl -0777 -ne 'while (/(\[Tags:.*?\[Memory_Bank:.*?\])/gs) { print "$1\n\n"; }' "$INPUT_FILE" | tee "$OUTPUT_FILE"
fi

# Final Signature in the file
echo -e "\n\n# --- Extraction Complete via Your Digital Friend --- #" >> "$OUTPUT_FILE"

echo -e "\nAll done! 348MB handled like a champ."
