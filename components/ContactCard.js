import { View, Text, Image, TouchableOpacity, LayoutAnimation } from 'react-native'
import React,{ useState, useRef }  from 'react'
import tw from 'twrnc'

const ContactCard = ({id, name, image, email, number, firstName, lastName }) => {
    const initials = (firstName?.toString() ?? '').charAt(0) + (lastName?.toString() ?? '').charAt(0);
    const [showEmail, setShowEmail] = useState(false);
    const detailsPaneHeight = useRef(null);

    const toggleEmail = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowEmail(!showEmail);
      };

  return (
    <View key={id} style={tw`rounded-lg bg-yellow-100 shadow m-2 p-2`}>
        <TouchableOpacity key={id} onPress={toggleEmail}>
        <View style={tw`flex flex-row items-center justify-start`}>
        {image ? (
          <Image source={{ uri: image }} style={tw`w-12 h-12 rounded-full`} />
        ) : (
          <View
            style={tw`w-12 h-12 rounded-full bg-gray-300 flex items-center shadow justify-center`}
          >
            <Text style={tw`text-lg font-bold text-gray-600`}>{initials}</Text>
          </View>
        )}
            <View style={tw`flex flex-col items-start justify-center ml-4`}>
                <Text style={tw`text-lg font-bold`}>{name}</Text>
                <Text style={tw`text-sm font-normal`}>{number}</Text>
            </View>
        </View>
        </TouchableOpacity>
        {showEmail && (
        <View
          style={tw`p-2 bg-gray-100 rounded-lg mt-2`}
          ref={(ref) => (detailsPaneHeight.current = ref ? ref.offsetHeight : null)}
        >
           <Text>FirstName: <Text style={tw`text-sm font-bold`}>{firstName || "Not Available"}</Text></Text>
           <Text>LastName: <Text style={tw`text-sm font-bold`}>{lastName || "Not Available"}</Text> </Text>
           <Text>Email: <Text style={tw`text-sm font-bold`}>{email || "Not Available"}</Text> </Text>
        </View>
      )}
    </View>

  )
}

export default ContactCard;