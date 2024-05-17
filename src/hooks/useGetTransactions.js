
import { useEffect, useState } from 'react'
import { query, collection, where, orderBy, onSnapshot } from 'firebase/firestore'
import {db} from '../config/firebase'
import { useGetUserInfo } from './useGetUserInfo'


export const useGetTransactions = () => {

    const [transaction, setTransaction] = useState([])
    const [transactionValue, setTransactionValue] = useState({balance: 0.0, income: 0.0, expense: 0.0})
    const transactionCollectionRef = collection(db, "transactions")
    const { userId } = useGetUserInfo()

    const getTransaction = async () => {
        let unsubscribe
        try {
            const queryTransaction = query(
                transactionCollectionRef,
                where("userId", "==", userId),
                orderBy("createdAt")
            )
            unsubscribe = onSnapshot(queryTransaction, (snapshot) => {

                let docs = [];
                let totalincome = 0
                let totalexpense = 0

                snapshot.forEach((doc) => {
                    const data = doc.data()
                    const id = doc.id

                    docs.push({...data, id})
                    console.log(data)
                    if(data.transactionType === 'income'){
                        totalincome += Number(data.amoumt)
                    } else {
                        totalexpense += Number(data.amoumt)
                    }
                })

                setTransaction(docs)
                let totalbalance = totalincome - totalexpense
                setTransactionValue({
                    balance: totalbalance,
                    income: totalincome,
                    expense: totalexpense
                })
            })
        } catch (error) {
            console.error(error)
        }
        return () => unsubscribe()
    }

    useEffect(() => {
        getTransaction()
    }, [])

    return { transaction, transactionValue }
}