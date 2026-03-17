import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Renders the element with the given id as a PDF and triggers download.
 * Uses html2canvas to screenshot the live DOM (preserving all CSS/fonts/colors)
 * then embeds that image in a jsPDF A4 document.
 */
export async function exportElementAsPdf(
  elementId: string,
  filename = "documento.pdf"
): Promise<void> {
  const el = document.getElementById(elementId);
  if (!el) return;

  // Make sure background colors are rendered
  const canvas = await html2canvas(el, {
    scale: 2,           // 2x resolution for crisp text
    useCORS: true,      // allow cross-origin images (Supabase photos)
    allowTaint: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");

  // A4 in mm: 210 x 297
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();   // 210
  const pageH = pdf.internal.pageSize.getHeight();  // 297

  // Scale the canvas image to fit A4 width
  const imgW = pageW;
  const imgH = (canvas.height * pageW) / canvas.width;

  let y = 0;
  // If content is taller than one page, add extra pages
  while (y < imgH) {
    if (y > 0) pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, -y, imgW, imgH);
    y += pageH;
  }

  pdf.save(filename);
}
