import { HeartPulse, Users, Home } from "lucide-react";
import servicesHeroImg from "../assets/images/services.jpg";
import { useEffect } from "react";


export default function ServicesPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="pt-10">


      {/* Hero / Header */}
      <section
        className="relative w-full h-[350px] md:h-[650px] flex items-center justify-center text-center px-6"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center-top"
          style={{ backgroundImage: `url(${servicesHeroImg})` }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-teal-900/50"></div>

        {/* Text Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Our Services
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl drop-shadow">
            Restorative Care HHS is dedicated to providing compassionate,
            professional, and personalized care to support comfort, dignity,
            and independence at home.
          </p>
        </div>
      </section>


      {/* Home Health Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">

          <HeartPulse className="w-12 h-12 text-primary mb-4 mx-auto" />
          <h2 className="text-3xl font-semibold text-primary mb-4">Home Health</h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>Restorative</strong> is more than a word—it represents our
            mission to bring comfort, healing, and dignity to every person we
            serve. Our philosophy of care shines through the commitment of our
            skilled nurses and caregivers who work tirelessly to make a positive
            impact.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            Home Health Care may be appropriate if a new diagnosis, chronic illness,
            hospitalization, or surgery requires changes in daily lifestyle. Our
            compassionate, expert team provides specialized care so you receive
            the proper support for your unique needs.
          </p>

          <p className="text-gray-600 leading-relaxed max-w-2xl">
            Our primary goal is to help you return to the activities you love,
            improve independence, and confidently manage your condition — all
            within the comfort and safety of your home.
          </p>

        </div>
      </section>

      {/* PAS Section */}
      <section className="py-20 bg-primaryLight">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">

          <Users className="w-12 h-12 text-primary mb-4 mx-auto" />
          <h2 className="text-3xl font-semibold text-primary mb-4">
            Personal Attendant Services (PAS)
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4 max-w-2xl">
            We strive to make a meaningful difference in the lives of those we care
            for by helping them regain independence. Our attendants provide warm,
            dependable care that allows you to remain comfortable at home while
            maintaining autonomy.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6 max-w-2xl">
            Our PAS caregivers assist with a wide range of daily, non-medical needs:
          </p>

          {/* Centered List */}
          <ul className="list-disc list-inside text-gray-600 space-y-2 text-left mx-auto">
            <li>House cleaning and laundry</li>
            <li>Meal preparation and feeding</li>
            <li>Accompanying you to doctor’s visits</li>
            <li>Dressing, bathing, and grooming</li>
            <li>Walking and exercising</li>
            <li>Shopping and errands</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mt-6 max-w-2xl">
            Our attendants are available 24/7 for clients who need assistance with
            daily activities. Our support team also ensures seamless scheduling and
            coordination to create the best care experience possible.
          </p>

        </div>
      </section>

      {/* Private Duty Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">

          <Home className="w-12 h-12 text-primary mb-4 mx-auto" />
          <h2 className="text-3xl font-semibold text-primary mb-4">Private Duty</h2>

          <p className="text-gray-600 leading-relaxed mb-4 max-w-2xl">
            Restorative offers private duty care for clients who need additional
            assistance to remain safe, comfortable, and independent in their homes.
            This service also provides respite care for family caregivers.
          </p>

          <p className="text-primary font-bold leading-relaxed mb-6 max-w-2xl">
            Private duty services may include:
          </p>

          {/* Centered List */}
          <ul className="list-disc list-inside text-gray-600 space-y-2 text-left mx-auto">
            <li>Personal care (bathing, dressing, hygiene, transfers, ambulation)</li>
            <li>Homemakers and companions</li>
            <li>Meal preparation</li>
            <li>Medication reminders</li>
            <li>
              Trained support for clients with specific needs such as Alzheimer's,
              hospice, or end-of-life care <em>(can be customized to needs later)</em>
            </li>
          </ul>

          <p className="text-gray-600 leading-relaxed mt-6 max-w-2xl">
            Private duty care may better suit individuals whose needs differ from
            traditional home health care, especially regarding payment methods.
          </p>

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
