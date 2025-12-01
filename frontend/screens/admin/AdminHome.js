import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ShoppingCart, DollarSign, TrendingUp, Package, Users, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export default function FoodNowDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sample data - in real app, this would come from API
  const stats = {
    totalOrders: 248,
    todaySales: 3240,
    activeOrders: 12,
    completedToday: 236,
    avgOrderValue: 13.06,
    peakHour: '12:00 PM',
    topProduct: 'Chicken Biryani',
    lowStockItems: 3
  };

  const salesData = [
    { time: '9 AM', sales: 450, orders: 35 },
    { time: '10 AM', sales: 680, orders: 52 },
    { time: '11 AM', sales: 920, orders: 71 },
    { time: '12 PM', sales: 1450, orders: 112 },
    { time: '1 PM', sales: 1280, orders: 98 },
    { time: '2 PM', sales: 850, orders: 65 },
    { time: '3 PM', sales: 520, orders: 40 },
    { time: '4 PM', sales: 380, orders: 29 }
  ];

  const topProducts = [
    { name: 'Chicken Biryani', sales: 45, revenue: 675 },
    { name: 'Veg Thali', sales: 38, revenue: 570 },
    { name: 'Paneer Tikka', sales: 32, revenue: 480 },
    { name: 'Masala Dosa', sales: 28, revenue: 336 },
    { name: 'Butter Naan', sales: 25, revenue: 250 }
  ];

  const recentOrders = [
    { id: '#ORD-1248', customer: 'John Doe', items: 3, amount: 42, status: 'preparing', time: '2m ago' },
    { id: '#ORD-1247', customer: 'Sarah Smith', items: 2, amount: 28, status: 'ready', time: '5m ago' },
    { id: '#ORD-1246', customer: 'Mike Johnson', items: 4, amount: 56, status: 'completed', time: '8m ago' },
    { id: '#ORD-1245', customer: 'Emma Wilson', items: 1, amount: 15, status: 'preparing', time: '12m ago' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">FoodNow</h1>
                <p className="text-purple-200 text-sm">Canteen Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-semibold">{currentTime.toLocaleTimeString()}</p>
                <p className="text-purple-200 text-sm">{currentTime.toLocaleDateString()}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-white/80" />
            </div>
            <p className="text-white/90 text-sm font-medium">Total Orders</p>
            <p className="text-white text-3xl font-bold mt-1">{stats.totalOrders}</p>
            <p className="text-white/70 text-xs mt-2">+12% from yesterday</p>
          </div>

          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-white/80" />
            </div>
            <p className="text-white/90 text-sm font-medium">Today's Sales</p>
            <p className="text-white text-3xl font-bold mt-1">₹{stats.todaySales}</p>
            <p className="text-white/70 text-xs mt-2">Avg: ₹{stats.avgOrderValue}/order</p>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <AlertCircle className="w-5 h-5 text-white/80" />
            </div>
            <p className="text-white/90 text-sm font-medium">Active Orders</p>
            <p className="text-white text-3xl font-bold mt-1">{stats.activeOrders}</p>
            <p className="text-white/70 text-xs mt-2">Need attention</p>
          </div>

          <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-white/80" />
            </div>
            <p className="text-white/90 text-sm font-medium">Completed</p>
            <p className="text-white text-3xl font-bold mt-1">{stats.completedToday}</p>
            <p className="text-white/70 text-xs mt-2">Peak: {stats.peakHour}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Sales Overview */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Sales Overview</h2>
              <div className="flex gap-2">
                {['today', 'week', 'month'].map(period => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedPeriod === period
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/10 text-purple-200 hover:bg-white/20'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={3} dot={{ fill: '#f97316', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Products */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Top Products</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-purple-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{product.name}</p>
                      <p className="text-purple-200 text-xs">{product.sales} orders</p>
                    </div>
                  </div>
                  <p className="text-white font-bold">₹{product.revenue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {recentOrders.map((order, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{order.id}</p>
                        <p className="text-purple-200 text-sm">{order.customer}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-200">{order.items} items • {order.time}</span>
                    <span className="text-white font-bold">₹{order.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions & Alerts */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                  + New Order
                </button>
                <button className="w-full bg-white/20 text-white py-3 rounded-xl font-semibold hover:bg-white/30 transition-all">
                  View Menu
                </button>
                <button className="w-full bg-white/20 text-white py-3 rounded-xl font-semibold hover:bg-white/30 transition-all">
                  Inventory
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-6 border border-red-500/30 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-red-300" />
                <h3 className="text-lg font-bold text-white">Alerts</h3>
              </div>
              <div className="space-y-2">
                <p className="text-red-200 text-sm">⚠️ {stats.lowStockItems} items low in stock</p>
                <p className="text-orange-200 text-sm">🕐 {stats.activeOrders} orders pending</p>
                <p className="text-yellow-200 text-sm">⭐ Peak hours approaching</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}