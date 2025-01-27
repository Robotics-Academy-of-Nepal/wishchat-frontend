import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { FaInfinity } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

const PricingCard = ({ planName, price, features, isActive, onClick, btnclick }) => (
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
      onClick={btnclick}
      style={{ fontFamily: "Georgia" }}
      className="w-full py-2 mt-6 text-white transition-all bg-blue-600 rounded-2xl hover:bg-blue-700 hover:shadow-md"
    >
      Get Started
    </button>
  </div>
);

export default function Pricing() {
  const handlePayment = (totalAmount) => {
    console.log("button clicked");
    // Generate a UUID
    const transaction_uuid = uuidv4();

    // Define the payload
    const payload = {
      amount: totalAmount,
      tax_amount: "0",
      total_amount: totalAmount,
      transaction_uuid: transaction_uuid,
      product_code: "EPAYTEST",
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: "https://wishchat.goodwish.com.np/api/payment-success",
      failure_url: "https://wishchat.goodwish.com.np/api/payment-failure",
      signed_field_names: "total_amount,transaction_uuid,product_code",
    };

    // Prepare the message for signature
    const message = `total_amount=${payload.total_amount},transaction_uuid=${payload.transaction_uuid},product_code=${payload.product_code}`;

    // Generate the signature using HMAC-SHA256
    const secret = "8gBm/:&EnhH.1/q";
    const signature = CryptoJS.HmacSHA256(message, secret).toString(CryptoJS.enc.Base64);

    // Add the signature to the payload
    payload.signature = signature;

    console.log("Payload:", payload); // Log the payload

    // Create a hidden form and submit it
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    // Add payload fields as hidden inputs
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = payload[key];
        form.appendChild(input);
      }
    }

    // Append the form to the body and submit it
    document.body.appendChild(form);
    form.submit();
  };

  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleClick = (plan) => {
    setSelectedPlan(plan);
  };

  const isActive = (plan) => selectedPlan === plan;

  const plans = [
    {
      name: "Basic Plan",
      price: "5,000",
      features: ["5,000 monthly messages"],
      btnclick: () => handlePayment("5000"),
    },
    {
      name: "Middle Plan",
      price: "7,000",
      features: ["7,000 monthly messages"],
      btnclick: () => handlePayment("7000"),
    },
    {
      name: "Premium Plan",
      price: "10,000",
      features: ["10,000 monthly messages"],
      btnclick: () => handlePayment("10000"),
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
            btnclick={plan.btnclick}
          />
        ))}
        {/* Enterprise Plan */}
        <PricingCard
          key="enterprise"
          planName="Enterprise Plan"
          price="Contact for Pricing"
          features={["Custom features and pricing"]}
          isActive={selectedPlan === "enterprise"}
          onClick={() => handleClick("enterprise")}
          // btnclick={() => handlePayment("Contact for Pricing")}
        />
      </div>
    </div>
  );
}
