// src/components/AboutUs.jsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FiUsers,
  FiShield,
  FiZap,
  FiHeart,
  FiCheckCircle,
  FiPhoneCall,
  FiMapPin,
  FiActivity,
} from "react-icons/fi";


const defaultTeam = [
  {
    id: "t-01",
    name: "Ayesha Rahman",
    role: "Community Lead",
    photo:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "t-02",
    name: "Kamal Hossain",
    role: "Operations Manager",
    photo:
      "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "t-03",
    name: "Nadia Karim",
    role: "Resident Support",
    photo:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop",
  },
];

const values = [
  {
    icon: <FiUsers />,
    title: "Community",
    desc: "Tools that bring residents and managers together with clarity and trust.",
  },
  {
    icon: <FiShield />,
    title: "Transparency",
    desc: "Clear agreements, payment history, and notices—always accessible.",
  },
  {
    icon: <FiZap />,
    title: "Efficiency",
    desc: "From requests to approvals—fewer clicks, faster outcomes.",
  },
  {
    icon: <FiHeart />,
    title: "Support",
    desc: "Responsive help, timely updates, and a human-first approach.",
  },
];

const AboutUs = ({ team = defaultTeam, className = "" }) => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 24, easing: "ease-out" });
  }, []);

  return (
    <section
      className={`w-full bg-gray-50 dark:bg-gray-900 transition-all duration-500 ${className}`}
      aria-labelledby="aboutus-heading"
    >
      <div className="max-w-[1980px] mx-auto px-6 py-10">
        {/* Hero */}
        <header className="text-center" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 text-emerald-500 font-inter text-sm sm:text-base">
            <FiMapPin className="text-lg" />
            About TowerTrack
          </span>
          <h1
            id="aboutus-heading"
            className="mt-2 text-2xl sm:text-3xl md:text-4xl font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500"
          >
            Building Connections. <span className="text-lime-600">Managing Homes.</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
            TowerTrack is a resident-centric building management platform that simplifies
            operations for admins and delivers a seamless living experience for members.
          </p>
        </header>

        {/* Mission / Vision */}
        <section
          className="mt-10 sm:mt-12 md:mt-16 grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <article className="rounded-2xl p-5 sm:p-6 md:p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-500">
            <h2 className="text-xl sm:text-2xl font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500">
              Our Mission
            </h2>
            <p className="mt-3 text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
              Empower every residential community with modern tools for <strong>payments</strong>,
              <strong> announcements</strong>, and <strong>maintenance</strong>—so that daily life is
              simpler, transparent, and connected.
            </p>
          </article>

          <article className="rounded-2xl p-5 sm:p-6 md:p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-500">
            <h2 className="text-xl sm:text-2xl font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500">
              Our Vision
            </h2>
            <p className="mt-3 text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
              Create thriving neighborhoods where <strong>residents feel heard</strong> and
              <strong> managers stay efficient</strong>—powered by role-based dashboards and
              secure, scalable technology.
            </p>
          </article>
        </section>

        {/* Values / Features Grid */}
        <section
          className="mt-10 sm:mt-12 md:mt-16"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <h2 className="text-center text-xl sm:text-2xl font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500">
            What We Value
          </h2>
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {values.map((v, i) => (
              <ValueCard key={i} {...v} />
            ))}
          </div>
        </section>

        {/* Info Highlights */}
        <section
          className="mt-10 sm:mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <InfoCard
            icon={<FiActivity />}
            title="Reliable & Scalable"
            desc="Built on a MERN foundation with JWT security and Stripe integration for trusted payments."
          />
          <InfoCard
            icon={<FiCheckCircle />}
            title="Role-Based Access"
            desc="Admins, members, and users get exactly what they need—nothing more, nothing less."
          />
          <InfoCard
            icon={<FiPhoneCall />}
            title="Responsive Support"
            desc="Clear announcements and fast maintenance workflows keep everyone on the same page."
          />
        </section>

        {/* Team (optional) */}
        <section
          className="mt-10 sm:mt-12 md:mt-16"
          data-aos="fade-up"
          data-aos-delay="250"
        >
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xl sm:text-2xl font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500">
              Meet the Team
            </h2>
            <p className="text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
              A dedicated group focused on community experience and operational excellence.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {team.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

/* ---------- Subcomponents ---------- */

const ValueCard = ({ icon, title, desc }) => (
  <div className="rounded-2xl p-5 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-500">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-lime-50 dark:bg-gray-700 text-lime-600 text-2xl">
      {icon}
    </div>
    <h3 className="mt-3 text-lg font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500">
      {title}
    </h3>
    <p className="mt-1.5 text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
      {desc}
    </p>
  </div>
);

const InfoCard = ({ icon, title, desc }) => (
  <div className="rounded-2xl p-5 sm:p-6 md:p-7 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-500">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 dark:bg-gray-700 text-emerald-600 text-2xl">
      {icon}
    </div>
    <h3 className="mt-3 text-lg font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500">
      {title}
    </h3>
    <p className="mt-1.5 text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
      {desc}
    </p>
  </div>
);

const TeamCard = ({ member }) => {
  return (
    <article className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-500 hover:shadow-lg">
      <div className="relative aspect-[16/12] overflow-hidden">
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-4 sm:p-5">
        <h4 className="font-poppins text-lg font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500">
          {member.name}
        </h4>
        <p className="text-sm sm:text-base font-inter text-emerald-600 dark:text-emerald-400 transition-all duration-500">
          {member.role}
        </p>
      </div>
    </article>
  );
};

export default AboutUs;
