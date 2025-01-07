import React from "react";
import { Button, Pressable, Text, View } from "react-native";
import { CoachMarkStep, useCoachMark, walkthroughable } from "react-native-copilot";

const CopilotText= walkthroughable(Text);
const CopilotHandler = () => {

    const {start} = useCoachMark();

    

    return (
        <>

            <View style={{ flex: 1 }}>
                <View style={{ width: 200, height: 60, marginVertical: 50 }}>
                    <CoachMarkStep
                        text="This is a hello world example!"
                        order={1}
                        name="hello1"
                    >
                        <CopilotText>Hello</CopilotText>
                    </CoachMarkStep>
                </View>
                <View style={{ width: 200, height: 60, marginVertical: 50 }}>
                    <CoachMarkStep
                        text={<View style={{width: 500, height: 200, backgroundColor: "red"}}></View>}
                        order={2}
                        name="hello2"
                        verison={2}
                    >
                        <CopilotText>Hello</CopilotText>
                    </CoachMarkStep>
                </View>
                <Pressable
                    style={{ width: 200, height: 60, marginTop: 50, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => start()}
                >
                    <Text style={{ color: 'white' }}>Start</Text>
                </Pressable>
                <View style={{ width: 200, height: 60, marginVertical: 50 }}>
                    <CoachMarkStep
                        text="This is a hello world example!"
                        order={3}
                        name="hello3"
                    >
                        <CopilotText>Hello</CopilotText>
                    </CoachMarkStep>
                </View>
                <View style={{ width: 200, height: 60, marginVertical: 50 }}>
                    <CoachMarkStep
                        text="This is a hello world example!"
                        order={4}
                        name="hello4"
                    >
                        <CopilotText>Hello</CopilotText>
                    </CoachMarkStep>
                </View>
            </View>

        </>
    );
}

export default CopilotHandler;