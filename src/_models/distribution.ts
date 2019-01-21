import { DecimalPipe } from '@angular/common';

export class Distribution {
    report_id: number;
    language : string;
    format : string;
    qty_distributed : number;
    financial_implication ?: DecimalPipe; //in what currency should the financial implications be? or should it be string
    data_submitted : boolean;
    comments ?: string;
}