export type ReportMeta = {
  id: number;
  category: string;
  type: string;
};

export type ReportFormData = {
  schoolName: string;
  region: string;
  reportTitle: string;
  implementer: string;
  location: string;
  target: string;
  beneficiaries: string;
  date: string;
  objectives: string;
  evidences: (string | null)[];
};

export type MockReport = ReportMeta & {
  formData: Partial<ReportFormData>;
};
