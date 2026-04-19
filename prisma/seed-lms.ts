import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding CELTA Prep Course with new structure...')

  // First, delete existing lessons and modules to start fresh
  console.log('Cleaning up existing data...')
  await prisma.lessonProgress.deleteMany()
  await prisma.courseLesson.deleteMany()
  await prisma.courseModule.deleteMany()
  console.log('✅ Cleaned up existing data')

  // Create course modules - Intro + 8 Modules
  console.log('Creating modules...')
  
  // Intro
  const introModule = await prisma.courseModule.create({
    data: {
      title: 'Cambridge CELTA Guide: The 5 Key Units & Essential Skills You Need to Master Teaching',
      description: 'Comprehensive guide to the Cambridge Intensive CELTA Course covering all 5 key units.',
      order: 0,
      isActive: true
    }
  })
  
  // Module 1
  const module1 = await prisma.courseModule.create({
    data: {
      title: 'Introduction to my complete CELTA UNLOCKED Preparation Course',
      description: 'Complete overview of the CELTA UNLOCKED preparation program.',
      order: 1,
      isActive: true
    }
  })
  
  // Module 2
  const module2 = await prisma.courseModule.create({
    data: {
      title: 'CELTA UNLOCKED – Lesson Architecture',
      description: 'How to Build a CELTA-Standard Lesson Every Time.',
      order: 2,
      isActive: true
    }
  })
  
  // Module 3
  const module3 = await prisma.courseModule.create({
    data: {
      title: 'How to Teach Grammar & Vocabulary the CELTA Way',
      description: 'Master the FMUP framework and effective CCQs.',
      order: 3,
      isActive: true
    }
  })
  
  // Module 4
  const module4 = await prisma.courseModule.create({
    data: {
      title: 'CELTA Skills Lessons - Reading & Listening',
      description: 'Master receptive skills lessons.',
      order: 4,
      isActive: true
    }
  })
  
  // Module 5
  const module5 = await prisma.courseModule.create({
    data: {
      title: 'How to Teach Speaking & Writing (Productive Skills)',
      description: 'Master productive skills lessons.',
      order: 5,
      isActive: true
    }
  })
  
  // Module 6
  const module6 = await prisma.courseModule.create({
    data: {
      title: 'TP Survival & Feedback Mastery',
      description: 'Frameworks for Teaching Practice success.',
      order: 6,
      isActive: true
    }
  })
  
  // Module 7
  const module7 = await prisma.courseModule.create({
    data: {
      title: 'Assignments Masterclass: How to Pass All 4',
      description: 'Complete guide to all 4 CELTA written assignments.',
      order: 7,
      isActive: true
    }
  })
  
  // Module 8
  const module8 = await prisma.courseModule.create({
    data: {
      title: 'CELTA Survival Guide: How to Stay Sane & Get a Pass A',
      description: 'Essential tips for surviving CELTA.',
      order: 8,
      isActive: true
    }
  })

  console.log('✅ Created 9 modules')

  // Create lessons for each module
  console.log('Creating lessons...')
  
  // Intro
  await prisma.courseLesson.create({
    data: {
      moduleId: introModule.id,
      title: 'Cambridge CELTA Guide: The 5 Key Units & Essential Skills',
      description: 'The 5 Key Units & Essential Skills You Need to Master Teaching.',
      youtubeId: 'KSyL7V3ODT4',
      duration: 26,
      order: 1,
      isActive: true,
      hasQuiz: false
    }
  })

  // Module 1
  await prisma.courseLesson.create({
    data: {
      moduleId: module1.id,
      title: 'Introduction to CELTA UNLOCKED Preparation Course',
      description: 'Introduction to the complete CELTA UNLOCKED Preparation Course.',
      youtubeId: 'usqsM5IIoqo',
      duration: 34,
      order: 1,
      isActive: true,
      hasQuiz: false
    }
  })

  // Module 2
  await prisma.courseLesson.create({
    data: {
      moduleId: module2.id,
      title: 'CELTA UNLOCKED – Lesson Architecture',
      description: 'Learn to deliver safe, predictable, pass-grade lessons.',
      youtubeId: '8bWD0J8C-TU',
      duration: 50,
      order: 1,
      isActive: true,
      hasQuiz: false
    }
  })

  // Module 3
  await prisma.courseLesson.create({
    data: {
      moduleId: module3.id,
      title: 'How to Teach Grammar & Vocabulary the CELTA Way',
      description: 'Learn exactly how Cambridge expects grammar and vocabulary to be taught.',
      youtubeId: 'M6etT6bg5XE',
      duration: 60,
      order: 1,
      isActive: true,
      hasQuiz: false
    }
  })

  // Module 4
  await prisma.courseLesson.create({
    data: {
      moduleId: module4.id,
      title: 'CELTA Skills Lessons - Reading & Listening',
      description: 'Learn the exact receptive-skills structure tutors expect.',
      youtubeId: 'qZwvc5BlDRo',
      duration: 40,
      order: 1,
      isActive: true,
      hasQuiz: false
    }
  })

  // Module 5
  await prisma.courseLesson.create({
    data: {
      moduleId: module5.id,
      title: 'How to Teach Speaking & Writing (Productive Skills)',
      description: 'Learn the CELTA structure for productive skills lessons.',
      youtubeId: '_govkbNLKOI',
      duration: 42,
      order: 1,
      isActive: true,
      hasQuiz: false
    }
  })

  // Module 6
  await prisma.courseLesson.create({
    data: {
      moduleId: module6.id,
      title: 'TP Survival & Feedback Mastery',
      description: 'Master teaching practice with proven frameworks.',
      youtubeId: 'lwt8VIH7_5E',
      duration: 41,
      order: 1,
      isActive: true,
      hasQuiz: false
    }
  })

  // Module 7
  await prisma.courseLesson.create({
    data: {
      moduleId: module7.id,
      title: 'Assignments Masterclass: How to Pass All 4',
      description: 'Learn what tutors look for and how to structure your work.',
      youtubeId: '13tz3E9dThg',
      duration: 38,
      order: 1,
      isActive: true,
      hasQuiz: false
    }
  })

  // Module 8
  await prisma.courseLesson.create({
    data: {
      moduleId: module8.id,
      title: 'CELTA Survival Guide: How to Stay Sane & Get a Pass A',
      description: 'Strategies for time management, self-care, and achieving the best possible grade.',
      youtubeId: 'elQSAx2LbMQ',
      duration: 29,
      order: 1,
      isActive: true,
      hasQuiz: false
    }
  })

  console.log('✅ Created all lessons!')

  // Create a test enrollment for demo
  await prisma.courseEnrollment.upsert({
    where: { enrollmentCode: 'CELTA2024' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test Student',
      enrollmentCode: 'CELTA2024',
      paymentStatus: 'completed',
      paidAmount: 80
    }
  })

  console.log('\n=== COURSE STRUCTURE ===')
  console.log('Total Modules: 9 (Intro + 8 Modules)')
  console.log('Total Lessons: 9')
  console.log('Test Enrollment Code: CELTA2024')
  console.log('Test Email: test@example.com')
  console.log('\n✅ Seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
