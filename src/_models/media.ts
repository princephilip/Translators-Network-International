import { DecimalPipe } from '@angular/common';

export class Media {
    report_id : number;
    production: string; 
    status: string; 
    financial_implication ?: DecimalPipe;
    comments ?: string;
}