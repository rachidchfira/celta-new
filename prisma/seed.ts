import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create modules with lessons
  const modulesData = [
    {
      title: 'Module 1: CELTA Foundations',
      description: 'Understanding the CELTA course structure, requirements, and how to succeed from day one',
      order: 1,
      lessons: [
        {
          title: 'Introduction to CELTA UNLOCKED',
          description: 'Welcome to CELTA UNLOCKED! In this introduction, I\'ll walk you through exactly what you\'re going to get from this course—no fluff, no filler. We\'ll talk about how to use these videos, the best way to study, and the mindset that separates trainees who thrive from those who barely survive. Think of this as your roadmap for the journey ahead.',
          youtubeId: 'usqsM5IIoqo',
          duration: 15,
          order: 1
        },
        {
          title: 'Cambridge CELTA Guide: The 5 Key Units',
          description: 'Let\'s break down the actual Cambridge CELTA syllabus—the 5 Units you need to understand. I\'ll explain what each unit is really about and why Cambridge organized the course this way. Once you see the big picture, everything else starts making sense.',
          youtubeId: 'KSyL7V3ODT4',
          duration: 20,
          order: 2
        }
      ]
    },
    {
      title: 'Module 2: Lesson Planning Mastery',
      description: 'Creating effective lesson plans that impress trainers and set you up for teaching success',
      order: 2,
      lessons: [
        {
          title: 'How to Build a CELTA-Standard Lesson',
          description: 'This video is about the architecture of a CELTA lesson—the structure that makes or breaks your TP. I\'ll show you the key stages, how they connect, and the logic behind each part. Once you understand this, lesson planning stops feeling like guesswork.',
          youtubeId: '8bWD0J8C-TU',
          duration: 30,
          order: 1
        }
      ]
    },
    {
      title: 'Module 3: Grammar & Vocabulary Teaching',
      description: 'Master the MPF framework and concept checking questions for effective language teaching',
      order: 3,
      lessons: [
        {
          title: 'How to Teach Grammar & Vocabulary (FMUP + CCQs)',
          description: 'Language analysis is where many trainees struggle—but it doesn\'t have to be that way. I\'ll show you the FMUP framework (Form, Meaning, Use, Pronunciation) and how to craft CCQs that actually check understanding. This is the skill that separates good teachers from great ones.',
          youtubeId: 'M6etT6bg5XE',
          duration: 35,
          order: 1
        }
      ]
    },
    {
      title: 'Module 4: Receptive Skills',
      description: 'Teaching reading and listening skills effectively without overwhelming your students',
      order: 4,
      lessons: [
        {
          title: 'Reading & Listening Without Suffering',
          description: 'Receptive skills lessons—reading and listening—are often done poorly on CELTA. I\'ll show you the right way: how to set tasks that actually develop skills, how to sequence activities, and how to avoid the most common traps trainees fall into.',
          youtubeId: 'qZwvc5BlDRo',
          duration: 25,
          order: 1
        }
      ]
    },
    {
      title: 'Module 5: Productive Skills',
      description: 'Teaching speaking and writing with confidence and proper staging',
      order: 5,
      lessons: [
        {
          title: 'How to Teach Speaking & Writing',
          description: 'Productive skills—speaking and writing—need careful staging and clear models. In this video, I\'ll break down how to scaffold these lessons so students can actually produce language, not just sit there confused. We\'ll cover task cycles, feedback strategies, and what trainers are really looking for.',
          youtubeId: '_govkbNLKOI',
          duration: 28,
          order: 1
        }
      ]
    },
    {
      title: 'Module 6: Teaching Practice Survival',
      description: 'Navigate teaching practice with confidence and handle feedback professionally',
      order: 6,
      lessons: [
        {
          title: 'TP Survival & Feedback Mastery',
          description: 'Teaching Practice is the heart of CELTA—and the biggest source of stress. This video is about surviving and thriving in TP: how to prepare, what to do when things go wrong, and how to actually benefit from feedback instead of just feeling criticized.',
          youtubeId: 'lwt8VIH7_5E',
          duration: 22,
          order: 1
        }
      ]
    },
    {
      title: 'Module 7: Written Assignments',
      description: 'Complete all four CELTA assignments successfully on your first attempt',
      order: 7,
      lessons: [
        {
          title: 'Assignments Masterclass: Pass All 4 First Time',
          description: 'The four written assignments can feel overwhelming—but they follow predictable patterns. In this masterclass, I\'ll break down each assignment type, show you what assessors actually want, and give you strategies to pass on your first submission.',
          youtubeId: '13tz3E9dThg',
          duration: 40,
          order: 1
        }
      ]
    },
    {
      title: 'Module 8: Final Success Strategies',
      description: 'Stay organized, manage stress, and position yourself for a Pass A grade',
      order: 8,
      lessons: [
        {
          title: 'How to Stay Sane & Get a Pass A',
          description: 'CELTA is intense. This final video is about the non-teaching side of success: organization, time management, stress control, and the mindset that leads to a Pass A. It\'s not just about teaching—it\'s about surviving the process while staying human.',
          youtubeId: 'elQSAx2LbMQ',
          duration: 18,
          order: 1
        }
      ]
    }
  ]

  // Clear existing data
  console.log('🧹 Cleaning existing data...')
  await prisma.lessonProgress.deleteMany()
  await prisma.courseLesson.deleteMany()
  await prisma.courseModule.deleteMany()

  // Create modules and lessons
  console.log('📚 Creating modules and lessons...')
  for (const moduleData of modulesData) {
    const { lessons, ...moduleInfo } = moduleData
    
    const courseModule = await prisma.courseModule.create({
      data: {
        ...moduleInfo,
        lessons: {
          create: lessons
        }
      }
    })
    
    console.log(`✅ Created: ${courseModule.title} with ${lessons.length} lessons`)
  }

  // Create a test enrollment for admin to test
  console.log('👤 Creating test enrollment...')
  const existingEnrollment = await prisma.courseEnrollment.findUnique({
    where: { enrollmentCode: 'CELTA-TEST-2024' }
  })

  if (!existingEnrollment) {
    await prisma.courseEnrollment.create({
      data: {
        email: 'test@example.com',
        name: 'Test Student',
        enrollmentCode: 'CELTA-TEST-2024',
        paymentStatus: 'completed',
        paidAmount: 80
      }
    })
    console.log('✅ Created test enrollment: test@example.com with code CELTA-TEST-2024')
  }

  // Create sample booklets
  console.log('📖 Creating booklets...')
  const booklets = [
    {
      title: 'CELTA Grammar Essentials',
      description: 'Essential grammar points every CELTA trainee needs to master',
      filename: 'celta-grammar-essentials.pdf',
      order: 1
    },
    {
      title: 'Lesson Plan Templates',
      description: 'Ready-to-use lesson plan templates for grammar, vocabulary, and skills lessons',
      filename: 'lesson-plan-templates.pdf',
      order: 2
    },
    {
      title: 'CCQ Bank: 100+ Examples',
      description: 'Over 100 concept checking questions for common grammar points',
      filename: 'ccq-bank.pdf',
      order: 3
    }
  ]

  for (const booklet of booklets) {
    await prisma.booklet.upsert({
      where: { filename: booklet.filename },
      update: booklet,
      create: booklet
    })
  }
  console.log('✅ Created booklets')

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
