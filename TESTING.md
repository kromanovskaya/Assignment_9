
# API Testing Evidence

Tool: Postman

1. GET: Return all resources
* Link used: http://localhost:3000/api/resources
* Status: 200 OK. Returns array of resources.

2. GET: Return one resource
* Link used: http://localhost:3000/api/resources/2
* Status: 200 OK. Returns {"id": 2, "name": "Resource2"}.

3. POST: Create a new resource
* Link used: http://localhost:3000/api/resources
* Status: 201 Created. Created Resource4 with ID 4

4. PUT: Update resource
* Link used: http://localhost:3000/api/resources/2
* Status: 200 OK. Updated the resource name and returned the updated object:  {"id": 2, "name": "Resource222222222222"}

5. DELETE: Remove resource
* Link used: http://localhost:3000/api/resources/3
* Status: 200 OK. Returned `{"message": "Resource deleted successfully"}