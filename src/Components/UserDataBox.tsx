import React, { useState } from "react";
import {
  School,
  UserRound,
  MapPin,
  Pencil,
  Check,
  X,
} from "lucide-react";
import { useUser } from "../context/Context";

interface SchoolInfoFormProps {
  initialValues?: SchoolInfoFormValues;
  onSave?: (values: SchoolInfoFormValues) => void;
  title?: string;
  description?: string;
}

type SchoolInfoFormValues = {
  schoolName: string;
  executorName: string;
  regionName: string;
  managerName: string;
};

type Fields = {
  key: keyof SchoolInfoFormValues;
  label: string;
  placeholder: string;
  icon: React.ElementType;
};

const UserDataBox: React.FC<SchoolInfoFormProps> = ({
  onSave,
  title = "بيانات المدرسة",
  description = "هذه المعلومات تساعدك في عمل التقارير بسرعة، وتظهر تلقائياً مع كل محتوى تنشئه.",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const {
    schoolName,
    teacherName,
    region,
    managerName,
    setSchoolName,
    setManagerName,
    setTeacherName,
    setRegion,
  } = useUser();

  // =========================
  // Local form state
  // =========================

  const [schoolNameField, setSchoolNameField] = useState(schoolName);
  const [executorNameField, setExecutorNameField] = useState(teacherName);
  const [regionNameField, setRegionNameField] = useState(region);
  const [managerNameField, setManagerNameField] = useState(managerName);

  // =========================
  // Fields mapping
  // =========================

  const infoarr: Fields[] = [
    {
      key: "schoolName",
      label: "اسم المدرسة",
      placeholder: "مثال: مدرسة الأمير سلطان الابتدائية",
      icon: School,
    },
    {
      key: "executorName",
      label: "اسم المنفذ",
      placeholder: "مثال: أحمد الحربي",
      icon: UserRound,
    },
    {
      key: "regionName",
      label: "اسم المنطقة",
      placeholder: "مثال: منطقة مكة المكرمة",
      icon: MapPin,
    },
    {
      key: "managerName",
      label: "اسم المدير",
      placeholder: "مثال: محمد ابراهيم ادم",
      icon: UserRound,
    },
  ];

  // =========================
  // Get field value
  // =========================

  const getFieldValue = (key: keyof SchoolInfoFormValues) => {
    switch (key) {
      case "schoolName":
        return schoolNameField;

      case "executorName":
        return executorNameField;

      case "regionName":
        return regionNameField;

      case "managerName":
        return managerNameField;
    }
  };

  // =========================
  // Change field
  // =========================

  const handleChange = (
    key: keyof SchoolInfoFormValues,
    value: string
  ) => {
    switch (key) {
      case "schoolName":
        setSchoolNameField(value);
        break;

      case "executorName":
        setExecutorNameField(value);
        break;

      case "regionName":
        setRegionNameField(value);
        break;

      case "managerName":
        setManagerNameField(value);
        break;
    }

    const currentSchoolName =
      key === "schoolName" ? value : schoolNameField;

    const currentExecutorName =
      key === "executorName" ? value : executorNameField;

    const currentRegionName =
      key === "regionName" ? value : regionNameField;

    const currentManagerName =
      key === "managerName" ? value : managerNameField;

    setIsComplete(
      currentSchoolName.trim() !== "" &&
        currentExecutorName.trim() !== "" &&
        currentRegionName.trim() !== "" &&
        currentManagerName.trim() !== "" &&
        (
          currentManagerName.trim() !== managerName ||
          currentSchoolName.trim() !== schoolName ||
          currentExecutorName.trim() !== teacherName ||
          currentRegionName.trim() !== region
        )
    );
  };

  // =========================
  // Start editing
  // =========================

  const startEditing = () => {
    setSchoolNameField(schoolName);
    setExecutorNameField(teacherName);
    setRegionNameField(region);
    setManagerNameField(managerName);

    setIsComplete(false);
    setIsEditing(true);
  };

  // =========================
  // Cancel
  // =========================

  const handleCancel = () => {
    setSchoolNameField(schoolName);
    setExecutorNameField(teacherName);
    setRegionNameField(region);
    setManagerNameField(managerName);

    setIsComplete(false);
    setIsEditing(false);
    setFocusedField(null);
  };

  // =========================
  // Save
  // =========================

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values: SchoolInfoFormValues = {
      schoolName: schoolNameField.trim(),
      executorName: executorNameField.trim(),
      regionName: regionNameField.trim(),
      managerName: managerNameField.trim(),
    };

    if (
      !values.schoolName ||
      !values.executorName ||
      !values.regionName ||
      !values.managerName
    ) {
      return;
    }

    // Update Context ONLY after submit
    setSchoolName(values.schoolName);
    setTeacherName(values.executorName);
    setRegion(values.regionName);
    setManagerName(values.managerName);

    onSave?.(values);

    setIsEditing(false);
    setIsComplete(false);
    setFocusedField(null);
  };

  return (
    <div dir="rtl" className="relative w-full max-w-xl">
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute -inset-16 -z-10 opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 15%, rgba(179,154,99,0.08), transparent 55%)",
        }}
      />

      <form
        onSubmit={handleSave}
        className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#121815]/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8"
      >
        {/* Top edge */}
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#B39A63]/40 to-transparent" />

        {/* Inner border */}
        <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/[0.025]" />

        {/* Header */}
        <div className="relative mb-9">
          <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-[#B39A63]/15 bg-[#B39A63]/[0.06] px-3 py-1.5 text-[11px] font-bold tracking-wide text-[#BDA66F]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B39A63] shadow-[0_0_8px_rgba(179,154,99,0.5)]" />
            معلومات أساسية
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-[#ECEFEA] sm:text-[28px]">
            {title}
          </h3>

          <p className="mt-2 max-w-lg text-sm leading-7 text-[#7F8A83]">
            {description}
          </p>
        </div>

        {/* Fields */}
        <div className="relative flex flex-col gap-5">
          {infoarr.map(
            ({ key, label, placeholder, icon: Icon }) => {
              const isFocused = focusedField === key;
              const value = getFieldValue(key);

              return (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="mb-2.5 block text-[13px] font-semibold text-[#BFC7C1]"
                  >
                    {label}
                  </label>

                  <div
                    className={`group flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-200 ${
                      !isEditing
                        ? "border-white/[0.045] bg-[#0D1210]/50"
                        : isFocused
                          ? "border-[#B39A63]/35 bg-[#0D1210]/80 shadow-[0_0_0_3px_rgba(179,154,99,0.045)]"
                          : "border-white/[0.07] bg-[#0D1210]/60 hover:border-white/[0.12] hover:bg-[#0D1210]/75"
                    }`}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      className={`shrink-0 transition-colors duration-200 ${
                        isEditing && isFocused
                          ? "text-[#B39A63]"
                          : "text-[#68766D] group-hover:text-[#829087]"
                      }`}
                    />

                    <input
                      id={key}
                      name={key}
                      type="text"
                      value={value}
                      placeholder={placeholder}
                      readOnly={!isEditing}
                      onFocus={() =>
                        isEditing && setFocusedField(key)
                      }
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) =>
                        handleChange(key, e.target.value)
                      }
                      className={`w-full bg-transparent text-sm outline-none placeholder:text-[#4F5A53] ${
                        isEditing
                          ? "cursor-text text-[#E4E8E4]"
                          : "cursor-default text-[#929C95]"
                      }`}
                    />
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Actions */}
        {!isEditing ? (
          <button
            type="button"
            onClick={startEditing}
            className="group relative mt-9 inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#DDE3DE] text-sm font-bold text-[#18201B] transition-all duration-200 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] active:scale-[0.99]"
          >
            <Pencil
              size={15}
              className="transition-transform duration-200 group-hover:-rotate-6"
            />
            تعديل
          </button>
        ) : (
          <div className="relative mt-9 flex items-center justify-center gap-3">
            <button
              type="submit"
              disabled={!isComplete}
              className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#DDE3DE] text-sm font-bold text-[#18201B] transition-all duration-200 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-[#DDE3DE]/20 disabled:text-[#DDE3DE]/30 disabled:shadow-none"
            >
              <Check size={15} />
              حفظ
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.025] text-sm font-semibold text-[#BFC7C1] transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-[#E5E9E5] active:scale-[0.99]"
            >
              <X size={15} />
              رجوع
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserDataBox;