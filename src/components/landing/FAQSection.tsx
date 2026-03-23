import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { AnimatedSection } from './AnimatedSection'
import { faqs } from './constants'
import { MessageCircle } from 'lucide-react'
import { getWhatsAppLink } from './constants'

export function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-28 bg-[#0e0c0a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)', backgroundSize: '28px 28px' }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-[#c9a84c]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-[#b85c38]/5 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/25 px-4 py-1.5 rounded-full mb-6">
              <span className="font-body text-xs text-[#c9a84c] uppercase tracking-widest font-semibold">Got Questions?</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f0e8] mb-5">
              Frequently Asked{' '}
              <span className="text-[#c9a84c]">Questions</span>
            </h2>
            <p className="font-body text-[#a09890] text-lg">
              Everything you need to know before enrolling.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-[#1a1816] rounded-2xl px-6 border border-[#2a2725] data-[state=open]:border-[#c9a84c]/40 data-[state=open]:shadow-lg data-[state=open]:shadow-[#c9a84c]/5 transition-all duration-300 overflow-hidden"
              >
                {/* Gold left accent when open */}
                <div className="relative">
                  <AccordionTrigger className="font-body text-base text-[#f5f0e8] hover:text-[#c9a84c] text-left py-5 transition-colors duration-200 [&>svg]:text-[#c9a84c]">
                    {faq.q}
                  </AccordionTrigger>
                </div>
                <AccordionContent className="font-body text-[#a09890] pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>

        {/* Still have questions */}
        <AnimatedSection>
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-[#1a1816] border border-[#2a2725] rounded-2xl px-8 py-6">
              <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-body text-[#f5f0e8] font-semibold text-sm">Still have questions?</p>
                <p className="font-body text-[#6b6560] text-xs mt-0.5">Rachid replies within 24 hours on WhatsApp.</p>
              </div>
              <a
                href={getWhatsAppLink("Hi Rachid, I have a question about CELTA Prep Morocco")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine font-body font-semibold text-sm bg-[#25D366] text-white px-5 py-2.5 rounded-xl hover:bg-[#1ebe5d] transition-all duration-200 whitespace-nowrap shadow-md"
              >
                Ask on WhatsApp →
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
