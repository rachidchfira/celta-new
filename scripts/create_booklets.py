from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
import os

# Register fonts
pdfmetrics.registerFont(TTFont('Times New Roman', '/usr/share/fonts/truetype/english/Times-New-Roman.ttf'))
registerFontFamily('Times New Roman', normal='Times New Roman', bold='Times New Roman')

# Define colors
GOLD = colors.HexColor('#c9a84c')
TERRA = colors.HexColor('#b85c38')
INK = colors.HexColor('#0e0c0a')

def create_styles():
    styles = getSampleStyleSheet()
    
    styles.add(ParagraphStyle(
        name='CoverTitle',
        fontName='Times New Roman',
        fontSize=28,
        leading=36,
        alignment=TA_CENTER,
        textColor=INK,
        spaceAfter=24
    ))
    
    styles.add(ParagraphStyle(
        name='CoverSubtitle',
        fontName='Times New Roman',
        fontSize=14,
        leading=22,
        alignment=TA_CENTER,
        textColor=TERRA,
        spaceAfter=36
    ))
    
    styles.add(ParagraphStyle(
        name='Heading1Custom',
        fontName='Times New Roman',
        fontSize=18,
        leading=26,
        alignment=TA_LEFT,
        textColor=INK,
        spaceBefore=24,
        spaceAfter=12
    ))
    
    styles.add(ParagraphStyle(
        name='Heading2Custom',
        fontName='Times New Roman',
        fontSize=13,
        leading=20,
        alignment=TA_LEFT,
        textColor=TERRA,
        spaceBefore=18,
        spaceAfter=8
    ))
    
    styles.add(ParagraphStyle(
        name='BodyCustom',
        fontName='Times New Roman',
        fontSize=11,
        leading=18,
        alignment=TA_LEFT,
        textColor=INK,
        spaceAfter=12
    ))
    
    styles.add(ParagraphStyle(
        name='BulletCustom',
        fontName='Times New Roman',
        fontSize=11,
        leading=16,
        alignment=TA_LEFT,
        textColor=INK,
        leftIndent=20,
        spaceAfter=6
    ))
    
    return styles

def add_cover_page(story, styles, title, subtitle, author="Rachid Chfirra | CELTA Prep Morocco"):
    story.append(Spacer(1, 2*inch))
    story.append(Paragraph(f"<b>{title}</b>", styles['CoverTitle']))
    story.append(Spacer(1, 24))
    story.append(Paragraph(subtitle, styles['CoverSubtitle']))
    story.append(Spacer(1, 2*inch))
    story.append(Paragraph(author, styles['CoverSubtitle']))
    story.append(PageBreak())

