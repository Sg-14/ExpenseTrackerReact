
import { addDoc, serverTimestamp, collection } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useGetUserInfo } from './useGetUserInfo'


export const useAddTransaction = () => {

    const transactionCollectionRef = collection(db, "transactions")
    const { userId } = useGetUserInfo()

    const addTransaction = async (
        {
            description,
            amoumt,
            transactionType
        }) => {
        await addDoc(
            transactionCollectionRef,
            {
                userId,
                description,
                amoumt,
                transactionType,
                createdAt: serverTimestamp(),
            }
        )
    }

    return {addTransaction}
}