# HouseKeep App
This is an app I created for a CS50 assignment for a course offered at Harvard University.

It allows for easy income/expense management, viewing, updating, and deleting of income/expense history, and uploading of data in csv files tailored to this app.
#### Video Demo: https://youtu.be/TDKHVn8vkjE
# Description:
## Features
- Flask (Backend)
- React (Frontend)
- Flask-SQLAlchemy (OEM)
- sqlite (DB)
- typescript
- python

I've used Flask web framework based in Python its was necessary flask-sqlalchemy for manage SQL database with sqlite and React in frontend framework in typescript.

## App Follows
- User registration
- Login Authentication
- Household account management per user
- Display of Total balances
- Listing of expenditures
- Listing of income and expenses
- Input income and expense
- Upload CSV file date
- Update income and expense (Display in modal)
- Delete income and expense (Display in modal)
## Description of this App
This Housekeep App is an application designed to keep a simple household budget. In addition to income, expenditures, and amounts, you can enter the contents and the month and date of use, which will then be stored in the database. The contents can be updated or deleted.

The App also has the ability to import CSV data. By uploading CSV files created by other applications or Excel CSV data, data can be updated.

If I were to prepare CSV data, it would have to be a file with headers of earning (income and expense), time (date and time), cash (amount spent), and item (use for which it was spent). If you include anything else or in the wrong order, you will not be able to upload the file.

The resulting data can later be updated in this app. However, since it cannot be used as is, it is necessary to adjust the contents of the CSV file to suit this APP, so it is not likely to be used much in practice.

## Points of difficulty
### Frontend (React)
I think the hardest part was the implementation of REACT, and that was it.
I learned about Flask in CS50, so I understand the basics, but react is very deep, and it took me a lot of help from many websites, githubes, and other video sites to understand it.
As some of you may know, react is a frontend framework. That is, it is in charge of the client-side structure and is primarily responsible for browser behavior.
To start react, type the following command.

```
npx create-react-app my-app
cd my-app
npm start
```

Then, when you start the client server, you type this command.

```
npm start
```

I use npm, but if you are using yarn, type the command like this.

```
yarn create react-app my-app
```
The implementation in react was mainly function definitions with useState and backend integration with the axios library.
The difficult part was to reflect the json data obtained by the backend API in html, and I remember that exporting the income/expense data to a table was particularly difficult.
### Backend (FLask)
The backend, on the other hand, employs Flask, which was also used in CS50.
We chose Flask not only because we were familiar with it, but also because we judged it to be lightweight and easy to use as a backend framework for limited time.

I decided not to use Flask as a stand-alone framework because I am aiming to become a front-end engineer, and I thought that front-end experience was essential, so I decided to use Flask in combination with react.

The back-end configuration is as follows.

```
end
├ instanse
│ └  housekeep.db
├ .env
├ app.py
├ config.py
├ models.py
└ requirements.txt
```

The structure is as follows: app.py manages all operations, config.py manages environment variables and specific variables, and models.py oversees database-related information and database creation.

`Then app.py takes the JSON-composed information received from React, stores it in the database, changes the database information, sometimes performs calculations, etc., and finally returns it to React.

To start, type the following command.

```
python3 app.py
```

The hardest part was the implementation of the login function and database manipulation.

SQLAlchemy was particularly difficult because it was the first time I had used SQL and because it was a unique implementation of the SQL statements that I had learned in CS50 and could not manipulate.

HouseKeeping APP is basically a simple CRUD application, but the database calls, inserts, and deletes were unique and difficult to incorporate.


### Acknowledgements
This concludes all instructions.

I would like to thank David J. Malan and all the staff for their guidance on CS50.

Thank you!