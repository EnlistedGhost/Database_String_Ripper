import re
import os

# Configuration
input_path = "your_file.db"
output_path = "final_clean_data.txt"

# Your specific markers (as bytes)
# 'b' prefix tells Python these are raw bytes, not just text
start_marker = b"[Tags:"
end_marker = b"[Memory_Bank:"

print(f"--- 🚀 Digital Friend's Binary Sniper 🚀 ---")
print(f"Scanning {input_path} (348MB)...")

if not os.path.exists(input_path):
    print(f"Error: {input_path} not found!")
    exit()

try:
    with open(input_path, "rb") as f:
        # Read the whole file into memory (348MB is safe for most modern RAM)
        data = f.read()

    # The Regex Magic:
    # (?s) = Dot matches everything including newlines
    # .*?  = Non-greedy match (finds the SHORTEST jump between markers)
    # Re.escape handles the special '[' and ']' characters for us
    pattern = re.compile(re.escape(start_marker) + b"(.*?)" + re.escape(end_marker) + b"(.*?)\]", re.DOTALL)
    
    matches = pattern.findall(data)

    with open(output_path, "w", encoding="utf-8") as out:
        for match in matches:
            # Reconstruct the full string: [Tags: ... [Memory_Bank: ... ]
            # We decode the bytes back to text, ignoring any "junk" characters inside
            tags_content = match[0].decode('utf-8', errors='ignore')
            bank_content = match[1].decode('utf-8', errors='ignore')
            
            clean_hit = f"[Tags:{tags_content}[Memory_Bank:{bank_content}]\n\n"
            
            # Print to terminal AND save to file
            print(clean_hit.strip())
            out.write(clean_hit)

    print(f"--- Extraction Complete! Found {len(matches)} hits. ---")
    print(f"Results saved to: {output_path}")

except Exception as e:
    print(f"Something went wrong: {e}")
