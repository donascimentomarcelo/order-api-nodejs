export default interface IPaginate {
    from: number;
    to: number;
    per_page: number;
    total: number;
    current_page: number;
    prev_page: number | null;
    next_page: number | null;
    last_page: number;
    data: any[];
}
