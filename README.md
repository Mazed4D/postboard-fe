# Postboard-FE

**A React/Redux frontend for postboard-api, made using ant-design.**

## Deployment

Before deploying the frontend you must deploy postboard-api!

To deploy the frontend you need to create an .env file in the root folder and add the following variables:

> **REACT_APP_API**={URL of postboard-api + /api/v1/, example: http://localhost:3000/api/v1}

> **REACT_APP_SERVER**={URL of postboard-api, example: http://localhost:3000}

After creating the .env file, to deploy with serve run

> npm install

> npm run build

> serve -s build

#### NOTE

Test login button on the auth page logs in with the following inputs:

email: test@test.com

pw: testpass

This account is NOT automatically created upon deployment and **has to be registered manually**.
