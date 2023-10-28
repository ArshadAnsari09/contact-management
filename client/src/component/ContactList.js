import React, { useState, useEffect } from "react";
import ContactListTable from "./ContactListTable";
// import { contacts } from "../data/ContactList";

const ContactList = () => {
  //creating a state that storing all the contacts as array
  const [contacts, setContacts] = useState([]);

  //fetching data from server
  useEffect(() => {
    fetchContacts();
  }, []);

  //function that fetching data
  const fetchContacts = async () => {
    //handling errors
    try {
      //calling api
      const response = await fetch("/api/users/all");
      //response not ok
      if (!response.ok) {
        console.log("No contact user found!");
        return;
      }
      //converting response in json
      const data = await response.json();
      //updating contact state
      setContacts(data.data);
    } catch (err) {
      //error
      console.log("Error while fetching contacts: ", err);
    }
  };

  // console.log(contacts);

  return (
    <div>
      <ContactListTable contacts={contacts} />
    </div>
  );
};

export default ContactList;
