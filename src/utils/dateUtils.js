export function formatAMPM(date) {
    const parsedDate = new Date(date);
    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }).format(parsedDate);
}
