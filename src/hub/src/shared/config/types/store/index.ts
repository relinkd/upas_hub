export type Issuer = {
    verified: boolean;
    description: String;
    issuer_type: String;
    name: String;
    reputation_module: String;
  } 
export type Principal = {
    _arr: Uint8Array[];
    _isPrincipal: boolean; 
    toText: any;
}
  
export type IssuerTuple = [Principal, Issuer];


export type AchievementFormated = [
  Principal,
  [string, { Text: string }][]
]

export type Achievements = {
  Ok: AchievementFormated[]
}
