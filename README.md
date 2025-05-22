# React + Vite
=> Overview
This React component is a CRUD (Create, Read, Update, Delete) employee management form that allows users to:

Add employee details

Edit existing entries

Delete employee entries

Store/retrieve employee data from LocalStorage and SessionStorage

Upload and display employee images

useState: React hook for managing state

useRef: Hook for managing DOM references

useEffect: Hook to run side effects

App.css: Custom CSS for styling

=> State & Refs
useState
js
Copy
Edit
const [employee, setEmployee] = useState({});
const [empList, setEmpList] = useState([]);
const [editIdx, setEditIdx] = useState(-1);
employee: Current form data

empList: List of all employees

editIdx: Used to determine edit mode (-1 = add mode)

useRef
js
Copy
Edit
const editRef = useRef();
const focusRef = useRef();
editRef: Changes button text between "Add" and "Update"

focusRef: Automatically focus input on edit

=> useEffect - On Mount
useEffect(() => {
  const sessionData = JSON.parse(sessionStorage.getItem("users"));
  const localData = JSON.parse(localStorage.getItem("users"));
  const firstList = sessionData || localData || [];
  setEmpList(firstList);
}, []);
Retrieves data from sessionStorage or localStorage on component mount.

=> UI Layout
Form Section
Contains fields:

Employee Name

Salary

Position (checkboxes)

Gender (radio buttons)

City (dropdown)

Image upload

Address (textarea)

Submit button (Add/Update)

Table Section
Displays all employee entries with:

Serial number

Name, Salary, Position, City, Image, Gender, Address

Buttons for Edit and Delete

=> Notes
Data persists between refreshes using localStorage and sessionStorage.

Image is shown directly using base64 data URI.

Edits are done in-place with setEditIdx() logic.

Button dynamically changes label using useRef.

=> Possible Improvements
Validation: Prevent submission if required fields are empty.

UI Feedback: Add success/error messages.

Modularization: Break form and table into separate components.

Styling: Add better visual layout and responsiveness.


