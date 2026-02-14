"use client"

import React from "react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black-bg py-24 text-white">
      <div className="container mx-auto px-4 max-w-4xl" dir="rtl">
        <h1 className="text-4xl font-serif text-gold mb-8">شروط الاستخدام</h1>
        <div className="prose prose-invert prose-lg max-w-none text-silver/80 space-y-8">
          <section>
            <h2 className="text-2xl text-white mb-4">المقدمة</h2>
            <p>تنطبق شروط الاستخدام على الموقع وعلى جميع أقسامها وفروعها ومواقع الإنترنت التابعة لها التي تُشير إلى هذه الشروط والأحكام كمرجعٍ لها. عند زيارة الموقع، يقر العميل موافقته على الشروط والأحكام الحالية. وإن كنت لا توافق عليها، فعليك عدم استخدام هذا الموقع.</p>
          </section>
          
          <section>
            <h2 className="text-2xl text-white mb-4">استخدام الموقع</h2>
            <p>لزيارة هذا الموقع، يجب ألا يقل عمرك عن 18 عامًا أو أن تزور الموقع تحت إشراف أحد الوالدين أو الوصي القانوني. ونمنحك ترخيصًا غير قابل للتحويل أو الإلغاء لكي تستخدم الموقع بموجب الشروط والأحكام المحدَّدة.</p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-4">مشاركات المستخدم</h2>
            <p>إنّ كلّ مشاركاتك على الموقع و/أو ما تقدمه لنا، بما في ذلك ــ على سبيل المثال وليس الحصرــ الأسئلة والانتقادات والتعليقات والاقتراحات تصبح ملكنا الوحيد والحصري.</p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-4">القانون السائد والهيئات القضائية</h2>
            <p>تُفسَّر هذه الشروط والأحكام وتُطبَّق بموجب القوانين السارية في البلد. وبموجب ذلك، يوافق كل طرف على المثول أمام هيئات المحاكم القضائية في البلد والتنازل عن أية اعتراضات تتعلق بالمكان.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
