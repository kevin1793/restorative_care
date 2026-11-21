import { PHONE_HREF, PHONE_DISPLAY, EMAIL, EMAIL_HREF, ADDRESS_FULL } from "../siteInfo";
import React, { useEffect } from "react";
import Seo from "../components/Seo";

const linkClasses =
  "text-primary underline underline-offset-4 hover:text-primary/80 rounded-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2";

const PHONE = PHONE_DISPLAY;

// Language-assistance taglines. Each is shown in its own language and marked
// with a lang attribute so screen readers pronounce it correctly. The federal
// rule asks for the most common languages in the state; this is a starter set
// and the full list should be completed with professional translations.
const TAGLINES = [
  {
    lang: "en",
    language: "English",
    text: `ATTENTION: If you speak English or another language, language assistance services, free of charge, are available to you. Call ${PHONE}.`,
  },
  {
    lang: "es",
    language: "Español",
    text: `ATENCIÓN: si habla español, tiene a su disposición servicios gratuitos de asistencia lingüística. Llame al ${PHONE}.`,
  },
  {
    lang: "vi",
    language: "Tiếng Việt",
    text: `CHÚ Ý: Nếu bạn nói Tiếng Việt, có các dịch vụ hỗ trợ ngôn ngữ miễn phí dành cho bạn. Gọi số ${PHONE}.`,
  },
  {
    lang: "zh",
    language: "中文",
    text: `注意：如果您使用繁體中文，您可以免費獲得語言援助服務。請致電 ${PHONE}。`,
  },
  {
    lang: "ko",
    language: "한국어",
    text: `주의: 한국어를 사용하시는 경우, 언어 지원 서비스를 무료로 이용하실 수 있습니다. ${PHONE} 번으로 전화해 주십시오.`,
  },
  {
    lang: "tl",
    language: "Tagalog",
    text: `PAUNAWA: Kung nagsasalita ka ng Tagalog, maaari kang gumamit ng mga serbisyo ng tulong sa wika nang walang bayad. Tumawag sa ${PHONE}.`,
  },
];

export default function NondiscriminationPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <Seo path="/nondiscrimination" />

      <div className="pt-[var(--nav-h,87px)]">
        <section
          className="py-12 md:py-20 bg-white"
          aria-labelledby="nondiscrimination-heading"
        >
          <div className="max-w-3xl mx-auto px-6">
            <h1
              id="nondiscrimination-heading"
              style={{ "--i": 0 }}
              className="hero-rise text-3xl sm:text-4xl font-bold text-primary mb-4"
            >
              Notice of Nondiscrimination
            </h1>

            <p
              style={{ "--i": 1 }}
              className="hero-rise text-sm text-gray-700 mb-10"
            >
              Last updated: November 21, 2026
            </p>

            <div className="space-y-8 text-gray-800 leading-relaxed">
              <div>
                <p>
                  Restorative Care Home Health Services, Inc. complies with
                  applicable federal civil rights laws and does not
                  discriminate on the basis of race, color, national origin,
                  sex, age, or disability. We do not exclude people or treat
                  them differently because of race, color, national origin,
                  sex, age, or disability.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Free Aids and Services
                </h2>
                <p className="mb-3">We provide, free of charge:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Reasonable modifications and appropriate auxiliary aids and
                    services to people with disabilities so they can
                    communicate effectively with us, such as qualified sign
                    language interpreters and written information in other
                    formats (large print, audio, and accessible electronic
                    formats).
                  </li>
                  <li>
                    Language assistance services to people whose primary
                    language is not English, such as qualified interpreters and
                    information written in other languages.
                  </li>
                </ul>
                <p className="mt-3">
                  To request any of these services, call{" "}
                  <a href={PHONE_HREF} className={linkClasses}>
                    {PHONE}
                  </a>
                  . Callers who are deaf, hard of hearing, or have a speech
                  disability can dial 711 for Texas Relay.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Language Assistance
                </h2>
                <ul className="space-y-3">
                  {TAGLINES.map(({ lang, language, text }) => (
                    <li key={lang}>
                      <span className="block text-sm font-semibold text-gray-900">
                        {language}
                      </span>
                      <span lang={lang}>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  How to File a Grievance With Us
                </h2>
                <p className="mb-4">
                  If you believe we have failed to provide these services or
                  discriminated in another way on the basis of race, color,
                  national origin, sex, age, or disability, you can file a
                  grievance with our Civil Rights Coordinator. You can file in
                  person, by mail, or by email. If you need help filing, the
                  Civil Rights Coordinator is available to help you.
                </p>
                <p>
                  Civil Rights Coordinator
                  <br />
                  Restorative Care Home Health Services, Inc.
                  <br />
                  {ADDRESS_FULL}
                  <br />
                  Phone:{" "}
                  <a href={PHONE_HREF} className={linkClasses}>
                    {PHONE}
                  </a>
                  <br />
                  Email:{" "}
                  <a
                    href={EMAIL_HREF}
                    className={linkClasses}
                  >
                    {EMAIL}
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  File a Complaint With the U.S. Government
                </h2>
                <p className="mb-4">
                  You can also file a civil rights complaint with the U.S.
                  Department of Health and Human Services, Office for Civil
                  Rights, electronically through the{" "}
                  <a
                    href="https://ocrportal.hhs.gov/ocr/portal/lobby.jsf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClasses}
                    aria-label="Office for Civil Rights Complaint Portal — opens in a new tab"
                  >
                    Office for Civil Rights Complaint Portal
                  </a>
                  , or by mail or phone at:
                </p>
                <p className="mb-4">
                  U.S. Department of Health and Human Services
                  <br />
                  200 Independence Avenue SW, Room 509F, HHH Building
                  <br />
                  Washington, DC 20201
                  <br />
                  Phone:{" "}
                  <a href="tel:18003681019" className={linkClasses}>
                    1-800-368-1019
                  </a>
                  <br />
                  TDD:{" "}
                  <a href="tel:8005377697" className={linkClasses}>
                    800-537-7697
                  </a>
                </p>
                <p>
                  Complaint forms are available at{" "}
                  <a
                    href="https://www.hhs.gov/ocr/office/file/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClasses}
                    aria-label="hhs.gov/ocr/office/file, HHS Office for Civil Rights complaint forms — opens in a new tab"
                  >
                    hhs.gov/ocr/office/file
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
