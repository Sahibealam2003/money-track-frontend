//Dashboard page
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../Components/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/apiPath";
import InfoCard from "../../Components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSaperator } from "../../Utils/helper";
import RecentTransctions from "../../Components/Dashboard/RecentTransctions";
import FinanceOverview from "../../Components/Dashboard/FinanceOverview";
import RecentIncomeChart from "../../Components/Dashboard/RecentIncomeChart";
import RecentIncome from "../../Components/Dashboard/RecentIncome";
import ExpenseTransactions from "../../Components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../Components/Dashboard/Last30DaysExpenses";
const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="mt-10 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={
              dashboardData
                ? addThousandsSaperator(dashboardData.totalBalance)
                : null
            }
            color={
              dashboardData?.totalBalance < 0 ? "bg-red-500" : "bg-primary"
            }
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Income"
            value={
              dashboardData
                ? addThousandsSaperator(dashboardData.totalIncome)
                : null
            }
            color="bg-green-500"
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Expense"
            value={
              dashboardData
                ? addThousandsSaperator(dashboardData.totalExpenses)
                : null
            }
            color="bg-rose-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransctions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpenses || 0}
            loading={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
            loading={loading}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
            loading={loading}
          />

          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
            loading={loading}
          />
          <RecentIncomeChart
            data={dashboardData?.last60DaysIncome?.transactions || []}
            totalIncome={dashboardData?.last60DaysIncome?.total || 0}
            loading={loading}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
