export class User {
token ?: string;
username ?: string;//not in the original form 
password ?: string;
password_confirmation ?: string;
title : string;
firstname : string;
middlename : string;
surname : string;
email_other ?: string;
phone_no : number;
dob : Date;
gender ?: string;
nationality : string;
country : string;
language ?: string;
training_sch_completed : string;
church : string;
is_baptized : string;
foundation_sch_completed : string;
marital_status : string;
spouse_name ?: string;
spouse_dob ?: string;
spouse_email ?: string;
spouse_phone ?: number;
spouse_is_tni ?: string;
// = {0 | 1} 
wedding_anniversary ?: Date;
// = string.format('yyyy-mm-dd'),
has_children : string;
// = {0 | 1}, 
avatar ?: File;
// = picture #still testing 
}
