import { createBrowserRouter } from "react-router-dom";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";

import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import Dashboard from "./features/dashboard/pages/Dashboard";

import ResumeAnalyzer from "./features/ai/pages/ResumeAnalyzer";
import JDAnalyzer from "./features/ai/pages/JDAnalyzer";
import RoadmapGenerator from "./features/ai/pages/RoadmapGenerator";
import Settings from "./features/ai/pages/Settings";
import HelpSupport from "./features/ai/pages/HelpSupport";
import AIFeedback from "./features/ai/pages/AIFeedback";
import RAGExplorer from "./features/ai/pages/RAGExplorer";
import QueryInterface from "./features/ai/pages/QueryInterface";

import QuestionGenerator from "./features/interview/pages/QuestionGenerator";
import MockInterviewPage from "./features/interview/pages/MockInterviewPage";

import MainLayout from "./layout/MainLayout";



export const router =
  createBrowserRouter([

    /**
     * =====================================
     * PUBLIC ROUTES
     * =====================================
     */

    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/register",
      element: <Register />,
    },



    /**
     * =====================================
     * PROTECTED ROUTES
     * =====================================
     */

    {
      path: "/",

      element: (
        <Protected>
          <MainLayout />
        </Protected>
      ),

      children: [

        /**
         * HOME
         */

        {
          index: true,
          element: <Home />,
        },



        /**
         * DASHBOARD
         */

        {
          path: "dashboard",
          element: <Dashboard />,
        },



        /**
         * AI FEATURES
         */

        {
          path: "resume-analyzer",
          element: <ResumeAnalyzer />,
        },

        {
          path: "jd-analyzer",
          element: <JDAnalyzer />,
        },

        {
          path: "roadmap-generator",
          element: <RoadmapGenerator />,
        },

        {
          path: "settings",
          element: <Settings />,
        },

        {
          path: "help-support",
          element: <HelpSupport />,
        },

        {
          path: "rag-explorer",
          element: <RAGExplorer />,
        },

        {
          path: "query-interface",
          element: <QueryInterface />,
        },

        {
          path: "ai-feedback",
          element: <AIFeedback />,
        },



        /**
         * INTERVIEW FEATURES
         */

        {
          path: "question-generator",
          element: <QuestionGenerator />,
        },

        {
          path: "mock-interview",
          element: <MockInterviewPage />,
        },

        {
          path: "interview/:interviewId",
          element: <Interview />,
        },

      ],
    },
  ]);