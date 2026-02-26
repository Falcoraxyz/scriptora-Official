const R2_DOMAIN = "https://scriptora-dl.epic24072001.workers.dev";

export const DOWNLOAD_VERSIONS = {
    windows: [
        { label: "Windows Setup (EXE)", link: `${R2_DOMAIN}/Scriptora_1.0.2_x64-setup.exe`, type: "Recommended", version: "1.0.2", size: "85MB" },
        { label: "Update Patch v1.0.2.1 (EXE)", link: `${R2_DOMAIN}/update_1.0.2.1/Scriptora_1.0.2_x64-setup.exe`, type: "Update", version: "1.0.2.1", size: "42MB" },
        { label: "Windows Installer (MSI)", link: `${R2_DOMAIN}/Scriptora_1.0.2_x64_en-US.msi`, type: "Enterprise", version: "1.0.2", size: "82MB" },
        { label: "Update Patch v1.0.2.1 (MSI)", link: `${R2_DOMAIN}/update_1.0.2.1/Scriptora_1.0.2_x64_en-US1.msi`, type: "Update", version: "1.0.2.1", size: "38MB" },
    ],
    macos: [
        { label: "macOS Apple Silicon (M1/M2/M3)", link: `${R2_DOMAIN}/Scriptora_1.0.2_aarch64.dmg`, type: "Recommended", version: "1.0.2", size: "78MB" },
        { label: "Update Patch v1.0.2.1 (Apple Silicon)", link: `${R2_DOMAIN}/update_1.0.2.1/Scriptora_1.0.2_aarch64.dmg`, type: "Update", version: "1.0.2.1", size: "35MB" },
        { label: "macOS Intel", link: `${R2_DOMAIN}/Scriptora_1.0.2_x64.dmg`, type: "Legacy", version: "1.0.2", size: "81MB" },
        { label: "Update Patch v1.0.2.1 (Intel)", link: `${R2_DOMAIN}/update_1.0.2.1/Scriptora_1.0.2_x64.dmg`, type: "Update", version: "1.0.2.1", size: "39MB" },
    ],
    linux: [
        { label: "Linux Debian/Ubuntu (DEB)", link: `${R2_DOMAIN}/Scriptora_1.0.2_amd64.deb`, type: "Recommended", version: "1.0.2", size: "72MB" },
        { label: "Update Patch v1.0.2.1 (DEB)", link: `${R2_DOMAIN}/update_1.0.2.1/Scriptora_1.0.2_amd64.deb`, type: "Update", version: "1.0.2.1", size: "32MB" },
        { label: "Linux AppImage", link: `${R2_DOMAIN}/Scriptora_1.0.2_amd64.AppImage`, type: "Portable", version: "1.0.2", size: "90MB" },
        { label: "Linux RPM (Fedora/RedHat)", link: `${R2_DOMAIN}/Scriptora-1.0.2-1.x86_64.rpm`, type: "Standard", version: "1.0.2", size: "70MB" },
        { label: "Update Patch v1.0.2.1 (RPM)", link: `${R2_DOMAIN}/update_1.0.2.1/Scriptora-1.0.2-1.x86_64.rpm`, type: "Update", version: "1.0.2.1", size: "31MB" },
    ]
};

export const DOWNLOAD_LINKS = {
    windows: DOWNLOAD_VERSIONS.windows[0].link,
    windows_msi: DOWNLOAD_VERSIONS.windows[1].link,
    macos_arm: DOWNLOAD_VERSIONS.macos[0].link,
    macos_intel: DOWNLOAD_VERSIONS.macos[1].link,
    linux_deb: DOWNLOAD_VERSIONS.linux[0].link,
    linux_appimage: DOWNLOAD_VERSIONS.linux[1].link,
    linux_rpm: DOWNLOAD_VERSIONS.linux[2].link,
};

export type Platform = 'windows' | 'macos' | 'linux' | 'unknown';

export const detectPlatform = (): Platform => {
    if (typeof window === 'undefined') return 'unknown';

    const platform = window.navigator.platform.toLowerCase();
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (platform.includes('win') || userAgent.includes('win')) return 'windows';
    if (platform.includes('mac') || userAgent.includes('mac')) return 'macos';
    if (platform.includes('linux')) return 'linux';

    return 'unknown';
};

export const getDownloadUrl = (platform: Platform): string => {
    switch (platform) {
        case 'windows':
            return DOWNLOAD_LINKS.windows;
        case 'macos':
            // Default to ARM (Silicon) as it's the modern standard, 
            // but in a more advanced setup we could check for ARM specifically
            if (typeof window !== 'undefined' && (window.navigator.userAgent.includes('arm') || window.navigator.userAgent.includes('apple'))) {
                return DOWNLOAD_LINKS.macos_arm;
            }
            return DOWNLOAD_LINKS.macos_intel;
        case 'linux':
            return DOWNLOAD_LINKS.linux_deb;
        default:
            return DOWNLOAD_LINKS.windows; // Fallback
    }
};
