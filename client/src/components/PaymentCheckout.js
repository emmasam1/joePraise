import React from "react";

const PaymentCheckout = ({ plan, onBack }) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Left Side: Order Summary */}
      <div className="w-full lg:w-1/2 p-10 lg:p-20">
        <button onClick={onBack} className="text-xs font-bold mb-10 block text-gray-400 hover:text-black">
          ← Back to Plans
        </button>
        
        <h2 className="text-xl font-bold text-gray-800 mb-2">Pay {plan.name}</h2>
        <h1 className="text-5xl font-bold text-black mb-12">${plan.price}</h1>

        <div className="space-y-6 border-b pb-8">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
              <div>
                <p className="font-bold text-sm">Subscription Plan</p>
                <p className="text-xs text-gray-500">Qty 1</p>
              </div>
            </div>
            <p className="font-bold text-sm">${plan.price}.00</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between text-sm font-bold">
            <span>Subtotal</span>
            <span>${plan.price}.00</span>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Shipping</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-4">
            <span>Total Due</span>
            <span>${plan.price}.00</span>
          </div>
        </div>
      </div>

      {/* Right Side: Payment Form */}
      <div className="w-full lg:w-1/2 bg-white p-10 lg:p-20 shadow-xl">
        <button className="w-full bg-black text-white py-3 rounded-md font-bold mb-6 flex items-center justify-center gap-2">
          <span> Pay</span>
        </button>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs">Or pay with card</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-xs font-bold mb-2">Email</label>
            <input type="email" placeholder="Enter your email address" className="w-full border p-3 rounded-md bg-gray-50 text-sm outline-none focus:border-black" />
          </div>

          <div>
            <label className="block text-xs font-bold mb-2">Name</label>
            <input type="text" placeholder="Receiver's name" className="w-full border p-3 rounded-md bg-gray-50 text-sm outline-none focus:border-black" />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="col-span-2">
                <label className="block text-xs font-bold mb-2">Address</label>
                <input type="text" placeholder="Enter your address Manually" className="w-full border p-3 rounded-md bg-gray-50 text-sm outline-none focus:border-black" />
             </div>
          </div>

          <div>
            <label className="block text-xs font-bold mb-2">Payment details</label>
            <div className="border rounded-md bg-gray-50 overflow-hidden">
               <input type="text" placeholder="1234 2345 7564 4567" className="w-full p-3 text-sm border-b outline-none" />
               <div className="flex">
                  <input type="text" placeholder="MM / YY" className="w-1/2 p-3 text-sm border-r outline-none" />
                  <input type="text" placeholder="CVC" className="w-1/2 p-3 text-sm outline-none" />
               </div>
            </div>
          </div>

          <button className="w-full bg-[#090940] text-white py-4 rounded-md font-bold text-sm hover:bg-black transition-colors">
            Pay ${plan.price}.00
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentCheckout;