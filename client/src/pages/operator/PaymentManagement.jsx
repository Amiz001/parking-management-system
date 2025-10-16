import React, { useState, useEffect } from 'react';
import axios from "axios";
import { 
  Search, 
  Settings, 
  MoreHorizontal,
  Bell,
  Sun,
  Moon,
  ChartColumnBig,
  CalendarCheck,
  Wallet,
  HeartHandshake,
  Download,
  LogOut,
} from 'lucide-react';

const PaymentManagement = () => {
  const [lightMode, setLightMode] = useState(false);
  const [online_payments, setPayments] = useState([]); 
  const [physical_payments, setPhysicalPay] = useState([]);
  const [onlineBook_pay, setOnlineBookPay] = useState([]);
 const [searchTerm, setSearchTerm] = useState("");
  const sidebarItems = [
    { icon: ChartColumnBig, label: "Dashboard", path: "/operator/dashboard" },
    { icon: CalendarCheck, label: "Booking",  path: "/operator/physicalbooking" },
    { icon: HeartHandshake, label: "Membership", path: "/operator/membership" },
    { icon: Wallet, label: "Payment", active: true, path: "/operator/payment" },
  ];

  const bottomItems = [
    { icon: LogOut, label: "Logout" },
  ];

  

const filteredOnlinePayments = online_payments.filter(
  (p) =>
    p.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.vehicleType?.toLowerCase().includes(searchTerm.toLowerCase())
);

const filteredPhysicalPayments = physical_payments.filter(
  (p) =>
    p.vehicleNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.slotId?.toLowerCase().includes(searchTerm.toLowerCase())
);

const filteredOnlineBookPayments = onlineBook_pay.filter(
  (p) =>
    p.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.vehicleNum?.toLowerCase().includes(searchTerm.toLowerCase())
);


const exportData = () => {
  if (
    (!online_payments || online_payments.length === 0) &&
    (!physical_payments || physical_payments.length === 0) &&
    (!onlineBook_pay || onlineBook_pay.length === 0)
  ) {
    alert("No data to export!");
    return;
  }

  let csv = "";

  // Helper function to format date
  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // -------------------- Online Membership Payments --------------------
  if (online_payments.length > 0) {
    csv += "Online Membership Payments\n";
    const onlineData = online_payments.map((p, index) => ({
      ID: index + 1,
      UserID: p.username,
      VehicleType: p.vehicleType,
      Quantity: p.quantity,
      Amount: p.amount,
      PaymentMethod: p.paymentMethod,
      Date: formatDate(p.date),
      StripePayID: p.stripePaymentId,
      Status: p.status
    }));
    csv += Object.keys(onlineData[0]).join(",") + "\n";
    csv += onlineData.map((row) => Object.values(row).join(",")).join("\n");
    csv += "\n\n";
  }

  // -------------------- Physical Booking Payments --------------------
  if (physical_payments.length > 0) {
    csv += "Physical Booking Payments\n";
    const physicalData = physical_payments.map((p, index) => ({
      ID: index + 1,
      SlotID: p.slotId,
      VehicleNumber: p.vehicleNumber,
      EntryDate: formatDate(p.entryDate),
      Duration: p.duration,
      Amount: p.amount
    }));
    csv += Object.keys(physicalData[0]).join(",") + "\n";
    csv += physicalData.map((row) => Object.values(row).join(",")).join("\n");
    csv += "\n\n";
  }

  // -------------------- Online Booking Payments --------------------
  if (onlineBook_pay.length > 0) {
    csv += "Online Booking Payments\n";
    const onlineBookData = onlineBook_pay.map((p) => ({
      UserID: p.userId,
      SlotID: p.slotId,
      Type: p.types,
      Zone: p.zone,
      VehicleNumber: p.vehicleNum,
      Date: formatDate(p.date),
      EntryTime: p.entryTime,
      ExitTime: p.exitTime,
      Amount: p.amount,
      StripePayID: p.stripePaymentId
    }));
    csv += Object.keys(onlineBookData[0]).join(",") + "\n";
    csv += onlineBookData.map((row) => Object.values(row).join(",")).join("\n");
    csv += "\n\n";
  }

  // Download CSV
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "payments_export.csv");
  link.click();
};

  

 useEffect(() => {
  const fetchPayments = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/online-payment");
      console.log("Fetched payments:", data); // will show { payment: [...] }

      // Set payments correctly
      setPayments(data.payment || []); // <-- extract the array
    } catch (err) {
      console.error("Error fetching membership payments:", err);
      setPayments([]);
    }
  };

  fetchPayments();
}, []);

useEffect(() => {
  const fetchPhysicalPay = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/payment");
      console.log("Fetched payments:", data); // will show { payment: [...] }

      // Set payments correctly
      setPhysicalPay(data.payments || []); // <-- extract the array
    } catch (err) {
      console.error("Error fetching physical payments:", err);
      setPhysicalPay([]);
    }
  };

  fetchPhysicalPay();
}, []);


