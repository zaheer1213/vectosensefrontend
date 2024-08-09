import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Registration from "./Login/Registration";
import VerificationForm from "./VerificationForm/VerificationForm";
import Businessregistration from "./Admin/Businessregistration/Businessregistration";
import Agent from "./Admin/Agent/Agent";
import Service from "./Admin/Services/Service";
import Theme from "./Admin/Theme/Theme";
import Home from "./Home/Home";
import Whychoosemain from "./Whychoose/Whychoosemain";
import About from "./About/About";
import Information from "./Information/Information";
import Count from "./CountUpAnimation/Count";
import Features from "./Features/Features";
import Packageselection from "./Packageselection/Packageselection";
import Client from "./Clients/Client";
import Journry from "./Journry/Journry";
import Footer from "./Footer/Footer";
import FrontsideLayout from "./Pages/FrontsideLayout";
import AdminLayout from "./Pages/AdminLayout";
import Dashbord from "./Admin/Dashbord/Dashbord";
import ThemeCreateionForm from "./Admin/Theme/ThemeCreateionForm";
import NotFound from "./NotFound/NotFound";
import ProtectedRoute from "./Utils/ProtectedRoute";
import Agentable from "./Admin/Agent/Agentable";
import Servicetable from "./Admin/Services/Servicetable";
import Notification from "./Admin/Notification/Notification";
import Message from "./Admin/Message/Message";
import Analytics from "./Admin/Analytics/Analytics";
import Calendar from "./Admin/Calendar/Calendar";
import Setting from "./Admin/Setting/Setting";
import { useAuth } from "./Utils/AuthContext";
import Register from "./Client/Register/Register";
import History from "./Admin/History/History";
import Finalhome from "./Client/finalhome/Finalhome";
import Perticularservice from "./Client/Services/Perticularservice";
import Invoice from "./Client/Invoice/Invoice";
import Navigation from "./Agent/Navbar/Navigation";
import Mybooking from "./Client/Mybooking/Mybooking";
import Allbooking from "./Admin/Allboking/Allbooking";
import AgentAdminLayout from "./Pages/AgentAdminLayout";
import Agentservcies from "./Admin/Agent/Agentservcies";
import AgentBooking from "./Admin/Agent/AgentBooking/AgentBooking";
import BusinessInfo from "./Agent/BusinessInfo/BusinessInfo";
import Profile from "./Admin/Agent/Profile/Profile";
import AgentDashbord from "./Admin/Agent/Dashbord/AgentDashbord";
import ClientProfile from "./Client/ClientProfile/ClientProfile";
import TermsAndConditions from "./Security/TermsAndConditions";
import PrivacyPolicy from "./Security/PrivacyPolicy";
import Refund from "./Security/Refund";
import Category from "./Admin/Category/Category";
import SuperAdminLayout from "./Pages/SuperAdminLayout";
import SuperDashbord from "./SuperAdmin/Dashbord/SuperDashbord";
import AllServices from "./SuperAdmin/AllServices/AllServices";
import AllAgents from "./SuperAdmin/Allagents/AllAgents";
import AllBooking from "./SuperAdmin/AllBookings/AllBooking";
import AllBuiness from "./SuperAdmin/AllBusiness/AllBuiness";
import EditService from "./SuperAdmin/AllServices/EditService";
import EditAgent from "./SuperAdmin/Allagents/EditAgent";
import EditBusiness from "./SuperAdmin/AllBusiness/EditBusiness";
import AllCategory from "./SuperAdmin/AllCategory/AllCategory";
import PerticularCategoryPage from "./Client/ServiceSwiper/PerticularCategoryPage";
import ClientLogin from "./Login/ClientLogin";
import Review from "./Admin/Review/Review";
import PaymentSuccessful from "./Client/Services/PaymentSuccessful";
import Promotionalservices from "./SuperAdmin/promotionalservices/Promotionalservices";
import Allpromotionalservices from "./SuperAdmin/promotionalservices/Allpromotionalservices";

