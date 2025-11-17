import React from "react";
import veteransHero from "../assets/images/veterans.jpg";

export default function VeteransPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-16">

      {/* Hero Section */}
      <section
        className="relative w-full h-[350px] md:h-[650px] flex items-center justify-center text-center px-6"
        style={{
          backgroundImage: `url(${veteransHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="relative max-w-3xl mx-auto text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Quality Home Care for Veterans
          </h1>
          <p className="text-lg md:text-xl">
            Restorative Care Home Health Services provides compassionate respite 
            and homemaker caregiving services to veterans under VCA and TriWest agreements.
          </p>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-primary mb-8">
            How to Get Care
          </h2>

          <div className="text-left md:text-center space-y-6 text-gray-700 leading-relaxed">

            <p>
              <strong className="text-primary font-semibold">Step 1: </strong> 
              Use <a href="https://www.va.gov/find-forms/about-form-10-10ez/" className="text-primary underline" target="_blank" rel="noopener noreferrer">VA Form 10-10EZ</a> if you’re a Veteran and want to apply for VA health care. You must be enrolled in VA health care to receive care at VA facilities or have the VA cover your care at a community care provider like Restorative Care Home Health Services.
            </p>

            <p>
              <strong className="text-primary font-semibold">Step 2: </strong> Gather the necessary documents, including social security numbers for you, your spouse, and qualified dependents, military discharge information, insurance cards, and optionally, last year’s gross household income and deductible expenses.
            </p>

            <p>
              <strong className="text-primary font-semibold">Step 3: </strong> If you are already receiving VA care, speak to your case manager about obtaining a caregiver. Eligibility usually requires assistance with at least one <strong>Activity of Daily Living (ADL)</strong> such as personal hygiene, dressing, toileting, transferring, ambulating, or eating.
            </p>

            <p>
              <strong className="text-primary font-semibold">Step 4: </strong> Use <a href="https://www.va.gov/find-forms/about-form-10-10ezr/" className="text-primary underline" target="_blank" rel="noopener noreferrer">VA Form 10-10EZR</a> if you already receive VA health care benefits and need to update personal, insurance, or financial information.
            </p>

            <p>
              <strong className="text-primary font-semibold">Step 5: </strong> Once Restorative Care Home Health Services receives the referral, our agency will schedule a free in-home assessment to create an individualized service plan. Care will then be scheduled to start.
            </p>

            <p className="mt-6">
              For more information, visit the official <a href="https://www.va.gov/health-care/apply-for-health-care-form-10-10ez/introduction" className="text-primary underline font-semibold" target="_blank" rel="noopener noreferrer">VA Health Care Website</a>.
            </p>

          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-primaryLight text-center">
        <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
          Ready to Get Started?
        </h3>
        <p className="text-gray-700 mb-6 max-w-xl mx-auto">
          Contact Restorative Care Home Health Services to schedule your free in-home assessment and begin your care plan today.
        </p>
        <a
          href="tel:8172858515"
          className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary transition"
        >
          Call Us Now
        </a>
      </section>
    </div>
  );
}
