Application Name: Dental Office (D.O.) / Dental Office Online Scheduling System 
URL: http://dentaloffice-app.s3-website-ap-southeast-1.amazonaws.com/ 
Developer: Chua, Jose Paulo A. 
 
Assumptions: Dentists already have existing time-slots

1.) Front-end application: 
Technology used: ReactJS
Design: 
| Page          | Route        | Purpose                                                             | API Calls                                                                                             |
| ------------- | ------------ | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **About**     | `/`          | Display information about the company                               | None                                                                                                  |
| **Services**  | `/services`  | Display information about the available dental services             | None                                                                                                  |
| **Book**      | `/book`      | Allow logged-in users to select dentists and book an appointment    | `GET /api/booking/dentists`  <br> `GET /api/booking/slots/{dentistId}`  <br> `POST /api/booking/book` |
| **Login**     | `/login`     | Allow registered users to log in. Redirects to dashboard on success | `POST /api/login`                                                                                     |
| **Signup**    | `/signup`    | Allow users to register an account                                  | `POST /api/signup`                                                                                    |
| **Dashboard** | `/dashboard` | Allow users to view their profile and appointments                  | `GET /api/dashboard/{userId}` <br> `DELETE /api/dashboard/{appointmentId}`                            |


2.) Backend Application 
Technology used: NodeJS (express) 
Design:

| Method | Endpoin                         | Request Body                                                                 | Response                                                             |
|--------|---------------------------------|------------------------------------------------------------------------------|----------------------------------------------------------------------|
| GET    | `/api/booking/dentists`         | None                                                                         | `dentist_id`, `dentist_name`                                         |
| GET    | `/api/booking/slots/{dentistId}`| None                                                                         | `slot_id`, `slot_date`, `slot_time`                                  |
| POST   | `/api/booking/book`             | `slot_id`, `user_id`                                                         | Insert status                                                        |
| GET    | `/api/dashboard/{userId}`       | None                                                                         | `appointment_id`, `slot_date`, `slot_time`, `dentist_name`           |
| DELETE | `/api/dashboard/{appointmentId}`| None                                                                         | Delete status                                                        |
| POST   | `/api/signup`                   | `user_name`, `user_gender`, `user_birthdate`, `user_email`, `user_password`  | Insert status                                                        |
| POST   | `/api/login`                    | `email`, `password`                                                          | `user_id`, `user_name`, `user_email`, `user_gender`, `user_birthdate`|

3.) Database
Technology used: PostgreSQL (Relational)
Schema:

### Table: `users`
| Column    | Data Type         | Constraints                   |
|-----------|-------------------|-------------------------------|
| `id`      | `SERIAL`          | Primary Key                   |
| `name`    | `VARCHAR(100)`    | Not Null                      |
| `email`   | `TEXT`            | Not Null, Unique              |
| `password`| `TEXT`            | Not Null                      |
| `birthdate`| `DATE`           |                               |
| `gender`  | `VARCHAR(6)`      |                               |

### Table: `dentists`
| Column  | Data Type      | Constraints    |
|---------|----------------|----------------|
| `id`    | `SERIAL`       | Primary Key    |
| `name`  | `VARCHAR(100)` | Not Null       |

### Table: `slots`
| Column      | Data Type   | Constraints                                |
|-------------|-------------|--------------------------------------------|
| `id`        | `SERIAL`    | Primary Key                                |
| `dentist_id`| `INT`       | Not Null, Foreign Key → `dentists(id)`     |
| `time_slot` | `TIMESTAMP` | Not Null                                   |

### Table: `appointments`
| Column    | Data Type | Constraints                           |
|-----------|-----------|---------------------------------------|
| `id`      | `SERIAL`  | Primary Key                           |
| `slot_id` | `INT`     | Not Null, Foreign Key → `slots(id)`   |
| `user_id` | `INT`     | Not Null, Foreign Key → `users(id)`   |

4.) Deployment steps 
A. Frontend Application (Deployed to AWS S3) 
1.) Build the react app into static pages 
   >> npm run build 
2.) Push the static pages into an s3 bucket 
   >> aws s3 sync path/react/folder/build s3://s3-bucket-ipaddress --delete 
 
B. Backend Application (Deployed to AWS EKS) 
1.) Build the nodeJS application into a docker image 
   >> docker build -t app . 
2.) Update the docker image name to sync with the AWS ECR repository name 
   >> docker tag app:latest aws-ecr-endpoint/app:latest 
3.) Push the docker image into the AWS ECR repository 
   >> docker push aws-ecr-endpoint/app:latest 
4.) Update kubernetes config file to target the AWS EKS cluster 
   >> aws eks --region ap-southeast-1 update-kubeconfig --name eks-cluster-name 
5.) Deploy the ECR image to the EKS cluster 
   >> kubectl apply -f deployment.yaml 
 
C. Database (Deployed to AWS RDS) 
1.) Connect to the AWS RDS endpoint using postgreSQL 
   >> psql --host=rds-endpoint --port=5432 --username=postgres --dbname=postgres 
2.) Configure and populate the database using sql scripts 
   >> \i ‘db_createTable.sql’ 

