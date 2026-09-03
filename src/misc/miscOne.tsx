export function getTodayHijri(): string {
  const formatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return `${formatter.format(new Date())} هـ`;
}

export  function stripWhiteBackground(
  img: HTMLImageElement,
  threshold = 235
): string {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) return img.src;

  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );

  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const minChannel = Math.min(r, g, b);

    // نخفف الشفافية تدريجيًا كلما اقترب البكسل من الأبيض الخالص،
    // بدل قطع حاد (hard cutoff) يترك حواف مسننة حول الشعار
    if (minChannel > threshold) {
      const whiteness =
        (minChannel - threshold) / (255 - threshold);

      data[i + 3] = data[i + 3] * (1 - whiteness);
    }
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL('image/png');
}