def create_see_your_learner():
    """Create the See Your Learner booklet"""
    output_path = "/home/z/my-project/public/downloads/see-your-learner.pdf"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        title="See Your Learner - CELTA Written Assignment 1 Guide",
        author='Z.ai',
        creator='Z.ai',
        subject='Complete guide to CELTA Written Assignment 1'
    )
    
    styles = create_styles()
    story = []
    
    add_cover_page(
        story, styles,
        "See Your Learner",
        "A Trainer's Complete Guide to CELTA Written Assignment 1"
    )
    
    # Introduction
    story.append(Paragraph("<b>Introduction</b>", styles['Heading1Custom']))
    story.append(Paragraph(
        "The first written assignment on CELTA asks you to focus on a real learner: their background, their needs, their strengths, and the areas where they struggle. This guide will help you approach this assignment with the insight of a trainer.",
        styles['BodyCustom']
    ))
    
    story.append(Paragraph("<b>What the Assignment Requires</b>", styles['Heading1Custom']))
    story.append(Paragraph(
        "Written Assignment 1 typically has four main components:",
        styles['BodyCustom']
    ))
    story.append(Paragraph("• <b>Learner profile:</b> Background information, learning context, goals", styles['BulletCustom']))
    story.append(Paragraph("• <b>Needs analysis:</b> What the learner wants and needs to learn", styles['BulletCustom']))
    story.append(Paragraph("• <b>Language analysis:</b> Identifying specific strengths and weaknesses", styles['BulletCustom']))
    story.append(Paragraph("• <b>Recommendations:</b> Practical suggestions for improvement", styles['BulletCustom']))
    
    story.append(Paragraph("<b>Step 1: Conducting the Interview</b>", styles['Heading1Custom']))
    story.append(Paragraph(
        "Your interview with the learner is the foundation of this assignment. Here's how to make it count:",
        styles['BodyCustom']
    ))
    story.append(Paragraph("• Prepare open-ended questions that invite detailed responses", styles['BulletCustom']))
    story.append(Paragraph("• Ask about their learning history, not just current goals", styles['BulletCustom']))
    story.append(Paragraph("• Record the interview (with permission) for accurate quotes", styles['BulletCustom']))
    story.append(Paragraph("• Note not just what they say, but how they say it", styles['BulletCustom']))
    
    story.append(Paragraph("<b>Step 2: Analyzing Language Problems</b>", styles['Heading1Custom']))
    story.append(Paragraph(
        "The most important part of this assignment is accurately identifying language problems. Focus on:",
        styles['BodyCustom']
    ))
    story.append(Paragraph("• <b>Grammar:</b> Tense issues, article usage, word order problems", styles['BulletCustom']))
    story.append(Paragraph("• <b>Vocabulary:</b> Gaps, inappropriate word choice, collocation errors", styles['BulletCustom']))
    story.append(Paragraph("• <b>Pronunciation:</b> Individual sounds, word stress, sentence stress", styles['BulletCustom']))
    story.append(Paragraph("• <b>Discourse:</b> Cohesion, coherence, register appropriacy", styles['BulletCustom']))
    
    story.append(Paragraph("<b>Step 3: Making Recommendations</b>", styles['Heading1Custom']))
    story.append(Paragraph(
        "Your recommendations should be specific, practical, and justified by your analysis. Avoid generic advice like 'read more books.' Instead, suggest specific activities, materials, or strategies.",
        styles['BodyCustom']
    ))
    
    story.append(Paragraph("<b>Common Mistakes to Avoid</b>", styles['Heading1Custom']))
    story.append(Paragraph("• Making assumptions without evidence from the interview", styles['BulletCustom']))
    story.append(Paragraph("• Focusing only on grammar and ignoring other language areas", styles['BulletCustom']))
    story.append(Paragraph("• Providing vague recommendations without specific examples", styles['BulletCustom']))
    story.append(Paragraph("• Not linking recommendations to the learner's stated goals", styles['BulletCustom']))
    
    story.append(Paragraph("<b>Conclusion</b>", styles['Heading1Custom']))
    story.append(Paragraph(
        "This assignment is about demonstrating your ability to really see a learner — not as a generic student, but as an individual with specific needs. Take time to understand your learner, and your analysis will show the depth of insight that trainers look for.",
        styles['BodyCustom']
    ))
    
    doc.build(story)
    print(f"Created: {output_path}")

def create_think_like_trainer():
    """Create the Think Like a CELTA Trainer booklet"""
    output_path = "/home/z/my-project/public/downloads/think-like-celta-trainer.pdf"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        title="Think Like a CELTA Trainer",
        author='Z.ai',
        creator='Z.ai',
        subject='Understanding what CELTA assessors look for'
    )
    
    styles = create_styles()
    story = []
    
    add_cover_page(
        story, styles,
        "Think Like a CELTA Trainer",
        "The Insider's Guide to What Assessors Really Look For"
    )
    
    # Introduction
    story.append(Paragraph("<b>Introduction</b>", styles['Heading1Custom']))
    story.append(Paragraph(
        "After years as a CELTA trainer, I've noticed something: candidates who understand how trainers think consistently perform better. This guide reveals what goes through a trainer's mind during observations and assessment.",
        styles['BodyCustom']
    ))
    
    story.append(Paragraph("<b>The Trainer's Perspective</b>", styles['Heading1Custom']))
    story.append(Paragraph(
        "When trainers observe your lessons, they're not looking for perfection. They're looking for evidence of understanding, growth, and potential. Here's what we actually think about:",
        styles['BodyCustom']
    ))
    
    story.append(Paragraph("<b>1. Can you plan effectively?</b>", styles['Heading2Custom']))
    story.append(Paragraph(
        "Your lesson plan tells us if you understand what you're teaching and why. We look for clear objectives, logical staging, and anticipation of problems.",
        styles['BodyCustom']
    ))
    story.append(Paragraph("• Do your activities match your stated objectives?", styles['BulletCustom']))
    story.append(Paragraph("• Have you thought about potential learner difficulties?", styles['BulletCustom']))
    story.append(Paragraph("• Is your timing realistic?", styles['BulletCustom']))
    
    story.append(Paragraph("<b>2. Can you execute and adapt?</b>", styles['Heading2Custom']))
    story.append(Paragraph(
        "The best-laid plans often go awry. What matters is how you respond when things don't go as expected.",
        styles['BodyCustom']
    ))
    story.append(Paragraph("• Do you notice when students don't understand?", styles['BulletCustom']))
    story.append(Paragraph("• Can you adapt on the spot without losing direction?", styles['BulletCustom']))
    story.append(Paragraph("• Do you maintain your lesson's core purpose?", styles['BulletCustom']))
    
    story.append(Paragraph("<b>3. Do you understand language?</b>", styles['Heading2Custom']))
    story.append(Paragraph(
        "Language analysis is crucial. We want to see that you know what you're teaching at a deep level.",
        styles['BodyCustom']
    ))
    story.append(Paragraph("• Can you explain meaning clearly and concisely?", styles['BulletCustom']))
    story.append(Paragraph("• Do you use appropriate checking questions?", styles['BulletCustom']))
    story.append(Paragraph("• Is your pronunciation accurate?", styles['BulletCustom']))
    
    story.append(Paragraph("<b>The Growth Mindset</b>", styles['Heading1Custom']))
    story.append(Paragraph(
        "Perhaps most importantly, trainers look for candidates who can reflect and improve. A candidate who struggles in the first TP but shows growth will often pass over someone who starts strong but plateaus.",
        styles['BodyCustom']
    ))
    story.append(Paragraph("• Accept feedback graciously", styles['BulletCustom']))
    story.append(Paragraph("• Act on suggestions in subsequent lessons", styles['BulletCustom']))
    story.append(Paragraph("• Show you can self-evaluate honestly", styles['BulletCustom']))
    
    story.append(Paragraph("<b>What Trainers Don't Want to See</b>", styles['Heading1Custom']))
    story.append(Paragraph("• Defensive reactions to feedback", styles['BulletCustom']))
    story.append(Paragraph("• Blaming students for lesson problems", styles['BulletCustom']))
    story.append(Paragraph("• Repeating the same mistakes despite feedback", styles['BulletCustom']))
    story.append(Paragraph("• Over-reliance on materials at the expense of interaction", styles['BulletCustom']))
    
    story.append(Paragraph("<b>Conclusion</b>", styles['Heading1Custom']))
    story.append(Paragraph(
        "Think of CELTA as a developmental journey, not a performance. Trainers want you to succeed — but they need to see evidence that you're becoming a reflective, adaptable teacher. This mindset shift makes all the difference.",
        styles['BodyCustom']
    ))
    
    doc.build(story)
    print(f"Created: {output_path}")

