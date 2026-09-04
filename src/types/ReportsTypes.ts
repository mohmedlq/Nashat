import type { Theme } from '../misc/Theme';

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

export type ReportEditFormProps = {
  formData: ReportFormData;
  errors: Record<string, string>;
  theme: Theme;
  logoSrc?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onRemoveImage: (index: number) => void;
};