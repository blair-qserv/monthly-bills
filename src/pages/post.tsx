import { useEffect, useState } from 'react';
import client from '../../client';
import styles from '../pages/billing.module.css';

interface BillingRecord {
  _id: string;
  name: string;
  due_date?: string;
  finished_date?: string;
  amount: number;
  payment: string;
  account_number: string;
  billing: string;
  status: string;
  month: number;
  year: number;
}

interface SalaryRecord {
  _id: string;
  employer: string;
  salary: number;
  date_received: string;
  month: number;
  year: number;
}

interface MonthlyRecord {
  billings: BillingRecord[];
  salaries: SalaryRecord[];
}

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const BillingAndSalaryPage = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [monthlyData, setMonthlyData] = useState<Record<string, MonthlyRecord>>({});
  const [totalBalance, setTotalBalance] = useState(0);
  const [assumingBalance, setAssumingBalance] = useState(0);

  // Fetch data for the selected month & year
  const fetchData = async () => {
    const billingData = await client.fetch<BillingRecord[]>(`*[_type == "billing" && month == ${selectedMonth} && year == ${selectedYear}]`);
    const salaryData = await client.fetch<SalaryRecord[]>(`*[_type == "salary" && month == ${selectedMonth} && year == ${selectedYear}]`);
    
    setMonthlyData(prev => ({
      ...prev,
      [`${selectedYear}-${selectedMonth}`]: { billings: billingData, salaries: salaryData }
    }));
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear]);

  // Function to update payment status dynamically
  const updatePaymentStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "paid" ? "unpaid" : "paid";
    await client.patch(id).set({ status: newStatus }).commit();
  
    setMonthlyData(prev => ({
      ...prev,
      [`${selectedYear}-${selectedMonth}`]: {
        ...prev[`${selectedYear}-${selectedMonth}`],
        billings: prev[`${selectedYear}-${selectedMonth}`]?.billings.map(bill =>
          bill._id === id ? { ...bill, status: newStatus } : bill
        ) || []
      }
    }));
  };

  // Calculate total balance based on salaries and paid bills
  useEffect(() => {
    const data = monthlyData[`${selectedYear}-${selectedMonth}`];
    if (!data) return;

    const totalSalary = data.salaries.reduce((acc, salary) => acc + salary.salary, 0);
    const totalPaidBills = data.billings.filter(bill => bill.status === "paid").reduce((acc, bill) => acc + bill.amount, 0);
    const assumedBills = data.billings.reduce((acc, bill) => acc + bill.amount, 0);

    setAssumingBalance(totalSalary - assumedBills)
    setTotalBalance(totalSalary - totalPaidBills);
  }, [monthlyData, selectedMonth, selectedYear]);

  return (
    <div className={styles.pageContainer}>
      {/* Year Selection */}
      <div className={styles.yearSelect}>
        <label>Select Year:</label>
        <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
          {[...Array(5)].map((_, i) => (
            <option key={i} value={currentYear - i}>{currentYear - i}</option>
          ))}
        </select>
      </div>

      {/* Month Selection */}
      <div className={styles.tabs}>
        {[...Array(12)].map((_, i) => (
          <button
            key={i}
            className={`${styles.tabButton} ${selectedMonth === i + 1 ? styles.activeTab : ''}`}
            onClick={() => setSelectedMonth(i + 1)}
          >
            {new Date(currentYear, i).toLocaleString('default', { month: 'long' })}
          </button>
        ))}
      </div>

      {/* Billing Records */}
      {monthlyData[`${selectedYear}-${selectedMonth}`] && (
        <>
          <h1 className={styles.title}>Billing Records - {selectedYear} {new Date(currentYear, selectedMonth - 1).toLocaleString('default', { month: 'long' })}</h1>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {['Name', 'Due Date', 'Finished Date', 'Amount', 'Payment', 'Account No.', 'Billing Name', 'Status', 'Action'].map((head, index) => (
                    <th key={index}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {monthlyData[`${selectedYear}-${selectedMonth}`]?.billings.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.due_date || '-'}</td>
                    <td>{item.finished_date || '-'}</td>
                    <td>₱{item.amount}</td>
                    <td>{item.payment}</td>
                    <td>{item.account_number}</td>
                    <td>{item.billing}</td>
                    <td>
                      <span className={`${styles.status} ${item.status === "paid" ? styles.statusPaid : styles.statusUnpaid}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`${styles.button} ${item.status === "paid" ? styles.paidButton : styles.unpaidButton}`}
                        onClick={() => updatePaymentStatus(item._id, item.status)}
                      >
                        {item.status === "paid" ? "Mark Unpaid" : "Mark Paid"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Salary Records */}
      {monthlyData[`${selectedYear}-${selectedMonth}`] && (
        <>
          <h1 className={styles.title}>Salary Records - {selectedYear} {new Date(currentYear, selectedMonth - 1).toLocaleString('default', { month: 'long' })}</h1>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {['Employer', 'Salary', 'Date Received'].map((head, index) => (
                    <th key={index}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {monthlyData[`${selectedYear}-${selectedMonth}`]?.salaries.map((item) => (
                  <tr key={item._id}>
                    <td>{item.employer}</td>
                    <td>₱{item.salary}</td>
                    <td>{item.date_received}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <h2 className={styles.total}>Assuming Balance: ₱{totalBalance}</h2>
      <h2 className={styles.total}>Total Balance: ₱{totalBalance}</h2>
    </div>
  );
};

export default BillingAndSalaryPage;
