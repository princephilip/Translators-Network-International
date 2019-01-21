
export class Translation {
    report_id: number;
    translation: string;
    status: string; //check if this status is correct or it needs to be string
    comments ?: string;
    score ?: string; //should the user be allowed to give a score?
}