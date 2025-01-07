import React from "react";
import { Button, Pressable, Text, View } from "react-native";
import { CopilotStep, useCopilot, walkthroughable } from "react-native-copilot";

const CopilotText= walkthroughable(Text);
const CopilotHandler = () => {

    const {start} = useCopilot();

    

    return (
        <>

            <View style={{ flex: 1 }}>
                <View style={{ width: 200, height: 60, marginVertical: 50 }}>
                    <CopilotStep
                        text="This is a hello world example!"
                        order={1}
                        name="hello1"
                    >
                        <CopilotText>Hello</CopilotText>
                    </CopilotStep>
                </View>
                <View style={{ width: 200, height: 60, marginVertical: 50 }}>
                    <CopilotStep
                        text={<View style={{width: 500, height: 200, backgroundColor: "red"}}></View>}
                        order={2}
                        name="hello2"
                        verison={2}
                    >
                        <CopilotText>Hello</CopilotText>
                    </CopilotStep>
                </View>
                <Pressable
                    style={{ width: 200, height: 60, marginTop: 50, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => start()}
                >
                    <Text style={{ color: 'white' }}>Start</Text>
                </Pressable>
                <View style={{ width: 200, height: 60, marginVertical: 50 }}>
                    <CopilotStep
                        text="This is a hello world example!"
                        order={3}
                        name="hello3"
                    >
                        <CopilotText>Hello</CopilotText>
                    </CopilotStep>
                </View>
                <View style={{ width: 200, height: 60, marginVertical: 50 }}>
                    <CopilotStep
                        text="This is a hello world example!"
                        order={4}
                        name="hello4"
                    >
                        <CopilotText>Hello</CopilotText>
                    </CopilotStep>
                </View>
            </View>

        </>
    );
}

export default CopilotHandler;