useEffect(() => {
  const fetchOnlineBookPay = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/onlineBookPay/all");
      console.log("Fetched online booking payments:", data); // should log an array

      setOnlineBookPay(data); // use data directly
    } catch (err) {
      console.error("Error fetching online booking payments:", err);
      setOnlineBookPay([]);
    }
  };

  fetchOnlineBookPay();
}, []);

  return (
    <div className={`flex h-auto bg-gray-950 text-white light:text-black light:bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${lightMode ? "light" : "dark"}`}>
      
      {/* Sidebar */}
      <div className="w-64 h-screen sticky top-0 bg-[#151821] p-6 flex flex-col light:bg-white light:shadow-lg light:backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">✦</span>
          </div>
          <span className="text-xl font-semibold">Gate Operator</span>
        </div>

        {/* Main Menu */}
        <div className="mb-8">
          <p className="text-gray-400 light:text-black text-sm mb-4 uppercase tracking-wide">Main Menu</p>
          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-gradient-to-l from-blue-500 to-indigo-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 light:text-black light:hover:bg-gray-100'
                }`}
              >  
                <item.icon size={20} />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Items */}
        <div className="mt-auto space-y-2">
          {bottomItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 light:text-black hover:bg-gray-700 light:hover:bg-gray-100 transition-colors"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* User Profile */}
        <div className="mt-6 flex items-center gap-3 p-3 bg-[#222735] light:bg-gray-100 light:shadow-lg light:backdrop-blur-sm border-gray-400 rounded-lg ">
          <div className="w-10 h-10 bg-blue-500 light:text-white rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">GM</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium light:text-gray-950">Gate Operator</p>
            <p className="text-xs text-gray-400 light:text-gray-700">gateoperator@mail.com</p>
          </div>
          <MoreHorizontal size={16} className="text-gray-400 light:text-gray-950" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-950 light:bg-transparent p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
  <input
    type="text"
    placeholder="Search by User ID or Vehicle Number..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="pl-10 pr-4 py-2 bg-[#151821] light:bg-white border border-gray-900 light:border-gray-200 rounded-lg text-white placeholder-gray-400 light:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

</div>

          <div className="flex items-center gap-4">
            <Bell size={20} className="text-gray-400 light:text-gray-700 cursor-pointer hover:text-white light:hover:text-gray-500" />
            <Settings size={20} className="text-gray-400 light:text-gray-700 cursor-pointer hover:text-white light:hover:text-gray-500" />
            <Sun onClick={() => setLightMode(true)} size={20} className={`text-gray-400 ${lightMode ? "light:text-yellow-500 fill-yellow-500":""} cursor-pointer light:cursor-default hover:text-white light:hover:text-yellow-500`} />
            <Moon onClick={() => setLightMode(false)} size={20} className={`${!lightMode ? "text-yellow-500 fill-yellow-500":""} light:text-gray-700 light:cursor-pointer hover:text-yellow-500 light:hover:text-gray-500`} />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold mb-2">Payments</h1>
            <div className="flex items-center gap-4">
              
 <button
                onClick={exportData}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-blue-600  text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Export Data
              </button>
              
            </div>
          </div>

          {/* Table */}
          <div className="bg-gradient-to-b from-[#151821] to-[#242938] light:bg-gradient-to-b light:from-white light:to-white light:shadow-lg light:backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Membership Payments</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">UserId</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Vehicle Type</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Quantity</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Payment Method</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Stripe Pay ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
  {filteredOnlinePayments.map((OnlinePay, index) => (
    <tr key={OnlinePay._id || index} className="border-b border-gray-200 hover:bg-gray-700 light:hover:bg-gray-100">
      <td className="py-4 px-4 text-gray-300 light:text-gray-600">{index + 1}</td>
      <td className="py-4 px-4">{OnlinePay.username}</td>
      <td className="py-4 px-4">{OnlinePay.vehicleType}</td>
      <td className="py-4 px-4">{OnlinePay.quantity}</td>
      <td className="py-4 px-4">{OnlinePay.amount}</td>
      <td className="py-4 px-4">{OnlinePay.paymentMethod}</td>
      <td className="py-4 px-4">{new Date(OnlinePay.date).toLocaleDateString()}</td>
      <td className="py-4 px-4">{OnlinePay.stripePaymentId}</td>
      <td className="py-4 px-4">{OnlinePay.status}</td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Physical Booking Payments</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Slot ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Vehicle Number</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Entry Date</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Duration</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
  {filteredPhysicalPayments.map((physicalpays, index) => (
    <tr key={physicalpays._id || index} className="border-b border-gray-200 hover:bg-gray-700 light:hover:bg-gray-100">
      <td className="py-4 px-4 text-gray-300 light:text-gray-600">{index + 1}</td>
      <td className="py-4 px-4">{physicalpays.slotId}</td>
      <td className="py-4 px-4">{physicalpays.vehicleNumber}</td>
      <td className="py-4 px-4">{new Date(physicalpays.entryDate).toLocaleDateString()}</td>
      <td className="py-4 px-4">{physicalpays.duration}</td>
      <td className="py-4 px-4">{physicalpays.amount}</td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          
         

         <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Online Booking Payments</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">User ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Slot ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Type</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Zone</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Vehicle Number</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Entry Time</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Exit Time</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Stripe PayID</th>
                  </tr>
                </thead>
                <tbody>
  {filteredOnlineBookPayments.map((OnlineBookPay, index) => (
    <tr key={OnlineBookPay._id || index} className="border-b border-gray-200 hover:bg-gray-700 light:hover:bg-gray-100">
      <td className="py-4 px-4">{OnlineBookPay.userId}</td>
      <td className="py-4 px-4">{OnlineBookPay.slotId}</td>
      <td className="py-4 px-4">{OnlineBookPay.types}</td>
      <td className="py-4 px-4">{OnlineBookPay.zone}</td>
      <td className="py-4 px-4">{OnlineBookPay.vehicleNum}</td>
      <td className="py-4 px-4">{new Date(OnlineBookPay.date).toLocaleDateString()}</td>
      <td className="py-4 px-4">{OnlineBookPay.entryTime}</td>
      <td className="py-4 px-4">{OnlineBookPay.exitTime}</td>
      <td className="py-4 px-4">{OnlineBookPay.amount}</td>
      <td className="py-4 px-4">{OnlineBookPay.stripePaymentId}</td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          </div>
         
        </main>
      </div>
    </div>
  );
};

export default PaymentManagement;
