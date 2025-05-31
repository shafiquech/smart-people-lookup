# smart-people-lookup
smart people  loop up with n8n.
# Build docker image
docker build -t shafiquech/n8n-smart-profile:1.12 .
# Push
docker push shafiquech/n8n-smart-profile:1.10
# Local run
docker run -it -p 3000:3000 shafiquech/n8n-smart-profile:1.12


#clean up 
rm -rf .next
npm run build