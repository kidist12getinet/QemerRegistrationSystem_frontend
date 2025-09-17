
Qemer Training Center - Registration System  

A modern web app for course registrations built with React, TypeScript, and Vite.  

# Key Features  
- Students: Browse courses, register, track status  
- Admins: Manage registrations, courses, generate reports (Excel/PDF), email notifications  
- Responsive: Works on all devices  

# Tech Stack  
- Frontend: React 18 + TypeScript  
- Styling: Tailwind CSS  
- Forms: React Hook Form + Zod  
- Email: EmailJS  
- Exports: `xlsx` (Excel), `jspdf` (PDF)  

#Quick Start  
1. Clone repo & install deps:  
      bash
   git clone https://github.com/Hanah29/RegistrationSystem_frontend.git
   cd final_project
   npm install
   
2. Add .env file with EmailJS keys and API URL  
3. Run:  
   bash
   npm run dev  
   npm run build  
   

# Core Structure  
- Student: Course catalog, registration form, dashboard  
- Admin: Registration/course management, reports, analytics  
- Services: API calls, auth, email logic  

# License  
MIT © Qemer Training Center  

