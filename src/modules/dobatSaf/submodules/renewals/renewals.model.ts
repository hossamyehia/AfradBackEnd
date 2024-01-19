interface Renewal{
    id: number;
    from: Date,
    to: Date,
    publish_date: Date,
    recommendation: boolean,
    period: boolean,
    dabet_id: number
}

export default Renewal;