# Apps Summary

## Telegram AI Assistant
- Connects to Telegram to intercept text or audio messages and routes instructions to an AI agent. 
- The agent can access Gmail to perform tasks and reply via Telegram.
- An SMS is also sent to a predefined number for important updates.

## Contact Finder App
- A full-stack app using React, Spring Boot, and n8n to search and display user profiles from a MongoDB source. 
- Once the profile is shown on the frontend, a backend call triggers n8n to send an email and SMS to the identified contact. 
- The backend listens for webhooks to stay in sync with profile data.



# Build docker image
docker build -t shafiquech/n8n-smart-profile:1.12 .
# Push
docker push shafiquech/n8n-smart-profile:1.14
# Local run
docker run -it -p 3000:3000 shafiquech/n8n-smart-profile:1.12


#clean up 
rm -rf .next
npm run build