import re
from pathlib import Path
import sys

def extract_links_from_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Match markdown links [text](url) and bare URLs
    urls = re.findall(r'\[([^\]]+)\]\(([^)]+)\)|(?<![\(\[])(https?://[^\s\)]+)', content)
    # Flatten and clean the results
    links = []
    for match in urls:
        if isinstance(match, tuple):
            # If it's a markdown link, take the URL part
            link = match[1]
        else:
            # If it's a bare URL
            link = match
        # Remove any trailing punctuation that might have been caught
        link = re.sub(r'[.,;:]$', '', link)
        links.append(link)
    return links

def main():
    docs_dir = Path('docs')
    md_files = list(docs_dir.rglob('*.md'))
    all_links = []

    print("Checking links in markdown files...")
    for file_path in md_files:
        links = extract_links_from_file(file_path)
        if links:
            print(f"\nLinks found in {file_path}:")
            all_links.extend(links)
            for link in links:
                print(f"  {link}")

    print("\nVerifying links...")
    broken_links = []
    for link in all_links:
        if link.startswith(('http://', 'https://')):
            print(f"Skipping external link: {link}")
            continue
        
        # Construct the absolute path to the linked file
        linked_file_path = docs_dir / link

        # Check if the file exists
        if not linked_file_path.exists():
            print(f"❌ Broken link: {link}")
            broken_links.append(link)

    if broken_links:
        print("\nBroken links found:")
        for link in broken_links:
            print(f"- {link}")
        sys.exit(1)
    else:
        print("\nAll links are valid!")
        sys.exit(0)

if __name__ == '__main__':
    main()
