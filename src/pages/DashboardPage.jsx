import { useContext, useEffect } from 'react'
import { UserContext } from '../App'
import BookTable from '../components/micros/BookTable'
import UserTable from '../components/micros/UserTable'
import { useGetBooksQuery, useGetTranscationsQuery, useGetUsersQuery } from '../services/libServices';
import { useNavigate } from 'react-router-dom';
import DashboardStats from '../components/micros/DashboardStats';
import TransactionTable from '../components/micros/TransactionTable';

const DashboardPage = () => {

  const { user } = useContext(UserContext);

  const { data:allBooks } = useGetBooksQuery();
  const { data:allUsers } = useGetUsersQuery();
  const { data:allTransactions } = useGetTranscationsQuery();


  const navigate = useNavigate();

  useEffect(()=>{
    if(!user || !user?.role=="librarian" || !user?.role=="admin") navigate("/")
  },[navigate, user])

  return (
    <section id='dashboard' className='mx-10'>
      <h1 className='text-center py-2 text-2xl font-semibold'>Hello {user?.name?.split(" ")[0]}, Welcome back! </h1>
      <DashboardStats books={allBooks} users={allUsers} />
      <BookTable books={allBooks} />
      <UserTable users={allUsers} isAdmin={user?.role=="admin" ? true : false}  />
      <TransactionTable transactions={allTransactions} />

    </section>
  )
}

export default DashboardPage