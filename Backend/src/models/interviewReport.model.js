import mongoose from "mongoose";



/**
 * =========================================
 * TECHNICAL QUESTION SCHEMA
 * =========================================
 */

const technicalQuestionSchema =
    new mongoose.Schema({

        question: {
            type: String,
            required: [
                true,
                "Technical question is required",
            ],
        },

        intention: {
            type: String,
            default:
                "Evaluate technical knowledge",
        },

        answer: {
            type: String,
            default:
                "AI generated expected answer",
        },

    }, {
        _id: false,
    });



/**
 * =========================================
 * BEHAVIORAL QUESTION SCHEMA
 * =========================================
 */

const behavioralQuestionSchema =
    new mongoose.Schema({

        question: {
            type: String,
            required: [
                true,
                "Behavioral question is required",
            ],
        },

        intention: {
            type: String,
            default:
                "Evaluate communication and leadership",
        },

        answer: {
            type: String,
            default:
                "AI generated behavioral answer",
        },

    }, {
        _id: false,
    });



/**
 * =========================================
 * DSA QUESTION SCHEMA
 * =========================================
 */

const dsaQuestionSchema =
    new mongoose.Schema({

        question: {
            type: String,
            required: true,
        },

        difficulty: {
            type: String,
            default: "Medium",
        },

        answer: {
            type: String,
            default:
                "AI generated DSA solution",
        },

    }, {
        _id: false,
    });



/**
 * =========================================
 * SYSTEM DESIGN SCHEMA
 * =========================================
 */

const systemDesignSchema =
    new mongoose.Schema({

        question: {
            type: String,
            required: true,
        },

        intention: {
            type: String,
            default:
                "Evaluate system design capability",
        },

        answer: {
            type: String,
            default:
                "AI generated system design answer",
        },

    }, {
        _id: false,
    });



/**
 * =========================================
 * FOLLOWUP QUESTION SCHEMA
 * =========================================
 */

const followupQuestionSchema =
    new mongoose.Schema({

        question: {
            type: String,
            required: true,
        },

    }, {
        _id: false,
    });



/**
 * =========================================
 * SKILL GAP SCHEMA
 * =========================================
 */

const skillGapSchema =
    new mongoose.Schema({

        skill: {
            type: String,
            required: [
                true,
                "Skill is required",
            ],
        },

        severity: {
            type: String,

            enum: [
                "low",
                "medium",
                "high",
            ],

            default: "medium",
        },

    }, {
        _id: false,
    });



/**
 * =========================================
 * PREPARATION PLAN SCHEMA
 * =========================================
 */

const preparationPlanSchema =
    new mongoose.Schema({

        day: {
            type: Number,
            required: true,
        },

        focus: {
            type: String,
            required: true,
        },

        tasks: [
            {
                type: String,
            },
        ],

    }, {
        _id: false,
    });



/**
 * =========================================
 * MAIN INTERVIEW REPORT SCHEMA
 * =========================================
 */

const interviewReportSchema =
    new mongoose.Schema({

        /**
         * BASIC DETAILS
         */

        title: {
            type: String,

            required: [
                true,
                "Job title is required",
            ],

            default:
                "Software Engineer",
        },

        jobDescription: {
            type: String,

            required: [
                true,
                "Job description is required",
            ],
        },

        resume: {
            type: String,
            default: "",
        },

        selfDescription: {
            type: String,
            default: "",
        },



        /**
         * SCORES
         */

        matchScore: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },

        atsScore: {
            type: Number,
            default: 0,
        },

        faangReadiness: {
            type: Number,
            default: 0,
        },

        interviewReadiness: {
            type: String,
            default:
                "Needs Improvement",
        },



        /**
         * AI ANALYSIS
         */

        extractedSkills: [
            {
                type: String,
            },
        ],

        missingSkills: [
            {
                type: String,
            },
        ],

        strengths: [
            {
                type: String,
            },
        ],

        weaknesses: [
            {
                type: String,
            },
        ],

        recommendations: [
            {
                type: String,
            },
        ],

        suggestedProjects: [
            {
                type: String,
            },
        ],

        careerSuggestions: [
            {
                type: String,
            },
        ],



        /**
         * AI GENERATED QUESTIONS
         */

        technicalQuestions: [
            technicalQuestionSchema,
        ],

        behavioralQuestions: [
            behavioralQuestionSchema,
        ],

        dsaQuestions: [
            dsaQuestionSchema,
        ],

        systemDesignQuestions: [
            systemDesignSchema,
        ],

        followupQuestions: [
            followupQuestionSchema,
        ],



        /**
         * SKILL GAP ANALYSIS
         */

        skillGaps: [
            skillGapSchema,
        ],



        /**
         * PREPARATION PLAN
         */

        preparationPlan: [
            preparationPlanSchema,
        ],



        /**
         * USER
         */

        user: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref: "users",
        },

    }, {

        timestamps: true,

    });



/**
 * =========================================
 * MODEL
 * =========================================
 */

const interviewReportModel =
    mongoose.model(
        "InterviewReport",
        interviewReportSchema
    );



export default
    interviewReportModel;