interface DobatSaf {
    id: number;
    rkmaskry: string;
    name: string;
    birth_date: Date;
    religion: string;
    blood: string;
    marital_state: string;
    mohafza_id: number;
    markaz_id: number;
    address: string;
    nearest: string;
    address2: string;
    fea_id: number;
    khedma_id: number;
    daraga_id: number;
    taraky_date: Date;
    tatwa_date: Date;
    moahel_tatwa_id: number;
    highest_moahel_id: number;
    rateb3aly_date: Date;
    selah_id: number;
    selah_khedma_id: number;
    wehda_id: number;
    join_date: Date;
    takhasos_id: number;
    job_title_id: number;
    job_title_edafy_id: number;
    marriage_date?: Date;
    number_of_sons?: number;
}

export default DobatSaf;