def create_celta_mindset():
    """Create The CELTA MINDSET booklet"""
    output_path = "/home/z/my-project/public/downloads/celta-mindset.pdf"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        title="The CELTA MINDSET",
        author='Z.ai',
        creator='Z.ai',
        subject='Psychological framework for CELTA success'
    )
    
    styles = create_styles()
    story = []
    
    add_cover_page(
        story, styles,
        "The CELTA MINDSET",
        "Building the Mental Resilience for Success"
    )
    
    # Introduction
    story.append(Paragraph("<b>Introduction</b>", styles['Heading1Custom']))
    story.append(Paragraph(
        "CELTA is as much a psychological challenge as it is an academic one. This guide addresses the mental game — the fears, anxieties, and self-doubt that can undermine even the most prepared candidate.",
        styles['BodyCustom']
    ))
    
    story.append(Paragraph("<b>The Five Pillars of the CELTA Mindset</b>", styles['Heading1Custom']))
    
    story.append(Paragraph("<b>1. Growth Over Perfection</b>", styles['Heading2Custom']))
    story.append(Paragraph(
        "CELTA is designed for learning, not for demonstrating expertise. The candidates who thrive are those who embrace mistakes as learning opportunities.",
        styles['BodyCustom']
    ))
    story.append(Paragraph("• Every lesson is practice, not performance", styles['BulletCustom']))
    story.append(Paragraph("• Feedback is a gift, not criticism", styles['BulletCustom']))
    story.append(Paragraph("• Progress matters more than starting point", styles['BulletCustom']))
    
    story.append(Paragraph("<b>2. Presence Over Preparation</b>", styles['Heading2Custom']))
    story.append(Paragraph(
        "While preparation is essential, being fully present during your lessons is equally important. Over-preparation can lead to rigidity.",
        styles['BodyCustom']
    ))
    story.append(Paragraph("• Know your plan, but don't memorize it", styles['BulletCustom']))
    story.append(Paragraph("• Stay responsive to what's happening in class", styles['BulletCustom']))
    story.append(Paragraph("• Trust your preparation and let go", styles['BulletCustom']))
    
    story.append(Paragraph("<b>3. Resilience Over Avoidance</b>", styles['Heading2Custom']))
    story.append(Paragraph(
        "Difficult moments will happen. How you recover matters more than whether you struggle.",
        styles['BodyCustom']
    ))
    story.append(Paragraph("• Acknowledge mistakes without dwelling on them", styles['BulletCustom']))
    story.append(Paragraph("• Have recovery strategies ready", styles['BulletCustom']))
    story.append(Paragraph("• Remember: students don't expect perfection", styles['BulletCustom']))
    
    story.append(Paragraph("<b>4. Curiosity Over Judgment</b>", styles['Heading2Custom']))
    story.append(Paragraph(
        "Approach your teaching with curiosity. Instead of judging yourself harshly, ask questions.",
        styles['BodyCustom']
    ))
    story.append(Paragraph("• 'What can I learn from this?' instead of 'I failed'", styles['BulletCustom']))
    story.append(Paragraph("• 'What would make this clearer?' instead of 'They didn't understand'", styles['BulletCustom']))
    story.append(Paragraph("• 'How can I improve?' instead of 'I'm not good enough'", styles['BulletCustom']))
    
    story.append(Paragraph("<b>5. Community Over Competition</b>", styles['Heading2Custom']))
    story.append(Paragraph(
        "Your fellow candidates are allies, not competitors. Build a support network.",
        styles['BodyCustom']
    ))
    story.append(Paragraph("• Share materials and ideas", styles['BulletCustom']))
    story.append(Paragraph("• Observe each other's lessons supportively", styles['BulletCustom']))
    story.append(Paragraph("• Celebrate each other's wins", styles['BulletCustom']))
    
    story.append(Paragraph("<b>Managing Anxiety</b>", styles['Heading1Custom']))
    story.append(Paragraph(
        "Anxiety is normal. Here are practical strategies:",
        styles['BodyCustom']
    ))
    story.append(Paragraph("• <b>Breathing:</b> Deep breaths before teaching calm your nervous system", styles['BulletCustom']))
    story.append(Paragraph("• <b>Grounding:</b> Feel your feet on the floor, notice three things you can see", styles['BulletCustom']))
    story.append(Paragraph("• <b>Reframing:</b> Nervous energy is excitement in disguise", styles['BulletCustom']))
    story.append(Paragraph("• <b>Preparation:</b> Know your material, but also prepare mentally", styles['BulletCustom']))
    
    story.append(Paragraph("<b>The Week-by-Week Mental Journey</b>", styles['Heading1Custom']))
    story.append(Paragraph("<b>Week 1:</b> Embrace being a beginner. Ask questions. Make mistakes.", styles['BulletCustom']))
    story.append(Paragraph("<b>Week 2:</b> Build on foundations. Notice your growth.", styles['BulletCustom']))
    story.append(Paragraph("<b>Week 3:</b> Push through challenges. Seek feedback actively.", styles['BulletCustom']))
    story.append(Paragraph("<b>Week 4:</b> Trust yourself. You've earned it.", styles['BulletCustom']))
    
    story.append(Paragraph("<b>Conclusion</b>", styles['Heading1Custom']))
    story.append(Paragraph(
        "Your mindset determines your experience. CELTA will challenge you, but with the right mental framework, those challenges become opportunities for growth. You have what it takes — now believe it.",
        styles['BodyCustom']
    ))
    
    doc.build(story)
    print(f"Created: {output_path}")

if __name__ == '__main__':
    print("Creating PDF booklets with new names...")
    create_see_your_learner()
    create_think_like_trainer()
    create_celta_mindset()
    print("All booklets created successfully!")
