import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { hasPurchasedCourse } from "@/lib/purchases";
import { getLessonsByCourse } from "@/lib/courses";
import { getCourseProgress } from "@/lib/progress";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const COURSE_NAMES: Record<string, string> = {
  "1": "General Drone Course",
  "2": "Drone Racing",
  "3": "Drone Soccer - Class 40",
  "4": "Drone Soccer - Class 20",
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any)?.id;
    const userName = session.user?.name || "Student";

    // Verify purchase
    const purchased = await hasPurchasedCourse(userId, courseId);
    if (!purchased) return NextResponse.json({ error: "Course not purchased" }, { status: 403 });

    // Verify all lessons completed
    const lessons = await getLessonsByCourse(courseId);
    const progress = await getCourseProgress(userId, courseId);
    const completedIds = new Set(progress.filter(p => p.completed).map(p => p.lessonId));
    const allDone = lessons.length > 0 && lessons.every(l => completedIds.has(l.id));
    if (!allDone) return NextResponse.json({ error: "Course not completed yet" }, { status: 403 });

    const courseName = COURSE_NAMES[courseId] || `Course #${courseId}`;
    const completedDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    // Build PDF
    const doc = await PDFDocument.create();
    const page = doc.addPage([842, 595]); // A4 landscape
    const { width, height } = page.getSize();

    const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await doc.embedFont(StandardFonts.Helvetica);

    // Background
    page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.97, 0.97, 0.97) });

    // Border
    page.drawRectangle({ x: 20, y: 20, width: width - 40, height: height - 40, borderColor: rgb(0, 0.4, 0.8), borderWidth: 3, color: rgb(1, 1, 1) });
    page.drawRectangle({ x: 28, y: 28, width: width - 56, height: height - 56, borderColor: rgb(0, 0.4, 0.8), borderWidth: 1 });

    // Header bar
    page.drawRectangle({ x: 20, y: height - 110, width: width - 40, height: 90, color: rgb(0, 0.4, 0.8) });

    // Title in header
    page.drawText("DRONE SOCCER", {
      x: width / 2 - fontBold.widthOfTextAtSize("DRONE SOCCER", 32) / 2,
      y: height - 70,
      size: 32,
      font: fontBold,
      color: rgb(1, 1, 1),
    });
    page.drawText("Training Academy", {
      x: width / 2 - fontRegular.widthOfTextAtSize("Training Academy", 14) / 2,
      y: height - 92,
      size: 14,
      font: fontRegular,
      color: rgb(0.8, 0.9, 1),
    });

    // Certificate of Completion
    page.drawText("Certificate of Completion", {
      x: width / 2 - fontBold.widthOfTextAtSize("Certificate of Completion", 26) / 2,
      y: height - 165,
      size: 26,
      font: fontBold,
      color: rgb(0.13, 0.13, 0.13),
    });

    // "This is to certify that"
    page.drawText("This is to certify that", {
      x: width / 2 - fontRegular.widthOfTextAtSize("This is to certify that", 14) / 2,
      y: height - 210,
      size: 14,
      font: fontRegular,
      color: rgb(0.4, 0.4, 0.4),
    });

    // Student name
    page.drawText(userName, {
      x: width / 2 - fontBold.widthOfTextAtSize(userName, 36) / 2,
      y: height - 265,
      size: 36,
      font: fontBold,
      color: rgb(0, 0.4, 0.8),
    });

    // Underline
    const nameWidth = fontBold.widthOfTextAtSize(userName, 36);
    page.drawLine({
      start: { x: width / 2 - nameWidth / 2, y: height - 270 },
      end: { x: width / 2 + nameWidth / 2, y: height - 270 },
      thickness: 1.5,
      color: rgb(0, 0.4, 0.8),
    });

    // "has successfully completed"
    page.drawText("has successfully completed", {
      x: width / 2 - fontRegular.widthOfTextAtSize("has successfully completed", 14) / 2,
      y: height - 300,
      size: 14,
      font: fontRegular,
      color: rgb(0.4, 0.4, 0.4),
    });

    // Course name
    page.drawText(courseName, {
      x: width / 2 - fontBold.widthOfTextAtSize(courseName, 22) / 2,
      y: height - 340,
      size: 22,
      font: fontBold,
      color: rgb(0.13, 0.13, 0.13),
    });

    // Date
    page.drawText(`Issued on ${completedDate}`, {
      x: width / 2 - fontRegular.widthOfTextAtSize(`Issued on ${completedDate}`, 12) / 2,
      y: height - 375,
      size: 12,
      font: fontRegular,
      color: rgb(0.5, 0.5, 0.5),
    });

    // Footer line
    page.drawLine({
      start: { x: 100, y: 100 },
      end: { x: width - 100, y: 100 },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8),
    });
    page.drawText("DroneSoccer Training Academy  •  Authorized Certificate", {
      x: width / 2 - fontRegular.widthOfTextAtSize("DroneSoccer Training Academy  •  Authorized Certificate", 10) / 2,
      y: 82,
      size: 10,
      font: fontRegular,
      color: rgb(0.6, 0.6, 0.6),
    });

    const pdfBytes = await doc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="certificate-${courseId}.pdf"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate certificate" }, { status: 500 });
  }
}
