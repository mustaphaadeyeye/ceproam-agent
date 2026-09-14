import React from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Building,
  TrendingUp,
  ExternalLink,
  MessageSquare,
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
    { label: "Investment/Property Value", value: user.totalInvestmentValue },
  ];

  const propertiesList = user.properties || [];
  const investmentsList = user.investments || [];

  return (
    <Wrapper>
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
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/app/chat/${user.id}`)}
            className="flex items-center gap-2 bg-[#05062F] hover:bg-[#1a2352] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition cursor-pointer"
          >
            <MessageSquare size={15} />
            Message User
          </button>
        </div>

<<<<<<< HEAD
        {/* User Info Card / Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
              {user.name?.charAt(0) || "U"}
            </div>
            <div>
              <p className="text-xs text-gray-400">Email Address</p>
              <p className="text-sm font-semibold text-indigo-600">
=======
        {/* User Bio Card / Profile Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-indigo-50 border border-indigo-100 overflow-hidden shrink-0 flex items-center justify-center text-indigo-600 font-bold text-2xl shadow-inner">
            {user.faceCaptureUrl ? (
              <img
                src={user.faceCaptureUrl}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              user.name?.charAt(0) || "U"
            )}
          </div>

          <div className="flex-1 flex flex-col sm:flex-row justify-between items-center sm:items-start w-full gap-4 text-center sm:text-left">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
              <p className="text-xs text-indigo-600 font-medium mt-0.5">
>>>>>>> 923e1e29c0b5305a1db09a390c95ce58a404f41e
                {user.email}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Phone size={13} className="text-gray-400" />
                  {user.phoneNumber || "No phone"}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-gray-400" />
                  {user.address || "No address"}, {user.state || "Nigeria"}
                </span>
              </div>
            </div>

            <div className="bg-indigo-50/60 border border-indigo-100 px-4 py-3 rounded-xl text-center shrink-0">
              <p className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
                Total Portfolio Value
              </p>
              <p className="text-base font-bold text-[#05062F] mt-0.5">
                {user.totalInvestmentValue}
              </p>
            </div>
          </div>
        </div>

        {/* Purchased Properties Section */}
        {propertiesList.length > 0 && (
          <div className="mb-8">
<<<<<<< HEAD
            <h3 className="mb-3 font-bold text-gray-900">
              Associated Property
            </h3>
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
              <img
                src={
                  primaryProperty.coverImage
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
=======
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                <Building size={16} />
>>>>>>> 923e1e29c0b5305a1db09a390c95ce58a404f41e
              </div>
              <h3 className="font-bold text-gray-900 text-base">
                Purchased Properties ({propertiesList.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {propertiesList.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() =>
                    navigate(`/app/available-property?id=${prop.id}`)
                  }
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col"
                >
                  <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={
                        prop.coverImage ||
                        prop.images?.[0] ||
                        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      ₦{Number(prop.price || 0).toLocaleString()}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">
                          {prop.title}
                        </h4>
                        <ExternalLink
                          size={14}
                          className="text-gray-400 group-hover:text-indigo-600 shrink-0"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin size={12} className="text-gray-400" />
                        {prop.location}
                      </p>
                      <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                        {prop.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                      <span>
                        Status:{" "}
                        <strong className="text-emerald-600">
                          Sold / Owned
                        </strong>
                      </span>
                      <span className="font-semibold text-indigo-600 group-hover:underline">
                        View Property &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Investment Subscriptions Section */}
        {investmentsList.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                <TrendingUp size={16} />
              </div>
              <h3 className="font-bold text-gray-900 text-base">
                Investment Subscriptions ({investmentsList.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {investmentsList.map((inv) => {
                const pkg = inv.investmentPackage || {};
                const pkgId = pkg.id || inv.investmentPackageId;
                const pkgImage =
                  pkg.coverImage ||
                  pkg.images?.[0] ||
                  "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80";

                return (
                  <div
                    key={inv.id}
                    onClick={() =>
                      pkgId && navigate(`/app/investments/${pkgId}`)
                    }
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col"
                  >
                    <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                      <img
                        src={pkgImage}
                        alt={pkg.name || "Investment"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                        ROI: {pkg.roi || 0}%
                      </span>
                    </div>

                    <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-bold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">
                            {pkg.name || "Investment Package"}
                          </h4>
                          <ExternalLink
                            size={14}
                            className="text-gray-400 group-hover:text-indigo-600 shrink-0"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {pkg.description ||
                            "Real Estate & Asset Growth Package"}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-3 grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-gray-400 text-[10px]">
                            Amount Invested
                          </p>
                          <p className="font-bold text-gray-900 mt-0.5">
                            ₦{Number(inv.amountInvested || 0).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-[10px]">
                            Expected Return
                          </p>
                          <p className="font-bold text-emerald-600 mt-0.5">
                            ₦{Number(inv.expectedReturn || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1 border-t border-gray-100">
                        <span className="inline-block bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-md">
                          Active Investment
                        </span>
                        <span className="font-semibold text-indigo-600 group-hover:underline">
                          View Investment &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
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
