import { FrequencialIncome } from "../../components/primary-income/enums/frequencial-income.enum";
import { PensionFund } from "../../components/primary-income/enums/pension-fund.enum";
import { AnswerType } from "../enums/answer-type.enum";
import { ApplicationStepModal } from "../models/application-step.model";

export const QUESTION_RESPONSE: ApplicationStepModal[] = [
  {
    "step": 'STEP_1',
    "stepNumber": 1,
    "stepName": "Getting Started",
    "questions": [
      {
        "questionFormType": "Single",
        "questionId": "GettingStarted_Q1",
        "answerType": AnswerType.Text,
        "label": "Full Name",
        "name": "fullName",
        "placeholder": "Enter your full name",
        "validations": [
          {
            "name": "required",
            "validator": "required",
            "message": "Full Name is required"
          }
        ]
      },
      {
        "questionId": "GettingStarted_Q2",
        "questionFormType": "Single",
        "answerType": AnswerType.Date,
        "label": "Date of Birth",
        "name": "dob",
        "placeholder": "Enter your date of birth",
        "validations": [
          {
            "name": "required",
            "validator": "required",
            "message": "Date of Birth is required"
          }
        ]
      },
      {
        "questionId": "GettingStarted_Q3",
        "questionFormType": "Single",
        "answerType": AnswerType.Select,
        "label": "Gender",
        "name": "gender",
        "options": [{"text": "Male", "value": "Male"}, {"text": "Female", "value": "Female"}, {"text": "Other", "value": "Other"}],
        "placeholder": "Select your gender",
        "validations": [
          {
            "name": "required",
            "validator": "required",
            "message": "Gender is required"
          }
        ]
      }
    ]
  },
  {
    "step": 'STEP_2',
    "stepNumber": 2,
    "stepName": "Income",
    "questions": [
      {
        "questionId": "Income_Group_Q1",
        "answerType": AnswerType.Income,
        "label": "Primary Income",
        "name": "primaryIncome",
        "questionFormType": "Group",
        "placeholder": null,
        "questions": [
          {
            "parentQuestionId": "Income_Group_Q1",
            "questionId": "Income_Q1_Sub1",
            "questionFormType": "Single",
            "answerType": AnswerType.Amount,
            "label": "",
            "name": "primaryIncome",
            "placeholder": 'Amount',
            "validations": [
              {
                "name": "required",
                "validator": "required",
                "message": "Primary Income is required",
              },
              {
                "name": "max",
                "validator": "max",
                "message": "Primary Income cannot over $1.000.000",
                "validationValue": 1000000
              },
              {
                "name": "min",
                "validator": "min",
                "message": "Primary Income cannot in negative number",
                "validationValue": 0
              }
            ],
          },
          {
            "parentQuestionId": "Income_Group_Q1",
            "questionId": "Income_Q1_Sub2",
            "questionFormType": "Single",
            "answerType": AnswerType.Button_Select,
            "label": "Pension Fund",
            "name": "pensionFund",
            "placeholder": null,
            "options": [
              {"text": PensionFund.Included, "value": PensionFund.Included}, 
              {"text": PensionFund.Excluded, "value": PensionFund.Excluded}, 
            ],
            "defaultValue": PensionFund.Included,
            "validations": [],
          },
          {
            "parentQuestionId": "Income_Group_Q1",
            "questionId": "Income_Q1_Sub3",
            "questionFormType": "Single",
            "answerType": AnswerType.Button_Select,
            "label": "Frequencial Income",
            "name": "frequencialIncome",
            "placeholder": null,
            "options": [
              {"text": FrequencialIncome.Yearly, "value": FrequencialIncome.Yearly}, 
              {"text": FrequencialIncome.Monthly, "value": FrequencialIncome.Monthly}, 
              {"text": FrequencialIncome.Weekly, "value": FrequencialIncome.Weekly}, 
            ],
            "defaultValue": FrequencialIncome.Yearly,
            "validations": [],
          }
        ],
        "validations": []
      },
      {
        "questionId": "Income_Group_Q2",
        "questionFormType": "Group",
        "answerType": AnswerType.Income,
        "label": "Bonus",
        "name": "bonus",
        "placeholder": "Amount",
        "questions": [
          {
            "parentQuestionId": "Income_Group_Q2",
            "questionId": "Income_Q2_Sub1",
            "questionFormType": "Single",
            "answerType": AnswerType.Amount,
            "label": "",
            "name": "bonus",
            "placeholder": 'Amount',
            "validations": [],
          },
          {
            "parentQuestionId": "Income_Group_Q2",
            "questionId": "Income_Q2_Sub2",
            "questionFormType": "Single",
            "answerType": AnswerType.Button_Select,
            "label": "Pension Fund",
            "name": "pensionFund",
            "placeholder": null,
            "options": [
              {"text": PensionFund.Included, "value": PensionFund.Included}, 
              {"text": PensionFund.Excluded, "value": PensionFund.Excluded}, 
            ],
            "validations": [],
          },
          {
            "parentQuestionId": "Income_Group_Q2",
            "questionId": "Income_Q1_Sub3",
            "questionFormType": "Single",
            "answerType": AnswerType.Button_Select,
            "label": "Frequencial Income",
            "name": "frequencialIncome",
            "placeholder": null,
            "options": [
              {"text": FrequencialIncome.Yearly, "value": FrequencialIncome.Yearly}, 
              {"text": FrequencialIncome.Monthly, "value": FrequencialIncome.Monthly}, 
              {"text": FrequencialIncome.Weekly, "value": FrequencialIncome.Weekly}, 
            ],
            "validations": [],
          }
        ],
        "validations": [],
      },
      {
        "questionId": "Income_Group_Q3",
        "questionFormType": "Group",
        "answerType":AnswerType.Income,
        "label": "Pension-Fund Contributions",
        "name": "pensionFundContribution",
        "placeholder": "Amount",
        "questions": [
          {
            "parentQuestionId": "Income_Group_Q3",
            "questionId": "Income_Q3_Sub1",
            "questionFormType": "Single",
            "answerType": AnswerType.Amount,
            "label": "",
            "name": "pensionFundContribution",
            "placeholder": 'Amount',
            "validations": [],
            "conditionPopulated": {
              "conditionFieldIds": ["Income_Group_Q1.Income_Q1_Sub1", "Income_Group_Q1.Income_Q1_Sub2", "Income_Group_Q2.Income_Q2_Sub1", "Income_Group_Q2.Income_Q2_Sub2"],
              "populatedFormula": `Income_Q1_Sub2 === 'Included' && Income_Q2_Sub2 === 'Included' ? (Income_Q1_Sub1 * (1/10) + Income_Q2_Sub1 * (1 / 10)) :
                Income_Q1_Sub2 === 'Included' ? Income_Q1_Sub1 * (1 / 10) :
                Income_Q2_Sub2 === 'Included' ? Income_Q2_Sub1 * (1 / 10) : 
                0`
            },
            "conditionReadonly": {
              "conditionFieldIds": ["Income_Group_Q1.Income_Q1_Sub2", "Income_Group_Q2.Income_Q2_Sub2"],
              "readonlyWhen": "Income_Q1_Sub2 === 'Included' || Income_Q2_Sub2 === 'Included'"
            },
          },
          {
            "parentQuestionId": "Income_Group_Q3",
            "questionId": "Income_Q3_Sub2",
            "questionFormType": "Single",
            "answerType": AnswerType.Button_Select,
            "label": "Frequencial Income",
            "name": "frequencialIncome",
            "placeholder": null,
            "options": [
              {"text": FrequencialIncome.Yearly, "value": FrequencialIncome.Yearly}, 
              {"text": FrequencialIncome.Monthly, "value": FrequencialIncome.Monthly}, 
              {"text": FrequencialIncome.Weekly, "value": FrequencialIncome.Weekly}, 
            ],
            "validations": [],
          }
        ],
        "validations": [],
      },
    ]
  },
  {
    "step": 'STEP_3',
    "stepNumber": 3,
    "stepName": "Properties & Liabilities",
    "questions": [
      {
        "questionId": "Properties_Liabilities_Q1",
        "questionFormType": "Array",
        "answerType": AnswerType.Property_List_Item,
        "label": "Properties",
        "name": "properties",
        "placeholder": null,
        "description": "Add you asset such as: Real estate, Investment, Home, Motor, Education, Micellaneous...",
        "fields": [
          {
            "questionFormType": 'Single',
            "answerType": AnswerType.Text,
            "label": "Asset Name",
            "name": "assetName",
            "placeholder": "Enter an arbitary asset.",
            "defaultValue": '',
            "validations": [
              {
                "name": "required",
                "validator": "required",
                "message": "Asset name is required"
              }
            ]
          },
          {
            "questionFormType": 'Single',
            "answerType": AnswerType.Amount,
            "label": "Value",
            "name": "assetValue",
            "placeholder": "Asset Value",
            "defaultValue": 0,
            "validations": [
              {
                "name": "min",
                "validator": "min",
                "message": "Asset value cannot be zero",
                "validationValue": 1
              },
              {
                "name": "required",
                "validator": "required",
                "message": "Asset value is required"
              }
            ]
          },
          {
            "questionFormType": 'Single',
            "answerType": AnswerType.Checkbox,
            "label": "Does this property have any liability?",
            "name": "isLiability",
            "placeholder": null,
            "defaultValue": false,
            "validations": []
          },
        ],
        "validations": [],
      },
      {
        "questionId": "GettingStarted_Q1",
        "questionFormType": "Group",
        "answerType": "Text",
        "label": "Full Name",
        "name": "fullName",
        "placeholder": "Enter your full name",
        "validations": [
          {
            "name": "required",
            "validator": "required",
            "message": "Full Name is required"
          }
        ]
      },
    ]
  },
]
