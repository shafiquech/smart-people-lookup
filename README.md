# smart-people-lookup
smart people  loop up with n8n.
# Build docker image
docker build -t shafiquech/n8n-smart-profile:1.12 .
# Push
docker push shafiquech/n8n-smart-profile:1.14
# Local run
docker run -it -p 3000:3000 shafiquech/n8n-smart-profile:1.12


#clean up 
rm -rf .next
npm run build

##### App architecture.

graph TD

subgraph Frontend App
  FE1[User enters a name (e.g., John Doe)] --> BE1[Spring Boot API /person-info]
end

subgraph Backend Flow
  BE1 --> WH[n8n Webhook: /lookup-person]
end

subgraph n8n Workflow 1 - Lookup and Enrich
  WH --> MDB[Lookup person in MongoDB]
  MDB --> GPT[Call ChatGPT API - 5 AI Insights]
  GPT --> CODE[Code Block - Merge MongoDB + GPT]
  CODE --> BE2[Return enriched JSON to Backend]
end

BE2 --> FE2[Show enriched person details on FE]


graph TD

FE3[User fills Email, Phone & Message] --> BE3[Spring Boot API /send-message]
BE3 --> WH2[n8n Webhook: /send-email-sms]

subgraph n8n Workflow 2 - Send Message
  WH2 --> SEND[Sends Email & SMS using Connectors]
end

SEND --> BE4[Success/Fail Response] --> FE4[User sees status]
