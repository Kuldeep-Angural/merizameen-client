# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



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
