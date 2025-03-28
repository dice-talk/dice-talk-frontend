import Hihi from "../assets/public/hihi.svg";
import { View, Button, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { navigateToChat } from '../navigation/navigationUtils';

function hihihi() {
    const navigation = useNavigation();
    
    return (
        <View>
            <Button 
                onPress={() => navigateToChat(navigation, 'ChatMain')}
                title="Chat"
            />
            <Hihi />
        </View>
    );
}

export default hihihi;