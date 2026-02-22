const R2_DOMAIN = "https://pub-5828d30887e24495b12cb23763000110.r2.dev";

export const DOWNLOAD_VERSIONS = {
    windows: [
        { label: "Windows Setup (EXE)", link: `${R2_DOMAIN}/Scriptora_1.0.2_x64-setup.exe`, type: "Recommended" },
        { label: "Windows Installer (MSI)", link: `${R2_DOMAIN}/Scriptora_1.0.2_x64_en-US.msi`, type: "Enterprise" },
    ],
    macos: [
        { label: "macOS Apple Silicon (M1/M2/M3)", link: `${R2_DOMAIN}/Scriptora_1.0.2_aarch64.dmg`, type: "Recommended" },
        { label: "macOS Intel", link: `${R2_DOMAIN}/Scriptora_1.0.2_x64.dmg`, type: "Legacy" },
    ],
    linux: [
        { label: "Linux Debian/Ubuntu (DEB)", link: `${R2_DOMAIN}/Scriptora_1.0.2_amd64.deb`, type: "Recommended" },
        { label: "Linux AppImage", link: `${R2_DOMAIN}/Scriptora_1.0.2_amd64.AppImage`, type: "Portable" },
        { label: "Linux RPM (Fedora/RedHat)", link: `${R2_DOMAIN}/Scriptora-1.0.2-1.x86_64.rpm`, type: "Standard" },
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
