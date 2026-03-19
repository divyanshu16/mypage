# Code Anywhere: Setting Up Claude Code on a VPS with Mobile Access

Ever seen someone coding at a cafe from their phone and wondered how? Here's the exact setup to run Claude Code (and OpenAI Codex) on a remote server and access it from your phone, tablet, or any device with an internet connection.

Inspired by [levelsio's tweet](https://x.com/levelsio/status/2033640947469209911) about coding on his phone via Termius + Claude Code while out and about.

![Claude Code running on phone via Termius](images/termius-claude-code.jpeg){ width="300" }

---

## What You'll Need

- A DigitalOcean account (or any VPS provider — Hetzner, Vultr, etc.)
- A phone with [Termius](https://termius.com/) installed (iOS/Android)
- 10 minutes

## Step 1: Generate an SSH Key

On your local machine (Mac/Linux):

```bash
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_claude_vps
```

It'll ask for a passphrase — set one for security or leave empty for convenience.

This creates two files:
- `~/.ssh/id_ed25519_claude_vps` — your **private key** (never share this)
- `~/.ssh/id_ed25519_claude_vps.pub` — your **public key** (this goes on the server)

Copy the public key to your clipboard:

```bash
# macOS
cat ~/.ssh/id_ed25519_claude_vps.pub | pbcopy

# Linux
cat ~/.ssh/id_ed25519_claude_vps.pub | xclip -selection clipboard
```

> **Gotcha:** The public key starts with `ssh-ed25519 AAAA...`. The private key starts with `-----BEGIN OPENSSH PRIVATE KEY-----`. Know the difference — you'll need both at different steps.

## Step 2: Create a DigitalOcean Droplet

1. Go to [cloud.digitalocean.com](https://cloud.digitalocean.com) → **Create** → **Droplets**
2. **Region:** Pick the closest to you (lower latency = snappier terminal)
3. **Image:** Ubuntu 24.04 LTS
4. **Size:** Basic → Regular → **$6/mo** (1 vCPU, 1GB RAM)
5. **Authentication:** Select **SSH Key** → paste your **public key** (the one you copied with `pbcopy`)
6. **Hostname:** `claude-dev` (or whatever you like)
7. Hit **Create Droplet**

Note down the IP address once it's ready (e.g., `134.209.42.100`).

> **Why not AWS?** A simple VPS has predictable billing ($6/mo flat), no surprise charges, and zero config overhead. AWS EC2 makes sense if you're already in that ecosystem, but for "SSH in and code" it's overkill.

## Step 3: Set Up SSH Config (Saves Time Later)

Add this to `~/.ssh/config` on your local machine:

```
Host claude-dev
    HostName <your-droplet-ip>
    User root
    IdentityFile ~/.ssh/id_ed25519_claude_vps
```

> **Note:** We're using `root` for now to set up the server. You'll change this to a non-root user in Step 5.

Now you can connect with just:

```bash
ssh claude-dev
```

> **Gotcha:** If you get `UNPROTECTED PRIVATE KEY FILE` error, fix permissions:
> ```bash
> chmod 600 ~/.ssh/id_ed25519_claude_vps
> ```
> SSH refuses to use a private key that other users can read.

> **Gotcha:** Use the **private key** (without `.pub`) in your SSH command and config. The `.pub` file is only for pasting into servers/services. If you use the `.pub` file with `ssh -i`, you'll get a `Permission denied` error.

## Step 4: Install Everything on the Server

SSH into your droplet and run this setup script:

```bash
ssh claude-dev
```

Then paste:

```bash
#!/bin/bash
set -e

# Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
sudo apt install -y nodejs

# Install Claude Code
sudo npm install -g @anthropic-ai/claude-code

# Install OpenAI Codex (optional)
sudo npm install -g @openai/codex

# Install tmux for persistent sessions
sudo apt install -y tmux

echo "Done! Run: tmux new -s claude && claude"
```

Or save it as a script and SCP it over:

```bash
scp -i ~/.ssh/id_ed25519_claude_vps setup.sh root@<your-ip>:~
ssh claude-dev "bash ~/setup.sh"
```

## Step 5: Create a Non-Root User

Claude Code refuses to run as root for security reasons. You need to create a regular user:

```bash
ssh claude-dev

# Create a new user called "claude" with no password prompt
adduser claude --disabled-password --gecos ""

# Give the user sudo privileges (for installing packages later)
usermod -aG sudo claude

# Copy root's SSH keys so you can SSH in as this new user
cp -r ~/.ssh /home/claude/.ssh

# Fix ownership — copied files are owned by root, change to claude
chown -R claude:claude /home/claude/.ssh
```

Now update your **local** `~/.ssh/config` to use the new user:

```
Host claude-dev
    HostName <your-droplet-ip>
    User claude
    IdentityFile ~/.ssh/id_ed25519_claude_vps
```

Test it:

```bash
ssh claude-dev
```

You should now be logged in as `claude` instead of `root`.

> **Gotcha:** If you skip this step and try to run Claude Code as root, you'll get: `--dangerously-skip-permissions cannot be used with root/sudo privileges for security reasons`. Don't try to force it — just create a regular user.

## Step 6: Add Swap (Prevent Crashes on 1GB Droplet)

The $6 droplet only has 1GB RAM. Adding swap prevents out-of-memory crashes:

```bash
ssh claude-dev "sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile && echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab"
```

This gives you 2GB of virtual memory. Not as fast as real RAM but keeps things stable.

## Step 7: Start Coding with tmux

tmux keeps your session alive even when you disconnect (phone loses signal, close the app, etc.).

```bash
ssh claude-dev

# First time: create a session
tmux new -s claude

# Run Claude Code
claude
```

When you disconnect and come back:

```bash
ssh claude-dev
tmux attach -t claude
```

Your session is exactly where you left it.

**tmux essentials:**
| Action | Keys |
|---|---|
| Detach (leave session running) | `Ctrl+B` then `D` |
| Reattach | `tmux attach -t claude` |
| New window | `Ctrl+B` then `C` |
| Switch windows | `Ctrl+B` then `0-9` |
| Scroll up | `Ctrl+B` then `[` (press `q` to exit scroll) |

## Step 8: Set Up Termius on Your Phone (Code From Anywhere)

1. Download **Termius** from App Store / Play Store
2. Go to **Keychain** → **Keys** → tap **+** → **Import**
3. Paste your **private key** (the one starting with `-----BEGIN OPENSSH PRIVATE KEY-----`)

   To get it on your phone, on your Mac run:
   ```bash
   cat ~/.ssh/id_ed25519_claude_vps
   ```
   Then AirDrop the text, or copy-paste via a secure method.

   > **Gotcha:** Do NOT paste the public key here. Termius needs the **private** key. If you see `ssh-ed25519 AAAA...` that's the wrong one. You need `-----BEGIN OPENSSH PRIVATE KEY-----`.

4. Go to **Hosts** → tap **+**:
   - **Label:** `claude-dev`
   - **Hostname:** `<your-droplet-ip>`
   - **Username:** `claude`
   - **Key:** Select the key you just imported
5. **Save** → tap the host to connect
6. Run `tmux attach -t claude` to pick up where you left off

---

## Security Tips

- **Never share your private key.** If you emailed it to yourself to get it on your phone, delete that email.
- **Disable password auth** on your server (it's off by default on DigitalOcean if you chose SSH key auth).
- **Consider Tailscale** if you want to avoid exposing SSH to the public internet. It creates a private network between your devices.
- **Consider Mosh** instead of SSH for mobile — it handles flaky connections and network switches (Wi-Fi to 5G) much better than SSH.

## Cost

| Item | Cost |
|---|---|
| DigitalOcean droplet | $6-12/mo |
| Termius | Free tier works fine |
| Claude Code | Pay per API usage |
| Coding at a cafe while your friends wonder what you're doing | Priceless |

---

That's it. You now have a cloud dev environment accessible from any device. Start a tmux session, fire up Claude Code, and code from anywhere.
