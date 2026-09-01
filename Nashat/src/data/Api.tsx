import axios from "axios";
import { useState } from "react";

export default function Api() {
const [joke, setJoke] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // إرسال اسم الفئة مباشرة بدلاً من الرقم
  function fetchData(category: string) {
    setLoading(true);
    axios
   .get(`https://v2.jokeapi.dev/joke/${category}?safe-mode&type=single`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setJoke(res.data.excuse);
        }
      })
      .catch((err) => console.error("Error fetching excuse:", err))
      .finally(() => setLoading(false));
  }

  return (
   <div className="flex flex-col items-center gap-6 p-6 max-w-xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
      {/* أزرار الفئات */}
      <div className="flex flex-wrap justify-center gap-2.5">
        <button
          onClick={() => fetchData("Programming")}
          className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium rounded-xl transition-all active:scale-95 cursor-pointer"
        >
          Programming
        </button>

     <button
          onClick={() => fetchData("Misc")}
          className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium rounded-xl transition-all active:scale-95 cursor-pointer"
        >
          Misc
        </button>

        <button
          onClick={() => fetchData("Pun")}
          className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-medium rounded-xl transition-all active:scale-95 cursor-pointer"
        >
          Pun
        </button>

        <button
          onClick={() => fetchData("Spooky")}
          className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-600 font-medium rounded-xl transition-all active:scale-95 cursor-pointer"
        >
          Spooky
        </button>

        <button
          onClick={() => fetchData("Christmas")}
          className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-medium rounded-xl transition-all active:scale-95 cursor-pointer"
        >
          Christmas
        </button>
      </div>

      {/* حاوية عرض النتيجة */}
      <div className="w-full min-h-[90px] flex items-center justify-center p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center">
        {loading ? (
          <span className="text-gray-400 italic text-sm">جاري الجلب...</span>
        ) : joke ? (
          <p className="text-gray-800 font-semibold text-lg">{joke}</p>
        ) : (
          <span className="text-gray-400 italic text-sm">
            Select a topic to get advice...
          </span>
        )}
      </div>
    </div>
  );
}