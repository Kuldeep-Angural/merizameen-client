```mermaid
graph TB

    subgraph Frontend["Frontend (Angular)"]
        subgraph Routes["Routes"]
            LOGIN["Login/Register"]
            DASHBOARD["Dashboard"]
            QUEST_FORM["Questionnaire Form"]
            APPOINTMENTS["Appointments"]
            SUMMARY["Summary View"]
            ADMIN["Admin Panel"]
        end

        subgraph Features["Feature Modules"]
            QUEST_MODULE["Questionnaire Module"]
            AUTH_MODULE["Auth Module"]
            ADMIN_MODULE["Admin Module"]
            APPT_MODULE["Appointment Module"]
            
            subgraph QuestComponents["Questionnaire Components"]
                FORM_BUILDER["Dynamic Form Builder"]
                SECTIONS["Section Navigator"]
                VALIDATION["Form Validation"]
                PROGRESS["Progress Tracker"]
            end
        end

        subgraph Core["Core Module"]
            GUARDS["Auth Guards"]
            INTERCEPT["HTTP Interceptors"]
            SERVICES["Services"]
            MODELS["Models/Interfaces"]
        end

        subgraph Shared["Shared Module"]
            UI_COMPONENTS["UI Components"]
            direction TB
            subgraph Common["Common Components"]
                BUTTON["Button"]
                MODAL["Modal"]
                SPINNER["Spinner"]
                ALERT["Alert"]
                CALENDAR["Calendar"]
            end
            
            subgraph Forms["Form Components"]
                INPUT["Input Field"]
                SELECT["Select"]
                RADIO["Radio Group"]
                CHECKBOX["Checkbox"]
                DATE_PICKER["Date Picker"]
            end
        end

        UI_COMPONENTS --> Features
        Core --> Features
        Features --> Routes
    end

    subgraph Backend ["Backend (ASP.NET Core)"]
        API[API Layer] --> |Dependency Injection| APP[Application Layer]
        APP --> |Interface Implementation| INFRA[Infrastructure Layer]
        APP --> DOMAIN[Domain Layer]
        INFRA --> DOMAIN
        
        subgraph API ["API Layer (Controllers)"]
            AUTH[Auth Controller]
            USER[User Controller]
            ROLE[Role Controller]
            QUEST[Questionnaire Controller]
            APPT[Appointment Controller]
        end

        subgraph APP ["Application Layer"]
            IUSER[IUserService]
            IQUEST[IQuestionnaireService]
            IPAYMENT[IPaymentService]
            IAPPT[IAppointmentService]
            IEMAIL[IEmailService]
        end

        subgraph INFRA ["Infrastructure Layer"]
            DB[(SQL Server)]
            SERVICES[Services Implementation]
            REPOS[Repositories]
            EMAIL[Email Service]
            JWT[JWT Provider]
            
            SERVICES --> DB
            REPOS --> DB
        end

        subgraph DOMAIN ["Domain Layer"]
            ENTITIES[Domain Entities]
            ENUMS[Enumerations]
            DTOs[Data Transfer Objects]
        end
    end

    subgraph External
        STRIPE[Stripe Payment]
        EMAIL_PROVIDER[Email Provider]
    end

    INFRA --> STRIPE
    INFRA --> EMAIL_PROVIDER
