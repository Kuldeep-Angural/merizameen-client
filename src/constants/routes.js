import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import Auth from '../pages/authantication/Auth';
import { selectUserData } from '../pages/authantication/authSlice';
import { Home } from '../pages/home/Home';
import { PropertyView } from '../pages/items/PropertyView';
import { PageNotFound } from '../pages/notFoundPage/PageNotFound';
import { PostProperty } from '../pages/postAd/PostProperty';
import AdminArea from '../pages/adminArea/AdminArea';
import { ViewUser } from '../pages/adminArea/adminPages/ViewUser';

const PrivateRoute = ({ element, isLoggedIn, requiredRole }) => {
  const user = useSelector(selectUserData);


  console.log(user);
  if (!isLoggedIn) {
    return <Navigate to="/auth" />;
  }

  if (requiredRole && user.roles !== requiredRole) {
    return <Navigate to="/home" />;
  }

  return element;
};

export const APRoutes = ({ toastRef }) => {
  const isLoggedIn = useSelector(selectUserData) !== null;
  const [pageTitle, updatePageTitle] = useState('');

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Home updatePageTitle={updatePageTitle} toastRef={toastRef} /> : <Auth updatePageTitle={updatePageTitle} toastRef={toastRef} />} />
      <Route path="/auth" element={<Auth updatePageTitle={updatePageTitle} toastRef={toastRef} />} />
      <Route path="/home" element={<Home updatePageTitle={updatePageTitle} toastRef={toastRef} />} />
      <Route path="/home/:listId" element={<PropertyView updatePageTitle={updatePageTitle} toastRef={toastRef} />} />
      <Route path="/postAd" element={<PrivateRoute element={<PostProperty updatePageTitle={updatePageTitle} toastRef={toastRef} />} isLoggedIn={isLoggedIn} />} />
      <Route path="/edit/property/:id" element={<PrivateRoute element={<PostProperty updatePageTitle={updatePageTitle} toastRef={toastRef} />} isLoggedIn={isLoggedIn} />} />
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard updatePageTitle={updatePageTitle} toastRef={toastRef} />} isLoggedIn={isLoggedIn} />} />
      <Route path="/adminArea" element={<PrivateRoute element={<AdminArea updatePageTitle={updatePageTitle} toastRef={toastRef} />} isLoggedIn={isLoggedIn} requiredRole="owner" />} />
      <Route path="/adminArea/user/:id" element={<PrivateRoute element={<ViewUser updatePageTitle={updatePageTitle} toastRef={toastRef} />} isLoggedIn={isLoggedIn} requiredRole="owner" />} />


      <Route path="*" element={<PageNotFound updatePageTitle={updatePageTitle} />} />

    </Routes>
  );
};
