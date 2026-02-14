"use client"

import React from "react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black-bg py-24 text-white">
      <div className="container mx-auto px-4 max-w-4xl" dir="rtl">
        <h1 className="text-4xl font-serif text-gold mb-8">سياسة الخصوصية</h1>
        <div className="prose prose-invert prose-lg max-w-none text-silver/80 space-y-8">
          <section>
            <p>موقعنا يحترم خصوصيّتك ويسعى لحماية بياناتك الشخصية. توضح سياسة الخصوصيّة كيفية جمع واستخدام بياناتك الشخصية (تحت ظروفٍ معينةٍ). كما تذكرُ أيضًا الإجراءات المتبعة لضمان خصوصية معلوماتك.</p>
          </section>
          
          <section>
            <h2 className="text-2xl text-white mb-4">1 – البيانات التي نجمعها</h2>
            <p>قد نحتاج لجمع المعلومات الخاصة بكَ إذا أردت تسجيل طلب شراء لسلعة من موقعنا. ونقوم بجمع وتخزين ومعالجة بياناتك الازمة لمتابعة شرائك من موقعنا لتأمين أية مطالب محتملة قد تظهر لاحقاً.</p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-4">2 – ملفات تعريف الارتباط (COOKIES)</h2>
            <p>لا يُعتبر قبول ملفات تعريف الارتباط شرطًا أساسيًا لزيارة الموقع. ولكنّنا نشير إلى أنّه لا يمكن استخدام وظائف “السلّة” على الموقع وطلب أي غرض من دون تفعيل ملفات تعريف الارتباط.</p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-4">3- الأمان</h2>
            <p>نستخدم تقنيات وإجراءات أمان ملائمة لمنع أي وصول غير مصرَّح به أو غير قانوني لمعلوماتك أو فقدانها أو تدميرها. فعندما نجمع البيانات من خلال الموقع، نقوم بتخزين معلوماتك الشخصية على قاعدة بيانات ضمن خادم إلكتروني آمن.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
