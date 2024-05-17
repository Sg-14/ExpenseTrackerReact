import React from "react";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaCircleArrowDown } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { FaTrash } from "react-icons/fa6";

import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo"
import { FaWallet } from "react-icons/fa6";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {db} from '../../config/firebase'
import { doc, deleteDoc } from "firebase/firestore";


function Home() {
  const { addTransaction } = useAddTransaction();
  const { transaction, transactionValue} = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo()

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const {balance, income, expense} = transactionValue

  console.log(balance)
  console.log(income)
  console.log(expense)

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description: description,
      amoumt: amount,
      transactionType: transactionType,
    });

    setAmount("")
    setDescription("")
    setTransactionType("expense")
  };

  const userSignOut = async () => {
    try{
      await signOut(auth)
      localStorage.clear()
      navigate('/')
    }
    catch(error){
      console.log(error)
    }
  }

  const deleteEntry = async (id) => {
    const reference = doc(db, 'transactions', id)
    await deleteDoc(reference)
  }

  return (
    <>
      <div className="w-full flex justify-end my-1">
        <div className="flex">
          <img src={profilePhoto} alt="" className="border rounded-full size-8 mr-2"/>
          <p>
            <button onClick={userSignOut} className="bg-blue rounded text-white p-1.5 mr-2 text-sm">
              Sign Out
            </button>
          </p>
        </div>
      </div>
      <div className="w-full flex my-4 items-center flex-col">
        <div className="bg-welcome text-black rounded-3xl max-w-5xl p-4 space-y-6 flex-col items-center w-[50vw]">
          <div className="max-w-4xl">
            <h1 className="text-black text-3xl font-bold w-96 ">
              Hi, {name} 
            </h1>
            <p className="my-2">
              Welcome back to your money manager
            </p>
          </div>
        </div>
        <div className="w-full flex max-w-3xl mt-2">
          <div className="w-1/3 flex bg-balance rounded-xl p-2 mx-1">
            <div className="my-3 mx-2">
              <FaWallet size={30} color="#BEFE70"/>
            </div>
            <div>
              <h3>Your Balance</h3>
              {balance >=0 ? (<p>Rs.{balance}</p>) : (<p>-Rs.{balance*-1}</p>)}
            </div>
          </div>
          <div className="w-1/3 flex bg-income rounded-xl p-2 mx-1">
            <div className="my-3 mx-2">
              <FaCircleArrowUp size={30} color="#58F6EF"/>
            </div>
            <div>
              <h3>Your Income</h3>
              <p>Rs.{income}</p>
            </div>
          </div>
          <div className="w-1/3 flex bg-expense rounded-xl p-2 mx-1">
            <div className="my-3 mx-2">
              <FaCircleArrowDown size={30} color="#C1B1F0"/>
            </div>
            <div>
              <h3>Your Expense</h3>
              <p>Rs.{expense}</p>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center max-w-4xl h-auto">
          <div className="w-2/5 bg-white text-back my-2 ml-5 mr-1 px-6 py-10 rounded-lg border h-[60vh]">
            <h1 className=" text-xl font-bold mb-5">Add Transaction</h1>

            <div>
              <form onSubmit={onSubmit}>
                <p>Title</p>
                <input
                  type="text"
                  placeholder="Description"
                  id="description"
                  value={description}
                  className="border px-1 mt-2 mb-5"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p>Amount</p>
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  className="border px-1 my-1.5 mt-2 mb-5"
                  onChange={(e) => setAmount(e.target.value)}
                />
                <p className="mb-2">Type</p>
                <input
                  type="radio"
                  value="income"
                  id="Income"
                  className="m-1.5"
                  checked={transactionType === "income"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                <label htmlFor="Income">Income</label>
                <input
                  type="radio"
                  value="expense"
                  id="Expense"
                  className="m-1.5"
                  checked={transactionType === "expense"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                <label htmlFor="Income">Expense</label>
                <br />
                <button
                  type="submit"
                  className="bg-back rounded-lg text-white w-full mt-6 p-2"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
          <div className="w-3/5 bg-lightbg text-back my-5 ml-1 mr-5 px-6 py-10 rounded-lg border h-[60vh]">
            <h1 className=" text-xl font-bold ">History</h1>

            <div>
              <div className="w-full flex my-3 p-1">
                <div className="w-1/3 mr-5 font-semibold">
                  <h3>Description</h3>
                </div>
                <div className="w-1/4 font-semibold">
                  <h3>Amount</h3>
                </div>
                <div className="w-1/3 font-semibold">
                  <h3>Type</h3>
                </div>
              </div>
              {transaction.map((transaction) => {
                const { description, amoumt, transactionType } = transaction;
                return (
                  <div className="w-full flex my-3 border p-1 bg-white" key={transaction.id}>
                    <div className="w-1/3 mr-5">{description}</div>
                    <div className="w-1/4">{amoumt}</div>
                    <div className="w-1/4">
                      <p style={{color: transactionType === 'expense' ? "red" : "lime"}}>
                        {transactionType}
                      </p>
                    </div>
                    <div className="bg-white cursor-pointer text-sm my-1 hover:text-turqoise">
                      <button onClick={() => deleteEntry(transaction.id)}>
                      <FaTrash />
                      </button> 
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
