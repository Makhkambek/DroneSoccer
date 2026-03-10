#!/bin/bash

# Script to download a sample drone video for background
# This uses a free stock video from Pexels

echo "🎥 Downloading demo drone video..."

# Create videos directory if it doesn't exist
mkdir -p public/videos

# Download a free drone video (replace this URL with actual video URL from Pexels)
# Note: You'll need to download manually from https://www.pexels.com/search/videos/drone/
# and place it in public/videos/drone-background.mp4

echo ""
echo "📁 Please manually download a drone video:"
echo "1. Visit: https://www.pexels.com/search/videos/drone/"
echo "2. Choose a video you like"
echo "3. Download it"
echo "4. Rename to: drone-background.mp4"
echo "5. Move to: public/videos/drone-background.mp4"
echo ""
echo "Recommended videos:"
echo "- Aerial drone footage of nature"
echo "- FPV drone racing"
echo "- Drone soccer action shots"
echo ""
echo "✨ Once added, the video will automatically appear on your homepage!"
