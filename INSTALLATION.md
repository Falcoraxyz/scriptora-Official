# Scriptora Safe Installation Guide

Scriptora is 100% safe and malware-free. Because we are an independent developer team, Windows and macOS may show a "Warning" or "Dangerous" message during installation. This is because the app is not yet "digitally signed" with expensive enterprise certificates.

Follow these steps to install Scriptora safely.

---

## 🪟 Windows (SmartScreen)
If Windows shows a blue window saying **"Windows protected your PC"**:

1. Click on the small text: **"More info"**.
2. A new button will appear: **"Run anyway"**.
3. Click **"Run anyway"** and the installer will start.

> [!TIP]
> This warning appears because Scriptora is a new app. The more people download it, the faster Windows will recognize it as safe.

---

## 🍎 macOS (Gatekeeper)
If macOS says **"Scriptora cannot be opened because it is from an unidentified developer"**:

1. Open your **Downloads** folder in Finder.
2. **Right-click** (or Control+Click) the Scriptora app.
3. Select **"Open"** from the top of the menu.
4. A dialog will appear. Click **"Open"** again.

### If it still doesn't open:
1. Open **Terminal** (Cmd+Space, type "Terminal").
2. Type this command and press Enter:
   `sudo xattr -rd com.apple.quarantine /Applications/Scriptora.app`
3. Enter your Mac password when prompted.

---

## 🐧 Linux
If the AppImage or DEB file won't run:

1. **AppImage**: Right-click file -> Properties -> Permissions -> Check **"Allow executing file as program"**.
2. **Terminal**: `chmod +x Scriptora.AppImage` then `./Scriptora.AppImage`

---

## 🛡️ Why are there warnings?
Operating systems require developers to pay hundreds of dollars per year for "Signatures". As an open-source/independent project, we are currently in the process of applying for these. Rest assured, your data is safe.

**Check the file integrity:**
Compare the SHA256 hash of your download with the one provided on our website to ensure the file has not been tampered with.
