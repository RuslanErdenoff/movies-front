
//роверяет через Navigation API (window.navigation.entries()), 
// есть ли предыдущая запись и принадлежит ли она window.location.origin. 
export function canGoBack(): boolean {
    if (typeof window === "undefined") return false;

    const nav = (window as unknown as {
        navigation?: {
            currentEntry?: { index: number };
            entries?: () => Array<{ url?: string }>;
        };
    }).navigation;

    if (nav?.currentEntry && nav?.entries) {
        const prevIndex = nav.currentEntry.index - 1;
        if (prevIndex < 0) return false;
        const prevEntry = nav.entries()[prevIndex];
        return Boolean(prevEntry?.url?.startsWith(window.location.origin));
    }

    return (
        window.history.length > 1 &&
        Boolean(document.referrer && document.referrer.startsWith(window.location.origin))
    );
}
