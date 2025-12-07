import { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";
import careersHeroImg from "../assets/images/careers_hero.jpg"; // Replace with a careers hero image

export default function CareersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Example job listings — you can add as many as you like
  const [jobs] = useState([
    {
      id: 1,
      title: "Home Health Aide",
      details: "Full Time/Part Time | Competitive Pay | Bedford, TX",
      description:
        "Restorative Home Health Care is looking for part-time and full-time caring and compassionate professionals to join our team. Our mission is to enhance the lives of elderly and disabled adults throughout our community. We provide various medical and non-medical services that allow community members to remain in their homes for care.",
      responsibilities: [
        "You will make a difference in the lives of seniors and adults with disabilities by enhancing their quality of life",
        "The role involves assisting clients with daily living activities, offering companionship, and ensuring a safe and supportive environment",
        "Assist with personal hygiene needs and dressing",
        "Prepare meals and snacks",
        "Light housekeeping activities",
        "Medication reminders",
      ],
      requirements: [
        "Must be able to lift up to 50 lbs",
        "Stand and walk for extended periods",
        "Perform frequent bending, reaching, and kneeling to assist clients with daily care needs",
      ],
      qualifications: [
        "At least one year of experience as a home health aide or nursing assistant in a hospital, nursing home, or home health agency is preferred.",
        "First aid and CPR certified",
        "Knowledge of basic housekeeping tasks and cooking skills",
        "Ability to adhere to all health and safety guidelines",
        "Excellent communication and interpersonal skills",
        "Possess a valid driver's license and have use of an insured automobile or access to adequate transportation for the job",
        "Able to lift a minimum of 25 lbs",
      ],
      benefits: [
        "Flexible scheduling",
        "Competitive pay",
        "Ongoing training and support",
        "Growing Company with opportunity for development",
      ],
    },
    {
      id: 2,
      title: "	Licensed Vocational Nurse (LVN/PRN)",
      details: "Full Time | Competitive Pay | Bedford, TX",
      description:
        "Restorative Care Home Health Services, INC is seeking a compassionate and skilled Licensed Vocational Nurse (LVN) to join our team on a PRN (as needed) basis. The PRN LVN will provide professional nursing care to our clients in their homes, adhering to established nursing standards, physician orders, and the policies and procedures of our agency. This role offers flexible scheduling and the opportunity to make a meaningful impact on the well-being of individuals in our community.",
      responsibilities: [
        "Provide skilled nursing care to clients in their homes, including but not limited to:",
        " - Administering medications (oral, subcutaneous, intramuscular, etc.) as prescribed and documenting appropriately.",
        " - Performing wound care and dressing changes.",
        " - Monitoring vital signs and reporting any changes or concerns to the supervising RN and physician.",
        " - Assisting with personal care activities as needed (e.g., bathing, dressing, grooming).",
        " - Providing catheter care and management.",
        " - Managing ostomies.",
        " - Providing tracheostomy care.",
        " - Performing blood glucose monitoring and administering insulin as ordered.",
        " - Implementing and following the client's plan of care developed by the Registered Nurse.",
        "Observe and assess clients' physical, emotional, and social needs, and report any changes in condition or concerns to the supervising RN and physician.",
        "Document all nursing care, observations, and interventions accurately and timely in the electronic health record (EHR).",
        "Communicate effectively with clients, families, caregivers, physicians, and other members of the healthcare team.",
        "Provide education and support to clients and their families regarding their health conditions, medications, and treatment plans.",
        "Maintain a clean and safe environment for clients.",
        "Adhere to all agency policies and procedures, as well as professional nursing standards and legal requirements.",
        "Participate in in-service training and continuing education as required.",
        "Maintain confidentiality of client information in accordance with HIPAA regulations.",
        "Accept and follow PRN assignments based on agency needs and your availability.",
        "Other duties as assigned within the scope of LVN licensure.",
      ],
      requirements: [
        "Ability to lift and transfer clients as needed (may require lifting up to 25 pounds).",
        "Ability to stand, walk, bend, stoop, and reach frequently.",
        "Visual and auditory acuity sufficient to perform nursing duties.",
        "Ability to assist clients with mobility and ambulation.",
      ],
      qualifications: [
        "Current and unrestricted Licensed Vocational Nurse (LVN) license in the State of Texas.",
        "Current Basic Life Support (BLS) certification.",
        "Graduate of an accredited school of vocational nursing.",
        "Minimum of two years of nursing experience, preferably in home health care or a related setting. New graduates with strong clinical skills and a passion for home health are also encouraged to apply.",
        "Demonstrated knowledge of nursing principles, practices, and procedures.",
        "Proficiency in medication administration, wound care, and other skilled nursing interventions.",
        "Excellent observation, assessment, and problem-solving skills.",
        "Strong communication, interpersonal, and organizational skills.",
        "Ability to work independently and as part of a team.",
        "Compassionate, patient, and empathetic demeanor.",
        "Reliable transportation and a valid Texas driver's license with proof of current auto insurance.  ",
        "Ability to pass a background check and drug screening.",
        "Experience with electronic health records (EHR) is preferred.",

      ],
      benefits: [
        "Flexible PRN scheduling.",
        "Competitive PRN pay rate.",
        "Opportunity to gain experience in a rewarding home health care setting.",
        "Supportive and collaborative work environment."
      ],
    },
  ]);

  const [openJob, setOpenJob] = useState(null);
  const toggleJob = (id) => {
    setOpenJob(openJob === id ? null : id);
  };

  return (
    <div className="pt-10">

      {/* Hero Section */}
      <section
        className="relative w-full h-[350px] md:h-[650px] flex items-center justify-center text-center px-6"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${careersHeroImg})` }}
        ></div>

        <div className="absolute inset-0 bg-teal-900/50"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Careers With Us
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl drop-shadow">
            Join a compassionate team dedicated to restoring dignity, comfort,
            and independence in the lives of those we serve.
          </p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">

          <h2 className="text-3xl font-semibold text-primary mb-10 text-center">
            Current Open Positions
          </h2>

          <div className="space-y-8">
  {jobs.map((job) => (
    <div
      key={job.id}
      className="border border-primaryLight rounded-2xl shadow-sm p-6 bg-primaryLight/40"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => toggleJob(job.id)}
      >
        <div>
          <h3 className="text-2xl font-semibold text-primary flex items-center gap-2">
            <Briefcase className="w-6 h-6" />
            {job.title}
          </h3>
          <p className="text-gray-600">{job.details}</p>
        </div>

        <button className="text-primary text-xl">
          {openJob === job.id ? "−" : "+"}
        </button>
      </div>

      {/* Expanded Job Details */}
      {openJob === job.id && (
        <div className="mt-6 space-y-6 text-gray-700">

          {/* Description */}
          <div>
            <p className="leading-relaxed">{job.description}</p>
          </div>

          {/* Responsibilities */}
          <div>
            <h4 className="font-semibold text-primary mb-2">
              Responsibilities:
            </h4>
            <ul className="list-disc list-inside space-y-1">
              {job.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div>
            <h4 className="font-semibold text-primary mb-2">
              Requirements:
            </h4>
            <ul className="list-disc list-inside space-y-1">
              {job.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Qualifications */}
          <div>
            <h4 className="font-semibold text-primary mb-2">
              Qualifications:
            </h4>
            <ul className="list-disc list-inside space-y-1">
              {job.qualifications.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="font-semibold text-primary mb-2">
              Benefits:
            </h4>
            <ul className="list-disc list-inside space-y-1">
              {job.benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Apply Section */}
          <div className="mt-6 text-center">
            <p className="mt-20 mb-4 font-bold text-primary">
              Interested? Send us your resume and contact information and we will review your application.
            </p>
            <a
              href={`mailto:inforestorativecare@gmail.com?subject=Job Application: ${encodeURIComponent(job.title)} from website`}
              className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primaryDark transition"
            >
              Apply
            </a>
          </div>

        </div>
      )}
    </div>
  ))}
</div>

        </div>
      </section>

      {/* EEO Statement */}
      <section className="py-16 bg-primaryLight text-center px-6">
        <p className="text-gray-700 max-w-3xl mx-auto text-sm leading-relaxed">
          <strong>Restorative Care Home Health Services</strong> is an Equal Opportunity
          Employer and values diversity at all levels of its organization. All qualified
          applicants will receive consideration for employment without regard to race,
          color, religion, sex, national origin, disability, or protected veteran status.
        </p>
      </section>

    </div>
  );
}
