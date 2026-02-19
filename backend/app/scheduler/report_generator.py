from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

def generate_pdf_report(filename="report.pdf"):
    doc = SimpleDocTemplate(filename)
    styles = getSampleStyleSheet()
    elements = []

    elements.append(Paragraph("AI Market Trend Report", styles["Heading1"]))
    elements.append(Paragraph("Generated Successfully", styles["Normal"]))

    doc.build(elements)

    return {"message": "PDF Generated"}
