export type ValidationStatus = 'PASS' | 'FAIL' | 'WARN';

export interface ValidationRow {
  field: string;
  provided: any;
  expected: any;
  status: ValidationStatus;
  comment: string;
}

export interface ValidationResponse {
  inputSource: 'DB' | 'STRUCTURED' | 'TEXT';
  fields: Record<string, any>;
  results: ValidationRow[];
  overallStatus: ValidationStatus;
  confidence: number;
}
