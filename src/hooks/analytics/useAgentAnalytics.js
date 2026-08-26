import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export const useAgentAnalytics = () => {
  return useQuery({
    queryKey: ["agent-dashboard-analytics"],
    queryFn: async () => {
      const res = await api.get("/analytics/agent-dashboard");
      return res?.data ?? res;
    },
    refetchInterval: 30000, // Refresh every 30s
  });
};
