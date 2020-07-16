import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';

function Mission() {
    return (
        <Card
            title="Our Mission"
            wrapperStyle={{ margin: 10 }}
            image={require('./images/Beautiful_Ocean.png')}
            containerStyle={{ backgroundColor: 'lightyellow' }}>
            <Text style={{ fontSize: 18, alignItems: 'center' }}>
                At What's Up North County we strive to bring all of North San Diego County's hottest
                events to you on one simple, easy-to-use app. Don't keep searching the internet
                for something to do - you can find it all right here!
            </Text>
        </Card>
    );
}

class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    }

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['WhatsUpNC@gmail.com'],
            subject: 'Feedback',
            body: "Dear What's Up family,"
        })
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#c3e5e7' }}>
                <Mission />
                <Card
                    title='Contact Us'
                    wrapperStyle={{ margin: 10, alignItems: 'center' }}
                    image={require('./images/Flower_Fields.png')}
                    containerStyle={{ backgroundColor: 'lightyellow' }}>
                    <Text style={{ fontSize: 18, alignItems: 'center' }}>
                        Do you have questions about any of our events? Feedback about the site? Comments? We'd love to
                        hear from you! Just click on the button below.
                    </Text>
                    <Button
                        title="Contact us!"
                        buttonStyle={{
                            backgroundColor: 'rgb(252, 166, 133)',
                            marginTop: 30,
                            padding: 10,
                            maxWidth: 200
                        }}
                        icon={<Icon
                            name='envelope-o'
                            type='font-awesome'
                            color='#fff'
                            iconStyle={{ marginRight: 10 }}
                        />}
                        onPress={() => this.sendMail()}
                    />
                </Card>
            </ScrollView>
        );
    }
}

export default Home;