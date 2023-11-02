import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, FlatList } from 'react-native';
import { Skeleton } from 'react-native-skeleton-loaders';
import tw from 'twrnc';
import * as Contacts from 'expo-contacts';

import ContactCard from '../components/ContactCard';

function ContactList() {

    const [contactlist, setContactlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied.');
        return;
      }
    
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.ID,
          Contacts.Fields.Name,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.Image,
          Contacts.Fields.Emails,
          Contacts.Fields.FirstName,
          Contacts.Fields.LastName,
        ]
      });
    
      const contactsList = data.map(contact => {
        return {
          name: contact?.firstName?? '' + ' ' + contact?.lastName ?? '',
          phoneNumber: contact.phoneNumbers && contact.phoneNumbers.length > 0
          ? contact.phoneNumbers[0]?.number
          : '',
          emails: contact.emails,
          id: contact.id,
          image: contact.image?.uri,
          firstName: contact.firstName,
          lastName: contact.lastName
          
        
      }})
      if (contactsList.length > 0) {
        setContactlist(contactsList);
        setLoading(false);
      }else{
        // setContactlist("No DATA")
        setLoading(false);
      }
    }

    useEffect(() => {
      fetchContacts();
    }, []);

  return (
    <View style={tw`flex-1 items-center p-3`}>
    <Text style={tw`text-2xl font-bold mt-6 p-2`}>Contacts List</Text>
        {      loading &&  
            [...Array(15)].map((_, i) => (
              <Skeleton key={i} w={300} h={50} mY={4}/>
            ))
          
          }

  {/* <ScrollView style={tw`w-full`}>
    {contactlist.map((contact) => (         
          <ContactCard key={contact.id} id={contact.id} name={contact.name} image={contact.image} number={contact.phoneNumber} email={contact.email} firstName={contact.firstName} lastName={contact.lastName}/>     
    ))}
  </ScrollView> */}
  <FlatList
        data={contactlist}
        keyExtractor={(item) => item.id}
        style={tw`w-full`}
        renderItem={({ item }) => (
          <ContactCard
            id={item.id}
            name={item.name}
            image={item.image}
            number={item.phoneNumber}
            email={item.email}
            firstName={item.firstName}
            lastName={item.lastName}
          />
        )}
      />

  </View>
  )
}

export default ContactList