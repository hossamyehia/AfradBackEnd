interface Sanction{
    id: number;
    type_id: number;
    decision_id: number;
    crime_date: Date;
    evidance_date: Date;
    description: string;
    dabet_id: number
}

export default Sanction;