import { DecimalPipe } from '@angular/common';

export class Mission {
    report_id : number;
    financial_implication ?: DecimalPipe;
    comments ?: string;
    campaign : string;
    country: string;
    qty_distributed: number;
}