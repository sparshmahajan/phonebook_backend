# REST API server for Phonebook Backend

## ENV Vars

```env
MONGODB_URL=Your_Mongo_Database_URL
APP_SECRET=token_encryption_secret_for_jwt
```

```
## important : "/api" is used with every path before the URLs given

## API DOCS

### USER ROUTES
    
 ``` 
 ---

| Description            |                 URL              | Method |         Body         |   Status    |
| ---------------------- | -------------------------------- | ------ | -------------------- | ----------- |
|        Sign Up         |        /user/signup              | POST   |      SignUp body     | CREATED     |
|        LogIn           |        /user/login               | POST   |   email, password    | OK          |

---


```json
SignUp Body = {
    "name": "your_name",
    "email": "your_email",
    "password": "your_password",
    "phone_number": "your_phone_number",
}
```

---
### PhoneBook Routes
|               Description             |           URL          | Method |      Body   |   Status    |
| ------------------------------------- | ---------------------- | ------ | ----------- | ----------- |
|   Add Single Number                   |   /phone               | POST   | name,phone  | CREATED     |
|   Add Multiple Numbers                |   /phone/multiple      | POST   | [name,phone]| CREATED     |
|   Get Single Number                   |   /phone/:id           | GET    |     \_\_    | OK          |
|   Get All Numbers with pagination     | /phone?limit=5&page=1  | GET    |     \_\_    | OK          |
|   Update Single Number                |   /phone/:id           | PUT    | name,phone  | OK          |
|   Delete Single Number                |   /phone/:id           | DELETE |     \_\_    | OK          |
|   Find All Numbers by Phase Matching  |   /phone/search/:phone | GET    |     \_\_    | OK          |
---
