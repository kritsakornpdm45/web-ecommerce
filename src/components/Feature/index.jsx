import React from "react";
import Image from "next/image";

const ServiceFeatures = ({ data }) => {
  const features = data?.serviceFeaturesItems || [];

  return (
    <section className="bg-gray-100 text-black py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Icon as Image */}
            {feature.featuresImage?.url ? (
              <div className="w-16 h-16 relative mb-3">
                <Image
                  src={feature.featuresImage.url}
                  alt={feature.featuresImage.alt || feature.featTitle || "Feature icon"}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-16 h-16 mb-3 bg-gray-300 rounded" />
            )}

            {/* Title */}
            <h3 className="font-semibold text-lg">{feature.featTitle}</h3>

            {/* Description */}
            <p className="text-sm text-black mt-1">{feature.featDesc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceFeatures;
