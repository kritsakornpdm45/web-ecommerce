import React from "react";

type Feature = {
  title: string;
  desc: string;
  icon?: string; // mockup icon (emoji / string)
};

const ServiceFeatures: React.FC = () => {
  const features: Feature[] = [
    { icon: "💳", title: "Secure Payment", desc: "100% Secure Payment" },
    { icon: "🔄", title: "30 Days Return", desc: "If goods have problems" },
    { icon: "🎧", title: "24/7 Support", desc: "Dedicated support" },
    { icon: "🚚", title: "Free Delivery", desc: "For all order over 80$" },
  ];

  return (
    <section className="bg-gray-100 text-black py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Mockup Icon */}
            <div className="text-4xl mb-3">{feature.icon ?? "🔲"}</div>

            {/* Title */}
            <h3 className="font-semibold text-lg">{feature.title}</h3>

            {/* Description */}
            <p className="text-sm text-black mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceFeatures;
