import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import background from "./bg.jpg";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Workout", href: "#" },
  { name: "Progress Tracking", href: "#" },
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [healthyWeightRange, setHealthyWeightRange] = useState("");
  const [maintenanceCalories, setMaintenanceCalories] = useState(null);
  const [gainWeight, setGainWeight] = useState(null);
  const [loseWeight, setLoseWeight] = useState(null);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "auto";
  }, [modalOpen]);

  function calculateBMR() {
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const activityLevel = parseFloat(document.getElementById("activity").value);

    let bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;
    const maintenance = Math.round(bmr * activityLevel);
    setMaintenanceCalories(maintenance);
    setGainWeight(maintenance + 200);
    setLoseWeight(maintenance - 200);
  }

  function calculateBMI() {
    const weight = parseFloat(document.getElementById("bmi-weight").value);
    const height =
      parseFloat(document.getElementById("bmi-height").value) / 100;
    const bmiValue = (weight / (height * height)).toFixed(1);

    let category = "";
    if (bmiValue < 18.5) category = "Underweight";
    else if (bmiValue < 24.9) category = "Normal weight";
    else if (bmiValue < 29.9) category = "Overweight";
    else category = "Obese";

    const minHealthyWeight = (18.5 * height * height).toFixed(1);
    const maxHealthyWeight = (24.9 * height * height).toFixed(1);
    setBmi(bmiValue);
    setBmiCategory(category);
    setHealthyWeightRange(`${minHealthyWeight} kg - ${maxHealthyWeight} kg`);
  }

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen relative"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="relative flex items-center justify-between p-6 lg:px-8">
          <div className="flex flex-col">
            <a href="#" className="text-white font-bold text-xl">
              AtEaseFit
            </a>
            <span className="text-gray-300 text-sm italic">
              "Commit to be fit, dare to be great!"
            </span>
          </div>

          {/* Centered Navigation */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white text-sm font-semibold hover:text-gray-300"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Login Button at Top Right */}
          <div>
            <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
              Login
            </button>
          </div>
        </nav>
      </header>

      <div className="relative flex flex-col items-center justify-center min-h-screen text-center text-white px-6">
        <h1 className="text-5xl font-bold sm:text-7xl">AtEaseFit</h1>
        <p className="mt-4 text-lg sm:text-xl">
          Your Fitness Journey Starts Here.
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="mt-6 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Get started
        </button>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <XMarkIcon className="size-6" />
            </button>

            <div className="mt-4 flex justify-around">
              <button
                onClick={() => setActiveTab("bmr")}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400"
              >
                BMR
              </button>
              <button
                onClick={() => setActiveTab("bmi")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
              >
                BMI
              </button>
              <button
                onClick={() => navigate("/workout-split")}
                className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-400"
              >
                Minimalized Workout Split
              </button>
            </div>
            {activeTab === "bmi" && (
              <div className="mt-4">
                <input
                  type="number"
                  id="bmi-weight"
                  placeholder="Weight (kg)"
                  className="w-full px-3 py-2 border rounded-md"
                />
                <input
                  type="number"
                  id="bmi-height"
                  placeholder="Height (cm)"
                  className="w-full px-3 py-2 border rounded-md mt-2"
                />
                <button
                  onClick={calculateBMI}
                  className="w-full bg-blue-500 text-white py-2 rounded-md mt-2 hover:bg-blue-400"
                >
                  Calculate BMI
                </button>

                {bmi && (
                  <div className="mt-4 text-gray-800">
                    <p>Your BMI: {bmi}</p>
                    <p>Category: {bmiCategory}</p>
                    <p>Healthy Weight Range: {healthyWeightRange}</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === "bmr" && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  BMR Calculator
                </h2>
                <p className="text-gray-600 mt-2">
                  Calculate your Basal Metabolic Rate.
                </p>

                <div className="mt-4 space-y-2">
                  <input
                    type="number"
                    id="weight"
                    placeholder="Weight (kg)"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <input
                    type="number"
                    id="height"
                    placeholder="Height (cm)"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <input
                    type="number"
                    id="age"
                    placeholder="Age (years)"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <select
                    id="gender"
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <select
                    id="activity"
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="1.2">
                      Sedentary (little or no exercise)
                    </option>
                    <option value="1.375">
                      Lightly active (1-3 days/week)
                    </option>
                    <option value="1.55">
                      Moderately active (3-5 days/week)
                    </option>
                    <option value="1.725">Very active (6-7 days/week)</option>
                    <option value="1.9">
                      Super active (physical job, intense exercise)
                    </option>
                  </select>
                </div>

                <button
                  onClick={calculateBMR}
                  className="w-full bg-green-500 text-white py-2 rounded-md mt-2 hover:bg-green-400"
                >
                  Calculate BMR
                </button>

                {maintenanceCalories && (
                  <div className="mt-4 text-gray-800">
                    <p>Maintenance Calories: {maintenanceCalories} kcal/day</p>
                    <p>To Gain Weight: {gainWeight} kcal/day</p>
                    <p>To Lose Weight: {loseWeight} kcal/day</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