const Routing = () => {
  const UserRole = localStorage.getItem("role");
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Frontside pages */}
      <Route element={<FrontsideLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/whychooseus" element={<Whychoosemain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/verification" element={<VerificationForm />} />
        <Route path="/information" element={<Information />} />
        <Route path="/count" element={<Count />} />
        <Route path="/features" element={<Features />} />
        <Route path="/packageselection" element={<Packageselection />} />
        <Route path="/client" element={<Client />} />
        <Route path="/journry" element={<Journry />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/serviceprovider" element={<Navigation />} />
        <Route path="/home" element={<Finalhome />} />
        <Route path="/clientregistration" element={<Register />} />
        <Route path="/clientlogin" element={<ClientLogin />} />
        <Route path="/servicepage" element={<Perticularservice />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/termscondition" element={<TermsAndConditions />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/refund" element={<Refund />} />

        <Route
          path="/PerticularCategory"
          element={<PerticularCategoryPage />}
        />

        {/* Registration pages  with role Admin*/}
        {isAuthenticated && UserRole == "Admin" ? (
          <>
            <Route
              path="/businessregistration"
              element={<Businessregistration />}
            />
            <Route path="/agentregistration" element={<Agent />} />
            <Route path="/serviceinformation" element={<Service />} />
            <Route path="/themeselection" element={<Theme />} />
            <Route
              path="/themeselectionform"
              element={<ThemeCreateionForm />}
            />
          </>
        ) : (
          <Route path="*" element={<NotFound />} />
        )}
      </Route>

      {/* Admin pages  with role Client*/}
      {isAuthenticated && UserRole == "Client" ? (
        <>
          <Route path="/my-bookings" element={<Mybooking />} />
          <Route path="/clinet-profile" element={<ClientProfile />} />
          <Route path="/paymnetscuccess/:id" element={<PaymentSuccessful />} />
        </>
      ) : (
        <Route path="*" element={<NotFound />} />
      )}

      <Route element={<AdminLayout />}>
        <Route
          path="/dashbord"
          element={
            <ProtectedRoute role="Admin">
              <Dashbord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agentable"
          element={
            <ProtectedRoute role="Admin">
              <Agentable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/servicetable"
          element={
            <ProtectedRoute role="Admin">
              <Servicetable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notification"
          element={
            <ProtectedRoute role="Admin">
              <Notification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/message"
          element={
            <ProtectedRoute role="Admin">
              <Message />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute role="Admin">
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute role="Admin">
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <ProtectedRoute role="Admin">
              <Setting />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute role="Admin">
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allbooking"
          element={
            <ProtectedRoute role="Admin">
              <Allbooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category"
          element={
            <ProtectedRoute role="Admin">
              <Category />
            </ProtectedRoute>
          }
        />
        <Route
          path="/review"
          element={
            <ProtectedRoute role="Admin">
              <Review />
            </ProtectedRoute>
          }
        />
      </Route>

      {isAuthenticated && UserRole == "Superadmin" ? (
        <>
          <Route
            path="/super-servicesedit"
            element={
              <ProtectedRoute role="Superadmin">
                <EditService />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-agentsedit"
            element={
              <ProtectedRoute role="Superadmin">
                <EditAgent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-businessedit"
            element={
              <ProtectedRoute role="Superadmin">
                <EditBusiness />
              </ProtectedRoute>
            }
          />
        </>
      ) : (
        ""
      )}
      {/* super admin dashbord pages  */}
      <Route element={<SuperAdminLayout />}>
        <Route
          path="/super-dashbord"
          element={
            <ProtectedRoute role="Superadmin">
              <SuperDashbord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-services"
          element={
            <ProtectedRoute role="Superadmin">
              <AllServices />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/super-agnets"
          element={
            <ProtectedRoute role="Superadmin">
              <AllAgents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-allbooking"
          element={
            <ProtectedRoute role="Superadmin">
              <AllBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-allbuiness"
          element={
            <ProtectedRoute role="Superadmin">
              <AllBuiness />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-allcategory"
          element={
            <ProtectedRoute role="Superadmin">
              <AllCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-promotionalservices"
          element={
            <ProtectedRoute role="Superadmin">
              <Promotionalservices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-allpromotionalservices"
          element={
            <ProtectedRoute role="Superadmin">
              <Allpromotionalservices />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Agent admin pages */}
      <Route element={<AgentAdminLayout />}>
        <Route
          path="/agent-services"
          element={
            <ProtectedRoute role="Agent">
              <Agentservcies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-booking"
          element={
            <ProtectedRoute role="Agent">
              <AgentBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/businessinfo"
          element={
            <ProtectedRoute role="Agent">
              <BusinessInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute role="Agent">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashbord"
          element={
            <ProtectedRoute role="Agent">
              <AgentDashbord />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Fallback for any undefined routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routing;
