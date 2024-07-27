export function formatDate(isoDate) {
    const options = {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
    }

    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, options);
} 