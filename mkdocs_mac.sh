#!/bin/bash

echo "🔧 Setting up MkDocs Python environment..."

# Step 1: Ensure Cairo and pkg-config are installed
echo "📦 Checking Homebrew packages..."
brew install cairo pkg-config || true

# Step 2: Set environment variables
CAIRO_PREFIX=$(brew --prefix cairo)

echo "📁 Setting PKG_CONFIG_PATH and DYLD_LIBRARY_PATH"
export PKG_CONFIG_PATH="${CAIRO_PREFIX}/lib/pkgconfig"
export DYLD_LIBRARY_PATH="${CAIRO_PREFIX}/lib:$DYLD_LIBRARY_PATH"

# Optional: persist for future sessions (comment out if not needed)
echo "🔁 Persisting to shell config (~/.zshrc)"
{
  echo ""
  echo "# Cairo + MkDocs setup"
  echo "export PKG_CONFIG_PATH=\"${CAIRO_PREFIX}/lib/pkgconfig\""
  echo "export DYLD_LIBRARY_PATH=\"${CAIRO_PREFIX}/lib:\$DYLD_LIBRARY_PATH\""
} >> ~/.zshrc

# Step 3: Create or rebuild virtual environment
echo "🐍 Setting up virtual environment..."
rm -rf .venv
python3.11 -m venv .venv
source .venv/bin/activate

# Step 4: Install requirements
echo "📥 Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Step 5: Test build
echo "🚀 Testing MkDocs build..."
mkdocs build

# Step 6: Start local dev server
echo "🌐 Serving MkDocs at http://127.0.0.1:8000 ..."
mkdocs serve