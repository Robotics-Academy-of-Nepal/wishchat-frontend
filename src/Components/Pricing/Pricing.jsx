import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { FaInfinity } from "react-icons/fa";

const PricingCard = ({ planName, price, features, isActive, onClick }) => (
  <div
    className={`shadow-xl mb-5 hover:scale-105 shadow-gray-500 h-[420px] md:w-[320px] rounded-2xl flex flex-col p-5 transition-all ${
      isActive ? "bg-[#29338A]" : "bg-white"
    }`}
    onClick={onClick}
  >
    <h1
      className={`mt-2 text-3xl font-extrabold ${
        isActive ? "text-white" : "text-gray-800"
      }`}
    >
      {planName}
    </h1>

    <div className="mt-3">
      <h1
        className={`text-3xl font-bold ${
          isActive ? "text-white" : "text-blue-600"
        }`}
      >
        RS {price}
        <sup
          className={`text-lg font-medium ${
            isActive ? "text-white" : "text-gray-500"
          }`}
          style={{ fontFamily: "Georgia" }}
        >
          /month
        </sup>
      </h1>
    </div>
    <div className="mt-5 space-y-1">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-1">
          <TiTick className="text-3xl text-green-500" />
          <h1
            className={`text-md ${
              isActive ? "text-white" : "text-gray-700"
            }`}
            style={{ fontFamily: "Georgia" }}
          >
            {feature}
          </h1>
        </div>
      ))}
      <hr className="h-0.5 bg-black border-none" />
    </div>
    <button
      style={{ fontFamily: "Georgia" }}
      className="w-full py-2 mt-6 text-white transition-all bg-blue-600 rounded-2xl hover:bg-blue-700 hover:shadow-md"
    >
      Get Started
    </button>
  </div>
);

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null);

 
  const handleClick = (plan) => {
    setSelectedPlan(plan);
  };

  const isActive = (plan) => selectedPlan === plan;
  const plans = [
    {
      name: "Free Plan",
      price: "0",
      features: ["500 monthly messages"],
    },
    {
      name: "Basic Plan",
      price: "5,000",
      features: ["5,000 monthly messages"],
    },
    {
      name: "Middle Plan",
      price: "7,000",
      features: ["7,000 monthly messages"],
    },
    {
      name: "premium Plan",
      price: "10,000",
      features: ["10,000 monthly messages"],
    },
  
  ];

  return (
    <div>
      <div className="flex items-center justify-center my-4">
        <h1 className="text-2xl font-bold">Our Services</h1>
      </div>
      <div className="grid grid-cols-1 gap-1 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            planName={plan.name}
            price={plan.price}
            features={plan.features}
            isActive={selectedPlan === plan.name}
            onClick={() => handleClick(plan.name)}
          />
        ))}
           <div
        
        className={`shadow-xl  hover:scale-105 shadow-gray-500 h-[420px] md:w-[320px] rounded-2xl flex flex-col p-5 transition-all ${
          isActive("basic") ? "bg-[#29338A]" : "bg-white"
        }`}
        onClick={() => handleClick("basic")}
      >
        <h1 className={`mt-2 text-3xl font-extrabold text-gray-800 ${
          isActive("basic") ? "text-white" : "text-gray-800"
        }`}>Enterprise Plan</h1>

        <div className="mt-3"
        style={{ fontFamily: "Georgia" }}
        >
          <h1 className={`text-3xl font-bold text-blue-600 ${
          isActive("basic") ? "text-white" : "text-blue-600"
          }`}>
            Contact to  WishChat<sup className={`text-lg font-medium text-gray-500 ${
              isActive("basic") ? "text-white" : "text-gray-500"
            }
              
              `} style={{ fontFamily: "Georgia" }}>/month</sup>
          </h1>
        </div>
        <div className="mt-5 space-y-1">
          <div className="flex items-center gap-1">
            <TiTick className="text-3xl text-green-500" />
            <h1 className={`text-gray-700 text-md flex gap-2 ${
              isActive("basic") ? "text-white" : "text-gray-700"
            }`}
            style={{ fontFamily: "Georgia" }}
          ><FaInfinity /> monthly messages</h1>
          </div>
          <hr className="h-0.5 bg-black border-none" />
        </div>
        <button 
         style={{ fontFamily: "Georgia" }}
        className="w-full py-2 mt-6 text-white transition-all bg-blue-600 rounded-2xl hover:bg-blue-700 hover:shadow-md">
          Get Started
        </button>
      </div>
      </div>
    </div>
  );
}
