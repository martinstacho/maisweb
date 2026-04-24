import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { TestimonialForm } from '@/components/TestimonialForm'

export const dynamic = 'force-dynamic'

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [testimonial, partners] = await Promise.all([
    prisma.testimonial.findUnique({ where: { id } }),
    prisma.partner.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
      select: { id: true, shortName: true, name: true },
    }),
  ])
  if (!testimonial) return notFound()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 bg-slate-900/60 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <Link href="/admin/testimonials" className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors">
            <ArrowLeft size={16} /> Referencie
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-sm text-slate-300">{testimonial.title}</span>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-black mb-10">Editovať referenciu</h1>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8">
          <TestimonialForm initial={testimonial} partners={partners} />
        </div>
      </main>
    </div>
  )
}
