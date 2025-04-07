import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import PrivateRoute from "./components/common/PrivateRoute";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import MaterialsPage from "./pages/MaterialsPage";
import ProfilePage from "./pages/ProfilePage";
import FacultyPortalPage from "./pages/FacultyPortalPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import GradesPage from "./pages/GradesPage";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Custom CSS
import "./assets/styles/custom.css";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<LoginPage register={true} />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <PrivateRoute>
                  <CoursesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses/:courseId"
              element={
                <PrivateRoute>
                  <CourseDetailPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/materials"
              element={
                <PrivateRoute>
                  <MaterialsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/assignments"
              element={
                <PrivateRoute>
                  <AssignmentsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/grades"
              element={
                <PrivateRoute>
                  <GradesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/faculty"
              element={
                <PrivateRoute facultyOnly={true}>
                  <FacultyPortalPage />
                </PrivateRoute>
              }
            />

            {/* Redirect for any unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
