import { DecimalPipe } from '@angular/common';

export class Production {
    report_id : number;
    translation: string;
    production_started: Date;
    production_ended: Date;
    qty_printed: number;
    financial_implication ?: DecimalPipe;
    comments ?: string;
}