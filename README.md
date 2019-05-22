# Immunization Tracker - Back End

Getting immunization records for you and your families can be a confusing and time consuming process. But it does not have to be!
Out Immunization Tracking App allows parents to track their children’s immunization records, as well as theirs, with a click of a button

- Designed by Yilun Weng https://github.com/wengellen

## Technology Used

- Server: Node.js | Express
- Authentication: Bcrypt & JWT.
- Database Builder: Knex.js
- Testing Database: Jest | Supertest | SQLite3
- Production & Development Database: PostgreSQL
- Package management: yarn

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

- Clone github repository onto your local machine
- Change directory into project folder.
- Run yarn `yarn install`
- Start development server `yarn dev`

# RESTful API Endpoints

## Patient Endpoints

### Register new patient - POST
https://immunization-tracker-backend.herokuapp.com/register?role=1


```
Query String

role: 0 (staff) | 1 ( patient ) 
 
```

```
Argument
  {
    "username": "string", // required, unique
    "password": "string", // required
    "email": "string", // required
    "is_child": "number", // 0 | 1 (child)
    "first_name": "string",
    "last_name": "string",
    "phone": "string",  
    "avatar": "string",  
    "ss_id": "string", // social security id
  }
```

```
Return
{
"message": "Registration successful",
"patient_id": number,
}
 
 Database generates id and timestamp.

```

### Login existing patient - POST

https://immunization-tracker-backend.herokuapp.com/login?role=1


```
Query String

role: 0 (staff) | 1 ( patient ) 
 
```


```
Arguments
  {
    "username": “string",
    "password": “string"
  }
```

```
Return
  {
    "message": "Registration successful",
    "patient_id": number,
    "username": “string",
    "token": “abcd"
  }

  Database generates id and timestamp.
```


## Staff Endpoints

### Register new staff - POST
https://immunization-tracker-backend.herokuapp.com/register?role=0


```
Query String

role: 0 (staff) | 1 ( patient ) 
 
```

```
Argument
  {
    "username": "string", // required, unique
    "password": "string", // required
    "email": "string", // required
    "clinic_id": "number", // required
    "first_name": "string",
    "last_name": "string",
    "avatar": "string",  
  }
```

```
Return
{
"message": "Registration successful",
"staff_id": number,
}
 
 Database generates id and timestamp.

```

### Login existing staff - POST
https://immunization-tracker-backend.herokuapp.com/login?role=0


```
Query String

role: 0 (staff) | 1 ( patient ) 
 
```

```
Arguments
  {
    "username": “string",
    "password": “string"
  }
```

```
Return
  {
    "message": "Registration successful",
    "staff_id": number,
    "username": “string",
    "token": “abcd"
  }

  Database generates id and timestamp.
```

### Get family members - GET - RESTRICTED
https://immunization-tracker-backend.herokuapp.com/api/patients/:patient_id


```
Parameter : 

"patient_id": "number"  

```

```
Return
  [
	{
	    "username": "string",  
		"password": "string",  
		"email": "string",  
		"is_child": "number", 
		"first_name": "string",
		"last_name": "string",
		"phone": "string",  
		"avatar": "string",  
		"ss_id": "string", 
	},
	...
  ]
```

## Update patient profile by id - UPDATE - RESTRICTED
https://immunization-tracker-backend.herokuapp.com/api/patients/:patient_id


```
Parameter : 

"patient_id": "number"

```


```
Return
  {
    "message": "Patient successfully updated"
  }
```


## Delete patient by id - DELETE - RESTRICTED
https://immunization-tracker-backend.herokuapp.com/api/patients/:patient_id


```
Parameter : 

"patient_id": "number"

```


```
Return
  {
    "message": "Patient successfully deleted"
  }
```



## Immunization Records Endpoints

### Get patient immunization records - GET - RESTRICTED
https://immunization-tracker-backend.herokuapp.com/api/patients/:patient_id/immunization_records/

