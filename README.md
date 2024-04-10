# Notes Application
<p align="left"> <a href="https://getbootstrap.com" target="_blank" rel="noreferrer"> <img src="https://user-images.githubusercontent.com/25181517/183898054-b3d693d4-dafb-4808-a509-bab54cf5de34.png" alt="bootstrap" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="express" width="40" height="40"/> </a> <a href="https://cloud.google.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" alt="gcp" width="40" height="40"/> </a>  <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a></p>

## Deployment
#### .env 
<p> Create a .env in the current folder and enter your mongoCluster and GoogleCallBackURL's</p>

```
DB_URL=mongodb+srv://<username>:<password>@cluster0.w10itna.mongodb.net/new
CLIENT_ID=<client-id>.apps.googleusercontent.com
CLIENT_SECRET=<your-secret-here>
CALLBACK_URI=http://localhost:5000/google/callback
PORT=5000
```
<p> Go-to <a href="https://console.cloud.google.com/">Google Developer Console </a> for setting up your OAuth-Consent

#### run
```
git clone https://github.com/rohithvarma444/Notes-Application.git
cd Notes-Application
npm install
# create the .env file in the mentioned format .
npm start
```
---
### Security
<p> Enhanced security measures have been implemented to safeguard the update and deletion functionalities of the Notes application. Cross-Site Request Forgery (CSRF) protection has been added, ensuring that only legitimate requests from authorized users are processed, thus preventing malicious actions. Additionally, Content Security Policy (CSP) has been enforced to restrict the loading of external scripts from untrusted sources, mitigating the risk of XSS (Cross-Site Scripting) attacks and other potential security vulnerabilities. These proactive measures enhance the overall security posture of the application, safeguarding user data and maintaining the integrity of the system. </p>
