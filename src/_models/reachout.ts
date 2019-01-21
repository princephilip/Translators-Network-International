import { DecimalPipe } from '@angular/common';

export class Reachout {
    report_id : number;
    campaign: string;
    country: string;
    financial_implication ?: DecimalPipe;
    qty_distributed: number;
    comments ?: string;
}