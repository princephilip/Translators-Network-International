import { DecimalPipe } from '@angular/common';
import { Distribution } from './distribution';
import { Media } from './media';
import { Mission } from './mission';
import { OnlineChurch } from './online_church';
import { Production } from './production';
import { Reachout } from './reachout';
import { Tnion } from './tnion';
import { Translation } from './translation';

export class Report {
    distributions: Distribution[]
    media: Media[]
    mission: Mission[]
    onlinechurch: OnlineChurch[]
    production: Production[]
    reachout: Reachout[]
    tnion: Tnion[]
    translations: Translation[]
}

// class Distribution {
//     report_id: number;
//     language : string;
//     format : string;
//     qty_distributed : number;
//     financial_implication ?: DecimalPipe; //in what currency should the financial implications be? or should it be string
//     data_submitted : boolean;
//     comments ?: string;
// }

// class Media {
//     report_id : number;
//     production: string; 
//     status: string; 
//     financial_implication ?: DecimalPipe;
//     comments ?: string;
// }

// class Mission {
//     report_id : number;
//     financial_implication ?: DecimalPipe;
//     comments ?: string;
//     campaign : string;
//     country: string;
//     qty_distributed: number;
// }

// class OnlineChurch {
//     report_id : number;
//     church: string;
//     services_held: number;
//     attendance: number;
//     giving: string;
//     comments ?: string;
// }

// class Production {
//     report_id : number;
//     translation: string;
//     production_started: Date;
//     production_ended: Date;
//     qty_printed: number;
//     financial_implication ?: DecimalPipe;
//     comments ?: string;
// }

// class Reachout {
//     report_id : number;
//     campaign: string;
//     country: string;
//     financial_implication ?: DecimalPipe;
//     qty_distributed: number;
//     comments ?: string;
// }

// class Tnion {
//     report_id: number;
//     ministers_added ?: number;
//     country: string;
//     comments ?: string
// }

// class Translation {
//     report_id: number;
//     translation: string;
//     status: string; //check if this status is correct or it needs to be string
//     comments ?: string;
//     score ?: number; //should the user be allowed to give a score?
// }