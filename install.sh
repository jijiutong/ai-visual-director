#!/bin/sh
set -eu

SKILL_NAME="${AI_VISUAL_DIRECTOR_SKILL_NAME:-ai-visual-director}"
REPO="${AI_VISUAL_DIRECTOR_REPO:-jijiutong/ai-visual-director}"
REF="${AI_VISUAL_DIRECTOR_REF:-main}"
SKILLS_DIR="${CLAUDE_SKILLS_DIR:-${AI_VISUAL_DIRECTOR_SKILLS_DIR:-$HOME/.claude/skills}}"
TARGET="${AI_VISUAL_DIRECTOR_TARGET:-$SKILLS_DIR/$SKILL_NAME}"
ENTRIES="SKILL.md api-config.template.env sources engines knowledge rules templates platforms state projects imitation sub-skills docs examples"

cleanup_dir=""

cleanup() {
  if [ -n "$cleanup_dir" ] && [ -d "$cleanup_dir" ]; then
    rm -rf "$cleanup_dir"
  fi
}

trap cleanup EXIT INT TERM

download_source() {
  cleanup_dir="$(mktemp -d)"
  archive="$cleanup_dir/source.tar.gz"
  url="https://codeload.github.com/$REPO/tar.gz/$REF"

  if command -v curl >/dev/null 2>&1; then
    curl -fsSL "$url" -o "$archive"
  elif command -v wget >/dev/null 2>&1; then
    wget -qO "$archive" "$url"
  else
    echo "Install failed: curl or wget is required for remote install." >&2
    exit 1
  fi

  tar -xzf "$archive" -C "$cleanup_dir"
  find "$cleanup_dir" -mindepth 1 -maxdepth 1 -type d | head -n 1
}

script_dir() {
  case "$0" in
    */*) cd "$(dirname "$0")" && pwd ;;
    *) pwd ;;
  esac
}

SOURCE_DIR="$(script_dir)"
if [ ! -f "$SOURCE_DIR/SKILL.md" ]; then
  SOURCE_DIR="$(download_source)"
fi

for entry in $ENTRIES; do
  if [ ! -e "$SOURCE_DIR/$entry" ]; then
    echo "Install failed: missing runtime entry: $entry" >&2
    exit 1
  fi
done

TMP_TARGET="$TARGET.tmp.$$"
rm -rf "$TMP_TARGET"
mkdir -p "$TMP_TARGET"

for entry in $ENTRIES; do
  cp -R "$SOURCE_DIR/$entry" "$TMP_TARGET/"
done

rm -rf "$TARGET"
mkdir -p "$(dirname "$TARGET")"
mv "$TMP_TARGET" "$TARGET"

echo "Installed $SKILL_NAME to $TARGET"
echo "Restart Claude Code, then use /create to start."
