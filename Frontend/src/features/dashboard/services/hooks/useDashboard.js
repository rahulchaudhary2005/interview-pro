import { useCallback, useEffect, useState } from "react";
import { getDashboardStatsAPI } from "../dashboard.api";

const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDashboardStatsAPI();
      setStats(data);
      setError("");
    } catch (err) {
      console.error("Dashboard stats load failed:", err);
      setError("Failed to load dashboard");
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
};

export default useDashboard;
