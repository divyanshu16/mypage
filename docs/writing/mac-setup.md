# Mac Setup Guide

## Complete Setup Script

Save this as `setup.sh` and run with `zsh setup.sh`:

```bash
#!/bin/zsh

# -------------------------------
# 1️⃣ Finder & Hidden Files Tweaks
# -------------------------------
chflags nohidden ~/Library
defaults write com.apple.finder AppleShowAllFiles YES
defaults write com.apple.finder _FXShowPosixPathInTitle -bool true
killall Finder

# -------------------------------
# 2️⃣ Homebrew Setup
# -------------------------------
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
brew doctor
brew --version

# -------------------------------
# 3️⃣ One-shot Zsh Completions Setup
# -------------------------------
# Install zsh-completions if missing
if ! brew list zsh-completions &>/dev/null; then
  echo "Installing zsh-completions..."
  brew install zsh-completions
fi

# Create ~/.zshrc if it doesn't exist
if [ ! -f "$HOME/.zshrc" ]; then
  echo "Creating ~/.zshrc..."
  touch "$HOME/.zshrc"
fi

# Fix insecure directory permissions BEFORE setting up completions
echo "🔧 Fixing permissions on insecure directories..."
for dir in $(compaudit 2>/dev/null); do
  echo "Fixing: $dir"
  chmod g-w,o-w "$dir"
done

# Also fix common Homebrew directories
if [ -d "/opt/homebrew/share" ]; then
  chmod -R g-w,o-w /opt/homebrew/share/zsh 2>/dev/null
  chmod g-w,o-w /opt/homebrew/share 2>/dev/null
fi

if [ -d "/usr/local/share" ]; then
  chmod -R g-w,o-w /usr/local/share/zsh 2>/dev/null
  chmod g-w,o-w /usr/local/share 2>/dev/null
fi

# Append completions setup if not already present
if ! grep -q "zsh-completions" "$HOME/.zshrc"; then
  cat << 'EOF' >> "$HOME/.zshrc"

# -------------------------------
# Zsh completions via Homebrew
# -------------------------------

# Add Homebrew zsh-completions to fpath
if type brew &>/dev/null; then
  FPATH="$(brew --prefix)/share/zsh-completions:${FPATH}"

  # Load completions
  autoload -Uz compinit
  compinit

  # Optional: Enable caching for faster startup
  zstyle ':completion::complete:*' use-cache on
  zstyle ':completion::complete:*' cache-path ~/.zsh/cache
fi

# ----------------------------
# Zsh History Configuration
# ----------------------------

# History file location
HISTFILE=~/.zsh_history

# Number of commands to keep in memory and in file
HISTSIZE=5000
SAVEHIST=10000

# Options for better history management
setopt APPEND_HISTORY       # Append new commands to the history file, don't overwrite
setopt INC_APPEND_HISTORY   # Write commands to history file immediately
setopt SHARE_HISTORY        # Share history across all open terminals
setopt HIST_IGNORE_DUPS     # Ignore duplicate commands
setopt HIST_IGNORE_SPACE    # Ignore commands that start with a space
setopt HIST_FIND_NO_DUPS    # Avoid duplicates when searching history

# Optional: Enhance search with incremental history
bindkey '^R' history-incremental-search-backward
EOF
  echo "Appended zsh-completions and history configuration to ~/.zshrc"
else
  echo "zsh-completions setup already exists in ~/.zshrc"
fi

# Source ~/.zshrc to activate completions immediately
echo "Sourcing ~/.zshrc..."
source "$HOME/.zshrc"

echo "✅ Zsh completions setup complete!"

# -------------------------------
# 4️⃣ Terminal Setup (Ghostty) & htop
# -------------------------------
# Install Ghostty
brew install --cask ghostty

# Install htop for terminal system monitoring
brew install htop

# Install additional Homebrew packages
brew install stats
brew install jordanbaird-ice

# -------------------------------
# 5️⃣ Raycast Setup
# -------------------------------
# Install Raycast
brew install --cask raycast

# Note: After installation, enable Clipboard extension and assign hotkey:
# - Open Raycast → Extensions → Clipboard
# - Enable "Show Clipboard History"
# - Set hotkey (e.g., ⌘ + Shift + V) to quickly access clipboard history

# -------------------------------
# 6️⃣ Node.js Setup via nvm
# -------------------------------
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
\. "$HOME/.nvm/nvm.sh"   # Load nvm in current shell
nvm install 22           # Install Node.js 22
nvm alias default 22
nvm use 22
node -v                  # Verify Node.js version
npm -v                   # Verify npm version

# -------------------------------
# 7️⃣ Claude Code
# -------------------------------
npm install -g @anthropic-ai/claude-code

# -------------------------------
# 8️⃣ GitHub CLI Setup
# -------------------------------
brew install gh
# Authenticate with GitHub (interactive)
gh auth login

# -------------------------------
# 9️⃣ Ollama & UV Tool Setup
# -------------------------------
# Install Ollama
brew install ollama

# Start Ollama server in background (you can also run in another terminal)
# ollama serve &

# Pull a test model
# ollama pull gpt-oss:20b

# Install UV Tool via Homebrew
brew install uv

# Run Open-WebUI via UV Tool on port 7880
# uv tool install open-webui
# uv tool run open-webui serve --port 7880

# -------------------------------
# ✅ Mac Setup Complete
# -------------------------------
echo "🎉 Mac setup complete! Reopen your terminal to ensure all PATH changes take effect."
```

## What Gets Installed

### System Tweaks
- **Finder Configuration**: Show hidden files, display full POSIX path, unhide Library folder
- **Better defaults** for file management and system visibility

### Core Development Tools
- **Homebrew**: Package manager for macOS
- **Zsh Completions**: Tab completion for git, docker, kubectl, and more
- **Ghostty**: Modern terminal emulator
- **htop**: Interactive process viewer
- **nvm**: Node.js version manager (v0.40.3)
- **Node.js 22**: Latest LTS version via nvm

### Productivity Apps
- **Raycast**: Powerful launcher and productivity tool
  - Clipboard history manager
  - Quick access with custom hotkeys
- **Stats**: System monitoring in menu bar
- **Ice (jordanbaird-ice)**: Menu bar organization

### AI & Development Tools
- **Claude Code**: AI-powered coding assistant
- **Ollama**: Run large language models locally
- **UV Tool**: Python package installer and runner
- **Open-WebUI**: Web interface for Ollama (optional)

## Post-Installation Steps

### Raycast Configuration
1. Open Raycast
2. Navigate to Extensions → Clipboard
3. Enable "Show Clipboard History"
4. Set hotkey (recommended: ⌘ + Shift + V)

## Why These Tools?

- **Zsh Completions**: Essential for productivity with tab completion
- **Ghostty**: Fast, GPU-accelerated terminal with modern features
- **Raycast**: Superior to Alfred/Spotlight with clipboard management
- **nvm**: Better Node.js version management than direct install
- **Stats**: Lightweight system monitoring without bloat
- **Claude Code**: AI pair programmer for terminal workflows
- **Ollama**: Local LLM execution for privacy and offline work
