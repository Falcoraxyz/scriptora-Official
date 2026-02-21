const R2_DOMAIN = "https://pub-5828d30887e24495b12cb23763000110.r2.dev";

export const DOWNLOAD_LINKS = {
    windows: `${R2_DOMAIN}/Scriptora_1.0.2_x64-setup.exe`,
    windows_msi: `${R2_DOMAIN}/Scriptora_1.0.2_x64_en-US.msi`,
    macos_arm: `${R2_DOMAIN}/Scriptora_1.0.2_aarch64.dmg`,
    macos_intel: `${R2_DOMAIN}/Scriptora_1.0.2_x64.dmg`,
    linux_deb: `${R2_DOMAIN}/Scriptora_1.0.2_amd64.deb`,
    linux_appimage: `${R2_DOMAIN}/Scriptora_1.0.2_amd64.AppImage`,
    linux_rpm: `${R2_DOMAIN}/Scriptora-1.0.2-1.x86_64.rpm`,
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
