import React from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
} from "lucide-react";
import Wrapper from "../../components/Wrapper";
import { fontFamily } from "../../styles/theme";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch real user details from backend using the ID parameter
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-details", id],
    queryFn: async () => {
      const res = await api.get(`/users/${id}`);
      return res?.data ?? res;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Wrapper>
        <div className="py-24 text-center text-sm text-gray-400 animate-pulse">
          Loading user profile details...
        </div>
      </Wrapper>
    );
  }

  if (isError || !user) {
    return (
      <Wrapper>
        <div className="py-20 text-center">
          <p className="text-gray-500 mb-4">
            User not found or failed to load.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-600 font-medium text-sm cursor-pointer hover:underline"
          >
            &larr; Go back
          </button>
        </div>
      </Wrapper>
    );
  }

  const userProfileDetails = [
    { label: "Email Address", value: user.email },
    { label: "Phone Number", value: user.phoneNumber || "N/A" },
    { label: "Address", value: user.address || "N/A" },
    { label: "State", value: user.state || "N/A" },
    { label: "Occupation", value: user.occupation || "N/A" },
    { label: "Total Investment Value", value: user.totalInvestmentValue },
  ];

  const primaryProperty = user.properties?.[0];

  return (
    <Wrapper>
<<<<<<< HEAD
      <div className={`mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8 mt-12 lg:mt-0 xl:mt-0 ${fontFamily.main}`}>

        {/* Header */}
        <div className="mb-4">
            <div className="flex items-center gap-4">
                <div> <ArrowLeft size={15} className="cursor-pointer shrink-0"
                    onClick={() => navigate(-1)}
                /></div>
                <div>
                    <h1 className="font-bold  text-[#171212]">George A. James</h1>
                </div>
=======
      <div
        className={`mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8 ${fontFamily.main}`}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-[#171212]">{user.name}</h1>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <Calendar size={12} /> Joined on {user.dateJoined}
              </p>
>>>>>>> ddfe2af739da4db3c3d922c9e4a6c708d715de04
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Property Image */}
        <div className="overflow-hidden rounded-md">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
            alt="Property"
            className="h-[200px] w-full object-cover sm:h-[300px] lg:h-[360px]"
          />
=======
        {/* User Info Card / Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
              {user.name?.charAt(0) || "U"}
            </div>
            <div>
              <p className="text-xs text-gray-400">Full Name</p>
              <p className="text-sm font-semibold text-gray-800">{user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Email Address</p>
              <p className="text-sm font-semibold text-indigo-600">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Briefcase size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Occupation</p>
              <p className="text-sm font-semibold text-gray-800">
                {user.occupation || "N/A"}
              </p>
            </div>
          </div>
>>>>>>> ddfe2af739da4db3c3d922c9e4a6c708d715de04
        </div>

        {/* Optional Property Showcase if User has Properties */}
        {primaryProperty && (
          <div className="mb-8">
            <h3 className="mb-3 font-bold text-gray-900">
              Associated Property
            </h3>
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
              <img
                src={
                  primaryProperty.coverImage ||
                  primaryProperty.images?.[0] ||
                  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                }
                alt="Property"
                className="h-[230px] w-full object-cover sm:h-[280px]"
              />
              <div className="p-5">
                <h4 className="font-bold text-gray-900 text-base">
                  {primaryProperty.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {primaryProperty.location}
                </p>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  {primaryProperty.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* User Account / Profile Details Grid */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="mb-4 font-bold text-gray-900">
            Account Details & KYC Attributes
          </h3>

          <div className="border-t border-gray-100">
            {Array.from({
              length: Math.ceil(userProfileDetails.length / 2),
            }).map((_, rowIndex) => {
              const left = userProfileDetails[rowIndex * 2];
              const right = userProfileDetails[rowIndex * 2 + 1];

              return (
                <div
                  key={rowIndex}
                  className="grid grid-cols-1 border-b border-gray-100 sm:grid-cols-2 py-3"
                >
                  {/* Left */}
                  <div className="pr-6 py-2">
                    <p className="text-xs text-gray-400 mb-1">{left.label}</p>
                    <p className="text-sm font-medium text-gray-700">
                      {left.value}
                    </p>
                  </div>

                  {/* Right */}
                  {right && (
                    <div className="sm:pl-6 py-2">
                      <p className="text-xs text-gray-400 mb-1">
                        {right.label}
                      </p>
                      <p className="text-sm font-medium text-gray-700">
                        {right.value}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default UserDetails;
