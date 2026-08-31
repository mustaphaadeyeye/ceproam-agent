import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Wrapper from '../../components/Wrapper';
import Button from '../../components/Button';
import { fontSize, fontWeight, fontFamily, textColor } from "../../styles/theme";
import buttonImg from "../../assets/icons/button.png";
import InvestmentModal from "../../components/modals/InvestmentModal";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../../api/axios";
import toast from "react-hot-toast";

const statusStyles = {
  Ongoing: 'bg-green-50 text-green-600',
  Closed: 'bg-red-50 text-red-500',
  Pending: 'bg-yellow-50 text-yellow-600',
};

const DetailRow = ({ leftLabel, leftValue, rightLabel, rightValue }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-4 border-b border-gray-100 last:border-b-0">
    <div>
      <p className="text-xs text-gray-400 mb-1">{leftLabel}</p>
      <p className="text-sm text-gray-700 font-medium break-words">{leftValue || "N/A"}</p>
    </div>
    <div>
      <p className="text-xs text-gray-400 mb-1">{rightLabel}</p>
      <p className="text-sm text-gray-700 font-medium break-words">{rightValue || "N/A"}</p>
    </div>
  </div>
);

const InvestmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  // Fetch real investment package details from the backend
  const { data: investment, isLoading, isError } = useQuery({
    queryKey: ["investment-details", id],
    queryFn: async () => {
      const res = await api.get(`/investments/${id}`);
      return res?.data ?? res;
    },
    enabled: !!id,
  });

  // Delete/Remove investment mutation
  const { mutate: deleteInvestment, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      await api.delete(`/investments/${id}`);
    },
    onSuccess: () => {
      toast.success("Investment package removed successfully");
      setIsRemoveModalOpen(false);
      navigate(-1);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to remove investment");
      setIsRemoveModalOpen(false);
    },
  });

  if (isLoading) {
    return (
      <Wrapper>
        <div className="py-24 text-center text-sm text-gray-400 animate-pulse">
          Loading investment details...
        </div>
      </Wrapper>
    );
  }

  if (isError || !investment) {
    return (
      <Wrapper>
        <div className="py-20 text-center">
          <p className="text-gray-500 mb-4">Investment not found or failed to load.</p>
          <button onClick={() => navigate(-1)} className="text-blue-900 font-medium text-sm cursor-pointer">
            &larr; Go back
          </button>
        </div>
      </Wrapper>
    );
  }

  const handleRemove = () => {
    setIsRemoveModalOpen(true);
  };

  const confirmRemove = () => {
    deleteInvestment();
  };

  const handleEdit = () => {
    navigate(`/app/edit-details?id=${investment.id}`);
  };

  const coverImg =
    investment.coverImage ||
    (Array.isArray(investment.images) && investment.images.length > 0 ? investment.images[0] : null) ||
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800";

  const statusLabel = investment.status === 'ACTIVE' ? 'Ongoing' : 'Closed';

  return (
    <div className={`px-4 sm:px-10 lg:px-55 ${fontFamily.main} xl:mt-0 lg:mt-0 mt-12`}>
      <Wrapper>
        <div className="relative flex flex-col items-center py-4 text-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className={`${textColor.primary800} ${fontSize['3xl']} ${fontWeight.semibold} px-8`}>Investment Details</h1>
          <p className={`${fontSize.md} ${fontWeight.bold} ${textColor.miniGray}`}>Manage investment packages for real estate projects</p>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div className='flex gap-2 items-center min-w-0'>
              <h2 className={`${textColor.primary800} ${fontWeight.bold} text-2xl sm:text-[30px] truncate`}>{investment.name || investment.title}</h2>
              <button
                onClick={handleEdit}
                className="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer shrink-0"
              >
                <img src={buttonImg} alt="Edit" />
              </button>
            </div>
            <div className="shrink-0">
              <Button
                text={isDeleting ? "Removing..." : "Remove Investment"}
                onClick={handleRemove}
                bgColor="bg-[#EC2614]"
                hoverBgColor="hover:bg-[#EC2614]/90"
                textColor="text-white"
                fontSize="text-sm"
                fontWeight="font-medium"
                rounded="md"
                height="40px"
                className="px-4 shrink-0 cursor-pointer w-full sm:w-auto"
              />
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4">{investment.description}</p>

        <div className="w-full h-56 sm:h-72 lg:h-80 rounded-xl overflow-hidden mt-6 bg-gray-100">
          <img
            src={coverImg}
            alt={investment.name || investment.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl mt-6 px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-4 border-b border-gray-200 sm:items-center">
            <h3 className="text-gray-800 font-semibold text-base">Investment Details</h3>
            <div className="flex items-center gap-2 sm:justify-end">
              <h3 className="text-gray-800 font-semibold text-base">Status</h3>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  statusStyles[statusLabel] || statusStyles.Ongoing
                }`}
              >
                {statusLabel}
              </span>
            </div>
          </div>

          <DetailRow
            leftLabel="Category"
            leftValue={investment.category}
            rightLabel="Location"
            rightValue={investment.location}
          />
          <DetailRow
            leftLabel="Min Investment"
            leftValue={`₦${Number(investment.minAmount || 0).toLocaleString()}`}
            rightLabel="Projected ROI"
            rightValue={`${investment.roi || 0}%`}
          />
          <DetailRow
            leftLabel="Duration"
            leftValue={`${investment.durationMonths || 12} Months`}
            rightLabel="Total Raised"
            rightValue={`₦${Number(investment.fundingMetrics?.totalRaised || 0).toLocaleString()}`}
          />
          <DetailRow
            leftLabel="Total Investors"
            leftValue={investment.fundingMetrics?.investorCount || 0}
            rightLabel="Created Date"
            rightValue={investment.createdAt ? new Date(investment.createdAt).toLocaleDateString() : 'N/A'}
          />
        </div>
      </Wrapper>

      <InvestmentModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={confirmRemove}
      />
    </div>
  );
};

export default InvestmentDetails;