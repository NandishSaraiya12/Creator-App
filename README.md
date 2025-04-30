
# Creator Platform App

## Features:

- User authentication with JWT  
- User profile page with photo upload and editable details  
- Credit system to manage and track user credits  
- Feed aggregator that displays top posts from Reddit and Hacker News  
- Creator dashboard with analytics and content tracking  
- Responsive and modern UI using Tailwind CSS  
- Image uploads handled and served from backend  
- Fully deployed backend on Google Cloud Run  
- Frontend deployed on Firebase Hosting  

---

## Instructions to Run Locally:

1. Clone the project repository and navigate to the project folder.  
2. **Backend Setup:**  
   - Navigate to the backend directory  
   - Install dependencies using `npm install`  
   - Create a `.env` file with your MongoDB URI, JWT secret, and PORT  
   - Start the backend server with `npm start`  
3. **Frontend Setup:**  
   - Navigate to the frontend directory  
   - Install dependencies using `npm install`  
   - Create a `.env` file and set the API base URL to your local backend (e.g., `http://localhost:5000`)  
   - Run the frontend using `npm run dev`  

---

## Deployment Steps:

**Backend (Google Cloud Run):**  
- Deploy the backend using the Google Cloud CLI  
- Make sure to allow unauthenticated access and deploy with internet access enabled  
- Ensure your MongoDB cluster allows access from all IPs (`0.0.0.0/0`)  

**Backend URL:**  
https://backend-service-1006349434036.asia-south1.run.app  

---

**Frontend (Firebase Hosting):**  
- Install Firebase CLI and login using `firebase login`  
- Run `firebase init` in your frontend directory and choose Hosting  
- Select or create a Firebase project  
- Set the public directory to `dist` (or build output)  
- Run `npm run build` to create the production build  
- Deploy using `firebase deploy`  

**Frontend URL:**  
https://creator-app-frontend.web.app/register  

---
In addition, I have recorded and included a video walkthrough demonstrating the full functionality of the application.
You can find the video here: [<link>](https://www.loom.com/share/51c4669fcddd412381771c4f292879dc?sid=0bb5bda1-1a8a-4905-98f8-0668df9fe191)