```
Parameter : 

"patient_id": "number" 

```

```
Return
  [
	 {
            "vaccine_does_id":  "number",
            "vaccine_name": "string",  
            "vaccine_dose_number":  "number",
            "vaccine_dose_month":  "number",
            "vaccine_received_date": "date"
            "vaccine_administer_clinic": "string",  
            "clinic_id":  "number",
            "patient_id":  "number",
            "immunization_record_id":  "number",
            "note": "string",  
          },
	...
  ]
```


### Get patient immunization records - GET - RESTRICTED
https://immunization-tracker-backend.herokuapp.com/api/patients/:patient_id/immunization_records/

```
Parameter : 

"patient_id": "number" 

```

```
Return
  [
	 {
            "vaccine_does_id":  "number",
            "vaccine_name": "string",  
            "vaccine_dose_number":  "number",
            "vaccine_dose_month":  "number",
            "vaccine_received_date": "date"
            "vaccine_administer_clinic": "string",  
            "clinic_id":  "number",
            "patient_id":  "number",
            "immunization_record_id":  "number",
            "note": "string",  
          },
	...
  ]
```


## Clinic / Staffs Endpoints

### Get patient immunization records edit requests by Clinic - GET - RESTRICTED
https://immunization-tracker-backend.herokuapp.com/api/staffs/:staff_id/immunization_edit_requests


```
Parameter : 

"staff_id": "number" 

```

```
Return
  [
	  {
        "record_edit_request_id": "number",
        "patient_id": "number",
        "patient_username": "string",  
        "patient_first_name": "string",  
        "patient_last_name": "string",  
        "vaccine_dose_id": "number",
        "vaccine_name": "string",  
        "vaccine_dose_number": "number",
        "vaccine_dose_month": "number",
        "appointed_clinic_id": "number",
        "appointed_clinic": "string",  
        "record_edit_request_note": "string",  
      },
	...
  ]
```


### Get patient immunization record edit requests by Patient - GET - RESTRICTED
https://immunization-tracker-backend.herokuapp.com/api/staffs/:staff_id/immunization_edit_requests/:patient_id


```
Parameter : 

"staff_id": "number" 
"patient_id": "number" 

```

```
Return
  [
	  {
        "patient_id": "number",
        "record_edit_request_id": "number",
        "vaccine_dose_id": "number",
        "vaccine_name": "string",  
		"vaccine_dose_number": "number",
		"vaccine_dose_month": "number",
        "patient_first_name": "string",  
        "patient_last_name": "string",  
        "patient_username": "string",  
        "record_edit_request_note": "string",  
      },
	...
  ]
```



### Get patient immunization record edit request details by Patient - GET - RESTRICTED
https://immunization-tracker-backend.herokuapp.com/api/staffs/:staff_id/immunization_edit_requests/:patient_id/:edit_request_id


```
Parameter : 

"staff_id": "number" 
"patient_id": "number" 
"edit_request_id": "number" 

```

```
Return
  [
	  {
        "record_edit_request_id": "number",
        "vaccine_dose_id": "number",
        "vaccine_name": "string",  
		"vaccine_dose_number": "number",
		"vaccine_dose_month": "number",
        "patient_id": "number",  
        "patient_first_name": "string",  
        "patient_last_name": "string",  
        "patient_username": "string",  
        "record_edit_request_note": "string",  
      },
	...
  ]
```


### POST Vaccination Dose Edit Request - POST - RESTRICTED
https://immunization-tracker-backend.herokuapp.com/api/patients/:patient_id/immunization_records/:vaccine_dose_id


```
Arguments
  {
    "clinic_id": “number"
    "note": “string",
  }
```

```
Parameter : 

"patient_id": "number"  
"vaccine_dose_id": "number"

```

```
Return
  [
	{
		"message": "string",  
		"lastId": “number",
    }
  ]
```
