import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  getAllModules,
  getModuleBySlug,
  getLessonBySlug,
} from '@/content/curriculum';
import { LessonReaderClient } from '@/components/learning/LessonReaderClient';

interface PageProps {
  params: Promise<{
    moduleSlug: string;
    lessonSlug: string;
  }>;
}

export async function generateStaticParams() {
  const modules = getAllModules();
  return modules.flatMap((m) =>
    m.lessons.map((l) => ({
      moduleSlug: m.slug,
      lessonSlug: l.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { moduleSlug, lessonSlug } = await params;
  const currentLesson = getLessonBySlug(moduleSlug, lessonSlug);

  if (!currentLesson) {
    return {
      title: 'Lesson Not Found | StackPath',
    };
  }

  return {
    title: `${currentLesson.title} | StackPath Academy`,
    description: currentLesson.objective,
  };
}

export default async function LessonReaderPage({ params }: PageProps) {
  const { moduleSlug, lessonSlug } = await params;

  const currentModule = getModuleBySlug(moduleSlug);
  const currentLesson = getLessonBySlug(moduleSlug, lessonSlug);

  if (!currentModule || !currentLesson) {
    notFound();
  }

  return (
    <LessonReaderClient
      key={currentLesson.id}
      moduleSlug={moduleSlug}
      lessonSlug={lessonSlug}
      currentModule={currentModule}
      currentLesson={currentLesson}
    />
  );
}
