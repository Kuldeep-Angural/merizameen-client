import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
// import { Dashboard } from '../components/dashboard/Dashboard';
import Auth from '../pages/authantication/Auth';
import { selectUserData } from '../pages/authantication/authSlice';
import { Home } from '../pages/home/Home';
import { PropertyView } from '../pages/items/PropertyView';
import { PageNotFound } from '../pages/notFoundPage/PageNotFound';
import { PostProperty } from '../pages/postAd/PostProperty';
import Dashboard from '../components/dashboard/Dashboard'

export const APRoutes = () => {
  const ROUTES = [
    { name: '/', value: (index) => ( <Home key={index} updatePageTitle={updatePageTitle} />) },
    { name: '/auth', value: (index) => (<Auth key={index} updatePageTitle={updatePageTitle} />) },
    { name: '/home', value: (index) => <Home key={index} updatePageTitle={updatePageTitle} /> },
    { name: '/home/:listId', value: (index) => <PropertyView key={index} updatePageTitle={updatePageTitle} /> },
    { name: '/postAd', value: (index) => (<PostProperty key={index} updatePageTitle={updatePageTitle} /> ) },
    { name: '/dashboard', value: (index) => (<Dashboard key={index} updatePageTitle={updatePageTitle} /> ) },
  ];
  const isLoggedIn = useSelector(selectUserData);
  const [pageTitle, updatePageTitle] = useState('');

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

 

  return (
    <Routes>
      {ROUTES.map((route, index) => (
        <Route path={route.name} element={ isLoggedIn ? route.value(index) : <Auth key={index} updatePageTitle={updatePageTitle} /> } key={route.name} /> 
      ))}
      <Route path="*" element={<PageNotFound updatePageTitle={updatePageTitle} />} /> {/* Catch-all route */}
    </Routes>
  );
};
