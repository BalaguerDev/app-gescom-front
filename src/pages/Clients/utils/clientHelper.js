export const daysSince = (date) => {
    if (!date) return Infinity;
    const diff = Date.now() - new Date(date).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
};

export const sortByLastOrderAsc = (clients = []) =>
    [...clients].sort((a, b) => {
        const aLast = a.orders?.length ? Math.max(...a.orders.map((o) => new Date(o.date).getTime())) : 0;
        const bLast = b.orders?.length ? Math.max(...b.orders.map((o) => new Date(o.date).getTime())) : 0;
        return aLast - bLast;
    });
